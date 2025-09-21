import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IDatabaseService } from "../interface/IDatabase.service";
import { RequestContext } from "../../shared/context/request-context";
import { NotFoundException } from "../../shared/errors/all.exception";

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
}