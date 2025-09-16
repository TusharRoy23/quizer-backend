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
import { QuestionSearchPayloadDto, QuestionSearchPayloadType } from "../dto/question-search-payload";
import { IVerbalQuestionService } from "../interface/IVerbalQuestion.service";

@controller("/question", AuthStrategy.authenticate("jwt", { session: false }), RequestContextMiddleware, SessionMiddleware)
export class QuestionController {
    constructor(
        @inject(TYPES.IQuestionService) private readonly questionService: IQuestionService, // Replace 'any' with the actual type of your service
        @inject(TYPES.IVerbalQuestionService) private readonly verbalQuestionService: IVerbalQuestionService, // Replace 'any' with the actual type of your service
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

    @httpPost("/list/search", DtoValidationMiddleware(QuestionSearchPayloadDto))
    public async getQuestionsByQuery(
        @requestBody() payload: QuestionSearchPayloadType, req: Request, res: Response
    ) {
        const result = await this.questionService.getQuestionsByQuery(payload['query'], 10, 0.3);
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

    @httpGet("/explanation/stream/:questionUUID", ValidateUUIDParam("questionUUID"))
    public async getStreamedExplanationForQuestion(
        req: Request, res: Response
    ) {
        const questionUUID = req.params.questionUUID;

        try {
            const stream = await this.questionService.getStreamedExplanationForQuestion(questionUUID);
            this.streamingSuccessResponse(req, res, stream);
        } catch (error) {
            this.streamingErrorResponse(res, error);
        }
    }

    @httpGet("/explanation/keywords/stream/:keywordUUID", ValidateUUIDParam("keywordUUID"))
    public async getStreamExplanationForKeyword(req: Request, res: Response) {
        const keywordUUID = req.params.keywordUUID;

        try {
            const stream = await this.questionService.getStreamedKeywordExplanation(keywordUUID);
            this.streamingSuccessResponse(req, res, stream);
        } catch (error) {
            this.streamingErrorResponse(res, error);
        }
    }

    @httpGet("/explanation/keywords/stream/example/:keywordUUID", ValidateUUIDParam("keywordUUID"))
    public async getStreamedKeywordExample(req: Request, res: Response) {
        const keywordUUID = req.params.keywordUUID;

        try {
            const stream = await this.questionService.getStreamedKeywordExample(keywordUUID);
            this.streamingSuccessResponse(req, res, stream);
        } catch (error) {
            this.streamingErrorResponse(res, error);
        }
    }
    @httpPost("/verbal/generate", DtoValidationMiddleware(QuestionGeneratePayloadDto))
    public async generateVerbalQuestions(
        @requestBody() payload: QuestionGeneratePayloadType, req: Request, res: Response
    ) {
        const result = await this.verbalQuestionService.generateVerbalQuestion(payload);
        return res.status(201).json({ data: result });
    }

    @httpGet("/verbal/quiz/:questionLogUUID", ValidateUUIDParam("questionLogUUID"))
    public async getGeneratedVerbalQuestions(
        req: Request, res: Response
    ) {
        const questionLogUUID = req.params.questionLogUUID;
        const data = await this.verbalQuestionService.getGeneratedVerbalQuestions(questionLogUUID);
        return res.status(200).json(data);
    }

    @httpGet("/verbal/quiz/:questionUUID/timer", ValidateUUIDParam("questionUUID"))
    public async getVerbalQuizTimerByUUID(
        req: Request, res: Response
    ) {
        const questionUUID = req.params.questionUUID;
        const timer = await this.verbalQuestionService.getVerbalQuizTimerByUUID(questionUUID);
        return res.status(200).json({ data: { ...timer } });
    }

    private async streamingSuccessResponse(req: Request, res: Response, stream: ReadableStream<any>) {
        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering in Nginx

        // Flush headers immediately
        res.flushHeaders();

        const reader = stream.getReader();
        const decoder = new TextDecoder();

        const processStream = async () => {
            try {
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        res.end();
                        return;
                    }

                    // Decode the chunk
                    const textChunk = decoder.decode(value, { stream: true });

                    if (req.destroyed) return;

                    res.write(textChunk);

                    // Force flush
                    if (typeof (res as any).flush === 'function') {
                        (res as any).flush();
                    }

                    // Send each character individually with delay
                    // for (const char of textChunk) {
                    //     if (req.destroyed) {
                    //         // Client disconnected, stop processing
                    //         return;
                    //     }

                    //     res.write(char);

                    //     // Add delay for typing effect (adjust timing as needed)
                    //     await new Promise(resolve => setTimeout(resolve, 0));

                    //     // Force flush the response to send immediately
                    //     if (typeof (res as any).flush === 'function') {
                    //         (res as any).flush();
                    //     }
                    // }
                }
            } catch (error) {
                console.error('Stream processing error:', error);
                if (!res.headersSent) {
                    res.status(500).end();
                } else {
                    res.end();
                }
            }
        };

        // Start processing the stream
        processStream();

        // Handle client disconnect
        req.on('close', () => {
            reader.cancel().catch(() => { });
            console.log('Client disconnected from explanation stream');
        });
    }

    private async streamingErrorResponse(res: Response, error: any) {
        console.error("Stream initialization error:", error);

        if (!res.headersSent) {
            return res.status(500).json({
                error: "Failed to initialize explanation stream",
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        } else {
            // If headers were sent but error occurred later
            res.end();
        }
    }
}