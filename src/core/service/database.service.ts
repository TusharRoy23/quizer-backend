import { injectable } from "inversify";
import { PrismaClient } from "../../../generated/prisma/client";
import { IDatabaseService } from "../interface/IDatabase.service";

@injectable()
export class DatabaseService implements IDatabaseService {
    private static prisma: PrismaClient;
    private static isConnected = false;

    constructor() {
        if (!DatabaseService.prisma) {
            DatabaseService.prisma = new PrismaClient({
                log: process.env.NODE_ENV === 'development'
                    ? ['query', 'info', 'warn', 'error']
                    : ['warn', 'error'],
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL // Explicitly use env var
                    }
                }
            }).$extends({
                query: {
                    $allModels: {
                        findMany: async ({ model, operation, args, query }) => {
                            const results = await query(args);
                            results.map(result => delete result.id);

                            return results;
                        },
                        findFirst: async ({ model, operation, args, query }) => {
                            const result = await query(args);
                            if (result) {
                                delete result.id;
                            }
                            return result;
                        }
                    }
                }
            }) as PrismaClient;
        }
    }

    public async getPrismaClient(): Promise<PrismaClient> {
        if (!DatabaseService.prisma) {
            throw new Error("Prisma client not initialized!");
        }

        if (!DatabaseService.isConnected) {
            try {
                await DatabaseService.prisma.$connect();
                DatabaseService.isConnected = true;
            } catch (error) {
                throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
            }
        }

        return DatabaseService.prisma;
    }

    public async disconnect(): Promise<void> {
        if (DatabaseService.prisma && DatabaseService.isConnected) {
            await DatabaseService.prisma.$disconnect();
            DatabaseService.isConnected = false;
        }
    }

    public async healthCheck(): Promise<boolean> {
        try {
            const client = await this.getPrismaClient();
            await client.$queryRaw`SELECT 1`;
            return true;
        } catch {
            return false;
        }
    }
}