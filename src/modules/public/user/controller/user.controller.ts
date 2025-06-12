import { controller, httpGet } from "inversify-express-utils";
import passport from "../../../../utils/google-oauth/passport";
import { NextFunction, Request, Response } from "express";
import { Participant } from "../../types/public.type";

@controller("/user")
export class UserController {
    @httpGet("/auth/google")
    public googleAuth(req: any, res: any, next: any) {
        passport.authenticate("google", { scope: ['profile', 'email'] })(req, res, next);
    }

    @httpGet("/google/callback", passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:3000/login?error=auth_failed"
    }))
    public googleCallback(req: Request, res: Response, next: NextFunction) {
        const user = req.user as Participant;  // Cast if you have User type
        console.log('user: ', user);

        // const token = generateJwtToken(user);  // Your function
        return res.redirect(`http://localhost:3000/`);
    }
}