import { inject, injectable } from "inversify";
import { ILangChainService } from "../interface/ILangChain.service";
import { TYPES } from "../../type.core";
import { ILangChainRepository } from "../interface/ILangChain.repository";
import { QuestionGeneratePayloadType } from "../../../modules/public/question/dto/question-generate-payload.dto";
import { Department, Question, Topic } from "../../../modules/public/types/public.type";

@injectable()
export class LangChainService implements ILangChainService {
    constructor(
        @inject(TYPES.ILangChainRepository) private readonly langChainRepository: ILangChainRepository
    ) { }

    generatedQuestions(department: Department,
        topics: Topic[],
        payload: QuestionGeneratePayloadType): Promise<Question[]> {
        return this.langChainRepository.generatedQuestions(department, topics, payload);
    }

    generatedStreamedExplanation(prompt: string): Promise<ReadableStream> {
        return this.langChainRepository.generatedStreamedExplanation(prompt);
    }

    generateQuestionKeywords(question: Question): Promise<string[]> {
        return this.langChainRepository.generateQuestionKeywords(question);
    }
}