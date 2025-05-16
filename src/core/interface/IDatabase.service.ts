import { PrismaClient } from "@prisma/client";

export interface IDatabaseService {
    getPrismaClient(): Promise<PrismaClient>;
    disconnect(): Promise<void>;
    healthCheck(): Promise<boolean>;
}