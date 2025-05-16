import { injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { IQuestionService } from "../interface/IQuestion.service";

@injectable()
export class QuestionService implements IQuestionService {
    constructor(
        private readonly questionRepository: IQuestionRepository,
    ) { }

    public async generatedQuestions(payload: any): Promise<string> {
        return await this.questionRepository.generatedQuestions(payload);
    }
}