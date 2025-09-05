import { inject } from "inversify";
import { IOpenAIRepository } from "../../interface/IOpenAI.repository";
import { IOpenAIService } from "../../interface/IOpenAI.service";
import { TYPES } from "../../../type.core";

export class DeepSeekService implements IOpenAIService {
    constructor(
        @inject(TYPES.IOpenAIRepository) private readonly openAIRepository: IOpenAIRepository) { }

    async getChatCompletions(
        prompt: string
    ): Promise<any> {
        return this.openAIRepository.getChatCompletions(prompt);
    }

    async getChatCompletionsStream(prompt: string): Promise<ReadableStream> {
        return this.openAIRepository.getChatCompletionsStream(prompt);
    }
}