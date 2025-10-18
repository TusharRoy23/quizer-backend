import { z } from "zod";
import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { injectable } from "inversify"
import { IQuestionDiscussionNodes } from "../interface/IQuestionDiscussionNodes";
import { QuestionContext, QuestionDiscussionState } from "../states/question-discussion.state";

const RouteDiscussionSchema = z.object({
    currentIntent: z.enum([
        "explain_correctness", "provide_examples",
        "explain_incorrect", "give_background",
        "general_clarification", "clarify_term"
    ])
})

@injectable()
export class QuestionDiscussionNodes implements IQuestionDiscussionNodes {
    private deepSeekModel: ChatDeepSeek;

    constructor() {
        this.deepSeekModel = new ChatDeepSeek({
            model: 'deepseek-coder',
            temperature: 0.1,
            cache: false
        });
    }

    async initializeDiscussion(state: typeof QuestionDiscussionState.State) {
        const modelWithSchema = this.deepSeekModel.withStructuredOutput(RouteDiscussionSchema);

        const systemPrompt = `
            You are an intent router for a tutoring chat system.
            Given the conversation and last user message, detect the user's intent.

            Valid intents:
            - explain_correctness → ask "why it's correct"
            - provide_examples → ask for examples
            - explain_incorrect → ask why other options are wrong
            - give_background → ask for broader context
            - general_clarification → general question
            - clarify_term → user asks "what is X", "can you explain Y", "what does Z mean" — referring to a term or keyword

            Return ONLY the intent name, nothing else.
        `;

        const userPrompt = `
            user message: {lastUserMessage}
        `;

        const promptTemplate = await ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["user", userPrompt]
        ]);

        const chain = promptTemplate.pipe(modelWithSchema);
        const result = await chain.invoke({
            lastUserMessage: state.messages?.at(-1)?.content || ""
        })
        const intent = result?.currentIntent?.trim()?.toLowerCase();

        return {
            currentIntent: intent
        }
    }

    async explainCorrectness(state: typeof QuestionDiscussionState.State) {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are an intelligent tutor helping a student understand a multiple-choice question.

            Task: Explain clearly **why the correct answer is correct**.
            Include conceptual reasoning and avoid just restating the answer.

            Please stay within these contexts:
            Question: ${questionContext.question}
            Correct Answer(s): ${questionContext.correctAnswers}
            Explanation Context: ${questionContext.explanation}
            Department: ${questionContext.department}
            Topics: ${questionContext.questionLogTopics.join(", ")}
        `;

        const userPrompt = `
            Student just said: "${lastUserMessage}"
            Generate a helpful, educational response.
        `;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            messages: [
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    }

    async provideExamples(state: typeof QuestionDiscussionState.State) {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are an educational assistant providing real-world examples.
            Give 2-3 short, clear examples to illustrate the concept behind the correct answer.
            If it helps, relate examples to the question topic. And provide practical scenarios.
            And sometimes provide code snippets if relevant.

            Please stay within these contexts:
            Question: ${questionContext.question}
            Correct Answer(s): ${questionContext.correctAnswers}
            Explanation Context: ${questionContext.explanation}
            Department: ${questionContext.department}
            Topics: ${questionContext.questionLogTopics.join(", ")}
        `;

        const userPrompt = `Student asked: "${lastUserMessage}"`;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            messages: [
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    }

    async explainIncorrectOptions(state: typeof QuestionDiscussionState.State) {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are a teacher explaining why certain multiple-choice options are incorrect.
            Answer clearly and concisely, focusing on misconceptions or errors in reasoning.
            Use simple language suitable for a student.

            Please stay within these contexts:
            ${this.getQuestionContext(questionContext)}
        `;

        const userPrompt = `
            Student asked: "${lastUserMessage}"
            Explain briefly why the incorrect answers are wrong.
        `;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            messages: [
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    }

    async giveBackgroundContext(state: typeof QuestionDiscussionState.State) {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are an educational assistant providing conceptual or historical background.
            Give context within these contexts:
            ${this.getQuestionContext(questionContext)}
        `;

        const userPrompt = `
            Student asked: "${lastUserMessage}"
            Explain background context.
        `;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            messages: [
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    }

    async generalClarification(state: typeof QuestionDiscussionState.State) {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are a helpful tutor answering general clarifications about the question.
            Please stay within these contexts:
            ${this.getQuestionContext(questionContext)}
        `;

        const userPrompt = `
            Student asked: "${lastUserMessage}
            Provide a clear, concise clarification.
            Use simple language suitable for a student.
        `;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            messages: [
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    }

    async clarifyTerm(state: typeof QuestionDiscussionState.State) {
        const { messages, questionContext } = state;
        const lastUserMessage = messages.at(-1)?.content || "";
        const lastAssistantMessage = messages.slice().reverse().find(m => m.role === "assistant")?.content || "";

        const systemPrompt = `
            You are an expert tutor.
            The student asked about a specific term that appeared in your last explanation.
            Identify the term and provide a concise, educational explanation of it.
            
            please stay within these contexts:
            ${this.getQuestionContext(questionContext)}

            Otherwise return - "Please ask questions relevant to the topic."
        `;

        const userPrompt = `
            AI's previous explanation: ${lastAssistantMessage}
            Student asked: "${lastUserMessage}"
            Explain the referenced term clearly.
        `;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]);

        return {
            messages: [
                { role: "assistant", content: result.content, timestamp: Date.now() }
            ]
        };
    }

    private getQuestionContext(context: QuestionContext): string {
        return `
            Question: ${context.question},
            Options: ${context.options},
            Correct Answer: ${context.correctAnswers},
            Explanation: ${context.explanation}
            Department: ${context.department}
            Topics: ${context.questionLogTopics.join(", ")}

            Also remember the student's question must be relevant to the Question, Options, and Explanation.
        `;
    }

}