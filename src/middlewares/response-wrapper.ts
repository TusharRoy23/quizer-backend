import { Request, Response, NextFunction } from "express";

// Utility to recursively remove "id" keys
function removeIdKeys(data: any): any {
    if (Array.isArray(data)) {
        return data.map(removeIdKeys);
    }

    if (data instanceof Date) {
        return data;
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
    // Store original methods
    const originalJson = res.json;
    const originalSend = res.send;

    // Flag to track if this is a streaming response
    let isStreamingResponse = false;

    // Detect streaming routes by URL pattern
    if (req.path.includes('/explanation/stream/') ||
        req.path.includes('/stream/')) {
        isStreamingResponse = true;
    }

    // Monkey patch res.json
    res.json = function (body: any): Response {
        // Skip wrapping for streaming responses
        if (isStreamingResponse) {
            return originalJson.call(this, body);
        }

        // Prevent double wrapping
        if (body?.__isWrapped) {
            return originalJson.call(this, body);
        }

        const cleaned = removeIdKeys(body?.data ?? body);

        const wrapped = {
            status: res.statusCode,
            data: cleaned,
            meta: body?.meta || {},
            message: body?.message || "Success",
            __isWrapped: true,
        };

        return originalJson.call(this, wrapped);
    };

    // Also patch res.send to handle potential streaming cases
    res.send = function (body?: any): Response {
        // Skip processing for streaming responses
        if (isStreamingResponse) {
            return originalSend.call(this, body);
        }

        // If body is a string that looks like JSON, parse and wrap it
        if (typeof body === 'string' && body.trim().startsWith('{') && body.trim().endsWith('}')) {
            try {
                const parsedBody = JSON.parse(body);
                if (!parsedBody.__isWrapped) {
                    const cleaned = removeIdKeys(parsedBody?.data ?? parsedBody);
                    const wrapped = {
                        status: res.statusCode,
                        data: cleaned,
                        meta: parsedBody?.meta || {},
                        message: parsedBody?.message || "Success",
                        __isWrapped: true,
                    };
                    return originalSend.call(this, JSON.stringify(wrapped));
                }
            } catch (e) {
                // If parsing fails, just send the original body
            }
        }

        return originalSend.call(this, body);
    };

    // Add response headers detection for streaming
    const originalWriteHead = res.writeHead;
    res.writeHead = function (statusCode: number, reasonPhrase?: string | any, headers?: any) {
        // Check if streaming headers are being set
        if (headers && (headers['Content-Type'] === 'text/plain' ||
            headers['X-Accel-Buffering'] === 'no')) {
            isStreamingResponse = true;
        }
        return originalWriteHead.apply(this, arguments as any);
    };

    next();
}