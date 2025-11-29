import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpStatusCode } from "../utils/enum";
import { NotFoundException, BadRequestException, InternalServerErrorException, UnauthorizedException, ConflictException, ForbiddenException, MethodNotAllowedException, RequestTimeoutException, TooManyRequestsException } from "./all.exception";

const errorResponse = (req: Request, res: Response, message: string, statusCode: any, error?: any) => {
    return res.status(statusCode).json({
        statusCode: statusCode,
        success: false,
        message: message,
        error: error || []
    });
}

// Error-handling middleware
export const errorHandler: ErrorRequestHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
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