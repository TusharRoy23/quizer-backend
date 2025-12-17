import cors from "cors";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/container.core";
import { responseWrapper } from "./middlewares/response-wrapper";
import { HttpStatusCode } from "./shared/utils/enum";
import passport from "./utils/google-oauth/passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./shared/errors/error-handler";

export const server = new InversifyExpressServer(container);
const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)

        const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 60 requests per windowMs
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests. Stop spamming us!', // Custom message
    statusCode: HttpStatusCode.TOO_MANY_REQUESTS, // Use the custom status
})

server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(responseWrapper);
    app.use(cors(corsOptions));
    app.use(rateLimiter);
    app.use(cookieParser());
    app.use(session({ secret: process.env.PASSPORT_SECRET || '', resave: true, saveUninitialized: true }));
    //? passport for google oauth
    app.use(passport.initialize());
    app.use(passport.session());
});



server.setErrorConfig(app => {
    app.use(errorHandler);
});