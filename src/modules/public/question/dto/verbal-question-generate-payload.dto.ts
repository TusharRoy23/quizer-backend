import { z, string, enum as enum_, array } from 'zod';
export const VerbalQuestionGeneratePayloadDto = z.object({
    department: string({
        required_error: 'Department is required',
        invalid_type_error: 'Department must be a uuid',
    }).uuid({ message: 'Department must be a uuid' }),
    topics: array(string().uuid({ message: 'Each topic must be a valid UUID' }), {
        required_error: 'Topics are required',
        invalid_type_error: 'Topics must be an array of strings',
    }).min(1, { message: 'At least one topic is required' })
        .max(2, { message: 'A maximum of 2 topics are allowed' }),
    difficulty: enum_(['easy', 'medium', 'hard'], { errorMap: () => ({ message: 'Difficulty must be easy, medium, or hard' }) }),
});

export type VerbalQuestionGeneratePayloadType = z.infer<typeof VerbalQuestionGeneratePayloadDto>;