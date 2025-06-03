import { Request, Response, NextFunction } from "express";
import { validate as isUUID } from "uuid";

export function ValidateUUIDParam(paramName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const value = req.params[paramName];
        if (!value || !isUUID(value)) {
            return res.status(400).json({
                success: false,
                message: `Invalid UUID for parameter "${paramName}"`,
            });
        }
        next();
    };
}
