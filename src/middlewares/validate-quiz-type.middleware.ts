import { Request, Response, NextFunction } from 'express';

export const ValidateQuizType = (req: Request, res: Response, next: NextFunction) => {
    const quizType = req.query.quiz_type as string;
    const allowedTypes = ["MCQ", "ORAL"];

    if (quizType && !allowedTypes.includes(quizType)) {
        return res.status(400).json({
            success: false,
            message: `Allowed Types: ${allowedTypes.join(',')}`
        });
    }

    next();
};