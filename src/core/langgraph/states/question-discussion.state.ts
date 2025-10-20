import { Annotation } from "@langchain/langgraph";

export type QuestionContext = {
    question: string;
    options: string[];
    correctAnswers: string[];
    explanation: string;
    topic: string;
    sub_topic: string;
    department: string;
    questionLogTopics: string[];
}

export const QuestionDiscussionState = Annotation.Root({
    messages: Annotation<Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: number;
    }>>({
        reducer: (x, y) => x ? x.concat(y) : []
    }),
    questionUUID: Annotation<string>({
        reducer: (x, y) => (y ?? x),
    }),
    questionContext: Annotation<QuestionContext>({
        reducer: (x, y) => (y ?? x)
    }),
    currentIntent: Annotation<string>({
        reducer: (x, y) => (y ?? x),
    }),
    discussedTopics: Annotation<string[]>({
        reducer: (x, y) => x ? x.concat(y) : []
    }),
    lastAssistantMessage: Annotation<string>({
        reducer: (x, y) => (y ?? x),
    }),
});