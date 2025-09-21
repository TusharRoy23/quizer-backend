import { OralQuestion, PaginationParams, QuestionLog, QuizTimer } from "../../types/public.type";
import { VerbalQuestionGeneratePayloadType } from "../dto/verbal-question-generate-payload.dto";

export interface IVerbalQuestionRepository {
    generateVerbalQuestion: (payload: VerbalQuestionGeneratePayloadType) => Promise<string>;
    getGeneratedVerbalQuestions: (questionLogUUID: string) => Promise<OralQuestion[]>;
    getVerbalQuizTimerByUUID: (questionUUID: string) => Promise<QuizTimer | null>;
    transcribeAudio: (audio: Express.Multer.File, questionUUID: string) => Promise<boolean>;
    submitVerbalLog(questionLogUUID: string): Promise<string>;
    getVerbalQuizAudio(questionUUID: string): Promise<string | null>;
    feedbackForVerbalQuestion(questionLogUUID: string): Promise<OralQuestion[] | null>;
    getVerbalQuestionLogs(paginationParams: PaginationParams): Promise<{ data: QuestionLog[]; total: number }>;
}