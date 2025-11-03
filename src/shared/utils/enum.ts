export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    INTERNAL_SERVER = 500,
    TOO_MANY_REQUESTS = 429,
}

export enum AgenticRole {
    USER = 'USER',
    ASSISTANT = 'ASSISTANT',
    SYSTEM = 'SYSTEM'
}

export enum NextStep {
    INTERRUPT = 'INTERRUPT',
    QUIZ = 'QUIZ',
    END = 'END'
}