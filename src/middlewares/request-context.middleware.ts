import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { RequestContext } from "../shared/context/request-context";
import { Participant } from "../modules/public/types/public.type";

@injectable()
export class RequestContextMiddleware extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction): void {
        const participant = req.user as Participant | null;

        RequestContext.run(participant, () => {
            res.on("finish", () => {
                // ALS automatically clears when the request completes,
                // so no need for explicit cleanup here.
            });

            next();
        });
    }
}
