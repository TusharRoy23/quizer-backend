export interface IOpenAIService {
    getDeepSeekChatCompletions(
        prompt: string
    ): Promise<any>;
    getDeepSeekChatCompletionsStream(
        prompt: string
    ): Promise<ReadableStream>;
    getOpenAIEmbedding: (
        text: string
    ) => Promise<any>;
}