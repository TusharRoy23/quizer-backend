import { QuestionPayloadType } from "../dto/question-payload.dto";

export interface IQuestionRepository {
    generatedQuestions: (payload: QuestionPayloadType) => Promise<string>;
}