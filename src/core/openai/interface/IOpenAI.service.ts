export interface IOpenAIService {
    getChatCompletions(
        prompt: string
    ): Promise<any>;
    getChatCompletionsStream(
        prompt: string
    ): Promise<ReadableStream>;
}