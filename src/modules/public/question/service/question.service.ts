import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { IQuestionService } from "../interface/IQuestion.service";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { TYPES } from "../../../../core/type.core";
import { Question, QuestionLog } from "../../types/public.type";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";

@injectable()
export class QuestionService implements IQuestionService {
    constructor(
        @inject(TYPES.IQuestionRepository) private readonly questionRepository: IQuestionRepository,
    ) { }

    public generatedQuestions(payload: QuestionGeneratePayloadType): Promise<string> {
        return this.questionRepository.generatedQuestions(payload);
    }

    public getGeneratedQuestions(questionLogUUID: string): Promise<Question[]> {
        return this.questionRepository.getGeneratedQuestions(questionLogUUID);
    }

    public saveAnswerForQuestion(questionLogUUID: string, payload: QuestionSavePayloadType): Promise<Question> {
        return this.questionRepository.saveAnswerForQuestion(questionLogUUID, payload);
    }

    public submitQuestionLog(questionLogUUID: string): Promise<string> {
        return this.questionRepository.submitQuestionLog(questionLogUUID);
    }

    public getQuizResult(questionLogUUID: string): Promise<QuestionLog> {
        return this.questionRepository.getQuizResult(questionLogUUID);
    }
}