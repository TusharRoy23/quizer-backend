export interface IS3Service {
    uploadAudioFile(buffer: Buffer, key: string, mimeType: string): Promise<string>;
    getSignedAudioUrl(key: string, expiresIn?: number): Promise<string>;
    deleteAudioFile(key: string): Promise<void>;
    generateAudioKey(questionLogUUID: string, mimeType?: string): string;
}