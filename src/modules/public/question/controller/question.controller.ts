import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, requestBody } from "inversify-express-utils";
import { DtoValidationMiddleware } from "../../../../middlewares/dto-validation.middleware";
import { QuestionGeneratePayloadDto, QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { TYPES } from "../../../../core/type.core";
import { IQuestionService } from "../interface/IQuestion.service";
import { QuestionSavePayloadDto, QuestionSavePayloadType } from "../dto/question-save-payload.dto";
import { ValidateUUIDParam } from "../../../../middlewares/validate-uuid.middleware";
import AuthStrategy from "../../../../shared/strategy/access-token.strategy";
import { RequestContextMiddleware } from "../../../../middlewares/request-context.middleware";
import { SessionMiddleware } from "../../../../middlewares/session.middleware";

@controller("/question", AuthStrategy.authenticate("jwt", { session: false }), RequestContextMiddleware, SessionMiddleware)
export class QuestionController {
    constructor(
        @inject(TYPES.IQuestionService) private readonly questionService: IQuestionService, // Replace 'any' with the actual type of your service
    ) { }

    @httpGet("/quiz/:questionLogUUID", ValidateUUIDParam("questionLogUUID"))
    public async getGeneratedQuestions(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const data = await this.questionService.getGeneratedQuestions(questionLogUUID);
        return res.status(200).json(data);
    }

    @httpPost("/quiz/:questionLogUUID/save", ValidateUUIDParam("questionLogUUID"), DtoValidationMiddleware(QuestionSavePayloadDto))
    public async saveAnswerForQuestion(
        @requestBody() payload: QuestionSavePayloadType, req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const result = await this.questionService.saveAnswerForQuestion(questionLogUUID, payload);
        return res.status(200).json({ data: result });
    }

    @httpPost("/quiz/:questionLogUUID/submit", ValidateUUIDParam("questionLogUUID"))
    public async submitQuestionLog(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const result = await this.questionService.submitQuestionLog(questionLogUUID);
        return res.status(200).json({ data: result });
    }

    @httpGet("/quiz/:questionLogUUID/result", ValidateUUIDParam("questionLogUUID"))
    public async getQuestionLogResult(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const result = await this.questionService.getQuizResult(questionLogUUID);
        return res.status(200).json({ data: result });
    }

    @httpGet("/ongoing/quiz")
    public async checkOngoingQuiz(req: Request, res: Response) {
        const quiz = await this.questionService.getLatestOngoingQuiz();
        return res.status(200).json({ data: quiz || null });
    }

    @httpPost("/quiz/generate", DtoValidationMiddleware(QuestionGeneratePayloadDto))
    public async getGeneratedQuestion(
        @requestBody() payload: QuestionGeneratePayloadType, req: Request, res: Response
    ) {
        const result = await this.questionService.generatedQuestions(payload);
        return res.status(201).json({ data: result });
    }

    @httpGet("/quiz/:questionLogUUID/timer", ValidateUUIDParam("questionLogUUID"))
    public async getQuizTimer(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const timer = await this.questionService.getQuizTimer(questionLogUUID);
        return res.status(200).json({ data: { ...timer } });
    }

    @httpGet("/logs")
    public async getQuestionLogs(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const validatedPage = Math.max(1, page);
        const validatedLimit = Math.min(Math.max(1, limit), 100); // Cap at 100 items per page

        const skip = (validatedPage - 1) * validatedLimit;

        const data = await this.questionService.getQuestionLogs({ skip, take: validatedLimit });
        return res.status(200).json({
            data: data.data,
            meta: {
                page: validatedPage,
                limit: validatedLimit,
                totalItems: data.total,
                totalPages: Math.ceil(data.total / validatedLimit),
                hasNextPage: validatedPage * validatedLimit < data.total,
                hasPreviousPage: validatedPage > 1
            }
        });
    }

    @httpGet("/logs/:questionLogUUID", ValidateUUIDParam("questionLogUUID"))
    public async getQuestionLogByUUID(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const data = await this.questionService.getQuestionDetailsLogByUUID(questionLogUUID);
        return res.status(200).json({ data });
    }

    @httpGet("/explanation/:questionUUID", ValidateUUIDParam("questionUUID"))
    public async getExplanationForQuestion(
        req: Request, res: Response
    ) {
        const questionUUID = req.params.questionUUID;
        const data = await this.questionService.getExplanationForQuestion(questionUUID);
        return res.status(200).json({ data });
    }

    @httpGet("/keywords/:questionUUID", ValidateUUIDParam("questionUUID"))
    public async getQuestionKeywords(
        req: Request, res: Response
    ) {
        const questionUUID = req.params.questionUUID;
        const data = await this.questionService.getQuestionKeywords(questionUUID);
        return res.status(200).json({ data });
    }

    @httpGet("/keywords/details/:keywordUuid", ValidateUUIDParam("keywordUuid"))
    public async getKeywordDetails(
        req: Request, res: Response
    ) {
        const keywordUuid = req.params.keywordUuid;
        const data = await this.questionService.getKeywordDetails(keywordUuid);
        return res.status(200).json({ data });
    }

    @httpGet("/keywords/example/:keywordUuid", ValidateUUIDParam("keywordUuid"))
    public async getKeywordExample(
        req: Request, res: Response
    ) {
        const keywordUuid = req.params.keywordUuid;
        const data = await this.questionService.getKeywordExample(keywordUuid);
        return res.status(200).json({ data });
    }

    @httpGet("/participated")
    public async checkIfParticipatedInQuiz(
        req: Request, res: Response
    ) {
        const hasQuizzes = await this.questionService.checkIfParticipatedInQuiz();
        return res.status(200).json({ data: hasQuizzes });
    }
}