import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { RequestContext } from "../shared/context/request-context";
import { Participant } from "../modules/public/types/public.type";

@injectable()
export class RequestContextMiddleware extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction): void {
        if (req.user) {
            RequestContext.setParticipant(req.user as Participant);
        }

        res.on("finish", () => {
            RequestContext.clear();
        });

        next();
    }
}
