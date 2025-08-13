import { inject } from "inversify";
import { Participant, User } from "../../types/public.type";
import { UserPayloadType } from "../dto/user-payload.dto";
import { IUserService } from "../interface/IUser.service";
import { TYPES } from "../../../../core/type.core";
import { IUserRepository } from "../interface/IUser.repository";
import { ParticipantPayloadType } from "../dto/participant-payload.dto";

export class UserService implements IUserService {
    constructor(
        @inject(TYPES.IUserRepository) readonly userRepository: IUserRepository,
    ) { }

    async createUser(payload: UserPayloadType): Promise<User> {
        return this.userRepository.createUser(payload);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.getUserByEmail(email);
    }

    async createParticipant(payload: ParticipantPayloadType): Promise<Participant | null> {
        return this.userRepository.createParticipant(payload);
    }

    async getParticipantByEmail(email: string): Promise<Participant | null> {
        return this.userRepository.getParticipantByEmail(email);
    }

    async generateSessionForParticipant(email: string): Promise<Participant> {
        return this.userRepository.generateSessionForParticipant(email);
    }
}