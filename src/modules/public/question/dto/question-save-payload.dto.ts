import { z, string, number, enum as enum_, array } from 'zod';
export const QuestionSavePayloadDto = z.object({
    uuid: string({
        required_error: 'This is required',
        invalid_type_error: 'This must be a uuid',
    }).uuid({ message: 'This must be a uuid' }),
    answers: array(number(), {
        required_error: 'This required',
        invalid_type_error: 'Topics must be an array of numbers',
    })
});

export type QuestionSavePayloadType = z.infer<typeof QuestionSavePayloadDto>;