import { z, string, number, array } from 'zod';
import { AssessmentType } from '../../../../shared/utils/enum';

export const QuestionGeneratePayloadDto = z.object({
    assessment_type: z.enum(
        [AssessmentType.GENERAL_INTELLIGENCE, AssessmentType.KNOWLEDGE_ASSESSMENT]
    ).default(AssessmentType.KNOWLEDGE_ASSESSMENT).optional(),
    department: string({
        required_error: 'Department is required',
        invalid_type_error: 'Department must be a uuid',
    }).uuid({ message: 'Department must be a uuid' }),
    topics: array(string().uuid({ message: 'Each topic must be a valid UUID' }), {
        required_error: 'Topics are required',
        invalid_type_error: 'Topics must be an array of strings',
    }).min(1, { message: 'At least one topic is required' })
        .max(2, { message: 'A maximum of 2 topics are allowed' }),
    question_count: number({
        required_error: 'Question count is required',
        invalid_type_error: 'Question count must be a number',
    }).refine((val) => [5, 10, 15].includes(val), {
        message: 'Question count must be one of 5, 10, or 15',
    }),
    timer: number({
        required_error: 'Timer is required',
        invalid_type_error: 'Timer must be a number',
    }).min(1, { message: 'Timer must be at least 1 minute' }),
});

export type QuestionGeneratePayloadType = z.infer<typeof QuestionGeneratePayloadDto>;