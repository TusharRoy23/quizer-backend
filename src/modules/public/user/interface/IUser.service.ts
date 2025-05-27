import { Participant, User } from "../../types/public.type";
import { ParticipantPayloadType } from "../dto/participant-payload.dto";
import { UserPayloadType } from "../dto/user-payload.dto";

export interface IUserService {
    createUser(payload: UserPayloadType): Promise<User>;
    getUserByEmail(email: string): Promise<User | null>;
    createParticipant(payload: ParticipantPayloadType): Promise<Participant | null>;
    getParticipantByEmail(email: string): Promise<Participant | null>;
}