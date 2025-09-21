import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IS3Service } from '../interface/IS3.service';
import { injectable } from 'inversify';

@injectable()
export class S3Service implements IS3Service {
    private s3Client: S3Client;
    private bucketName: string;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_S3_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME!;
    }

    // Upload audio file to S3
    async uploadAudioFile(buffer: Buffer, key: string, mimeType: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ContentType: mimeType,
            Metadata: {
                'uploaded-at': new Date().toISOString()
            }
        });

        await this.s3Client.send(command);
        return key;
    }

    // Generate signed URL for audio playback (expires in 1 hour)
    async getSignedAudioUrl(key: string, expiresIn: number = 3600): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn });
    }

    // Delete audio file from S3
    async deleteAudioFile(key: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        await this.s3Client.send(command);
    }

    // Generate unique key for audio files
    generateAudioKey(questionLogUUID: string, mimeType: string = 'audio/mpeg'): string {
        const timestamp = Date.now();
        const extension = this.getFileExtensionFromMime(mimeType);
        return `audio-answers/${questionLogUUID}/${timestamp}.${extension}`;
    }

    private getFileExtensionFromMime(mimeType: string): string {
        const mimeToExt: { [key: string]: string } = {
            'audio/webm': 'webm',
            'audio/mpeg': 'mp3',
            'audio/wav': 'wav',
            'audio/ogg': 'ogg',
            'audio/x-m4a': 'm4a',
            'audio/mp4': 'mp4',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif'
        };
        return mimeToExt[mimeType] || 'bin';
    }
}