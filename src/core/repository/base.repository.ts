import { injectable } from "inversify";
import { Prisma, PrismaClient } from "@prisma/client";
import { IDatabaseService } from "../interface/IDatabase.service";
import { RequestContext } from "../../shared/context/request-context";
import { BadRequestException, NotFoundException, throwException } from "../../shared/errors/all.exception";
import { QuestionLog, Topic } from "../../modules/public/types/public.type";
import { QuestionLogPayloadType } from "../../shared/utils/types";

@injectable()
export abstract class BaseRepository {
    protected prisma: PrismaClient;

    constructor(
        protected databaseService: IDatabaseService
    ) { }

    protected async prisma$(): Promise<PrismaClient> {
        if (!this.prisma) {
            this.prisma = await this.databaseService.getPrismaClient();
        }
        return this.prisma;
    }

    protected getParticipant() {
        // Implement the logic to retrieve the participant from the request context.
        const participant = RequestContext.getParticipant();
        if (!participant) {
            throw new NotFoundException('Participant not found');
        }
        return participant;
    }

    protected async saveQuestionLog(payload: QuestionLogPayloadType, tx: Prisma.TransactionClient): Promise<QuestionLog> {
        // Save the question log to the database
        // This is a placeholder function. Implement the actual logic to save the question log.
        try {
            const questionLog = await tx.question_log.create({
                data: {
                    ...payload,
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
}