import { controller, httpGet } from "inversify-express-utils";
import passport from "../../../../utils/google-oauth/passport";
import { NextFunction, Request, Response } from "express";
import { Participant } from "../../types/public.type";
import { generateToken } from "../../../../shared/utils/token-generation";
import AccessTokenStrategy from "../../../../shared/strategy/access-token.strategy";
import RefreshTokenStrategy from "../../../../shared/strategy/refresh-token.strategy";

@controller("/user")
export class UserController {
    @httpGet("/auth/google")
    public googleAuth(req: any, res: any, next: any) {
        passport.authenticate("google", { scope: ['profile', 'email'] })(req, res, next);
    }

    @httpGet("/auth/check", AccessTokenStrategy.authenticate("jwt", { session: false }))
    public cookieAuth(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['accessToken'];
        if (!token) return res.status(401).json({ authenticated: false });

        const part = token.split('.')[1];
        if (!part) return res.status(400).json({ error: 'Invalid token' });
        const payload = JSON.parse(Buffer.from(part, 'base64').toString('utf-8'));
        const expTimeInMilliseconds = payload.exp * 1000;

        return res.status(200).json({
            authenticated: true,
            user: req.user,
            expiredAt: expTimeInMilliseconds
        });
    }

    @httpGet("/google/callback", passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}login?error=auth_failed`
    }))
    public async googleCallback(req: Request, res: Response, next: NextFunction) {
        const response = await this.addTokensToCookies(req, res);
        return response.redirect(`${process.env.FRONTEND_URL}`);
    }

    @httpGet("/auth/refresh", RefreshTokenStrategy.authenticate("refresh", { session: false }))
    public async refreshTokenHandler(req: Request, res: Response) {
        const response = await this.addTokensToCookies(req, res);
        return response.status(200).json({
            message: "Refreshed",
            authenticated: true,
            user: req.user,
            expiredAt: Date.now() + Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        });
    }

    private async addTokensToCookies(req: Request, res: Response): Promise<Response> {
        const user = req.user as Participant;

        const accessToken = await generateToken(true, user);
        const refreshToken = await generateToken(false, user); // Optional rotation

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        });

        return res;
    }

}