import { inject } from "inversify";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { TYPES } from "../../../../core/type.core";
import { Participant, User } from "../../types/public.type";
import { UserPayloadType } from "../dto/user-payload.dto";
import { IUserRepository } from "../interface/IUser.repository";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { ParticipantPayloadType } from "../dto/participant-payload.dto";

export class UserRepository extends BaseRepository implements IUserRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
    ) {
        super(databaseService);
    }

    async createUser(payload: UserPayloadType): Promise<User> {
        try {
            const prisma = await this.prisma$();
            const user = await prisma.user.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    created_at: new Date(),
                }
            });
            return user as User;
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const prisma = await this.prisma$();
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            });

            if (!user) {
                return null;
            }
            return user as User;
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }

    async createParticipant(payload: ParticipantPayloadType): Promise<Participant | null> {
        try {
            const prisma = await this.prisma$();
            const participant = await prisma.participant.create({
                data: {
                    name: payload.name,
                    email: payload.email,
                    created_at: new Date(),
                }
            });
            return participant as Participant;
        } catch (error) {
            throw new Error('Failed to create Participant');
        }
    }

    async getParticipantByEmail(email: string): Promise<Participant | null> {
        try {
            const prisma = await this.prisma$();
            const participant = await prisma.participant.findFirst({
                where: {
                    email: email
                }
            });

            if (!participant) {
                return null;
            }
            return participant as Participant;
        } catch (error) {
            console.log('error: ', error);
            throw new Error('Failed to fetch Participant');
        }
    }
}