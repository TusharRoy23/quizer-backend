import { inject, injectable } from "inversify";
import { TYPES } from "../../type.core";
import { IQuestionDiscussionService } from "../interface/IQuestionDiscussion.service";
import { IQuestionDiscussionRepository } from "../interface/IQuestionDiscussion.repository";
import { AgenticRole } from "../../../shared/utils/enum";

@injectable()
export class QuestionDiscussionService implements IQuestionDiscussionService {
    constructor(
        @inject(TYPES.IQuestionDiscussionRepository) private questionDiscussionRespository: IQuestionDiscussionRepository
    ) { }

    public async handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null> {
        return this.questionDiscussionRespository.handleUserMessage(questionUUID, userMessage);
    }

    public async handleStreamUserMessage(questionUUID: string, userMessage: string): Promise<ReadableStream> {
        return this.questionDiscussionRespository.handleStreamUserMessage(questionUUID, userMessage);
    }

    public async startNewSession(questionUUID: string): Promise<any> {
        return this.questionDiscussionRespository.startNewSession(questionUUID);
    }

    public async saveQuestionDiscussionMessage(questionUUID: string, message: string, role: AgenticRole): Promise<string> {
        return this.questionDiscussionRespository.saveQuestionDiscussionMessage(questionUUID, message, role);
    }

    public async getQuestionDiscussionMessages(questionUUID: string): Promise<any[]> {
        return this.questionDiscussionRespository.getQuestionDiscussionMessages(questionUUID);
    }

    public async initResponseToGenerateQuestion(): Promise<ReadableStream> {
        return this.questionDiscussionRespository.initResponseToGenerateQuestion();
    }

    public async getResponseToGenerateQuestion(userMessage: string): Promise<string> {
        return this.questionDiscussionRespository.getResponseToGenerateQuestion(userMessage);
    }
}