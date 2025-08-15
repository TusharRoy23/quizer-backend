import { id, inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { IOpenAIService } from "../../../../core/openai/interface/IOpenAI.service";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { IDepartmentService } from "../../department/interface/IDepartment.service";
import { IUserService } from "../../user/interface/IUser.service";
import { Department, PaginationParams, PaginationResponse, Question, QuestionKeyword, QuestionLog, QuizTimer, Topic } from "../../types/public.type";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";
import { BadRequestException, NotFoundException, throwException } from "../../../../shared/errors/all.exception";
import { RequestContext } from "../../../../shared/context/request-context";
import CronJob from "node-cron";

type QuestionLogPayloadType = {
    department: number;
    participant: number | undefined;
    timer: number;
    question_count: number;
    difficulty: string;
}
@injectable()
export class QuestionRepository extends BaseRepository implements IQuestionRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IOpenAIService) readonly openAIService: IOpenAIService,
        @inject(TYPES.IDepartmentService) readonly departmentService: IDepartmentService,
        @inject(TYPES.IUserService) readonly userService: IUserService,
    ) {
        super(databaseService);
        this.cronJob(); // Schedule the cron job to update quiz timers
    }

    private cronJob() {
        CronJob.schedule('*/5 * * * *', async () => this.updateQuizesTimer());
    }

    public async generatedQuestions(payload: QuestionGeneratePayloadType): Promise<string> {
        try {
            const participant = this.getParticipant();
            await this.checkOngoingQuiz();
            const department = await this.departmentService.getDepartmentByUUID(payload.department);
            if (!department) {
                throw new NotFoundException('Department not found');
            }

            const topics = await this.departmentService.getTopicsByUUIDsAndDepartmentUUID(payload.topics, payload.department);
            if (!topics || topics.length === 0) {
                throw new NotFoundException('Topics not found');
            }

            const questionPayload: QuestionLogPayloadType = {
                department: department?.id,
                participant: participant?.id,
                timer: payload.timer,
                question_count: payload.question_count,
                difficulty: payload.difficulty,
            };
            const promptResponse = await this.getPromptQuestions(payload, department, topics);
            const savedQuestionLog = await this.saveQuestionLog(questionPayload);
            await this.connectTopicsWithQuestionLog(topics, savedQuestionLog.id);
            await this.saveQuestions(promptResponse, savedQuestionLog.id);

            return savedQuestionLog.uuid; // Return the UUID of the question log
        } catch (error: any) {
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

            const questions = await prisma.question_log_question.findMany({
                where: {
                    question_log_id: questionLog.id,
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

            questions.forEach((question: Question) => {
                if (question?.selected_answer && question?.selected_answer?.length > 0) {
                    result.total_answers += 1
                }

                if (question.answer && question.answer.join(',') === question?.selected_answer?.join(',')) {
                    result.correct_answers += 1;
                }
            });

            result.score = (result.correct_answers / result.total_questions) * 100;
            //! PROBLEM: An operation failed because it depends on one or more records 
            //! that were required but not found. Record to update not found.
            const questionLogUpdate = await prisma.question_log.update({
                where: {
                    uuid: questionLogUUID,
                    completed: false, // Ensure the question log is not completed
                },
                data: {
                    completed: true, // Mark the question log as completed,
                    score: result.score,
                    total_answers: result.total_answers,
                    total_correct: result.correct_answers,
                }
            });

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
            if (questionLog.created_at) {
                const createdTime = questionLog.created_at.getTime();
                const fiveMinLater = new Date(createdTime + 5 * 60 * 1000);
                const now = Date.now();
                if (now > fiveMinLater.getTime()) {
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
            const generatedKeywords = await this.getKeywordsFromOpenAI(
                question?.explanation || '',
                question?.question || '',
                question?.topic || ''
            )
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
            if (!keyword.explanation) {
                // gnerate explanation using OpenAI
                const question = await this.getQuestionDetails(keyword.question_log_question.uuid);
                const prompt = `
                    Generate a clear and concise explanation for the keyword "${keyword.keyword}"
                    in the context of the question "${question?.question}" and its topic "${question?.topic}".
                    Provide a detailed explanation that helps in understanding the keyword and its relevance to the question.
                    Format the response as a JSON object with the following structure:
                    {
                        "explanation": "The explanation text"
                    }
                    if the explanation has code then it should be in markdown format.
                `
                const response = await this.openAIService.getChatCompletions(prompt);
                const parsedJSON = JSON.parse(response);
                keyword.explanation = parsedJSON['explanation'].trim();
                // Update the keyword with the generated explanation
                await prisma.question_keyword.update({
                    where: {
                        uuid: keyword.uuid,
                    },
                    data: {
                        explanation: keyword.explanation,
                    }
                });
            }
            return {
                id: keyword.id,
                uuid: keyword.uuid,
                keyword: keyword.keyword,
                explanation: keyword.explanation || '',
                question_id: keyword.question_id,
                example: keyword.example || '',
            } as QuestionKeyword;

        } catch (error) {
            return throwException(error);
        }
    }

    public async getKeywordExample(keywordUuid: string): Promise<string> {
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
            if (!keyword.example) {
                const question = await this.getQuestionDetails(keyword.question_log_question.uuid);
                const prompt = `
                    Generate a clear and concise example for the keyword "${keyword.keyword}"
                    in the context of the question "${question?.question}" and its topic "${question?.topic}".
                    And exaplanation of the keyword is "${keyword.exaplanation}"
                    Format the response as a JSON object with the following structure:
                    {
                        "example": "The example text/code"
                    }
                    if the example has code then it should be in markdown format.
                `;
                const response = await this.openAIService.getChatCompletions(prompt);
                const parsedJSON = JSON.parse(response);
                keyword.example = parsedJSON['example'].trim();

                await prisma.question_keyword.update({
                    where: {
                        uuid: keyword.uuid,
                    },
                    data: {
                        example: keyword.example,
                    }
                });
            }
            return keyword.example;
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async getKeywords(questionUUID: string) {
        const prisma = await this.prisma$();
        const keywords = await prisma.question_keyword.findMany({
            where: {
                question_log_question: {
                    uuid: questionUUID,
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
    }

    private async getKeywordsFromOpenAI(explanation: string, question: string, topic: string): Promise<string[]> {
        try {
            const prompt = `
                Extract keywords from the following explanation and question:
                
                Question: ${question}
                Topic: ${topic}
                Explanation: ${explanation}

                Provide a minimal list of keywords (Maximun 5 keywords) which is strictly limited to Question, 
                Topic & Explanation that can help in understanding the question and its context.
                Format the response as a JSON array of strings.
                Example: {
                    "keywords": ["keyword1", "keyword2", "keyword3"]
                }
            `;

            const response = await this.openAIService.getChatCompletions(prompt);
            const parsedJSON = JSON.parse(response);
            return parsedJSON['keywords'] || [];
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async getQuestionDetails(questionUUID: string): Promise<Question | undefined> {
        try {
            const prisma = await this.prisma$();
            const question = await prisma.question_log_question.findUnique({
                where: {
                    uuid: questionUUID,
                },
            });
            if (!question) {
                throw new NotFoundException('Question not found');
            }
            return question as Question;
        } catch (error: any) {
            return throwException(error);

        }
    }

    private async updateQuizTimer(questionLogUUID: string): Promise<QuestionLog | undefined> {
        try {
            const prisma = await this.prisma$();
            const questionLog: QuestionLog = await prisma.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    completed: false, // Ensure the question log is not completed
                }
            });

            if (!questionLog) {
                return;
            }

            // Calculate end time in UTC
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset(); // Minutes from UTC
            const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Calculate end time in pure UTC (without local timezone conversion)
            const expiresAt = new Date(Date.now() + questionLog.timer * 60 * 1000);
            const expiresAtUTC = new Date(expiresAt.toISOString());

            const questionUpdatedLog = await prisma.question_log.update({
                where: { uuid: questionLogUUID },
                data: {
                    end_time: expiresAtUTC, // Store as UTC
                    timezone_offset: timezoneOffset,
                    timezone_name: timezoneName
                }
            });
            return questionUpdatedLog;
        } catch (error: any) {
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
                    participant: participant?.id
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
                        participant: participant?.id // Ensure the question log belongs to the participant
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

    private async saveQuestionLog(payload: QuestionLogPayloadType) {
        // Save the question log to the database
        // This is a placeholder function. Implement the actual logic to save the question log.
        try {
            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log.create({
                data: payload
            });
            return questionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async getPromptQuestions(payload: QuestionGeneratePayloadType, department: Department, topics: Topic[]): Promise<Question[]> {
        // Get the prompt questions from the DeepSeek
        // This is a placeholder function. Implement the actual logic to get the prompt questions.
        try {
            const prompt = this.getPromptForQuiz(department, topics, payload);
            const response = await this.openAIService.getChatCompletions(prompt);
            const parsedJSON = JSON.parse(response);
            return parsedJSON['questions'];
        } catch (error) {
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
                explanation: question.explanation, // Ensure explanation is trimmed
                topic: question.topic || '', // Ensure topic is trimmed
            }));
            const count = await prisma.question_log_question.createMany({
                data: questionData,
                skipDuplicates: true, // Skip duplicates if any
            });

            if (count.count === 0) {
                throw new NotFoundException('No questions were saved');
            }
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async connectTopicsWithQuestionLog(topics: Topic[], questionLogId: number): Promise<number> {
        // Connect the topics with the question log
        // This is a placeholder function. Implement the actual logic to connect the topics with the question log.
        try {
            const prisma = await this.prisma$();
            const payload = topics.map(topic => ({
                question_log_id: questionLogId,
                topic_id: topic.id,
            }));
            const count = await prisma.question_log_topic.createMany({
                data: payload,
                skipDuplicates: true, // Skip duplicates if any
            });

            return count.count; // Return the number of connected topics
        } catch (error: any) {
            return throwException(error);
        }
    }

    private getPromptForQuiz(department: Department, topics: Topic[], payload: QuestionGeneratePayloadType): string {
        const topicNames = topics.map(topic => topic.name).join(', ');
        const prompt = `
            Generate ${payload.question_count} UNIQUE ${payload.difficulty}-level multiple choice quiz 
            questions about ${topicNames} for ${department.name} department.
            
            **Requirements:**
            1. Each question must be **completely unique** (avoid repeating common quiz questions).
            2. Cover **different aspects and subtopics** of ${topicNames}.
            3. Include **some less common but still relevant concepts**.
            4. Vary question formats (**definition, scenario-based, comparison, etc.**).
            5. Provide a **clear and concise explanation** for why the correct answer is right.
            6. Ensure explanations are **instructive** (not just repeating the answer).

            **Response Format (JSON):**
            {
                "questions": [
                    {
                        "question": "The question text",
                        "options": ["Option A", "Option B", "Option C", "Option D"],
                        "answer": [1], // Index of correct option(s)
                        "question_type": "CHOICE" | "MULTIPLE_CHOICE",
                        "explanation": "A clear explanation of why the answer is correct."
                        "topic": "The topic of the question"
                    },
                    // More questions...
                ]
            }

            **Example:**
            {
                "questions": [
                    {
                        "question": "What is the capital of France?",
                        "options": ["London", "Berlin", "Paris", "Madrid"],
                        "answer": [2],
                        "question_type": "CHOICE",
                        "explanation": "Paris is the capital of France, a well-known fact in geography. London is the capital of the UK, Berlin is Germany's capital, and Madrid is Spain's capital."
                        "topic": "Geography"
                    },
                    {
                        "question": "Which of these are frontend frameworks?",
                        "options": ["React", "Angular", "Vue", "Django"],
                        "answer": [0, 1, 2],
                        "question_type": "MULTIPLE_CHOICE",
                        "explanation": "React, Angular, and Vue are all JavaScript frontend frameworks. Django, however, is a Python backend framework and does not belong in this list."
                        "topic": "frontend development"
                    }
                ]
            }

            **Now generate the requested questions about ${topicNames}:**
        `;
        return prompt;
    }

    private getParticipant() {
        // This method is not implemented in the original code.
        // Implement the logic to retrieve the participant from the request context.
        const participant = RequestContext.getParticipant();
        if (!participant) {
            throw new NotFoundException('Participant not found');
        }
        return participant;
    }

    private async updateQuizesTimer() {
        try {
            const prisma = await this.prisma$();
            const logs = await prisma.question_log.findMany({
                where: {
                    completed: false, // Only update incomplete logs
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
                    await prisma.question_log.updateMany({
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
        } catch (error: any) {
            return throwException(error);

        }
    }

    private async checkOngoingQuiz(): Promise<boolean> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            const questionLog = await prisma.question_log.findFirst({
                where: {
                    participant: participant?.id,
                    completed: false, // Ensure the participant does not have an ongoing quiz
                }
            });
            if (questionLog) {
                throw new BadRequestException('You already have an ongoing quiz. Please complete it before starting a new one.');
            }
            return false;
        } catch (error) {
            return throwException(error);
        }
    }
}