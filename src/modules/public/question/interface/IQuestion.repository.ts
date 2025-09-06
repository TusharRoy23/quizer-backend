import { PaginationParams, PaginationResponse, Participant, Question, QuestionKeyword, QuestionLog, QuizTimer } from "../../types/public.type";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";

export interface IQuestionRepository {
    generatedQuestions: (payload: QuestionGeneratePayloadType) => Promise<string>;
    getGeneratedQuestions: (questionLogUUID: string) => Promise<Question[]>;
    saveAnswerForQuestion: (questionLogUUID: string, payload: QuestionSavePayloadType) => Promise<Question>;
    submitQuestionLog: (questionLogUUID: string) => Promise<string>;
    getQuizResult: (questionLogUUID: string) => Promise<QuestionLog>;
    getQuestionLogs: (paginationParams: PaginationParams) => Promise<PaginationResponse<QuestionLog>>;
    getQuestionDetailsLogByUUID: (questionLogUUID: string) => Promise<Question[]>;
    getQuizTimer: (questionLogUUID: string) => Promise<QuizTimer>;
    getQuestionKeywords: (questionUUID: string) => Promise<QuestionKeyword[]>;
    getKeywordDetails: (keywordUuid: string) => Promise<QuestionKeyword>;
    getKeywordExample: (keywordUuid: string) => Promise<string>;
    getLatestOngoingQuiz: () => Promise<QuestionLog | null>;
    checkIfParticipatedInQuiz: () => Promise<boolean>;
    getExplanationForQuestion: (questionUUID: string) => Promise<string>;
    getStreamedExplanationForQuestion: (questionUUID: string) => Promise<ReadableStream>;
    getStreamedKeywordExplanation(keywordUuid: string): Promise<ReadableStream>;
    getStreamedKeywordExample(keywordUUID: string): Promise<ReadableStream>;
}