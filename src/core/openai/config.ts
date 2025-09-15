import OpenAI from "openai";

export const deepseekConfig = new OpenAI({
    baseURL: process.env.DEEPSEEK_API_URL,
    apiKey: process.env.DEEPSEEK_API_KEY
}).chat.completions;

export const openAIConfig = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});