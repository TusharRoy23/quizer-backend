import { inject, injectable } from "inversify";
import { Prisma } from "@prisma/client";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BadRequestException, NotFoundException, throwException } from "../../../../shared/errors/all.exception";
import { QuestionLogPayloadType } from "../../../../shared/utils/types";
import { Department, Question, QuestionLog, QuestionLogQuestion, Topic, TopicScore } from "../../types/public.type";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { TYPES } from "../../../../core/type.core";

@injectable()
export abstract class BaseQuestionRepository extends BaseRepository {

    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService
    ) {
        super(databaseService);
    }

    protected async saveQuestionLog(payload: QuestionLogPayloadType, tx: Prisma.TransactionClient): Promise<QuestionLog> {
        // Save the question log to the database
        // This is a placeholder function. Implement the actual logic to save the question log.
        try {
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset(); // Minutes from UTC
            const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const questionLog = await tx.question_log.create({
                data: {
                    ...payload,
                    timezone_name: timezoneName,
                    timezone_offset: timezoneOffset,
                    completed: false,
                    generated: false
                }
            });
            return questionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    protected async updateQuizTimer(questionLogUUID: string): Promise<QuestionLog | undefined> {
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
            const timezoneOffset = questionLog.timezone_offset ? questionLog.timezone_offset : now.getTimezoneOffset(); // Minutes from UTC
            const timezoneName = questionLog.timezone_name ? questionLog.timezone_name : Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Calculate end time in pure UTC (without local timezone conversion)
            const expiresAt = new Date(Date.now() + questionLog.timer * 60 * 1000);
            const expiresAtUTC = new Date(expiresAt.toISOString());

            const questionUpdatedLog = await prisma.question_log.update({
                where: { uuid: questionLogUUID },
                data: {
                    end_time: expiresAtUTC, // Store as UTC
                    timezone_offset: timezoneOffset,
                    timezone_name: timezoneName,
                    generated: true
                }
            });
            return questionUpdatedLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    protected async connectTopicsWithQuestionLog(topics: Topic[], questionLogId: number, tx: Prisma.TransactionClient): Promise<number> {
        // Connect the topics with the question log
        // This is a placeholder function. Implement the actual logic to connect the topics with the question log.
        try {
            const payload = topics.map(topic => ({
                question_log_id: questionLogId,
                topic_id: topic.id,
            }));
            const count = await tx.question_log_topic.createMany({
                data: payload,
                skipDuplicates: true, // Skip duplicates if any
            });

            return count.count; // Return the number of connected topics
        } catch (error: any) {
            return throwException(error);
        }
    }

    protected async checkPromptInProgress(): Promise<boolean> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            const questionLog = await prisma.question_log.findFirst({
                where: {
                    participant: participant?.id,
                    generated: false, // Ensure the participant does not have a quiz in generation process
                }
            });
            if (questionLog) {
                throw new BadRequestException('Your previous quiz is still being generated. \nPlease wait a moment before starting a new one.');
            }
            return false;
        } catch (error) {
            return throwException(error);
        }
    }

    protected async getOngoingQuiz(): Promise<QuestionLog | null> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            const questionLog = await prisma.question_log.findFirst({
                where: {
                    participant: participant?.id,
                    completed: false, // Ensure the participant does not have an ongoing quiz,
                    generated: true
                }
            });
            return questionLog || null;
        } catch (error) {
            return throwException(error);
        }
    }

    protected async deleteGeneratedQuestion(questionLogId: number) {
        try {
            const prisma = await this.prisma$();
            // delete quesstion log & connected data
            await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                await tx.question_log_topic.deleteMany({
                    where: {
                        question_log_id: questionLogId,
                    }
                });
                await tx.question_log.delete({
                    where: {
                        id: questionLogId,
                    }
                });
            });
        } catch (error) {
            return throwException(error);
        }
    }

    protected async isMoreQuizAllowed(is_oral: boolean = false): Promise<boolean> {
        try {
            const prisma = await this.prisma$();
            const participant = this.getParticipant();
            const questionLog = await prisma.question_log.findFirst({
                where: {
                    is_oral,
                    participant: participant?.id,
                    timezone_name: {
                        not: null
                    }
                },
                orderBy: {
                    id: 'desc'
                }
            });

            const now = new Date();
            const timezoneOffset = questionLog?.timezone_offset ? questionLog.timezone_offset : now.getTimezoneOffset(); // Minutes from UTC
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000 + (timezoneOffset * 60 * 1000));

            const quizCount = await prisma.question_log.count({
                where: {
                    is_oral,
                    participant: participant?.id,
                    created_at: {
                        gte: twentyFourHoursAgo
                    }
                }
            });

            const oral_quiz_count = participant?.oral_quiz_restriction_count || 0;
            const quiz_count = participant?.quiz_restriction_count || 0;
            const errMsg = "Max limit crossed for 24hrs.";
            if (is_oral && oral_quiz_count && quizCount > oral_quiz_count) {
                throw new BadRequestException(errMsg)
            }

            if (!is_oral && quiz_count && quizCount > quiz_count) {
                throw new BadRequestException(errMsg)
            }

            return true;
        } catch (error) {
            return throwException(error);
        }
    }

    protected async getDepartmentByUUID(uuid: string): Promise<Department | null> {
        try {
            const prisma = await this.prisma$();
            const department = await prisma.department.findFirst({
                where: {
                    uuid: uuid
                }
            });

            if (!department) {
                throw new NotFoundException('Department not found');
            }

            return department as Department;
        } catch (error) {
            return throwException(error);
        }
    }

    protected async getTopicsByUUIDsAndDepartmentUUID(uuids: Array<string>, departmentUuid: string, is_global: boolean = true): Promise<Topic[] | null> {
        try {
            const prisma = await this.prisma$();
            const topics = await prisma.topic.findMany({
                where: {
                    uuid: {
                        in: uuids
                    },
                    department_topic_departmentTodepartment: {
                        uuid: departmentUuid
                    }
                },
            });

            if (!topics || topics.length === 0) {
                throw new NotFoundException('Topics not found');
            }

            return topics as Topic[];
        } catch (error) {
            return throwException(error);
        }
    }

    protected async getScoresByTopics(topics: Topic[]): Promise<TopicScore[]> {
        try {
            const prisma = await this.prisma$();
            const participant = await this.getParticipant();
            const result: TopicScore[] = await prisma.topic_score.findMany({
                where: {
                    participant_id: participant?.id,
                    topic_id: {
                        in: topics.map(topic => topic.id)
                    }
                },
                include: {
                    topic: true
                }
            });
            return result;
        } catch (error) {
            return throwException(error);
        }
    }

    protected async getQuestionDetails(questionUUID: string): Promise<Question> {
        try {
            const prisma = await this.prisma$();
            const question = await prisma.question_log_question.findUnique({
                where: {
                    uuid: questionUUID,
                    is_oral: false
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

    protected async getQuestionLogByQuestionUUID(questionUUID: string): Promise<QuestionLogQuestion | null> {
        try {
            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log_question.findUnique({
                where: {
                    uuid: questionUUID,
                    is_oral: false
                },
                include: {
                    question_log: {
                        include: {
                            topics: {
                                select: {
                                    topic: true
                                }
                            },
                            question_department: true
                        }
                    }
                }
            });

            return {
                question_log: {
                    ...questionLog.question_log,
                    department: questionLog?.question_log?.question_department as Department,
                    topics: questionLog?.question_log?.topics?.map((t: any) => t?.topic) as Topic[]
                },
                question: { ...questionLog }
            } as QuestionLogQuestion;
        } catch (error: any) {
            return throwException(error);
        }
    }

    protected wrapReadableStream(
        baseStream: ReadableStream<Uint8Array>,
        options?: {
            onComplete?: (fullText: string) => Promise<void> | void; // callback when stream ends
            onErrorText?: string; // fallback message if error
        }
    ): ReadableStream<Uint8Array> {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let fullContent = "";

        return new ReadableStream({
            async start(controller) {
                try {
                    const reader = baseStream.getReader();

                    while (true) {
                        const { done, value } = await reader.read();

                        if (done) {
                            if (options?.onComplete && fullContent.trim()) {
                                await options.onComplete(fullContent.trim());
                            }
                            controller.close();
                            break;
                        }

                        const chunk = decoder.decode(value, { stream: true });
                        fullContent += chunk;

                        controller.enqueue(encoder.encode(chunk));
                    }
                } catch (error) {
                    const errorMsg = options?.onErrorText ?? "Error generating response. Please try again.";
                    controller.enqueue(encoder.encode(errorMsg));
                    controller.close();
                }
            }
        });
    }

    protected returnErrorStream(): ReadableStream {
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