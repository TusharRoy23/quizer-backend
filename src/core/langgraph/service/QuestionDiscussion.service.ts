import { inject, injectable } from "inversify";
import { TYPES } from "../../type.core";
import { IQuestionDiscussionService } from "../interface/IQuestionDiscussion.service";
import { IQuestionDiscussionRepository } from "../interface/IQuestionDiscussion.repository";

@injectable()
export class QuestionDiscussionService implements IQuestionDiscussionService {
    constructor(
        @inject(TYPES.IQuestionDiscussionRepository) private questionDiscussionRespository: IQuestionDiscussionRepository
    ) { }

    public async handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null> {
        return this.questionDiscussionRespository.handleUserMessage(questionUUID, userMessage);
    }

    public async startNewSession(questionUUID: string): Promise<any> {
        return this.questionDiscussionRespository.startNewSession(questionUUID);
    }
}