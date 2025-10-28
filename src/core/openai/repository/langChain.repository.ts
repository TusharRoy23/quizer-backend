import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { ILangChainRepository } from "../interface/ILangChain.repository";
import { Department, Question, QuestionType, Topic, TopicScore } from "../../../modules/public/types/public.type";
import { QuestionGeneratePayloadType } from "../../../modules/public/question/dto/question-generate-payload.dto";
import { throwException } from "../../../shared/errors/all.exception";
import { IDatabaseService } from "../../interface/IDatabase.service";
import { TYPES } from "../../type.core";
import { BaseQuestionRepository } from "../../../modules/public/question/repository/base-question.repository";

const quizSchema = z.object({
    questions: z.array(
        z.object({
            question: z.string().describe('quiz question'),
            options: z.array(z.string()).min(2).max(6).describe('options of the question'),
            answer: z.array(z.number()).min(1).describe('answer of the question'),
            question_type: z.enum(["CHOICE", "MULTIPLE_CHOICE"]),
            topic: z.string().describe('main topic category'),
            sub_topic: z.string().describe('specific subtopic'),
        })
    ).min(1).describe('array of quiz questions')
});

const keywordSchema = z.object({
    keywords: z.array(z.string()).min(3).max(5).describe('keywords of the question')
});

@injectable()
export class LangChainRepository extends BaseQuestionRepository implements ILangChainRepository {
    private deepSeekModel: ChatDeepSeek;

    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
    ) {
        super(databaseService);
        this.deepSeekModel = new ChatDeepSeek({
            model: 'deepseek-coder',
            temperature: 0.4,
            cache: false
        });
    }

    public async generatedQuestions(
        department: Department,
        topics: Topic[],
        topicScores: TopicScore[],
        payload: QuestionGeneratePayloadType
    ): Promise<Question[]> {
        try {
            const topicNames = topics.map((t) => t.name).join(", ");
            const uniquenessKey = Math.random().toString(36).substring(2, 8);
            const modelWithSchema = this.deepSeekModel.withStructuredOutput(quizSchema);

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                [
                    "system",
                    `You are an expert quiz generator. Generate exactly {question_count} questions about the specified topics.
                    
                    CRITICAL RULES:
                    - You MUST generate exactly {question_count} questions, no more no less
                    - Every question MUST be directly related to "{topicNames}" topics. 
                      But don't create a question with mixed topics. 1 question 1 topic.
                    - Include variety: scenario-based, definition, application, problem-solving
                    - For CHOICE questions: exactly 4 options, single answer [0-3]
                    - For MULTIPLE_CHOICE questions: 4 options, multiple answers
                    - Highest Difficulity Level is 100% & Lowest is 0. 
                      If given level is more than 100 or lower than 0, please keep within range (0 to 100)
                    - To Return Topic value, stay within these "{topicNames}" names only 
                    - Return valid JSON only, no additional text`
                ],
                [
                    "user",
                    `Generate {question_count} questions for {departmentName}.
                    
                    TOPICS TO COVER: {topicNames}
                    DIFFICULTY LEVEL FOR TOPICS: {difficulty_level}

                    Question distribution requirements:
                    - {scenarioCount} scenario-based questions
                    - {misconceptionCount} common misconception questions  
                    - {advancedCount} advanced application questions
                    - Remaining questions: mixed formats

                    Ensure questions are novel, practical, and avoid textbook repetition.`
                ],
            ]);

            const totalQuestions = payload.question_count;
            const scenarioCount = Math.max(1, Math.floor(totalQuestions * 0.2));
            const misconceptionCount = Math.max(1, Math.floor(totalQuestions * 0.2));
            const advancedCount = Math.max(1, Math.floor(totalQuestions * 0.2));

            const difficultyLevel: string[] = [];
            // Difficulty Level
            topics.forEach(topic => {
                const topicScore = topicScores.find(ts => ts.topic_id === topic.id);
                difficultyLevel.push(`${topic.name}:` + (topicScore && topicScore.id ? ` ${topicScore.score + 5}` : 5) + "%")
            });

            // Build runnable chain (ensure parser is in the chain)
            const chain = promptTemplate.pipe(modelWithSchema);

            const response = await chain.invoke({
                question_count: payload.question_count,
                difficulty_level: difficultyLevel.join(','),
                topicNames: topicNames,
                departmentName: department.name,
                uniquenessKey: uniquenessKey,
                scenarioCount: scenarioCount,
                misconceptionCount: misconceptionCount,
                advancedCount: advancedCount
            });

            return response.questions.map(q => ({
                question: q.question,
                answer: q.answer || [0],
                options: q.options || [],
                question_type: q.question_type as unknown as QuestionType,
                topic: q.topic || undefined,
                sub_topic: q.sub_topic || undefined,
                uuid: ''
            }));
        } catch (error) {
            return throwException(error);
        }
    }

    public async generatedStreamedExplanation(prompt: string): Promise<ReadableStream> {
        try {
            const promptTemplate = await ChatPromptTemplate.fromMessages([
                [
                    "system",
                    `
                        You are an expert educator who provides clear, concise explanations for quiz questions.

                        CRITICAL RULES:
                        - Return only the explanation text without any JSON formatting.
                        - Do not wrap the response in JSON or any other structure.
                    `
                ],
                [
                    "user",
                    "{prompt}"
                ]
            ]);
            const chain = promptTemplate.pipe(this.deepSeekModel);
            const stream = await chain.stream({
                prompt: prompt
            });
            const encoder = new TextEncoder();

            return new ReadableStream({
                async start(controller) {
                    try {
                        for await (const chunk of stream) {
                            if (chunk.content && typeof chunk.content === 'string') {
                                controller.enqueue(encoder.encode(chunk.content));
                            }
                        }
                        controller.close();
                    } catch (error) {
                        console.error("Stream processing error:", error);
                        controller.error(error);
                    }
                }
            });
        } catch (error) {
            return throwException(error);
        }
    }

    public async generateQuestionKeywords(question: Question): Promise<string[]> {
        try {
            const modelWithSchema = this.deepSeekModel.withStructuredOutput(keywordSchema);
            const promptTemplate = await ChatPromptTemplate.fromMessages([
                [
                    "system",
                    `
                        You are an expert keyword generator. 
                        Generate exactly 3-5 keyword about the specified question, topic, and sub-topic.

                        CRITICAL RULES:
                        - Choose keywords that capture the core subject matter (e.g., technologies, technical concepts, domain-specific terms).
                        - Avoid common words, filler words, or vague terms (e.g., "method", "object", "thing", "feature").
                        - Do not repeat the same word in different forms (e.g., "DOM" and "document object model" → keep just "DOM").
                        - Ensure the keywords help someone **index or search** this question effectively.
                        - Do not repeat the same keywords if you already generated for other questions.
                    `
                ],
                [
                    "user",
                    `
                        Question: {question}
                        Topic: {topic}
                        Sub Topic: {sub_topic}
                        Explanation: {explanation}
                    `
                ]
            ]);
            const chain = promptTemplate.pipe(modelWithSchema);
            const response = await chain.invoke({
                question: question.question,
                topic: question.topic,
                sub_topic: question.sub_topic,
                explanation: question.explanation
            });

            return response.keywords;
        } catch (error) {
            return throwException(error);
        }
    }
}