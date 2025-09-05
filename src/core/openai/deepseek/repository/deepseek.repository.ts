import { IOpenAIRepository } from "../../interface/IOpenAI.repository";
import { deepseekConfig } from "../config";

export class DeepSeekRepository implements IOpenAIRepository {
    async getChatCompletions(prompt: string): Promise<any> {
        const completion = await deepseekConfig.create({
            model: "deepseek-chat",
            messages: [
                { role: "user", content: prompt }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.0
        });
        return completion.choices[0]?.message?.content;
    }

    async getChatCompletionsStream(prompt: string): Promise<ReadableStream> {
        try {
            // Use the deepseekConfig with streaming enabled
            const response = await deepseekConfig.create({
                model: "deepseek-chat",
                messages: [
                    { role: "user", content: prompt }
                ],
                response_format: {
                    type: "json_object"
                },
                temperature: 0.0,
                stream: true
            });

            // Create a ReadableStream from the DeepSeek response
            const encoder = new TextEncoder();

            return new ReadableStream({
                async start(controller) {
                    try {
                        // Handle the streaming response
                        for await (const chunk of response) {
                            if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
                                const content = chunk.choices[0].delta.content;
                                if (content) {
                                    controller.enqueue(encoder.encode(content));
                                }
                            }
                        }
                        controller.close();
                    } catch (error) {
                        console.error("Stream error in DeepSeek repository:", error);
                        controller.error(error);
                    }
                }
            });

        } catch (error) {
            console.error("DeepSeek streaming error:", error);
            throw error;
        }
    }
}