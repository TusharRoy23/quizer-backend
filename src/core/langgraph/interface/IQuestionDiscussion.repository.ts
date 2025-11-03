import { AgentStepState, QuestionDiscussionMessage } from "../../../modules/public/types/public.type";
import { AgenticRole } from "../../../shared/utils/enum";

export interface IQuestionDiscussionRepository {
    handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null>;
    handleStreamUserMessage(questionUUID: string, userMessage: string): Promise<ReadableStream>;
    saveQuestionDiscussionMessage(questionUUID: string, message: string, role: AgenticRole): Promise<string>;
    startNewSession(questionUUID: string): Promise<any>;
    getQuestionDiscussionMessages(questionUUID: string): Promise<QuestionDiscussionMessage[]>;
    initResponseToGenerateQuestion(): Promise<ReadableStream>;
    getResponseToGenerateQuestion(userMessage: string): Promise<AgentStepState>;
}