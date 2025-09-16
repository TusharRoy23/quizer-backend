import { inject } from "inversify";
import { TYPES } from "../../../../core/type.core";
import { IVerbalQuestionService } from "../interface/IVerbalQuestion.service";
import { IVerbalQuestionRepository } from "../interface/IVerbalQuestion.repository";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { OralQuestion, QuizTimer } from "../../types/public.type";

export class VerbalQuestionService implements IVerbalQuestionService {
    constructor(
        @inject(TYPES.IVerbalQuestionRepository) private readonly verbalQuestionRepository: IVerbalQuestionRepository,
    ) { }

    public generateVerbalQuestion(payload: QuestionGeneratePayloadType): Promise<string> {
        return this.verbalQuestionRepository.generateVerbalQuestion(payload);
    }

    public getGeneratedVerbalQuestions(questionLogUUID: string): Promise<OralQuestion[]> {
        return this.verbalQuestionRepository.getGeneratedVerbalQuestions(questionLogUUID);
    }

    public getVerbalQuizTimerByUUID(questionUUID: string): Promise<QuizTimer> {
        return this.verbalQuestionRepository.getVerbalQuizTimerByUUID(questionUUID);
    }
}