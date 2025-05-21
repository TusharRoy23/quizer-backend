export interface IOpenAIRepository {
    getChatCompletions: (
        prompt: string,
    ) => Promise<any>;
}