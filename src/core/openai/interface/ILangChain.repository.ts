import { QuestionGeneratePayloadType } from "../../../modules/public/question/dto/question-generate-payload.dto";
import { Department, Question, Topic } from "../../../modules/public/types/public.type";

export interface ILangChainRepository {
    generatedQuestions(department: Department,
        topics: Topic[],
        payload: QuestionGeneratePayloadType): Promise<Question[]>;

    generatedStreamedExplanation(prompt: string): Promise<ReadableStream>;
    generateQuestionKeywords(question: Question): Promise<string[]>;
}