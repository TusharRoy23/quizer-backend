import { PrismaClient } from "@prisma/client";

export interface IDatabaseService {
    readonly prisma: PrismaClient;
    disconnect(): Promise<void>;
    healthCheck(): Promise<boolean>;
}