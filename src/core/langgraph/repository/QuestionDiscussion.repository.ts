import { inject } from "inversify";
import { IGraphBuilder } from "../interface/IGraphBuilder";
import { IQuestionDiscussionRepository } from "../interface/IQuestionDiscussion.repository";
import { TYPES } from "../../type.core";
import { throwException } from "../../../shared/errors/all.exception";
import { BaseQuestionRepository } from "../../../modules/public/question/repository/base-question.repository";
import { IDatabaseService } from "../../interface/IDatabase.service";
import { AIMessageChunk } from "@langchain/core/messages";

export class QuestionDiscussionRepository extends BaseQuestionRepository implements IQuestionDiscussionRepository {
    private graph: any;

    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IGraphBuilder) private graphBuilder: IGraphBuilder,
    ) {
        super(databaseService);
        this.graph = this.graphBuilder.buildQuestionDiscussionGraph();
    }

    public async handleUserMessage(questionUUID: string, userMessage: string): Promise<string | null> {
        try {
            const questionLog = await this.getQuestionLogByQuestionUUID(questionUUID);
            const result = await this.graph.invoke({
                messages: [
                    { role: 'user', content: userMessage, timestamp: Date.now() }
                ],
                questionUUID: questionLog?.question.uuid,
                questionContext: {
                    question: questionLog?.question.question,
                    options: questionLog?.question.options.reduce(
                        (prevStr: string, currStr: string, currIdx: number) => prevStr + `${currIdx + 1}) ${currStr} `, ''
                    ),
                    correctAnswers: questionLog?.question.answer?.reduce((str: string, curr: number) => `${str + questionLog?.question.options[curr]},`, ''),
                    topic: questionLog?.question.topic,
                    sub_topic: questionLog?.question.sub_topic,
                    department: questionLog?.question_log?.department?.name,
                    questionLogTopics: questionLog?.question_log?.topics?.map(topic => topic.name) || [],
                },
            }, { configurable: { thread_id: questionUUID } });
            const messages = result['messages'] || [];
            return messages?.length ? messages.at(-1)?.content : null;
        } catch (error) {
            return throwException(error);
        }
    }

    public async handleStreamUserMessage(questionUUID: string, userMessage: string): Promise<ReadableStream> {
        try {
            const questionLog = await this.getQuestionLogByQuestionUUID(questionUUID);
            const stream = await this.graph.stream({
                messages: [
                    { role: 'user', content: userMessage, timestamp: Date.now() }
                ],
                questionUUID: questionLog?.question.uuid,
                questionContext: {
                    question: questionLog?.question.question,
                    options: questionLog?.question.options.reduce(
                        (prevStr: string, currStr: string, currIdx: number) => prevStr + `${currIdx + 1}) ${currStr} `, ''
                    ),
                    correctAnswers: questionLog?.question.answer?.reduce((str: string, curr: number) => `${str + questionLog?.question.options[curr]},`, ''),
                    topic: questionLog?.question.topic,
                    sub_topic: questionLog?.question.sub_topic,
                    department: questionLog?.question_log?.department?.name,
                    questionLogTopics: questionLog?.question_log?.topics?.map(topic => topic.name) || [],
                },
            },
                {
                    configurable: { thread_id: questionUUID },
                    streamMode: "messages",
                }
            );

            const encoder = new TextEncoder();
            return new ReadableStream({
                async start(controller) {
                    try {
                        for await (const chunk of stream) {
                            const [messageChunk]: [AIMessageChunk] = chunk;
                            const text = messageChunk.content.toString();
                            if (text && typeof text === 'string') {
                                controller.enqueue(encoder.encode(text));
                            }
                        }
                        controller.close();
                    } catch (error) {
                        controller.error(error);
                    }
                }
            });
        } catch (error) {
            return throwException(error);
        }
    }

    public async startNewSession(questionUUID: string): Promise<any> {
        try {
            const question = await this.getQuestionDetails(questionUUID);
            //? need as pass previous chat history somehow if it has any
            const result = await this.graph.invoke({
                questionUUID: question.uuid,
                questionContext: {
                    question: question.question,
                    options: question.options.reduce(
                        (prevStr: string, currStr: string, currIdx: number) => prevStr + `${currIdx + 1}) ${currStr} `, ''
                    ),
                    correctAnswers: question.answer?.reduce((str: string, curr: number) => `${str + question.options[curr]},`, ''),
                    topic: question.topic,
                    sub_topic: question.sub_topic
                },
            }, { configurable: { thread_id: questionUUID } });
            console.log('result: ', result);
            return result;
        } catch (error) {
            return throwException(error);
        }
    }
}