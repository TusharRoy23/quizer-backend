import { z } from "zod";

export const QuestionGenerateConversationPayloadDto = z.object({
    // message: z.string({
    //     required_error: 'message is required',
    // }).max(25, 'question must be at most 25 characters long'),
    message: z.string()
});

export type QuestionGenerateConversationPayloadType = z.infer<typeof QuestionGenerateConversationPayloadDto>;