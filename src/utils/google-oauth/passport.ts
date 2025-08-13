import passport from 'passport';
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
// import { UserService } from '../../modules/public/user/service/user.service';
import container from '../../core/container.core';
import { TYPES } from '../../core/type.core';
import { IUserService } from '../../modules/public/user/interface/IUser.service';

// Use the correct types for serializeUser/deserializeUser
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: process.env.GOOGLE_AUTH_REDIRECT_URL,
            passReqToCallback: false,
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            // Yes, you can import and use your createParticipent function here.
            // Example (adjust the import path as needed):

            try {
                const userService = container.get<IUserService>(TYPES.IUserService);
                const { id, displayName, emails } = profile;
                if (!(id && displayName && emails)) done(null, false);

                // Call your createParticipent function with relevant data from the Google profile
                const user = await userService.createParticipant({
                    googleId: id,
                    name: displayName,
                    email: emails?.[0]?.value || '',
                    // Add other fields as needed
                });
                done(null, user || false);
            } catch (error) {
                done(error, false);
            }
            // return done(null, profile);
        }
    )
);

passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((obj: Express.User, done) => {
    done(null, obj);
});

export default passport;