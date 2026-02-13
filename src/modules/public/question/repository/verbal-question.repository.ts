import { inject, injectable } from "inversify";
import { IVerbalQuestionRepository } from "../interface/IVerbalQuestion.repository";
import { NotFoundException, throwException } from "../../../../shared/errors/all.exception";
import { IOpenAIService } from "../../../../core/openai/interface/IOpenAI.service";
import { IDepartmentService } from "../../department/interface/IDepartment.service";
import { TYPES } from "../../../../core/type.core";
import { QuestionLogPayloadType } from "../../../../shared/utils/types";
import { Prisma } from "@prisma/client";
import { Department, OralQuestion, PaginationParams, PaginationResponse, QuestionLog, QuizTimer, Topic } from "../../types/public.type";
import { IS3Service } from "../../../../core/interface/IS3.service";
import { VerbalQuestionGeneratePayloadType } from "../dto/verbal-question-generate-payload.dto";
import { BaseQuestionRepository } from "./base-question.repository";

@injectable()
export class VerbalQuestionRepository extends BaseQuestionRepository implements IVerbalQuestionRepository {
    constructor(
        @inject(TYPES.IOpenAIService) readonly openAIService: IOpenAIService,
        @inject(TYPES.IDepartmentService) readonly departmentService: IDepartmentService,
        @inject(TYPES.IS3Service) private readonly s3Service: IS3Service
    ) {
        super();
    }

    public async generateVerbalQuestion(payload: VerbalQuestionGeneratePayloadType): Promise<string> {
        try {
            const participant = this.getParticipant();
            await this.isMoreQuizAllowed(true);
            await this.checkPromptInProgress();
            const questionLog = await this.getOngoingQuiz();
            if (questionLog) {
                return questionLog.uuid; // Return existing ongoing quiz UUID
            }

            const department = await this.departmentService.getDepartmentByUUID(payload.department);
            if (!department) {
                throw new NotFoundException('Department not found');
            }

            const topics = await this.departmentService.getTopicsByUUIDsAndDepartmentUUID(payload.topics, payload.department);
            if (!topics || topics.length === 0) {
                throw new NotFoundException('Topics not found');
            }

            /*
                Default value for timer & question_count payload
                timer: 1
                question_count: 5
            */
            const timer = 1;
            const question_count = 5;

            const questionPayload: QuestionLogPayloadType = {
                department: department?.id,
                participant: participant?.id,
                timer: timer * question_count,
                question_count: question_count,
                difficulty: payload.difficulty,
                is_oral: true
            };

            const result = await this.prisma$.$transaction(async (tx: Prisma.TransactionClient) => {
                const savedQuestionLog = await this.saveQuestionLog(questionPayload, tx);
                await this.connectTopicsWithQuestionLog(topics, savedQuestionLog.id, tx);
                return savedQuestionLog;
            });
            const promptResponse = await this.getPromptQuestions(payload, department, topics, question_count);
            await this.saveQuestions(promptResponse, result.id, timer);
            return result.uuid; // Return the UUID of the question log
        } catch (error) {
            return throwException(error);
        }
    }

    public async getGeneratedVerbalQuestions(questionLogUUID: string): Promise<OralQuestion[]> {
        try {

            const participant = this.getParticipant();
            const questions = await this.prisma$.question_log_question.findMany({
                where: {
                    question_log: {
                        uuid: questionLogUUID,
                        completed: false,
                        participant: participant?.id,
                        is_oral: true
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });

            if (!questions || questions.length === 0) {
                throw new NotFoundException('Questions not found');
            }

            return questions.map((question: OralQuestion) => ({
                uuid: question.uuid,
                question: question.question,
                topic: question.topic || undefined,
                sub_topic: question.sub_topic || undefined,
                timer: question.oral_timer || 0
            })) || [];
        } catch (error) {
            return throwException(error);
        }
    }

    public async getVerbalQuizTimerByUUID(questionUUID: string): Promise<QuizTimer | null> {
        try {
            // setup the endtimer for the quiz
            const participant = this.getParticipant();

            const question = await this.prisma$.question_log_question.findUnique({
                where: {
                    question_log: {
                        completed: false,
                        participant: participant?.id,
                        is_oral: true
                    },
                    uuid: questionUUID,
                    is_transcribed: false
                },
                include: {
                    question_log: true
                }
            });

            if (!question) {
                return null;
            }

            let questionLog = question.question_log;
            if (!questionLog?.end_time) {
                questionLog = await this.updateQuizTimer(questionLog.uuid);
            }

            let oral_end_time = question.oral_end_time;

            if (!question.oral_end_time) {
                const updatedQuestion = await this.updateVerbalQuestionEndTime(question, question.oral_timer || 0);
                oral_end_time = updatedQuestion.oral_end_time;
            }

            // get remaining time
            // Get current server time
            const now = new Date();
            const endTime = new Date(oral_end_time);

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
        } catch (error) {
            return throwException(error);
        }
    }

    public async transcribeAudio(audio: Express.Multer.File, questionUUID: string): Promise<boolean> {
        try {
            const participant = this.getParticipant();

            const question = await this.prisma$.question_log_question.findUnique({
                where: {
                    uuid: questionUUID,
                    is_transcribed: false,
                    is_oral: true,
                    audio_url: {
                        not: null
                    },
                    question_log: {
                        participant: participant?.id,
                        completed: false,
                        is_oral: true
                    }
                }
            });
            if (!question) {
                throw new NotFoundException('Question already transcribed or not found');
            }
            const transcription = await this.openAIService.getOpenAIAudioTranscription(audio);
            await this.prisma$.question_log_question.update({
                where: { uuid: questionUUID },
                data: {
                    is_transcribed: true,
                    oral_response: transcription
                }
            });
            //? Need to evalute the answer later
            if (question.audio_key) {
                this.deleteQuizAudioFromS3(question.audio_key || '');
            }

            return true;
        } catch (error) {
            return throwException(error);
        }
    }

    private async deleteQuizAudioFromS3(audioKey: string): Promise<void> {
        try {
            await this.s3Service.deleteAudioFile(audioKey);
        } catch (error) {
            return throwException(error);
        }
    }

    public async getVerbalQuizAudio(questionUUID: string): Promise<string | null> {
        try {
            const participant = this.getParticipant();

            const question = await this.prisma$.question_log_question.findUnique({
                where: {
                    uuid: questionUUID,
                    is_transcribed: false,
                    is_oral: true,
                    question_log: {
                        participant: participant?.id,
                        completed: false,
                        is_oral: true
                    }
                },
                include: {
                    question_log: true
                }
            });
            if (!question) {
                return null;
            }
            const audio = await this.openAIService.getOpenAITextToSpeech(question.question || '');
            const audioKey = this.s3Service.generateAudioKey(question.question_log.uuid);
            const url = await this.uploadToS3(audio as Buffer, audioKey, 'audio/mpeg');
            // await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 30 sec.

            // const url = "https://nomro-dev-s3-01.s3.ap-southeast-2.amazonaws.com/1758396014540.mp3";

            // update URL in DB
            await this.prisma$.question_log_question.update({
                where: { uuid: questionUUID },
                data: {
                    audio_url: url,
                    audio_key: 'audioKey'
                }
            });

            return url;
        } catch (error) {
            return throwException(error);
        }
    }

    public async submitVerbalLog(questionLogUUID: string): Promise<string> {
        try {
            const participant = this.getParticipant();

            const questionLog: QuestionLog = await this.prisma$.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    participant: participant?.id,
                    completed: false,
                    generated: true,
                    is_oral: true
                }
            });
            if (!questionLog) {
                throw new NotFoundException('Question log not found or already submitted');
            }
            await this.prisma$.question_log.update({
                where: {
                    uuid: questionLogUUID,
                    participant: participant?.id,
                    completed: false,
                    generated: true,
                    is_oral: true
                },
                data: {
                    completed: true
                }
            });
            if (!questionLog) {
                throw new NotFoundException('Question log not found or already submitted');
            }
            return questionLog.uuid;
        } catch (error) {
            return throwException(error);
        }
    }

    public async feedbackForVerbalQuestion(questionLogUUID: string): Promise<OralQuestion[] | null> {
        try {

            const participant = this.getParticipant();
            const questions = await this.prisma$.question_log_question.findMany({
                where: {
                    question_log: {
                        uuid: questionLogUUID,
                        completed: true,
                        participant: participant?.id,
                        is_oral: true
                    },
                    // is_transcribed: true,
                },
            });
            return questions.map((question: any) => ({
                uuid: question.uuid,
                question: question.question,
                oral_response: question.oral_response || undefined,
                topic: question.topic || undefined,
                sub_topic: question.sub_topic || undefined,
                expected_points: question.oral_expected_points || undefined,
            })) || [];
        } catch (error) {
            return throwException(error);
        }
    }

    public async getVerbalQuestionLogs(paginationParams: PaginationParams): Promise<PaginationResponse<QuestionLog>> {
        try {

            const participant = this.getParticipant();
            const { skip, take } = paginationParams;
            const condition = {
                participant: participant?.id,
                completed: true,
                is_oral: true
            }
            // Get total count for pagination metadata
            const total = await this.prisma$.question_log.count({
                where: condition,
            });
            const questionLogs = await this.prisma$.question_log.findMany({
                where: condition,
                orderBy: {
                    id: 'desc' // Order by ID in descending order
                },
                skip: skip,
                take: take,
            });

            const logs = questionLogs.map((questionLog: any) => ({
                department: questionLog.question_department,
                uuid: questionLog.uuid,
                difficulty: questionLog.difficulty,
                question_count: questionLog.question_count,
                created_at: questionLog.created_at,
            })) as QuestionLog[];

            return {
                data: logs,
                total: total
            }
        } catch (error) {
            return throwException(error);
        }
    }

    private async uploadToS3(buffer: Buffer, key: string, mimeType: string): Promise<string> {
        try {
            const result = await this.s3Service.uploadAudioFile(buffer, key, mimeType);
            return await this.s3Service.getSignedAudioUrl(result);
        } catch (error) {
            return throwException(error);
        }
    }

    private async updateVerbalQuestionEndTime(question: OralQuestion, timer: number): Promise<OralQuestion> {
        try {

            // Calculate end time in UTC
            const now = new Date();

            // Calculate end time in pure UTC (without local timezone conversion)
            const expiresAt = new Date(Date.now() + question.oral_timer * 60 * 1000);
            const expiresAtUTC = new Date(expiresAt.toISOString());

            const updatedQuestion = await this.prisma$.question_log_question.update({
                where: { uuid: question.uuid },
                data: {
                    oral_end_time: expiresAtUTC, // Store as UTC
                }
            });
            return updatedQuestion
        } catch (error) {
            return throwException(error);
        }
    }

    private async saveQuestions(questions: OralQuestion[], questionLogId: number, timer: number): Promise<void> {
        // Save the questions to the database
        // This is a placeholder function. Implement the actual logic to save the questions.
        try {

            const questionData = questions.map((question: OralQuestion) => ({
                question_log_id: questionLogId,
                question: question.question,
                question_type: 'ORAL',
                oral_expected_points: question.expected_points || [],
                is_oral: true,
                topic: question.topic || undefined, // Ensure topic is trimmed
                sub_topic: question.sub_topic || undefined, // Ensure sub_topic is trimmed
                oral_timer: timer
            }));
            await this.prisma$.$transaction(async (tx: Prisma.TransactionClient) => {
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
            });

        } catch (error: any) {
            this.deleteGeneratedQuestion(questionLogId);
            return throwException(error);
        }
    }

    private async getPromptQuestions(payload: VerbalQuestionGeneratePayloadType, department: Department, topics: Topic[], question_count: number): Promise<OralQuestion[]> {
        // Get the prompt questions from the DeepSeek
        // This is a placeholder function. Implement the actual logic to get the prompt questions.
        try {
            const prompt = this.getPromptForOralInterview(department, topics, payload, question_count);
            const response = await this.openAIService.getDeepSeekChatCompletions(prompt);
            const parsedJSON = JSON.parse(response);
            return parsedJSON['questions'];
        } catch (error) {
            return throwException(error);
        }
    }

    private getPromptForOralInterview(
        department: Department,
        topics: Topic[],
        payload: VerbalQuestionGeneratePayloadType,
        question_count: number
    ): string {
        const topicNames = topics.map((topic) => topic.name).join(", ");
        const uniquenessKey = Math.random().toString(36).substring(2, 8);

        const prompt = `
            Generate ${question_count} ${payload.difficulty} open-ended oral interview questions
            for ${department.name}, focusing on the following topics: ${topicNames}.
            Session ID: ${uniquenessKey}. Ensure originality and avoid repeating generic textbook questions.

            **Requirements:**
            - Cover multiple subtopics across ${topicNames} (balanced coverage).
            - Include: 1 scenario-based question, 1 misconception-revealing question, 1 advanced/critical-thinking question.
            - Vary question formats (conceptual, applied scenario, comparison, case-study, problem-solving).
            - Questions must be phrased naturally, as if an interviewer is asking verbally.

            **Format (JSON):**
            {
                "questions": [
                    {
                        "question": "text",
                        "question_type": "ORAL",
                        "topic": "topic name",
                        "sub_topic": "subtopic name",
                        "expected_points": ["key point 1", "key point 2"]
                    }
                ]
            }

            ** Example **
            {
                "questions": [
                    {
                        "question": "Can you explain how dependency injection works in Angular and why it is useful?",
                        "question_type": "ORAL",
                        "topic": "Angular",
                        "sub_topic": "Dependency Injection",
                        "expected_points": [
                            "Allows better modularity and testability",
                            "Provides services to components",
                            "Reduces tight coupling"
                        ]
                    }
                ]
            }

            ** Another Example **
            {
                "questions": [
                    {
                        "question": "Imagine a company is experiencing a high employee turnover rate. What HR strategies would you propose to address this issue?",
                        "question_type": "ORAL",
                        "topic": "Human Resources",
                        "sub_topic": "Employee Retention",
                        "expected_points": [
                            "Conduct surveys to identify root causes",
                            "Improve career development opportunities",
                            "Introduce better work-life balance policies"
                        ]
                    }
                ]
            }

            Generate the questions now.
        `;

        return prompt;
    }

}