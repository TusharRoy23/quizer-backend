import { QuestionPayloadType } from "../dto/question-payload.dto";

export interface IQuestionService {
    generatedQuestions: (payload: QuestionPayloadType) => Promise<string>;
}