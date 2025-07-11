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

@controller("/question", AuthStrategy.authenticate("jwt", { session: false }), RequestContextMiddleware)
export class QuestionController {
    constructor(
        @inject(TYPES.IQuestionService) private readonly questionService: IQuestionService, // Replace 'any' with the actual type of your service
    ) { }
    /*
        To check the timer-
        1. on each request of generated questions it will check if the timer is still valid or not
        2. On save the each answer it will check if the timer is still valid or not
        3. On submit the question log it will check if the timer is still valid or not
        4. Implement some periodic job to close the quiz if the timer is expired
    */
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
        const data = await this.questionService.getQuestionLogs();
        return res.status(200).json({ data });
    }

    @httpGet("/logs/:questionLogUUID", ValidateUUIDParam("questionLogUUID"))
    public async getQuestionLogByUUID(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const data = await this.questionService.getQuestionDetailsLogByUUID(questionLogUUID);
        return res.status(200).json({ data });
    }
}