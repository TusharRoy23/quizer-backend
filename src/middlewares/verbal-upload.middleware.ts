import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { RequestContext } from '../shared/context/request-context';

// Configure multer first
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB
        files: 1,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'audio/mpeg',
            'audio/wav',
            'audio/webm',
            'audio/mp4'
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type. Allowed: ${allowedMimeTypes.join(', ')}`));
        }
    }
});

// Custom middleware to handle multer errors and set context
@injectable()
export class VerbalUploadMiddleware extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction): void {
        // First, run multer to process the file
        upload.single('audio')(req, res, (err) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        return res.status(400).json({ error: 'File too large. Max 25MB.' });
                    }
                    if (err.code === 'LIMIT_FILE_COUNT') {
                        return res.status(400).json({ error: 'Only one file is allowed.' });
                    }
                }
                return res.status(400).json({ error: err.message });
            }

            // Now set the request context
            const participant = req.user as any; // Adjust type as needed
            RequestContext.run(participant, () => {
                next();
            });
        });
    }
}