import { inject } from "inversify";
import { TYPES } from "../../../../core/type.core";
import { IVerbalQuestionService } from "../interface/IVerbalQuestion.service";
import { IVerbalQuestionRepository } from "../interface/IVerbalQuestion.repository";
import { OralQuestion, PaginationParams, PaginationResponse, QuestionLog, QuizTimer } from "../../types/public.type";
import { VerbalQuestionGeneratePayloadType } from "../dto/verbal-question-generate-payload.dto";

export class VerbalQuestionService implements IVerbalQuestionService {
    constructor(
        @inject(TYPES.IVerbalQuestionRepository) private readonly verbalQuestionRepository: IVerbalQuestionRepository,
    ) { }

    public generateVerbalQuestion(payload: VerbalQuestionGeneratePayloadType): Promise<string> {
        return this.verbalQuestionRepository.generateVerbalQuestion(payload);
    }

    public getGeneratedVerbalQuestions(questionLogUUID: string): Promise<OralQuestion[]> {
        return this.verbalQuestionRepository.getGeneratedVerbalQuestions(questionLogUUID);
    }

    public getVerbalQuizTimerByUUID(questionUUID: string): Promise<QuizTimer | null> {
        return this.verbalQuestionRepository.getVerbalQuizTimerByUUID(questionUUID);
    }

    public transcribeAudio(audio: Express.Multer.File, questionUUID: string): Promise<boolean> {
        return this.verbalQuestionRepository.transcribeAudio(audio, questionUUID);
    }

    public submitVerbalLog(questionLogUUID: string): Promise<string> {
        return this.verbalQuestionRepository.submitVerbalLog(questionLogUUID);
    }

    public getVerbalQuizAudio(questionUUID: string): Promise<string | null> {
        return this.verbalQuestionRepository.getVerbalQuizAudio(questionUUID);
    }

    public feedbackForVerbalQuestion(questionLogUUID: string): Promise<OralQuestion[] | null> {
        return this.verbalQuestionRepository.feedbackForVerbalQuestion(questionLogUUID);
    }

    public getVerbalQuestionLogs(paginationParams: PaginationParams): Promise<PaginationResponse<QuestionLog>> {
        return this.verbalQuestionRepository.getVerbalQuestionLogs(paginationParams);
    }
}