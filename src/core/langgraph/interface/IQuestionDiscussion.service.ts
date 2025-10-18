export interface IQuestionDiscussionService {
    handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null>;
    startNewSession(questionUUID: string): Promise<any>;
}