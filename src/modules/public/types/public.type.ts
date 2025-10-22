export type Department = {
    id: number;
    uuid: string;
    name: string;
    created_at: Date;
}

export type Topic = {
    id: number;
    uuid: string;
    name: string;
    created_at: Date;
}

export type User = {
    id: number;
    uuid: string;
    name: string;
    email: string;
    created_at: Date;
}

export type Participant = {
    id: number;
    google_id: string;
    uuid: string;
    name: string;
    email: string;
    created_at: Date;
    session_id?: string;
    oral_quiz_restriction_count?: number;
    quiz_restriction_count?: number;
}

export enum QuestionType {
    MULTIPLE_CHOICE,
    CHOICE,
    ORAL,
}

export type Question = {
    id?: number;
    uuid: string;
    question: string;
    options: string[];
    answer?: number[];
    explanation?: string;
    topic?: string; // Optional field for the topic of the question
    sub_topic?: string; // Optional field for the sub-topic of the question
    selected_answer?: number[];
    question_type: QuestionType;
}

export type OralQuestion = {
    id?: number;
    uuid: string;
    question: string;
    topic?: string; // Optional field for the topic of the question
    sub_topic?: string; // Optional field for the sub-topic of the question
    expected_points?: string[]; // AI verbal expected points
    oral_timer: number; // Timer in minutes
    oral_end_time?: Date; // End time in UTC
    is_transcribed?: boolean;
    oral_response?: string
}

export type QuestionLog = {
    id: number;
    uuid: string;
    department: Department;
    topics?: Topic[];
    timer: number;
    difficulty: string;
    question_count: number;
    participant?: Participant;
    completed: boolean;
    score: number;
    total_answers: number;
    total_correct: number;
    end_time?: Date;
    timezone_offset?: number;
    timezone_name?: string;
    is_oral?: boolean;
    created_at: Date;
}

export type QuizTimer = {
    remainingSeconds: number;
    expiresAt: string;
    timezoneOffset?: number;
    timezoneName?: string;
}

export type PaginationParams = {
    skip: number;
    take: number;
}

export type PaginationResponse<T> = {
    data: T[];
    total: number;
}

export type QuestionKeyword = {
    id: number;
    keyword: string;
    question_id: number;
    uuid: string;
    explanation?: string;
    example?: string;
}

export type QuestionLogQuestion = {
    question_log: QuestionLog;
    question: Question;
}

export type QuestionDiscussionMessage = {
    id: number;
    uuid: string;
    role: 'user' | 'assistant';
    message: string;
    created_at: Date;
}