export interface IOpenAIRepository {
    getDeepSeekChatCompletions: (
        prompt: string,
    ) => Promise<any>;

    getDeepSeekChatCompletionsStream: (
        prompt: string,
    ) => Promise<ReadableStream>;

    getOpenAIEmbedding: (
        text: string
    ) => Promise<any>;

    getOpenAIAudioTranscription: (
        audio: Express.Multer.File
    ) => Promise<string>;

    getOpenAITextToSpeech: (
        text: string
    ) => Promise<Buffer<ArrayBuffer> | null>;
}