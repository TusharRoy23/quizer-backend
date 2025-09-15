import { inject } from "inversify";
import { TYPES } from "../../type.core";
import { IOpenAIRepository } from "../interface/IOpenAI.repository";
import { IOpenAIService } from "../interface/IOpenAI.service";

export class OpenAIService implements IOpenAIService {
    constructor(
        @inject(TYPES.IOpenAIRepository) private readonly openAIRepository: IOpenAIRepository) { }

    async getDeepSeekChatCompletions(
        prompt: string
    ): Promise<any> {
        return this.openAIRepository.getDeepSeekChatCompletions(prompt);
    }

    async getDeepSeekChatCompletionsStream(prompt: string): Promise<ReadableStream> {
        return this.openAIRepository.getDeepSeekChatCompletionsStream(prompt);
    }

    async getOpenAIEmbedding(text: string): Promise<any> {
        return this.openAIRepository.getOpenAIEmbedding(text);
    }
}