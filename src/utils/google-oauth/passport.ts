import passport from 'passport';
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../../modules/public/user/service/user.service';
import container from '../../core/container.core';

const userService = container.resolve(UserService);

// Use the correct types for serializeUser/deserializeUser
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: '/auth/google/callback',
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
                const { id, displayName, emails } = profile;
                if (!(id && displayName && emails)) return done(null, false);

                // Call your createParticipent function with relevant data from the Google profile
                const user = await userService.createParticipant({
                    googleId: id,
                    name: displayName,
                    email: emails?.[0]?.value,
                    // Add other fields as needed
                });
                return done(null, user || false);
            } catch (error) {
                return done(error);
            }
            return done(null, profile);
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