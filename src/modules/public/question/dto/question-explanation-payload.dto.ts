import { z } from "zod";

export const QuestionExplanationPayloadDto = z.object({
    question: z.string({
        required_error: 'question is required',
    })
});

export type QuestionExplanationPayloadType = z.infer<typeof QuestionExplanationPayloadDto>;