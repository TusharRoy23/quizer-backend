import { z } from "zod";

export const QuestionGenerateConversationPayloadDto = z.object({
    message: z.string({
        required_error: 'message is required',
    }).max(50, 'question must be at most 50 characters long'),
});

export type QuestionGenerateConversationPayloadType = z.infer<typeof QuestionGenerateConversationPayloadDto>;