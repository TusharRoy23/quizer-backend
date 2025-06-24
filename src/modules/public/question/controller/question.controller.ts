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

    @httpGet("/:questionLogUUID", ValidateUUIDParam("questionLogUUID"))
    public async getGeneratedQuestions(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const data = await this.questionService.getGeneratedQuestions(questionLogUUID);
        return res.status(200).json(data);
    }

    @httpPost("/:questionLogUUID/save", ValidateUUIDParam("questionLogUUID"), DtoValidationMiddleware(QuestionSavePayloadDto))
    public async saveAnswerForQuestion(
        @requestBody() payload: QuestionSavePayloadType, req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const result = await this.questionService.saveAnswerForQuestion(questionLogUUID, payload);
        return res.status(200).json({ data: result });
    }

    @httpPost("/:questionLogUUID/submit", ValidateUUIDParam("questionLogUUID"))
    public async submitQuestionLog(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const result = await this.questionService.submitQuestionLog(questionLogUUID);
        return res.status(200).json({ data: result });
    }

    @httpGet("/:questionLogUUID/result", ValidateUUIDParam("questionLogUUID"))
    public async getQuestionLogResult(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const result = await this.questionService.getQuizResult(questionLogUUID);
        return res.status(200).json({ data: result });
    }

    @httpPost("/generate", DtoValidationMiddleware(QuestionGeneratePayloadDto))
    public async getGeneratedQuestion(
        @requestBody() payload: QuestionGeneratePayloadType, req: Request, res: Response
    ) {
        const result = await this.questionService.generatedQuestions(payload);
        return res.status(201).json({ data: result });
    }
}