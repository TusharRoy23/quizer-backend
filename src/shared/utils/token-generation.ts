import { sign } from "jsonwebtoken";
import { Participant } from "../../modules/public/types/public.type";

export const generateToken = async (isAccessToken: boolean, participant: Participant): Promise<string> => {
    const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET || 'anyKey';
    const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET || 'anyRefreshKey';
    const jwtAccessTokenExpirationTime = Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) || 90000;
    const jwtRefreshTokenExpirationTime = Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) || 180000;
    const jwtSecret = isAccessToken ? jwtAccessTokenSecret : jwtRefreshTokenSecret;
    const jwtExpirationTime = isAccessToken ? jwtAccessTokenExpirationTime : jwtRefreshTokenExpirationTime;
    return sign(
        { id: participant.google_id, email: participant.email },
        jwtSecret,
        { expiresIn: `${jwtExpirationTime}Milliseconds` }
    );
};