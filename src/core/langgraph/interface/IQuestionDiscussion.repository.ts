export interface IQuestionDiscussionRepository {
    handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null>;
    startNewSession(questionUUID: string): Promise<any>;
}