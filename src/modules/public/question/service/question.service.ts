import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { IQuestionService } from "../interface/IQuestion.service";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { TYPES } from "../../../../core/type.core";
import { PaginationParams, PaginationResponse, Question, QuestionKeyword, QuestionLog, QuizTimer } from "../../types/public.type";
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

    public getQuestionLogs(paginationParams: PaginationParams): Promise<PaginationResponse<QuestionLog>> {
        return this.questionRepository.getQuestionLogs(paginationParams);
    }

    public getQuestionDetailsLogByUUID(questionLogUUID: string): Promise<Question[]> {
        return this.questionRepository.getQuestionDetailsLogByUUID(questionLogUUID);
    }

    public getQuizTimer(questionLogUUID: string): Promise<QuizTimer> {
        return this.questionRepository.getQuizTimer(questionLogUUID);
    }

    public getQuestionKeywords(questionUUID: string): Promise<QuestionKeyword[]> {
        return this.questionRepository.getQuestionKeywords(questionUUID);
    }

    public getKeywordDetails(keywordUuid: string): Promise<QuestionKeyword> {
        return this.questionRepository.getKeywordDetails(keywordUuid);
    }

    public getKeywordExample(keywordUuid: string): Promise<string> {
        return this.questionRepository.getKeywordExample(keywordUuid);
    }

    public getLatestOngoingQuiz(): Promise<QuestionLog | null> {
        return this.questionRepository.getLatestOngoingQuiz();
    }

    public checkIfParticipatedInQuiz(): Promise<boolean> {
        return this.questionRepository.checkIfParticipatedInQuiz();
    }

    public getExplanationForQuestion(questionUUID: string): Promise<string> {
        return this.questionRepository.getExplanationForQuestion(questionUUID);
    }

    public getStreamedExplanationForQuestion(questionUUID: string): Promise<ReadableStream> {
        return this.questionRepository.getStreamedExplanationForQuestion(questionUUID);
    }

    public getStreamedKeywordExplanation(keywordUuid: string): Promise<ReadableStream> {
        return this.questionRepository.getStreamedKeywordExplanation(keywordUuid);
    }

    public getStreamedKeywordExample(keywordUUID: string): Promise<ReadableStream> {
        return this.questionRepository.getStreamedKeywordExample(keywordUUID);
    }
}