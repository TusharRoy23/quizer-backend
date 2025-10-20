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
        "general_clarification", "clarify_term",
        "analyze_code_relevance", "avoid_unnecessary_content"
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

        const lastUserMessage = state.messages?.at(-1)?.content || "";

        if (this.containsCode(lastUserMessage)) {
            return { currentIntent: "analyze_code_relevance" };
        }

        if (this.containsLink(lastUserMessage)) {
            console.log("link detected");
            return { currentIntent: "avoid_unnecessary_content" };
        }

        const systemPrompt = `
            You are an intent router for a tutoring chat system.
            Given the last user message, detect the user's intent.

            Valid intents:
            - explain_correctness → ask "why it's correct"
            - provide_examples → ask for examples
            - explain_incorrect → ask why other options are wrong
            - give_background → ask for broader context
            - general_clarification → general question or want shorter or simpler or more detailed explanation or requesting something
            - clarify_term → user asks "what is X", "can you explain Y", "what does Z mean" — referring to a term or keyword
            - analyze_code_relevance → if user sends or refers to code,
            - avoid_unnecessary_content → if user message contains link(s)

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
            lastUserMessage: lastUserMessage || ""
        })
        const intent = result?.currentIntent?.trim()?.toLowerCase();

        return {
            currentIntent: intent
        }
    }

    async explainCorrectness(state: typeof QuestionDiscussionState.State) {
        const { questionContext, messages, lastAssistantMessage } = state;
        const lastUserMessage = messages.at(-1)?.content || "";


        let systemPrompt = `
            You are an intelligent tutor helping a student understand a multiple-choice question.

            Task: Explain clearly **why the correct answer is correct**.
            Include conceptual reasoning and avoid just restating the answer.
            Please use simple, professional, and educational tone.

            Also stay within these contexts:
            ${this.getQuestionContext(questionContext)}
        `;

        if (lastAssistantMessage) {
            systemPrompt += `
                If you think user is asking about your last explanation or it is relevant, consider it.
                Your last explanation was: ${lastAssistantMessage}
            `;
        }

        const userPrompt = `
            Student asked: "${lastUserMessage}".
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
        const lastAssistantMessage = state.lastAssistantMessage || null;

        let systemPrompt = `
            You are an educational assistant providing real-world examples.
            Give 1-2 short, clear examples to illustrate the concept behind the correct answer.
            If it helps, relate examples to the question topic. And provide practical scenarios.
            And sometimes provide code snippets if relevant. Please use simple, professional, and educational tone.

            Also stay within these contexts:
            ${this.getQuestionContext(questionContext)}
        `;

        if (lastAssistantMessage) {
            systemPrompt += `
            provide examples relevant to your last explanation:
            ${lastAssistantMessage}
            `;
        }

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
            Please use simple, professional, and educational tone for a student.

            Also stay within these contexts:
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
            Please use simple, professional, and educational tone for a student.

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
        const lastAssistantMessage = state.lastAssistantMessage || null;

        let systemPrompt = `
            You are a helpful tutor answering general clarifications about the question.
            Please use simple, professional, and educational tone for a student.

            Also stay within these contexts:
            ${this.getQuestionContext(questionContext)}
        `;

        if (lastAssistantMessage) {
            systemPrompt += `
            Also consider your last explanation:
            ${lastAssistantMessage}
            `;
        }

        const userPrompt = `
            Student asked: "${lastUserMessage}".
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
        const { messages, questionContext, lastAssistantMessage } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        let systemPrompt = `
            You are an expert tutor. 
            Please use simple, professional, and educational tone for a student.
        `;

        if (lastAssistantMessage) {
            systemPrompt += `
              The student asked about a specific term that appeared in your last explanation.
              your last explanation was: "${lastAssistantMessage}"

              Identify the term and provide a concise, educational explanation of it. 
            `;
        } else {
            systemPrompt += `
                Just provide a short, concise & educational explanation of the correct answer(s).
            `
        }

        systemPrompt += `
            Also stay within these contexts:
            ${this.getQuestionContext(questionContext)}

            Otherwise return - "Please ask questions relevant to the topic."
        `;

        const userPrompt = `
            Student asked: "${lastUserMessage}".
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

    async analyzeCodeRelevance(state: typeof QuestionDiscussionState.State) {
        const { messages, questionContext } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are a code-reviewing tutor.

            Task:
            1. Analyze the student's provided code.
            2. Judge whether the code is relevant to the topic, question, or correct answer.
            3. If relevant — briefly explain why.
            4. If not — explain what concept it actually demonstrates and how it differs from the topic.

            Please use a friendly, educational tone.
            Use Markdown formatting when showing code snippets.

            Context:
            ${this.getQuestionContext(questionContext)}
        `;

        const userPrompt = `
            Student message (may include code):
            """
            ${lastUserMessage}
            """
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

    async avoidUnnecessaryContent(state: typeof QuestionDiscussionState.State) {
        const { messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";
        const systemPrompt = `
            You are an expert tutor.
            User message contains unnecessary content like links. 
            Just return - Let's stay focused on your question — please avoid sharing links or unrelated content.
        `;

        const userPrompt = `
            Student asked: "${lastUserMessage}".
        `;

        const result = await this.deepSeekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]);

        return {
            messages: [
                {
                    role: "assistant",
                    content: result.content,
                    timestamp: Date.now()
                },
            ]
        }
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

    private containsCode(text: string): boolean {
        if (!text) return false;

        // Detect fenced code blocks or typical code syntax
        const codePattern =
            /```[\s\S]*?```|function\s+\w+|class\s+\w+|def\s+\w+|const\s+\w+|let\s+\w+|var\s+\w+|for\s*\(|if\s*\(|=>|\{|\}/;
        return codePattern.test(text);
    }

    private containsLink(text: string): boolean {
        if (!text) return false;
        // Match URLs and markdown links
        const linkPattern = /(https?:\/\/[^\s]+)|(\[.*?\]\(https?:\/\/[^\s]+\))/i;
        return linkPattern.test(text);
    }
}