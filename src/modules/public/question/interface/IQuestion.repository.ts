import { Participant, Question, QuestionLog } from "../../types/public.type";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";

export interface IQuestionRepository {
    generatedQuestions: (payload: QuestionGeneratePayloadType) => Promise<string>;
    getGeneratedQuestions: (questionLogUUID: string) => Promise<Question[]>;
    saveAnswerForQuestion: (questionLogUUID: string, payload: QuestionSavePayloadType) => Promise<Question>;
    submitQuestionLog: (questionLogUUID: string) => Promise<string>;
    getQuizResult: (questionLogUUID: string) => Promise<QuestionLog>;
}