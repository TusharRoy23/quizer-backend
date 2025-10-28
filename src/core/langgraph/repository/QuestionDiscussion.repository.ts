import { inject, injectable } from "inversify";
import { IGraphBuilder } from "../interface/IGraphBuilder";
import { IQuestionDiscussionRepository } from "../interface/IQuestionDiscussion.repository";
import { TYPES } from "../../type.core";
import { throwException } from "../../../shared/errors/all.exception";
import { BaseQuestionRepository } from "../../../modules/public/question/repository/base-question.repository";
import { IDatabaseService } from "../../interface/IDatabase.service";
import { AIMessageChunk } from "@langchain/core/messages";
import { AgenticRole } from "../../../shared/utils/enum";
import { AgentStepState, QuestionDiscussionMessage } from "../../../modules/public/types/public.type";
import { IQuestionGraphBuilder } from "../interface/IQuestionGraphBuilder";
import { Command } from "@langchain/langgraph";

@injectable()
export class QuestionDiscussionRepository extends BaseQuestionRepository implements IQuestionDiscussionRepository {
    private graph: any;
    private questionGenerationGraph: any;

    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IGraphBuilder) private readonly graphBuilder: IGraphBuilder,
        @inject(TYPES.IQuestionGraphBuilder) private readonly questionGraphBuilder: IQuestionGraphBuilder
    ) {
        super(databaseService);
        this.graph = this.graphBuilder.buildQuestionDiscussionGraph();
        this.questionGenerationGraph = this.questionGraphBuilder.buildGraph();
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
            const lastAssistantMessage = await this.getLastAssistantMessage(questionUUID);
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
                lastAssistantMessage: lastAssistantMessage
            },
                {
                    configurable: { thread_id: questionUUID },
                    streamMode: "messages",
                }
            );

            const encoder = new TextEncoder();
            const finalStream = new ReadableStream({
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
            return this.wrapReadableStream(finalStream, {
                onComplete: async (fullText) => {
                    await this.saveQuestionDiscussionMessage(questionUUID, userMessage, AgenticRole.USER);
                    await this.saveQuestionDiscussionMessage(questionUUID, fullText, AgenticRole.ASSISTANT);
                },
                onErrorText: "Error generating explanation. Please try again."
            });
        } catch (error) {
            return this.returnErrorStream();
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
            return result;
        } catch (error) {
            return throwException(error);
        }
    }

    public async saveQuestionDiscussionMessage(questionUUID: string, message: string, role: AgenticRole): Promise<string> {
        try {
            const questionDetails = await this.getQuestionDetails(questionUUID)
            const payload = {
                question_id: questionDetails.id,
                message: message,
                role: role
            };
            const prisma = await this.prisma$();
            await prisma.question_discussion.create({
                data: payload
            });
            return "Message saved successfully.";
        } catch (error) {
            return throwException(error);
        }
    }

    public async getQuestionDiscussionMessages(questionUUID: string): Promise<QuestionDiscussionMessage[]> {
        try {
            const prisma = await this.prisma$();
            const messages = await prisma.question_discussion.findMany({
                where: {
                    question_log_question: {
                        uuid: questionUUID
                    }
                }
            });
            return messages?.length ? messages : [];
        } catch (error) {
            return throwException(error);
        }
    }

    public async initResponseToGenerateQuestion(): Promise<ReadableStream> {
        try {
            const participant = this.getParticipant();
            const config = {
                configurable: { thread_id: `user-${participant.google_id}` },
                streamMode: "messages"
            };
            const stream = await this.questionGenerationGraph.stream(
                {}, config
            );
            const encoder = new TextEncoder();
            const readableStream = new ReadableStream({
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
            return this.wrapReadableStream(readableStream, {
                onComplete: async (fullText) => {
                },
                onErrorText: "Error generating explanation. Please try again."
            });
        } catch (error) {
            return this.returnErrorStream();
        }
    }

    public async getResponseToGenerateQuestion(userMessage: string): Promise<AgentStepState> {
        try {
            const participant = this.getParticipant();
            const config = {
                configurable: { thread_id: `user-${participant.google_id}` }
            };
            const data = await this.questionGenerationGraph.invoke(
                new Command({ resume: userMessage }), config
            );
            const value: AgentStepState = {
                content: null,
                next_step: null
            };
            if (Object.keys(data).includes('__interrupt__')) {
                value.content = data?.__interrupt__[0]?.value;
                value.next_step = 'interrupt';
            } else if (Object.keys(data).includes('messages')) {
                const message = data?.messages[0]?.content;
                value.content = message?.content;
                value.next_step = message?.next_step;
            }
            return value;

        } catch (error) {
            return throwException(error);
        }
    }

    private async getLastAssistantMessage(questionUUID: string): Promise<string | null> {
        try {
            const prisma = await this.prisma$();
            const lastMessage = await prisma.question_discussion.findFirst({
                where: {
                    question_log_question: {
                        uuid: questionUUID
                    },
                    role: AgenticRole.ASSISTANT
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            return lastMessage ? lastMessage.message : null;
        } catch (error) {
            return throwException(error);
        }
    }
}