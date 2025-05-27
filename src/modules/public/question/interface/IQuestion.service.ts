import { Question } from "../../types/public.type";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";

export interface IQuestionService {
    generatedQuestions: (payload: QuestionGeneratePayloadType) => Promise<string>;
    getGeneratedQuestions: (questionLogUUID: string) => Promise<Question[]>;
    saveAnswerForQuestion: (questionLogUUID: string, payload: QuestionSavePayloadType) => Promise<Question>;
}