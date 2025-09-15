import { controller, httpGet } from "inversify-express-utils";
import passport from "../../../../utils/google-oauth/passport";
import { NextFunction, Request, Response } from "express";
import { Participant } from "../../types/public.type";
import { generateToken } from "../../../../shared/utils/token-generation";
import AccessTokenStrategy from "../../../../shared/strategy/access-token.strategy";
import RefreshTokenStrategy from "../../../../shared/strategy/refresh-token.strategy";
import { inject } from "inversify";
import { TYPES } from "../../../../core/type.core";
import { IUserService } from "../interface/IUser.service";
import { SessionMiddleware } from "../../../../middlewares/session.middleware";

@controller("/user")
export class UserController {
    constructor(
        @inject(TYPES.IUserService) private readonly userService: IUserService
    ) { }

    @httpGet("/auth/google")
    public googleAuth(req: any, res: any, next: any) {
        passport.authenticate("google", {
            scope: ['profile', 'email'],
            prompt: "select_account"
        })(req, res, next);
    }

    @httpGet("/auth/check", SessionMiddleware)
    public async cookieAuth(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['accessToken'];
        // If no token exists
        if (!token) {
            return res.status(200).json({
                authenticated: false,
                user: null,
                expiredAt: 0
            });
        }

        // Verify the token manually using Promise wrapper
        return new Promise((resolve, reject) => {
            passport.authenticate("jwt", { session: false }, (err: any, user: any, info: any) => {
                if (err) {
                    return resolve(res.status(200).json({
                        authenticated: false,
                        user: null,
                        expiredAt: 0
                    }));
                }

                if (!user) {
                    return resolve(res.status(200).json({
                        authenticated: false,
                        user: null,
                        expiredAt: 0
                    }));
                }

                try {
                    const part = token.split('.')[1];
                    if (!part) {
                        return resolve(res.status(200).json({
                            authenticated: false,
                            user: null,
                            expiredAt: 0
                        }));
                    }

                    const payload = JSON.parse(Buffer.from(part, 'base64').toString('utf-8'));
                    const expTimeInMilliseconds = payload.exp * 1000;

                    return resolve(res.status(200).json({
                        authenticated: true,
                        user: user,
                        expiredAt: expTimeInMilliseconds
                    }));
                } catch (error) {
                    return resolve(res.status(200).json({
                        authenticated: false,
                        user: null,
                        expiredAt: 0
                    }));
                }
            })(req, res, next);
        });
    }

    @httpGet("/google/callback", passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}login?error=auth_failed`
    }))
    public async googleCallback(req: Request, res: Response, next: NextFunction) {
        const response = await this.addTokensToCookies(req, res);
        if (req.user) {
            const user = req.user as Participant;
            const participant = await this.userService.generateSessionForParticipant(user?.email);
            res.cookie("session", participant?.session_id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
            });
            res.cookie("email", participant?.email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
            });
        }

        return response.redirect(`${process.env.FRONTEND_URL}`);
    }

    @httpGet("/auth/refresh", RefreshTokenStrategy.authenticate("refresh", { session: false }), SessionMiddleware)
    public async refreshTokenHandler(req: Request, res: Response) {
        const response = await this.addTokensToCookies(req, res);
        return response.status(200).json({
            message: "Refreshed",
            authenticated: true,
            user: req.user,
            expiredAt: Date.now() + Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        });
    }

    @httpGet("/auth/logout", AccessTokenStrategy.authenticate("jwt", { session: false }))
    public async logout(req: Request, res: Response) {
        ["accessToken", "refreshToken", "session", "email"].forEach((cookieName) => {
            res.clearCookie(cookieName)
        });
        return res.status(200).json({
            message: "Logged out successfully",
            authenticated: false
        });
    }

    private async addTokensToCookies(req: Request, res: Response): Promise<Response> {
        const user = req.user as Participant;

        const accessToken = await generateToken(true, user);
        const refreshToken = await generateToken(false, user); // Optional rotation

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        });

        return res;
    }
}