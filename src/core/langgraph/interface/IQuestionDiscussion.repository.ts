export interface IQuestionDiscussionRepository {
    handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null>;
    handleStreamUserMessage(questionUUID: string, userMessage: string): Promise<ReadableStream>;
    startNewSession(questionUUID: string): Promise<any>;
}