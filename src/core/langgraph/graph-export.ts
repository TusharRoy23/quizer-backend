// import container from "../container.core";
// import { TYPES } from "../type.core";
// import { IGraphBuilder } from "./interface/IGraphBuilder";

// // Get graph builder from container
// const graphBuilder = container.get<IGraphBuilder>(TYPES.IGraphBuilder);

// // Export the compiled graph
// export const graph = graphBuilder.buildQuestionDiscussionGraph();
import { z } from "zod";
import { StateGraph, START, END } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";
import { ChatDeepSeek } from "@langchain/deepseek";
import { QuestionDiscussionState } from "./states/question-discussion.state";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Use your exact state structure for accurate visualization
// export const QuestionDiscussionState = Annotation.Root({
//     questionUUID: Annotation<string>({
//         reducer: (x, y) => (y ?? x),
//     }),
//     questionContext: Annotation<{
//         question: string;
//         options: string[];
//         correctAnswers: string[];
//         explanation: string;
//         topic: string;
//         sub_topic: string;
//     }>({
//         reducer: (x, y) => (y ?? x)
//     }),
//     conversationHistory: Annotation<Array<{
//         role: 'user' | 'assistant';
//         content: string;
//         timestamp: number;
//     }>>({
//         reducer: (x, y) => x ? x.concat(y) : []
//     }),
//     currentIntent: Annotation<string>({
//         reducer: (x, y) => (y ?? x),
//     }),
//     discussedTopics: Annotation<string[]>({
//         reducer: (x, y) => x ? x.concat(y) : []
//     })
// });

const RouteDiscussionSchema = z.object({
    currentIntent: z.enum([
        "explain_correctness", "provide_examples", "explain_incorrect", "give_background", "general_clarification"
    ])
});

const deepseekModel = new ChatDeepSeek({
    model: 'deepseek-coder',
    temperature: 0.1,
    cache: false
});
const questionContext = {
    question: "Sample question for visualization",
    options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
    correctAnswers: ["C", "Option 3"],
    explanation: "This is a sample explanation for visualization",
    topic: "sample-topic",
    sub_topic: "sample-subtopic"
};

// Mock graph with your exact state and structure
export const graph = new StateGraph(QuestionDiscussionState)
    .addNode("initialize_discussion", async (state) => {
        // const systemPrompt = `
        //         Let's discuss the question: "${state.questionContext.question}.
        //         You can ask me about correctness, examples, context, or any clarifications you need!
        //     `;
        const initialMsg = {
            role: 'assistant',
            content: `
                Let's discuss the question: "${questionContext.question}.
                You can ask me about correctness, examples, context, or any clarifications you need!
            `,
            timestamp: Date.now()
        }

        // return response;

        return {
            messages: [initialMsg],
        }
    })
    .addNode("route_discussion_query", async (state: typeof QuestionDiscussionState.State) => {
        const modelWithSchema = deepseekModel.withStructuredOutput(RouteDiscussionSchema);

        const systemPrompt = `
                    You are an intent router for a question discussion system.
                    Given the full conversation below, determine the *intent* of the last user message.
        
                    Valid intents are:
                    - explain_correctness → when user asks "why it's correct", "how is this right", etc.
                    - provide_examples → when user asks for examples or illustrations.
                    - explain_incorrect → when user asks why another option is wrong.
                    - give_background → when user wants more context or background.
                    - general_clarification → when user asks for clarification that doesn't fit above.
        
                    Return ONLY the intent name, nothing else.
                `;

        // const userPrompt = `
        //     Conversation: {conversation}
        //     Last user message: {lastUserMessage}
        // `;
        const userPrompt = `
                    user message: {lastUserMessage}
                `;

        const promptTemplate = await ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            ["user", userPrompt]
        ]);

        const chain = promptTemplate.pipe(modelWithSchema);
        const result = await chain.invoke({
            // conversation: conversation,
            lastUserMessage: state.messages?.at(-1)?.content || ""
        })
        const intent = result?.currentIntent?.trim()?.toLowerCase();

        return {
            ...state,
            currentIntent: intent
        }
    })
    .addNode("explain_correctness", async (state: typeof QuestionDiscussionState.State) => {
        const { questionContext, messages } = state;
        console.log('explainCorrectness: ', questionContext);
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are an intelligent tutor helping a student understand a multiple-choice question.

            Task: Explain clearly **why the correct answer is correct**.
            Include conceptual reasoning and avoid just restating the answer.

            Question: ${questionContext.question}
            Correct Answer: ${questionContext.correctAnswers}
            Explanation Context: ${questionContext.explanation}
        `;

        const userPrompt = `
            Student just said: "${lastUserMessage}"
            Generate a helpful, educational response.
        `;

        const result = await deepseekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            ...state,
            messages: [
                ...messages,
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
            // conversationHistory: [
            //     ...conversationHistory,
            //     { role: "assistant", content: result.content, timestamp: Date.now() },
            // ],
        };
    })
    .addNode("provide_examples", async (state) => {
        const { questionContext, messages } = state;
        console.log('provideExamples: ', questionContext);
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are an educational assistant providing real-world examples.
            Give 2-3 short, clear examples to illustrate the concept behind the correct answer.

            Question: ${questionContext.question}
            Correct Answer: ${questionContext.correctAnswers}
        `;

        const userPrompt = `Student asked: "${lastUserMessage}"`;

        const result = await deepseekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            ...state,
            messages: [
                ...messages,
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    })
    .addNode("explain_incorrect", async (state) => {
        const { questionContext, messages } = state;
        console.log('explainIncorrectOptions: ', questionContext);
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are a teacher explaining why certain multiple-choice options are incorrect.

            Question: ${questionContext.question}
            Correct Answer: ${questionContext.correctAnswers}
            Options: ${questionContext.options}
        `;

        const userPrompt = `
            Student asked: "${lastUserMessage}"
            Explain briefly why the incorrect answers are wrong.
        `;

        const result = await deepseekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ]);

        return {
            ...state,
            messages: [
                ...messages,
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    })
    .addNode("give_background", async (state) => {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are an educational assistant providing conceptual or historical background.
            Give context related to the question topic or concept.

            Question: ${questionContext.question}
        `;

        const result = await deepseekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: lastUserMessage },
        ]);

        return {
            ...state,
            messages: [
                ...messages,
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    })
    .addNode("general_clarification", async (state) => {
        const { questionContext, messages } = state;
        const lastUserMessage = messages.at(-1)?.content || "";

        const systemPrompt = `
            You are a helpful tutor answering general clarifications about the question.
            Question: ${questionContext.question},
            Options: ${questionContext.options},
            Correct Answer: ${questionContext.correctAnswers},
            Explanation: ${questionContext.explanation}
        `;

        const result = await deepseekModel.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: lastUserMessage },
        ]);

        return {
            ...state,
            messages: [
                ...messages,
                { role: "assistant", content: result.content, timestamp: Date.now() },
            ],
        };
    })

    // Edges configuration - matches your real graph structure
    .addEdge(START, "initialize_discussion")
    .addEdge("initialize_discussion", "route_discussion_query")
    .addConditionalEdges("route_discussion_query",
        (state) => state.currentIntent || "general_clarification",
        {
            'explain_correctness': 'explain_correctness',
            'provide_examples': 'provide_examples',
            'explain_incorrect': 'explain_incorrect',
            'give_background': 'give_background',
            'general_clarification': 'general_clarification'
        }
    )
    .addEdge("explain_correctness", END)
    .addEdge("provide_examples", END)
    .addEdge("explain_incorrect", END)
    .addEdge("give_background", END)
    .addEdge("general_clarification", END)
    .compile();