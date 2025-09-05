export interface IOpenAIRepository {
    getChatCompletions: (
        prompt: string,
    ) => Promise<any>;

    getChatCompletionsStream: (
        prompt: string,
    ) => Promise<ReadableStream>;
}