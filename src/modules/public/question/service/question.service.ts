import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { IQuestionService } from "../interface/IQuestion.service";
import { QuestionPayloadType } from "../dto/question-payload.dto";
import { TYPES } from "../../../../core/type.core";

@injectable()
export class QuestionService implements IQuestionService {
    constructor(
        @inject(TYPES.IQuestionRepository) private readonly questionRepository: IQuestionRepository,
    ) { }

    public async generatedQuestions(payload: QuestionPayloadType): Promise<string> {
        return await this.questionRepository.generatedQuestions(payload);
    }
}