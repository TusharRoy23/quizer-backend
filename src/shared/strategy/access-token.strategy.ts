import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { Request } from "express";
import { IUserService } from "../../modules/public/user/interface/IUser.service";
import { TYPES } from "../../core/type.core";
import container from "../../core/container.core";

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "your_secret";

// ✅ Custom cookie extractor
const cookieExtractor = (req: Request): string | null => {
    return req?.cookies?.accessToken || null;
};

const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer token
        cookieExtractor                            // Cookie-based token
    ]),
    secretOrKey: JWT_SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done: VerifiedCallback) => {
    try {
        const userService = container.get<IUserService>(TYPES.IUserService);
        const user = await userService.getParticipantByEmail(jwt_payload.email);
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
}));

export default passport;
