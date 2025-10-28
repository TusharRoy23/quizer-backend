import { z } from "zod";

export const QuestionGenerationContextSchema = z.object({
    department: z.string().nullable().default(null),
    topics: z.array(z.string()).min(1).max(2).default([]),
    timer: z.number().int().positive().nullable().default(1), // in minutes
    question_count: z.enum(["5", "10", "15"]).transform(Number).nullable().default("5"),
});

export type QuestionGenerationContext = z.infer<typeof QuestionGenerationContextSchema>;

export const MessageSchema = z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
    timestamp: z.number().default(() => Date.now()),
});

export type Message = z.infer<typeof MessageSchema>;

export const QuestionGenerationStateSchema = z.object({
    messages: z.array(MessageSchema).default([]),
    generationContext: QuestionGenerationContextSchema.default({
        department: null,
        topics: [],
        timer: 1,
        question_count: "5",
    }),
    lastAssistantMessage: z.string().nullable().default(null),
    hintFortopics: z.array(z.string()).default([])
});

export type QuestionGenerationState = z.infer<typeof QuestionGenerationStateSchema>;

/*
    Utility
*/
export const askPermissionSchema = z.object({
    permission: z.enum(['yes', 'no', 'none'])
});

export const InputValidationSchema = z.object({
    isValid: z.boolean().default(false)
});

export const departmentNodeSchema = z.object({
    isValid: z.boolean().default(false),
    topics: z.array(z.string()).default([]),
    message: z.string()
});
