import { Participant } from "../../modules/public/types/public.type";

export class RequestContext {
    private static participant: Participant | null;

    static setParticipant(participant: Participant) {
        this.participant = participant;
    }

    static getParticipant(): Participant | null {
        return this.participant || null;
    }

    static clear() {
        this.participant = null;
    }
}
