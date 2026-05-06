import 'reflect-metadata';
import { server } from './server';
import container from './core/container.core';
import { IDatabaseService } from './core/interface/IDatabase.service';
import { ICronService } from './core/interface/ICron.service';
import { TYPES } from './core/type.core';

async function startApp() {
    try {
        const databaseService = container.get<IDatabaseService>(TYPES.IDatabaseService);
        const isHealthy = await databaseService.healthCheck();

        if (!isHealthy) {
            throw new Error('Database connection failed');
        }

        console.log('Database connected');

        const cronService = container.get<ICronService>(TYPES.ICronService);
        await cronService.initialize();

        console.log('Cron jobs initialized');

        const port: number = Number(process.env.APP_PORT) || 8000;
        server.build().listen(port, () => console.log(`Server is running on port ${port}`));

    } catch (error) {
        console.error('Failed to start app:', error);
        process.exit(1);
    }
}

startApp();