import { z } from "zod";
import { AssessmentType } from "../../../shared/utils/enum";

export enum Intent {
    EXIT = "exit",
    CHANGE = "change",
    INFO = "info",
    HELP = "help",
    CONTINUE = "continue"
}

export const QuestionGenerationContextSchema = z.object({
    assessment_type: z.nativeEnum(AssessmentType).default(AssessmentType.KNOWLEDGE_ASSESSMENT),
    department: z.string().nullable().default(null),
    topics: z.array(z.string()).min(1).max(2).default([]),
    timer: z.number().int().positive().nullable().default(1), // in minutes
    question_count: z.enum(["5", "10", "15"]).transform(Number).nullable().default("5"),
    lastNode: z.string().nullable().default(null),
    intent: z.nativeEnum(Intent).nullable().default(null),
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
        assessment_type: AssessmentType.KNOWLEDGE_ASSESSMENT,
        department: null,
        topics: [],
        timer: 1,
        question_count: "5",
    }),
    lastAssistantMessage: z.string().nullable().default(null),
    lastUserMessage: z.string().nullable().default(null),
    hintFortopics: z.array(z.string()).default([])
});

export type QuestionGenerationState = z.infer<typeof QuestionGenerationStateSchema>;

export const IntentSchema = z.object({
    intent: z.nativeEnum(Intent)
});

export const HandlerSchema = z.object({
    field: z.enum(["assessment_type", "department", "topics", "timer", "question_count", "none"]),
    message: z.string()
});

export const HelperSchema = z.object({
    response: z.string()
});

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

export const NodeMap = {
    "assessment_type": "askForAssessmentType",
    "department": "askForDepartment",
    "topics": "askForTopics",
    "timer": "askForTimer",
    "question_count": "askForQuestionCount",
    "confirmation": "askForConfirmGeneration",
    "none": "none"
}