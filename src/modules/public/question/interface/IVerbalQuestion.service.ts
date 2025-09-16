import { OralQuestion, QuizTimer } from "../../types/public.type";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";

export interface IVerbalQuestionService {
    generateVerbalQuestion: (payload: QuestionGeneratePayloadType) => Promise<string>;
    getGeneratedVerbalQuestions: (questionLogUUID: string) => Promise<OralQuestion[]>;
    getVerbalQuizTimerByUUID: (questionUUID: string) => Promise<QuizTimer>;
}