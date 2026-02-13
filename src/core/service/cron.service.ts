import { injectable, inject } from 'inversify';
import CronJob from "node-cron";
import { IQuestionRepository } from '../../modules/public/question/interface/IQuestion.repository';
import { IDatabaseService } from '../interface/IDatabase.service';
import { TYPES } from '../type.core';
import { throwException } from '../../shared/errors/all.exception';
import { ICronService } from '../interface/ICron.service';

@injectable()
export class CronService implements ICronService {
    constructor(
        @inject(TYPES.IQuestionRepository) private questionRepository: IQuestionRepository,
        @inject(TYPES.IDatabaseService) private databaseService: IDatabaseService
    ) { }

    public async initialize() {
        // Wait for database connection
        const isHealthy = await this.databaseService.healthCheck();
        if (!isHealthy) {
            const errMsg = `Database not ready for cron jobs`;
            throwException(errMsg);
            console.error(errMsg);
            return;
        }

        // Start all cron jobs
        this.scheduleQuizTimerUpdate();
        // Add more cron jobs here as needed
    }

    private scheduleQuizTimerUpdate() {
        CronJob.schedule('*/30 * * * *', async () => {
            try {
                await this.questionRepository.updateQuizesTimer();
                console.log('Quiz timer updated successfully');
            } catch (error) {
                console.error('Failed to update quiz timer:', error);
            }
        });
    }
}