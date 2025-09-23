import { IOpenAIRepository } from "../interface/IOpenAI.repository";
import { deepseekConfig, openAIConfig } from "../config";
import { File } from 'formdata-node';
import { injectable } from "inversify";

@injectable()
export class OpenAIRepository implements IOpenAIRepository {
    public async getDeepSeekChatCompletions(prompt: string): Promise<any> {
        const completion = await deepseekConfig.create({
            model: "deepseek-coder",
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

    public async getDeepSeekChatCompletionsStream(prompt: string): Promise<ReadableStream> {
        try {
            // Use the deepseekConfig with streaming enabled
            const response = await deepseekConfig.create({
                model: "deepseek-coder",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.0,
                stream: true
            });

            // Create a ReadableStream from the DeepSeek response
            const encoder = new TextEncoder();
            const self = this;

            return new ReadableStream({
                async start(controller) {
                    try {
                        let buffer = "";
                        let chunkCount = 0;

                        for await (const chunk of response) {
                            chunkCount++;
                            if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
                                const content = chunk.choices[0].delta.content;
                                if (content) {
                                    buffer += content;

                                    // Send content in logical segments
                                    if (self.shouldSendBuffer(buffer)) {
                                        controller.enqueue(encoder.encode(buffer));
                                        buffer = "";
                                        await new Promise(resolve => setTimeout(resolve, 0));
                                    }
                                }
                            }
                        }

                        // Send any remaining content
                        if (buffer.length > 0) {
                            controller.enqueue(encoder.encode(buffer));
                        }

                        controller.close();
                    } catch (error) {
                        console.error("Stream error:", error);
                        controller.error(error);
                    }
                }
            });

        } catch (error) {
            console.error("DeepSeek streaming error:", error);
            throw error;
        }
    }

    public async getOpenAIEmbedding(text: string): Promise<any> {
        try {
            const response = await openAIConfig.embeddings.create({
                model: 'text-embedding-3-small',
                input: text,
                dimensions: 512
            });
            return response;
        } catch (error) {
            return [];
        }
    }

    public async getOpenAIAudioTranscription(multerFile: Express.Multer.File): Promise<string> {
        try {
            const file = new File(
                [multerFile.buffer],
                multerFile.originalname,
                { type: multerFile.mimetype }
            );
            const response = await openAIConfig.audio.transcriptions.create({
                file,
                model: 'whisper-1',
                language: 'en'
            });
            return response.text;
        } catch (error) {
            console.error("OpenAI transcription error:", error);
            return '';
        }
    }

    public async getOpenAITextToSpeech(text: string): Promise<Buffer<ArrayBuffer> | null> {
        try {
            const response = await openAIConfig.audio.speech.create({
                model: 'gpt-4o-mini-tts',
                voice: 'shimmer',
                input: text,
            });
            const buffer = Buffer.from(await response.arrayBuffer());
            return buffer;
        } catch (error) {
            console.error("OpenAI text-to-speech error:", error);
            return null;
        }
    }

    private shouldSendBuffer(buffer: string): boolean {
        // Send when we have a complete word, sentence, or reasonable chunk
        return buffer.length >= 20 ||
            buffer.endsWith(' ') ||
            buffer.endsWith('.') ||
            buffer.endsWith('!') ||
            buffer.endsWith('?') ||
            buffer.endsWith('\n');
    }
}