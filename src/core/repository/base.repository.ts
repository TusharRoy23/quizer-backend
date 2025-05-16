import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IDatabaseService } from "../interface/IDatabase.service";

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
}