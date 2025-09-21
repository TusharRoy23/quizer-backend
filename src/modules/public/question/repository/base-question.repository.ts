import { injectable } from "inversify";
import { Prisma, PrismaClient } from "@prisma/client";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BadRequestException, throwException } from "../../../../shared/errors/all.exception";
import { QuestionLogPayloadType } from "../../../../shared/utils/types";
import { QuestionLog, Topic } from "../../types/public.type";
import { BaseRepository } from "../../../../core/repository/base.repository";

@injectable()
export abstract class BaseQuestionRepository extends BaseRepository {
    protected prisma: PrismaClient;

    constructor(
        protected databaseService: IDatabaseService
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
            const timezoneOffset = questionLog.timezone_offset ? questionLog.timezone_offset : now.getTimezoneOffset(); // Minutes from UTC
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
}