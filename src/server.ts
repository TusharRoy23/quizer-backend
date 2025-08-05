import cors from "cors";
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/container.core";
import { responseWrapper } from "./middlewares/response-wrapper";
import { NotFoundException, BadRequestException, InternalServerErrorException, UnauthorizedException, ConflictException, ForbiddenException, MethodNotAllowedException, RequestTimeoutException, TooManyRequestsException } from "./shared/errors/all.exception";
import { HttpStatusCode } from "./shared/utils/enum";
import passport from "./utils/google-oauth/passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

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
    max: 60, // Limit each IP to 60 requests per windowMs
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

const errorResponse = (req: Request, res: Response, message: string, statusCode: any, error?: any) => {
    return res.status(statusCode).json({
        statusCode: statusCode,
        success: false,
        message: message,
        error: error || []
    });
}

// Error-handling middleware
const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof NotFoundException) {
        errorResponse(req, res, error.message, HttpStatusCode.NOT_FOUND);
        return;
    }

    if (error instanceof BadRequestException) {
        errorResponse(req, res, error.message, HttpStatusCode.BAD_REQUEST, error.validationErrors);
        return;
    }

    if (error instanceof InternalServerErrorException) {
        errorResponse(req, res, error.message, HttpStatusCode.INTERNAL_SERVER);
        return;
    }

    if (error instanceof UnauthorizedException) {
        errorResponse(req, res, error.message, HttpStatusCode.UNAUTHORIZED);
        return;
    }

    if (error instanceof ConflictException) {
        errorResponse(req, res, error.message, HttpStatusCode.CONFLICT);
        return;
    }

    if (error instanceof ForbiddenException) {
        errorResponse(req, res, error.message, HttpStatusCode.FORBIDDEN);
        return;
    }

    if (error instanceof MethodNotAllowedException) {
        errorResponse(req, res, error.message, HttpStatusCode.METHOD_NOT_ALLOWED);
        return;
    }

    if (error instanceof RequestTimeoutException) {
        errorResponse(req, res, error.message, HttpStatusCode.REQUEST_TIMEOUT);
        return;
    }

    if (error instanceof TooManyRequestsException) {
        errorResponse(req, res, error.message, HttpStatusCode.TOO_MANY_REQUESTS);
        return;
    }

    // Unknown or uncaught error
    errorResponse(req, res, error.message || "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
};

server.setErrorConfig(app => {
    app.use(errorHandler);;
});