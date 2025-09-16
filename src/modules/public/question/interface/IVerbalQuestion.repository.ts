import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { OralQuestion, QuizTimer } from "../../types/public.type";

export interface IVerbalQuestionRepository {
    generateVerbalQuestion: (payload: QuestionGeneratePayloadType) => Promise<string>;
    getGeneratedVerbalQuestions: (questionLogUUID: string) => Promise<OralQuestion[]>;
    getVerbalQuizTimerByUUID: (questionUUID: string) => Promise<QuizTimer>;
}