export interface IOpenAIService {
    getChatCompletions(
        prompt: string
    ): Promise<any>;
}