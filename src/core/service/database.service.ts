import { injectable } from "inversify";
import { PrismaClient } from "../../../generated/prisma/client";
import { IDatabaseService } from "../interface/IDatabase.service";

@injectable()
export class DatabaseService implements IDatabaseService {
    public readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({
            log: process.env.NODE_ENV === "development"
                ? ["query", "info", "warn", "error"]
                : ["warn", "error"],
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                },
            },
        }).$extends({
            query: {
                $allModels: {
                    findMany: async ({ args, query }: { args: any, query: (args: any) => Promise<any[]> }) => {
                        /*
                            * Modifying the response
                        */
                        const results = await query(args);
                        return results;
                    },
                    findFirst: async ({
                        model,
                        operation,
                        args,
                        query
                    }: {
                        model: string;
                        operation: string;
                        args: any;
                        query: (args: any) => Promise<any>;
                    }) => {
                        /*
                            * Modifying the response
                        */
                        const result = await query(args);
                        return result;
                    }
                }
            }
        }) as PrismaClient;
    }

    public async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }

    public async healthCheck(): Promise<boolean> {
        try {
            await this.prisma.$queryRaw`SELECT 1`;
            return true;
        } catch {
            return false;
        }
    }
}