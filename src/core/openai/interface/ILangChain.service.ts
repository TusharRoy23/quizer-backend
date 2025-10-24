import { QuestionGeneratePayloadType } from "../../../modules/public/question/dto/question-generate-payload.dto";
import { Department, Question, Topic, TopicScore } from "../../../modules/public/types/public.type";

export interface ILangChainService {
    generatedQuestions(
        department: Department,
        topics: Topic[],
        topicScores: TopicScore[],
        payload: QuestionGeneratePayloadType
    ): Promise<Question[]>;

    generatedStreamedExplanation(prompt: string): Promise<ReadableStream>;
    generateQuestionKeywords(question: Question): Promise<string[]>;
}