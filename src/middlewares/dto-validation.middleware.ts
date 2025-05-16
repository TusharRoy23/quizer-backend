import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const DtoValidationMiddleware = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Parse and validate the request body
            const validatedData = schema.parse(req.body);

            // Replace body with validated data (optional, but keeps consistency with class-validator behavior)
            req.body = validatedData;

            next();
        } catch (err) {
            if (err instanceof ZodError) {
                // Format errors to match your class-validator structure
                const errMsg: Record<string, string[]> = {};

                err.errors.forEach((error) => {
                    const key = error.path.join(".");
                    errMsg[key] = [error.message];
                });

                res.status(400).json({
                    statusCode: 400,
                    success: false,
                    message: "",
                    error: errMsg,
                });
            } else {
                next(err); // Pass non-Zod errors to Express error handler
            }
        }
    };
};