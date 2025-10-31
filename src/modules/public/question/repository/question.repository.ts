import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { IOpenAIService } from "../../../../core/openai/interface/IOpenAI.service";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { CustomQuestion, PaginationParams, PaginationResponse, Question, QuestionKeyword, QuestionLog, QuizTimer, Topic, TopicScore } from "../../types/public.type";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";
import { BadRequestException, NotFoundException, throwException } from "../../../../shared/errors/all.exception";
import CronJob from "node-cron";
import { Prisma, PrismaClient } from "@prisma/client";
import { QuestionLogPayloadType } from "../../../../shared/utils/types";
import { BaseQuestionRepository } from "./base-question.repository";
import { ILangChainService } from "../../../../core/openai/interface/ILangChain.service";

type score = {
    [key: string]: {
        total_questions: number;
        correct_answers: number;
    };
}

@injectable()
export class QuestionRepository extends BaseQuestionRepository implements IQuestionRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IOpenAIService) readonly openAIService: IOpenAIService,
        @inject(TYPES.ILangChainService) readonly langChainService: ILangChainService
    ) {
        super(databaseService);
        this.cronJob(); // Schedule the cron job to update quiz timers
    }

    private cronJob() {
        CronJob.schedule('*/30 * * * *', async () => this.updateQuizesTimer());
    }

    public async generatedQuestions(payload: QuestionGeneratePayloadType): Promise<string> {
        try {
            const participant = this.getParticipant();
            await this.checkPromptInProgress();
            const questionLog = await this.getOngoingQuiz();
            if (questionLog) {
                return questionLog.uuid; // Return existing ongoing quiz UUID
            }
            const department = await this.getDepartmentByUUID(payload.department);
            const topics = await this.getTopicsByUUIDsAndDepartmentUUID(payload.topics, payload.department);
            if (!department || !topics) return '';

            const topicScores: TopicScore[] = await this.getScoresByTopics(topics);

            const questionPayload: QuestionLogPayloadType = {
                department: department?.id,
                participant: participant?.id,
                timer: payload.timer,
                question_count: payload.question_count
            };
            const prisma = await this.prisma$();
            const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const savedQuestionLog = await this.saveQuestionLog(questionPayload, tx);
                await this.connectTopicsWithQuestionLog(topics, savedQuestionLog.id, tx);
                return savedQuestionLog;
            });
            const questions = await this.langChainService.generatedQuestions(department, topics, topicScores, payload);
            await this.saveQuestions(questions, result.id);

            return result.uuid; // Return the UUID of the question log
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async generateCustomQuestions(payload: CustomQuestion): Promise<QuestionGeneratePayloadType> {
        try {
            const participant = this.getParticipant();
            const prisma = await this.prisma$();
            let department = await prisma.department.findUnique({
                where: {
                    name: payload.department
                }
            });
            if (!department?.id) {
                department = await prisma.department.create({
                    data: {
                        name: payload.department,
                        is_global: false,
                        participant_id: participant.id
                    }
                });
            }

            const topicPayload = payload.topics?.map(topic => ({
                name: topic,
                is_global: false,
                department: department?.id,
                participant_id: participant.id
            }));

            const topicCount = await prisma.topic.createMany({
                data: topicPayload,
                skipDuplicates: true
            });
            if (!topicCount.count) {
                throw new NotFoundException('Topics are not created.');
            }
            const topics = await prisma.topic.findMany({
                where: {
                    department: department.id,
                    is_global: false,
                    participant_id: participant.id,
                    name: {
                        in: payload.topics
                    }
                }
            });
            const questionGeneratePayload: QuestionGeneratePayloadType = {
                department: department?.uuid,
                topics: topics?.map((topic: Topic) => topic.uuid),
                question_count: payload.question_count,
                timer: payload.timer
            };
            return questionGeneratePayload;
        } catch (error) {
            return throwException(error);
        }
    }

    public async getGeneratedQuestions(questionLogUUID: string): Promise<Question[]> {
        // This method is not implemented in the original code.
        // Implement the logic to retrieve generated questions from the database.
        try {
            const questions = await this.getQuestionsBylogUUID(questionLogUUID);
            if (!questions || questions.length === 0) {
                throw new NotFoundException('No questions found. Please generate questions first.');
            }
            const data = questions.map((question: Question) => ({
                uuid: question.uuid,
                question: question.question,
                options: question.options,
                question_type: question.question_type,
                selected_answer: question.selected_answer || [],
            }));
            return data;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async saveAnswerForQuestion(questionLogUUID: string, payload: QuestionSavePayloadType): Promise<Question> {
        try {
            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    completed: false, // Ensure the question log is not completed
                    is_oral: false
                }
            });

            if (!questionLog) {
                throw new NotFoundException('Question log not found or already completed');
            }

            const submittedAnswers = payload.answers.sort((a, b) => a - b);
            const update = await prisma.question_log_question.update({
                where: {
                    uuid: payload.uuid,
                    question_log: {
                        completed: false, // Ensure the question log is not completed
                        is_oral: false
                    }
                },
                data: {
                    selected_answer: submittedAnswers,
                }
            });

            const { answer, created_at, question_log_id, ...questionData } = update;

            return questionData as Question;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async submitQuestionLog(questionLogUUID: string): Promise<string> {
        try {
            const prisma = await this.prisma$();
            const questionLog = await this.getQuestionLogByUUID(questionLogUUID, false);

            const questions: Question[] = await prisma.question_log_question.findMany({
                where: {
                    question_log_id: questionLog.id,
                    is_oral: false
                },
            });


            const result = {
                timer: questionLog.timer,
                difficulty: questionLog.difficulty,
                total_questions: questionLog.question_count,
                total_answers: 0,
                correct_answers: 0,
                score: 0
            };

            const score: score = {};

            questions.forEach((question: Question) => {
                const isCorrectAnswer = question.answer && question.answer.join(',') === question?.selected_answer?.join(',');
                if (question?.selected_answer && question?.selected_answer?.length > 0) {
                    result.total_answers += 1
                }

                if (isCorrectAnswer) {
                    result.correct_answers += 1;
                }

                if (question.topic) {
                    if (!score[question.topic]) {
                        score[question.topic] = {
                            total_questions: 1,
                            correct_answers: isCorrectAnswer ? 1 : 0
                        }
                    } else {
                        score[question.topic] = {
                            total_questions: score[question.topic].total_questions + 1,
                            correct_answers: isCorrectAnswer ? score[question.topic].correct_answers + 1 : score[question.topic].correct_answers
                        }
                    }
                }
            });

            result.score = (result.correct_answers / result.total_questions) * 100;
            //! PROBLEM: An operation failed because it depends on one or more records 
            //! that were required but not found. Record to update not found.
            const questionLogUpdate = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                await this.updateTopicScore(score, tx)
                const isUpdated = await tx.question_log.update({
                    where: {
                        uuid: questionLogUUID,
                        completed: false,
                        is_oral: false
                    },
                    data: {
                        completed: true, // Mark the question log as completed,
                        score: result.score,
                        total_answers: result.total_answers,
                        total_correct: result.correct_answers,
                    }
                });
                return isUpdated;
            })


            if (!questionLogUpdate) {
                throw new NotFoundException('Question log not found or already completed');
            }

            return "Question log submitted successfully. You can now retrieve the questions.";
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getQuizResult(questionLogUUID: string): Promise<QuestionLog> {
        try {
            const questionLog = await this.getQuestionLogByUUID(questionLogUUID, true);
            if (questionLog.end_time && questionLog.timezone_offset) {
                // Getting the accurate local time using the stored timezone offset
                const timezone_offset = questionLog.timezone_offset * 60000;
                const endTime = new Date(questionLog.end_time.getTime() - timezone_offset);
                const fiveMinLater = new Date(endTime.getTime() + 5 * 60000);
                const localTime = new Date(Date.now() - timezone_offset);

                if (localTime.getTime() > fiveMinLater.getTime()) {
                    throw new BadRequestException('Quiz result can only be retrieved within 5 minutes of completion.');
                }
            }

            return questionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getQuestionLogs(paginationParams: PaginationParams): Promise<PaginationResponse<QuestionLog>> {
        try {
            const participant = this.getParticipant();
            const prisma = await this.prisma$();
            const { skip, take } = paginationParams;
            const condition = {
                participant: participant?.id,
                completed: true,
                is_oral: false
            }
            // Get total count for pagination metadata
            const total = await prisma.question_log.count({
                where: condition,
            });
            const questionLogs = await prisma.question_log.findMany({
                where: condition,
                orderBy: {
                    id: 'desc' // Order by ID in descending order
                },
                skip: skip,
                take: take,
            });
            const logs = questionLogs.map((questionLog: any) => this.formatQuestionLog(questionLog)) as QuestionLog[];
            return {
                data: logs,
                total: total
            }
        } catch (error) {
            return throwException(error);
        }
    }

    public async getQuestionDetailsLogByUUID(questionLogUUID: string): Promise<Question[]> {
        try {
            const logs = this.getQuestionsBylogUUID(questionLogUUID, true);
            return logs;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getQuizTimer(questionLogUUID: string): Promise<QuizTimer> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            let questionLog = await prisma.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    completed: false, // Ensure the question log is not completed
                    participant: participant?.id,
                    is_oral: false
                },
                select: {
                    end_time: true,
                    timezone_offset: true,
                    timezone_name: true,
                }
            });
            if (!questionLog) {
                throw new NotFoundException('Quiz session not found');
            }

            if (!questionLog?.end_time) {
                questionLog = await this.updateQuizTimer(questionLogUUID); // Update the timer if not set
            }

            // Get current server time
            const now = new Date();
            const endTime = new Date(questionLog.end_time);

            // Calculate remaining time in seconds
            const remainingMs = endTime.getTime() - now.getTime();

            let localExpiresAt: string | undefined;
            if (questionLog.timezone_offset !== null) {
                // Getting the accurate local time using the stored timezone offset
                const localTime = new Date(endTime.getTime() - (questionLog.timezone_offset * 60000));
                localExpiresAt = localTime.toISOString();
            }

            return {
                remainingSeconds: Math.max(0, Math.floor(remainingMs / 1000)),
                expiresAt: localExpiresAt || endTime.toISOString(), // Use local time if available, otherwise UTC
                timezoneOffset: questionLog.timezone_offset, // Offset in minutes from UTC
                timezoneName: questionLog.timezone_name // Timezone name
            };
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getQuestionKeywords(questionUUID: string): Promise<QuestionKeyword[]> {
        try {
            const prisma = await this.prisma$();
            const keywords = await this.getKeywords(questionUUID);

            if (keywords && keywords.length) {
                return keywords as QuestionKeyword[];
            }

            /*
                Create new keywords 
                1) get the question from the database
                2) extract explanation from the result
                3) Using explanation, generate keywords using OpenAI
                4) Save the keywords to the database
            */
            const question = await this.getQuestionDetails(questionUUID);
            const generatedKeywords = await this.langChainService.generateQuestionKeywords(question);
            if (generatedKeywords && generatedKeywords.length > 0) {
                const keywordData = generatedKeywords.map((keyword: string) => ({
                    question_id: question?.id,
                    keyword: keyword.trim(),
                }));
                await prisma.question_keyword.createMany({
                    data: keywordData,
                    skipDuplicates: true,
                });
            }

            const newKeywords = await this.getKeywords(questionUUID);

            return newKeywords as QuestionKeyword[];
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getLatestOngoingQuiz(): Promise<QuestionLog | null> {
        try {
            const participant = this.getParticipant();
            const prisma = await this.prisma$();
            this.updateQuizesTimer();
            const questionLog = await prisma.question_log.findFirst({
                where: {
                    participant: participant?.id,
                    completed: false, // Ensure the question log is not completed
                    generated: true
                }
            });
            if (!questionLog) {
                return null; // No ongoing quiz found
            }
            return this.formatQuestionLog(questionLog) as QuestionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getKeywordDetails(keywordUuid: string): Promise<QuestionKeyword> {
        try {
            const keyword = await this.getAKeyword(keywordUuid);
            return {
                id: keyword.id,
                uuid: keyword.uuid,
                keyword: keyword.keyword,
                explanation: keyword?.explanation || '',
                question_id: keyword?.question_id,
                example: keyword.example || '',
            } as QuestionKeyword;

        } catch (error) {
            return throwException(error);
        }
    }

    public async getStreamedKeywordExplanation(keywordUuid: string): Promise<ReadableStream> {
        try {
            const keyword = await this.getAKeyword(keywordUuid);
            if (!keyword.explanation) {
                const question = await this.getQuestionDetails(keyword.question_log_question.uuid);
                const prompt = `
                    Explain the keyword "${keyword.keyword}" in the context of the quiz.
                    Question: ${question?.question}
                    Topic: ${question?.topic}
                    Sub Topic: ${question?.sub_topic}

                    CRITICAL RULES:
                    1. Give a simple definition.
                    2. Explain why it matters in this question/topic.
                    3. Optionally add a short example or code (Markdown).
                    4. Be concise, clear, and learner-friendly.
                `;
                // const baseStream = await this.openAIService.getDeepSeekChatCompletionsStream(prompt);
                const baseStream = await this.langChainService.generatedStreamedExplanation(prompt);
                return this.wrapReadableStream(baseStream, {
                    onComplete: async (fullText) => {
                        await this.updateQuestionKeyword(keywordUuid, fullText);
                    },
                    onErrorText: "Error generating explanation. Please try again."
                });
            }
            return this.textToCharacterStream(keyword.explanation);
        } catch (error) {
            const encoder = new TextEncoder();
            return new ReadableStream({
                start(controller) {
                    const errorMsg = "Error: Unable to generate explanation at this time.";
                    controller.enqueue(encoder.encode(errorMsg));
                    controller.close();
                }
            });
        }
    }

    private async updateQuestionKeyword(keywordUUID: string, explanation: string) {
        try {
            const prisma = await this.prisma$();
            await prisma.question_keyword.update({
                where: {
                    uuid: keywordUUID,
                },
                data: {
                    explanation: explanation,
                }
            });
        } catch (error) {
            return throwException(error);
        }
    }

    private async getAKeyword(keywordUuid: string): Promise<any> {
        try {
            const prisma = await this.prisma$();
            const keyword = await prisma.question_keyword.findUnique({
                where: {
                    uuid: keywordUuid,
                },
                include: {
                    question_log_question: {
                        select: {
                            uuid: true,
                            question: true,
                            topic: true,
                        }
                    }
                }
            });
            if (!keyword) {
                throw new NotFoundException('Keyword not found');
            }
            return keyword;
        } catch (error) {
            return throwException(error);
        }
    }

    public async getKeywordExample(keywordUuid: string): Promise<string> {
        try {
            const keyword = await this.getAKeyword(keywordUuid);
            if (!keyword.example) {
                const question = await this.getQuestionDetails(keyword.question_log_question.uuid);
                const response = await this.openAIService.getDeepSeekChatCompletions(this.keywordExamplePrompt(keyword, question));
                keyword.example = JSON.parse(response).trim();

                await this.updateKeywordExample(keywordUuid, keyword.example);
            }
            return keyword.example;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getStreamedKeywordExample(keywordUUID: string): Promise<ReadableStream> {
        try {
            const keyword = await this.getAKeyword(keywordUUID);
            if (keyword?.example) {
                return this.textToCharacterStream(keyword.example);
            }
            const question = await this.getQuestionDetails(keyword.question_log_question.uuid);
            const prompt = this.keywordExamplePrompt(keyword, question);

            const baseStream = await this.langChainService.generatedStreamedExplanation(prompt);
            return this.wrapReadableStream(baseStream, {
                onComplete: async (fullText) => {
                    await this.updateKeywordExample(keywordUUID, fullText);
                },
                onErrorText: "Error generating explanation. Please try again."
            });
        } catch (error) {
            const encoder = new TextEncoder();
            return new ReadableStream({
                start(controller) {
                    const errorMsg = "Error: Unable to generate explanation at this time.";
                    controller.enqueue(encoder.encode(errorMsg));
                    controller.close();
                }
            });
        }
    }

    private keywordExamplePrompt(keyword: QuestionKeyword, question: Question): string {
        return `
                Generate a practical example that illustrates the keyword "${keyword.keyword}".
                Question: ${question?.question}
                Topic: ${question?.topic}
                Sub-Topic: ${question?.sub_topic}
                Explanation: ${keyword.explanation}

                CRITICAL RULES:
                - The example must directly demonstrate how the keyword is applied or understood in this context.
                - Keep it short, clear, and practical. Avoid unnecessary complexity.
                - If the keyword is technical, show a minimal working code snippet in Markdown.
                - If the keyword is conceptual, use a real-world analogy or scenario.
                - Ensure the example reinforces the explanation and helps a learner understand - why the keyword matters.
            `;
    }

    public async checkIfParticipatedInQuiz(isVerbal: boolean = false): Promise<boolean> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            const count = await prisma.question_log.count({
                where: {
                    participant: participant?.id,
                    is_oral: isVerbal
                }
            });
            return count > 0;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getExplanationForQuestion(questionUUID: string) {
        try {
            const prisma = await this.prisma$();
            const question: Question = await this.getQuestionDetails(questionUUID);
            if (question?.explanation) {
                return question.explanation;
            }

            const prompt = `
                Provide a clear, concise explanation for the following quiz question:
                Question: ${question?.question}
                Topic: ${question?.topic}
                Options: ${question?.options.join(', ')}
                Answer: ${(question?.answer && question?.answer?.length > 0) ? question?.answer?.map((index: number) => question?.options[index]).join(', ') : ''}
                **Requirements:**
                1. Start with a brief definition of the core concept.
                2. Explain why the correct answer is right and why the other options are wrong.
                3. Use simple language and avoid jargon.
                4. Keep it concise (2-3 sentences).
                5. If the explanation has code, use Markdown formatting.
                **Output Format (JSON):**
                {
                "explanation": "The explanation text"
                }
            `;
            const response = await this.openAIService.getDeepSeekChatCompletions(prompt);
            const parsedJSON = JSON.parse(response);
            const explanation = parsedJSON['explanation'].trim();
            // Update the question with the generated explanation
            await prisma.question_log_question.update({
                where: { uuid: questionUUID },
                data: { explanation: explanation }
            });
            if (question?.id) {
                this.generateEmbeddingsForQuestions(question.id);
            }
            return parsedJSON['explanation'].trim();
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getStreamedExplanationForQuestion(questionUUID: string): Promise<ReadableStream> {
        try {
            const question: Question = await this.getQuestionDetails(questionUUID);

            // Return existing explanation as character-by-character stream
            if (question?.explanation) {
                return this.textToCharacterStream(question.explanation);
            }

            const prompt = `
                Provide a clear, concise explanation for the following quiz question:
                Question: ${question?.question}
                Topic: ${question?.topic}
                Options: ${question?.options.join(', ')}
                Answer: ${(question?.answer && question?.answer?.length > 0) ? question?.answer?.map((index: number) => question?.options[index]).join(', ') : ''}
                **Requirements:**
                1. Start with a brief definition of the core concept.
                2. Explain why the correct answer is right and why the other options are wrong.
                3. Use simple language and avoid jargon.
                4. Keep it concise (2-3 sentences).
                5. If the explanation has code, use Markdown formatting.
            `;

            // Get the stream from LangChain
            const baseStream = await this.langChainService.generatedStreamedExplanation(prompt);

            // Wrap it with reusable logic
            return this.wrapReadableStream(baseStream, {
                onComplete: async (fullText) => {
                    await this.saveExplanation(questionUUID, fullText);
                },
                onErrorText: "Error generating explanation. Please try again."
            });

        } catch (error) {
            const encoder = new TextEncoder();
            return new ReadableStream({
                start(controller) {
                    const errorMsg = "Error: Unable to generate explanation at this time.";
                    controller.enqueue(encoder.encode(errorMsg));
                    controller.close();
                }
            });
        }
    }

    public async getQuestionsByQuery(query: string, limit: number, similarityThreshold: number): Promise<Question[]> {
        try {
            const participant = this.getParticipant();
            const prisma = await this.prisma$();

            const queryEmbedding = await this.openAIService.getOpenAIEmbedding(query);
            const embeddingArray = queryEmbedding.data[0].embedding;

            // Convert similarity threshold to distance threshold
            const distanceThreshold = 1 - similarityThreshold;

            let sqlQuery = `
                SELECT 
                    q.uuid,
                    q.question,
                    q.options,
                    q.answer,
                    q.selected_answer,
                    q.explanation,
                    q.topic,
                    q.question_type,
                    1 - (q.embedding <=> $1::vector) as similarity
                FROM question_log_question q
                INNER JOIN question_log l ON q.question_log_id = l.id
                WHERE q.embedding IS NOT NULL
                AND (q.embedding <=> $1::vector) < $2  -- Use distance threshold
                AND l.participant = $3
                ORDER BY (q.embedding <=> $1::vector) ASC  -- Order by distance
            `;

            const params: any[] = [
                JSON.stringify(embeddingArray),
                distanceThreshold,  // Now using distance threshold
                participant.id
            ];

            sqlQuery += ` LIMIT $${params.length + 1}`;
            params.push(limit);

            const questions: Question[] = await prisma.$queryRawUnsafe(sqlQuery, ...params);

            return questions.map((question: Question) => ({
                uuid: question.uuid,
                question: question.question,
                options: question.options,
                answer: question.answer?.sort((a: number, b: number) => a - b), // Sort the answer indices
                selected_answer: question.selected_answer || [],
                question_type: question.question_type,
                explanation: question.explanation || '', // Ensure explanation is trimmed
            })) as Question[];

        } catch (error) {
            return throwException(error);
        }
    }

    private async updateTopicScore(topicScore: score, prisma: Prisma.TransactionClient): Promise<boolean> {
        try {
            const participant = this.getParticipant();
            const keys = Object.keys(topicScore);
            const topics: Topic[] = await prisma.topic.findMany({
                where: {
                    name: {
                        in: keys
                    }
                },
                select: {
                    id: true,
                    uuid: true,
                    name: true
                }
            });

            // Use upsert for each topic score
            const upsertOperations = topics.map((topic: Topic) => {
                const selectedTopic = topicScore[topic.name];
                if (!selectedTopic) return null;

                const score = Math.floor((selectedTopic.correct_answers / selectedTopic.total_questions) * 100);

                return prisma.topic_score.upsert({
                    where: {
                        participant_topic_unique: {
                            participant_id: participant.id,
                            topic_id: topic.id
                        }
                    },
                    update: {
                        score: score,
                    },
                    create: {
                        participant_id: participant.id,
                        topic_id: topic.id,
                        score: score,
                    }
                });
            }).filter(Boolean); // Remove null values

            // Execute all upsert operations
            const results = await Promise.all(upsertOperations);
            return results.length > 0;

        } catch (error) {
            return throwException(error);
        }
    }

    private async updateKeywordExample(keywordUUID: string, example: string): Promise<void> {
        try {
            const prisma = await this.prisma$();
            await prisma.question_keyword.update({
                where: {
                    uuid: keywordUUID,
                },
                data: {
                    example: example,
                }
            });
        } catch (error) {
            return throwException(error);
        }
    }

    private textToCharacterStream(text: string): ReadableStream {
        const encoder = new TextEncoder();
        let position = 0;

        return new ReadableStream({
            start(controller) {
                const sendBatch = () => {
                    // Send characters in batches of 5
                    const batchSize = 5;
                    const end = Math.min(position + batchSize, text.length);

                    for (let i = position; i < end; i++) {
                        controller.enqueue(encoder.encode(text[i]));
                    }
                    position = end;

                    if (position < text.length) {
                        setTimeout(sendBatch, 3); // 3ms between batches
                    } else {
                        controller.close();
                    }
                };

                sendBatch();
            }
        });
    }

    private async saveExplanation(questionUUID: string, explanation: string) {
        try {
            const prisma = await this.prisma$();
            await prisma.question_log_question.update({
                where: { uuid: questionUUID },
                data: { explanation: explanation }
            });
        } catch (error) {
            return throwException(error);
        }
    }

    private async getKeywords(questionUUID: string) {
        try {
            const prisma = await this.prisma$();
            const keywords = await prisma.question_keyword.findMany({
                where: {
                    question_log_question: {
                        uuid: questionUUID,
                        is_oral: false
                    }
                },
                select: {
                    id: true,
                    uuid: true,
                    keyword: true,
                    explanation: true,
                    question_id: true,
                }
            });

            if (keywords && keywords.length) {
                return keywords as QuestionKeyword[];
            }
        } catch (error) {
            return throwException(error);
        }
    }

    private async getQuestionLogByUUID(questionLogUUID: string, isCompleted: boolean = true): Promise<QuestionLog> {
        try {
            const participant = this.getParticipant();

            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    completed: isCompleted, // Ensure the question log is not completed
                    participant: participant?.id,
                    is_oral: false
                },
                include: {
                    question_department: true,
                }
            });
            if (!questionLog) {
                throw new NotFoundException('Question log not found or not completed');
            }
            return this.formatQuestionLog(questionLog) as QuestionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    private formatQuestionLog(questionLog: any): QuestionLog {
        return {
            id: questionLog.id,
            uuid: questionLog.uuid,
            department: questionLog.question_department,
            timer: questionLog.timer,
            difficulty: questionLog.difficulty,
            question_count: questionLog.question_count,
            completed: questionLog.completed,
            score: questionLog.score,
            total_answers: questionLog.total_answers,
            total_correct: questionLog.total_correct,
            timezone_offset: questionLog.timezone_offset,
            end_time: questionLog.end_time,
            is_oral: questionLog.is_oral,
            created_at: new Date(questionLog.created_at - questionLog.timezone_offset * 60000), // Adjust for timezone offset
        };
    }

    private async getQuestionsBylogUUID(questionLogUUID: string, isCompleted: boolean = false): Promise<Question[]> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            if (!isCompleted) {
                const quizTimer = await this.getQuizTimer(questionLogUUID);
                if (quizTimer.remainingSeconds <= 0) {
                    throw new BadRequestException('Quiz timer has expired. Please start a new quiz.');
                }
            }

            const questions = await prisma.question_log_question.findMany({
                where: {
                    question_log: {
                        uuid: questionLogUUID,
                        completed: isCompleted,
                        participant: participant?.id, // Ensure the question log belongs to the participant
                        is_oral: false
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });
            if (!questions || questions.length === 0) {
                throw new NotFoundException('No questions found. Please generate questions first.');
            }
            return questions.map((question: Question) => ({
                uuid: question.uuid,
                question: question.question,
                options: question.options,
                answer: question.answer?.sort((a: number, b: number) => a - b), // Sort the answer indices
                selected_answer: question.selected_answer || [],
                question_type: question.question_type,
                explanation: question.explanation || '', // Ensure explanation is trimmed
            })) as Question[];
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async saveQuestions(questions: Question[], questionLogId: number): Promise<void> {
        // Save the questions to the database
        // This is a placeholder function. Implement the actual logic to save the questions.
        try {
            const prisma = await this.prisma$();
            const questionData = questions.map((question: Question) => ({
                question_log_id: questionLogId,
                question: question.question,
                options: question.options, // Ensure options are trimmed
                answer: question?.answer?.sort((a, b) => a - b), // Sort the answer indices
                question_type: question.question_type,
                explanation: question?.explanation || undefined, // Ensure explanation is trimmed
                topic: question.topic || undefined, // Ensure topic is trimmed
                sub_topic: question.sub_topic || undefined, // Ensure sub_topic is trimmed
            }));
            await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const count = await tx.question_log_question.createMany({
                    data: questionData,
                    skipDuplicates: true, // Skip duplicates if any
                });

                if (count.count === 0) {
                    throw new NotFoundException('No questions were saved');
                }

                await tx.question_log.update({
                    where: { id: questionLogId },
                    data: { generated: true }
                });
                this.generateEmbeddingsForQuestions(questionLogId);
            });

        } catch (error: any) {
            this.deleteGeneratedQuestion(questionLogId);
            return throwException(error);
        }
    }

    private async generateEmbeddingsForQuestions(questionLogId: number): Promise<void> {
        try {
            const prisma = await this.prisma$();

            const questions = await prisma.$queryRaw<
                { id: number; question: string; topic: string; sub_topic: string; options: any }[]
            >`SELECT id, question, topic, sub_topic, options, explanation
            FROM question_log_question WHERE question_log_id = ${questionLogId}`;

            if (questions.length === 0) return;

            const embeddingResponse = await this.openAIService.getOpenAIEmbedding(
                questions.map((q: Question) => {
                    return `
                        Topic: ${q.topic}. 
                        Sub Topic: ${q.sub_topic}.
                        Question: ${q.question}.
                        Options: ${q.options.map((option: string, index: number) => `${index + 1}. ${option}`)}.
                        explanation: ${q.explanation || ''}
                    `
                })
            );

            // Batch updates with individual error handling
            const updateResults = await Promise.allSettled(
                questions.map((question: any, index: number) =>
                    this.updateWithRetry(
                        prisma,
                        question.id,
                        embeddingResponse.data[index].embedding
                    )
                )
            );

            // Check for failures
            const failedUpdates = updateResults.filter(
                (result): result is PromiseRejectedResult => result.status === 'rejected'
            );

            if (failedUpdates.length > 0) {
                console.error(`${failedUpdates.length} embeddings failed to save:`, failedUpdates);
                // Implement retry logic for failed updates here

            }

            const successfulCount = updateResults.length - failedUpdates.length;
            console.log(`Successfully generated embeddings for ${successfulCount}/${questions.length} questions`);

        } catch (error) {
            console.error('Error generating embeddings:', error);
        }
    }

    // Retry function for individual updates
    private async updateWithRetry(
        prisma: PrismaClient,
        questionId: number,
        embedding: number[],
        maxRetries: number = 2
    ): Promise<void> {
        let attempt = 0;

        while (attempt <= maxRetries) {
            try {
                await prisma.$executeRawUnsafe(`
                UPDATE question_log_question 
                SET embedding = '${JSON.stringify(embedding)}'::vector
                WHERE id = ${questionId}
            `);
                return;
            } catch (error) {
                attempt++;
                if (attempt > maxRetries) throw error;
                console.warn(`Retrying update for question ${questionId} (attempt ${attempt})`);
                await new Promise(r => setTimeout(r, 500 * attempt));
            }
        }
    }

    private async updateQuizesTimer() {
        try {
            const prisma = await this.prisma$();
            await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const logs = await tx.question_log.findMany({
                    where: {
                        completed: false, // Only update incomplete logs
                        generated: true,
                        end_time: { not: null },
                        timezone_offset: { not: null }
                    },
                    select: {
                        uuid: true,
                        end_time: true,
                        timezone_offset: true
                    }
                });

                for (const questionLog of logs) {
                    if (!questionLog?.end_time && questionLog.timezone_offset == null) continue;

                    const now = new Date();
                    const endTime = new Date(questionLog.end_time);

                    // Calculate remaining time in seconds
                    const remainingMs = endTime.getTime() - now.getTime();
                    if (remainingMs <= 0) {
                        // If the timer has expired, mark the question log as completed
                        await tx.question_log.updateMany({
                            where: {
                                uuid: questionLog.uuid,
                                completed: false
                            },
                            data: {
                                completed: true
                            }
                        });
                    }
                }
            });

        } catch (error: any) {
            return throwException(error);

        }
    }
}