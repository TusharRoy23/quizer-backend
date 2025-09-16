import { inject, injectable } from "inversify";
import { IVerbalQuestionRepository } from "../interface/IVerbalQuestion.repository";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { NotFoundException, throwException } from "../../../../shared/errors/all.exception";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { IOpenAIService } from "../../../../core/openai/interface/IOpenAI.service";
import { IDepartmentService } from "../../department/interface/IDepartment.service";
import { TYPES } from "../../../../core/type.core";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { QuestionLogPayloadType } from "../../../../shared/utils/types";
import { Prisma } from "@prisma/client";
import { Department, OralQuestion, QuizTimer, Topic } from "../../types/public.type";

@injectable()
export class VerbalQuestionRepository extends BaseRepository implements IVerbalQuestionRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IOpenAIService) readonly openAIService: IOpenAIService,
        @inject(TYPES.IDepartmentService) readonly departmentService: IDepartmentService,
    ) {
        super(databaseService);
    }

    public async generateVerbalQuestion(payload: QuestionGeneratePayloadType): Promise<string> {
        try {
            const participant = this.getParticipant();
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

            const questionPayload: QuestionLogPayloadType = {
                department: department?.id,
                participant: participant?.id,
                timer: payload.timer * payload.question_count,
                question_count: payload.question_count,
                difficulty: payload.difficulty,
                is_oral: true
            };
            const prisma = await this.prisma$();
            const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                const savedQuestionLog = await this.saveQuestionLog(questionPayload, tx);
                await this.connectTopicsWithQuestionLog(topics, savedQuestionLog.id, tx);
                return savedQuestionLog;
            });
            const promptResponse = await this.getPromptQuestions(payload, department, topics);
            await this.saveQuestions(promptResponse, result.id, payload.timer);
            return result.uuid; // Return the UUID of the question log
        } catch (error) {
            return throwException(error);
        }
    }

    public async getGeneratedVerbalQuestions(questionLogUUID: string): Promise<OralQuestion[]> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            const questions = await prisma.question_log_question.findMany({
                where: {
                    question_log: {
                        uuid: questionLogUUID,
                        completed: false,
                        participant: participant?.id // Ensure the question log belongs to the participant
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });

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

    public async getVerbalQuizTimerByUUID(questionUUID: string): Promise<QuizTimer> {
        try {
            // setup the endtimer for the quiz
            const participant = this.getParticipant();
            const prisma = await this.prisma$();
            const question = await prisma.question_log_question.findUnique({
                where: {
                    question_log: {
                        completed: false,
                        participant: participant?.id,
                        is_oral: true
                    },
                    uuid: questionUUID
                },
                include: {
                    question_log: true
                }
            });

            if (!question) {
                throw new NotFoundException('Question not found');
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

    private async updateVerbalQuestionEndTime(question: OralQuestion, timer: number): Promise<OralQuestion> {
        try {
            const prisma = await this.prisma$();
            // Calculate end time in UTC
            const now = new Date();

            // Calculate end time in pure UTC (without local timezone conversion)
            const expiresAt = new Date(Date.now() + question.oral_timer * 60 * 1000);
            const expiresAtUTC = new Date(expiresAt.toISOString());

            const updatedQuestion = await prisma.question_log_question.update({
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
            const prisma = await this.prisma$();
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
            });

        } catch (error: any) {
            this.deleteGeneratedQuestion(questionLogId);
            return throwException(error);
        }
    }

    private async getPromptQuestions(payload: QuestionGeneratePayloadType, department: Department, topics: Topic[]): Promise<OralQuestion[]> {
        // Get the prompt questions from the DeepSeek
        // This is a placeholder function. Implement the actual logic to get the prompt questions.
        try {
            const prompt = this.getPromptForOralInterview(department, topics, payload);
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
        payload: QuestionGeneratePayloadType
    ): string {
        const topicNames = topics.map((topic) => topic.name).join(", ");
        const uniquenessKey = Math.random().toString(36).substring(2, 8);

        const prompt = `
            Generate ${payload.question_count} ${payload.difficulty} open-ended oral interview questions
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