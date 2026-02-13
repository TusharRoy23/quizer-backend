import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { IDatabaseService } from "../interface/IDatabase.service";
import { RequestContext } from "../../shared/context/request-context";
import { NotFoundException } from "../../shared/errors/all.exception";
import { TYPES } from "../type.core";

/*
    * abstract- It is provided to make sure that no one can create an instance of this class directly.
    const baseRepository = new BaseRepository(); // This will throw an error because BaseRepository is abstract.
*/
@injectable()
export abstract class BaseRepository {
    @inject(TYPES.IDatabaseService)
    protected databaseService!: IDatabaseService;

    protected get prisma$(): PrismaClient {
        return this.databaseService.prisma;
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