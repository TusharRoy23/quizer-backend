import cors from "cors";
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/container.core";
import { responseWrapper } from "./middlewares/response-wrapper";
import { NotFoundException, BadRequestException, InternalServerErrorException, UnauthorizedException, ConflictException, ForbiddenException, MethodNotAllowedException, RequestTimeoutException } from "./shared/errors/all.exception";
import { HttpStatusCode } from "./shared/utils/enum";

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

server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(responseWrapper);
    app.use(cors(corsOptions));
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

    // Unknown or uncaught error
    errorResponse(req, res, error.message || "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
};

server.setErrorConfig(app => {
    app.use(errorHandler);;
});