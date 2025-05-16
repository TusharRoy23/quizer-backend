import { z, string, number, enum as enum_, array } from 'zod';
export const QuestionPayloadDto = z.object({
    name: string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }).nonempty({ message: 'Name is required' }),
    email: string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({ message: 'Email is invalid' }),
    department: string({
        required_error: 'Department is required',
        invalid_type_error: 'Department must be a uuid',
    }).uuid({ message: 'Department must be a uuid' }),
    topics: array(string().uuid({ message: 'Each topic must be a valid UUID' }), {
        required_error: 'Topics are required',
        invalid_type_error: 'Topics must be an array of strings',
    }).min(1, { message: 'At least one topic is required' }),
    question_count: number({
        required_error: 'Question count is required',
        invalid_type_error: 'Question count must be a number',
    }).min(1, { message: 'Question count must be at least 1' }),
    difficulty: enum_(['easy', 'medium', 'hard'], { errorMap: () => ({ message: 'Difficulty must be easy, medium, or hard' }) }),
    timer: number({
        required_error: 'Timer is required',
        invalid_type_error: 'Timer must be a number',
    }).min(1, { message: 'Timer must be at least 1 second' }),
});

export type QuestionPayloadType = z.infer<typeof QuestionPayloadDto>;