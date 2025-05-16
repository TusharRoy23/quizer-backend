import { Request, Response } from "express";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import { DtoValidationMiddleware } from "../../../../middlewares/dto-validation.middleware";
import { QuestionPayloadDto, QuestionPayloadType } from "../dto/question-payload.dto";
import { inject } from "inversify";
import { TYPES } from "../../../../core/type.core";
import { IQuestionService } from "../interface/IQuestion.service";

@controller("/question")
export class QuestionController {
    constructor(
        @inject(TYPES.IQuestionService) private readonly questionService: IQuestionService, // Replace 'any' with the actual type of your service
    ) { }

    @httpPost("/generate", DtoValidationMiddleware(QuestionPayloadDto))
    public async getGeneratedQuestion(
        @requestBody() payload: QuestionPayloadType, req: Request, res: Response
    ) {
        const data = await this.questionService.generatedQuestions(payload);
        return res.status(201).json({ 'message': 'created' })
    }
}