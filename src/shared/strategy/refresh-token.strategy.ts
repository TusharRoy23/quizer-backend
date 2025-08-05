import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import passport from "passport";
import { Request } from "express";
import { IUserService } from "../../modules/public/user/interface/IUser.service";
import { TYPES } from "../../core/type.core";
import container from "../../core/container.core";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "your_refresh_secret";

const refreshTokenExtractor = (req: Request): string | null => {
    return req.cookies?.refreshToken || null;
};

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([refreshTokenExtractor]),
    secretOrKey: JWT_REFRESH_SECRET,
    passReqToCallback: true as const, // Explicitly set to true for correct type
};

passport.use("refresh", new JwtStrategy(
    opts,
    async (req: Request, payload: any, done: VerifiedCallback) => {
        try {
            const userService = container.get<IUserService>(TYPES.IUserService);
            const user = await userService.getParticipantByEmail(payload.email);
            if (user) {
                if (user.created_at !== undefined) {
                    (user as any).created_at = undefined; // Remove created_at if it exists
                }
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }
));

export default passport;
