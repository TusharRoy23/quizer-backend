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
import { LLMService } from "../../service/llm.service";

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
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.ILLMService) private readonly llmService: LLMService
    ) {
        super(databaseService);
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
            const modelWithSchema = this.llmService.openAIllmModel.withStructuredOutput(quizSchema, {
                name: `quiz_generator`,
                strict: true
            });

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                [
                    "system",
                    `You are an expert quiz generator.
                    GENERATION ID: {uniquenessKey} - Use this to create COMPLETELY NEW questions.
                    IMPORTANT: For each call with new {uniquenessKey}, generate 100% novel questions. 
                    Never reuse phrasing, scenarios, or examples from prior generations.

                    IMPORTANT DISTINCTION:
                    - If the assessment type is "GIA" (General Intelligence Assessment), you MUST generate 
                    cognitive ability test questions.
                    - GIA questions test reasoning ability, NOT domain knowledge.
                    - NEVER explain what GIA is.
                    - NEVER ask questions about how GIA is conducted.
                    - NEVER generate HR, psychology, or theory questions about intelligence.

                    FOR GIA QUESTIONS:
                    - Questions must be self-contained and domain-neutral
                    - Allowed GIA categories only:
                    - Numerical Reasoning
                    - Logical Reasoning
                    - Abstract / Pattern Recognition
                    - Verbal Reasoning
                    - Attention & Rule-Based Reasoning
                    - Each question must test problem-solving, inference, or pattern detection
                    - Assume the test-taker has no prior subject knowledge
                    - Prefer time-pressure style questions

                    GENERAL RULES:
                    - Generate exactly {question_count} questions
                    - Every question MUST belong to exactly ONE topic
                    - Do NOT mix topics in a single question
                    - For CHOICE questions: exactly 4 options, single answer [0-3]
                    - For MULTIPLE_CHOICE questions: exactly 4 options, multiple answers
                    - Difficulty range is 0–100 only
                    - Topic value MUST be one of: {topicNames}
                    - Return valid JSON only, no additional text
                    `
                ],
                [
                    "user",
                    `
                    Assessment Type: {assessmentType}

                    Generate {question_count} questions.

                    DEPARTMENT: {departmentName}

                    TOPICS (interpret based on QUESTION_MODE):
                    {topicNames}

                    DIFFICULTY LEVEL: {difficulty_level}

                    Question distribution:
                    - {scenarioCount} scenario-based
                    - {misconceptionCount} trap / misleading-option questions
                    - {advancedCount} advanced reasoning questions
                    - Remaining: mixed reasoning formats

                    If Assessment Type is GENERAL_INTELLIGENCE:
                    - Questions must be time-pressure friendly
                    - No explanatory text in questions
                    - No real-world domain assumptions
                    - No academic framing

                    Ensure questions are novel and suitable for pre-employment assessment`
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
                advancedCount: advancedCount,
                assessmentType: payload.assessment_type
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
            const chain = promptTemplate.pipe(this.llmService.openAIllmModel);
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
            const modelWithSchema = this.llmService.openAIllmModel.withStructuredOutput(keywordSchema);
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