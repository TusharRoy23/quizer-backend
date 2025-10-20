import { z } from "zod";

export const QuestionExplanationPayloadDto = z.object({
    question: z.string({
        required_error: 'question is required',
    }).max(100, 'question must be at most 100 characters long'),
});

export type QuestionExplanationPayloadType = z.infer<typeof QuestionExplanationPayloadDto>;