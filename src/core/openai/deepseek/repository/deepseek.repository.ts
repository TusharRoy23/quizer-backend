import { IOpenAIRepository } from "../../interface/IOpenAI.repository";
import { deepseekConfig } from "../config";

export class DeepSeekRepository implements IOpenAIRepository {
    async getChatCompletions(prompt: string): Promise<any> {
        const completion = await deepseekConfig.create({
            model: "deepseek-chat",
            messages: [
                { role: "user", content: prompt }
            ]
        });
        return completion.choices[0]?.message?.content;
    }
}