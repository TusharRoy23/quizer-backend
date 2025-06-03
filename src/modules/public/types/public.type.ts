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
    uuid: string;
    name: string;
    email: string;
    created_at: Date;
}

enum QuestionType {
    MULTIPLE_CHOICE,
    CHOICE
}

export type Question = {
    uuid: string;
    question: string;
    options: string[];
    answer: number[];
    selected_answer: number[];
    question_type: QuestionType;
}

export type QuestionLog = {
    id: number;
    uuid: string;
    department: Department;
    timer: number;
    difficulty: string;
    question_count: number;
    participant: Participant;
    completed: boolean;
    score: boolean;
    total_answers: number;
    total_correct: number;
}