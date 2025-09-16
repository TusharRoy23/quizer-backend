export type QuestionLogPayloadType = {
    department: number;
    participant: number | undefined;
    timer: number;
    question_count: number;
    difficulty: string;
    is_oral?: boolean;
}