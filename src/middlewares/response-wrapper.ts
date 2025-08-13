import { Request, Response, NextFunction } from "express";

// Utility to recursively remove "id" keys
function removeIdKeys(data: any): any {
    if (Array.isArray(data)) {
        return data.map(removeIdKeys);
    }

    if (data instanceof Date) {
        return data; // Preserve Date objects as-is
    }

    if (data && typeof data === "object" && !Buffer.isBuffer(data)) {
        const result: any = {};
        for (const [key, value] of Object.entries(data)) {
            if (key.toLowerCase() === "id" || key.includes('_id')) continue;
            result[key] = removeIdKeys(value);
        }
        return result;
    }

    return data;
}

export function responseWrapper(req: Request, res: Response, next: NextFunction) {
    // Monkey patch res.json
    const originalJson = res.json;

    res.json = function (body: any): Response {
        // Prevent double wrapping
        if (body?.__isWrapped) return originalJson.call(this, body);

        const cleaned = removeIdKeys(body?.data ?? body);

        const wrapped = {
            status: res.statusCode,
            data: cleaned,
            meta: body?.meta || {},
            message: body?.message || "Success",
            __isWrapped: true, // flag to prevent re-wrapping
        };

        return originalJson.call(this, wrapped);
    };

    next();
}
