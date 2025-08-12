import { Request, Response, NextFunction } from "express";

export function SessionMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {

        next();
    }
}