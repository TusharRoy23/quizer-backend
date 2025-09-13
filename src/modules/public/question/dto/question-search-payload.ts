import { z } from 'zod';

// Define dangerous patterns to reject
const DANGEROUS_PATTERNS = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /alert\(/i,
    /fromCharCode/i,
    /\\x[0-9a-f]{2}/i,
    /%[0-9a-f]{2}/i,
];

// Security-focused sanitization
const secureSanitize = (input: string): string => {
    let sanitized = input
        .trim()
        .normalize('NFC') // Normalize unicode
        .replace(/[<>"'`\\]/g, '') // Remove dangerous characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .substring(0, 100);

    // Additional check for encoded attacks
    const decoded = decodeURIComponent(sanitized);
    if (decoded !== sanitized) {
        // If decoding changes the string, sanitize the decoded version
        sanitized = decoded.replace(/[<>"'`\\]/g, '').substring(0, 100);
    }

    return sanitized;
};

// Check for dangerous patterns
const hasDangerousPatterns = (input: string): boolean => {
    return DANGEROUS_PATTERNS.some(pattern => pattern.test(input));
};

// Safe string schema with comprehensive validation
const secureString = z.string()
    .min(1, 'Query cannot be empty')
    .max(50, 'Query must be less than 50 characters')
    .transform(secureSanitize)
    .refine((val) => val.length > 0, {
        message: 'Query cannot be empty after sanitization'
    })
    .refine((val) => !hasDangerousPatterns(val), {
        message: 'Query contains potentially dangerous patterns'
    })
    .refine((val) => !/[<>"'`\\]/.test(val), {
        message: 'Query contains invalid characters'
    })
    .refine((val) => encodeURIComponent(val) === val || !hasDangerousPatterns(decodeURIComponent(val)), {
        message: 'Query contains encoded dangerous patterns'
    });

export const QuestionSearchPayloadDto = z.object({
    query: secureString
});

export type QuestionSearchPayloadType = z.infer<typeof QuestionSearchPayloadDto>;