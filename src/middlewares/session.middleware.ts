import { Request, Response, NextFunction } from "express";
import container from "../core/container.core";
import { IUserService } from "../modules/public/user/interface/IUser.service";
import { TYPES } from "../core/type.core";
import { BaseMiddleware } from "inversify-express-utils";
import { injectable } from "inversify";

@injectable()
export class SessionMiddleware extends BaseMiddleware {
    public async handler(req: Request, res: Response, next: NextFunction): Promise<any> {
        if (req?.cookies['email'] && req.cookies['session']) {
            const userService = container.get<IUserService>(TYPES.IUserService);
            const participant = await userService.getParticipantByEmail(req?.cookies['email']);

            if (participant?.session_id && req.cookies['session'] && (participant.session_id !== req.cookies['session'])) {
                return res.status(409).json({
                    success: false,
                    message: "Multiple logged In",
                });
            }
        }

        next();
    }
}