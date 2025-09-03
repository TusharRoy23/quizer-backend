import { AsyncLocalStorage } from "async_hooks";
import { Participant } from "../../modules/public/types/public.type";

type Store = { participant: Participant };
export class RequestContext {
    private static als = new AsyncLocalStorage<Store>();

    static run(participant: Participant | null, callback: () => void) {
        if (participant) {
            this.als.run({ participant }, callback);
        } else {
            this.als.run({ participant: null as any }, callback);
        }
    }

    static getParticipant(): Participant | null {
        return this.als.getStore()?.participant ?? null;
    }
}
