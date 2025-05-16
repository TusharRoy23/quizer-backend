import 'reflect-metadata';
import { server } from './server';

const port: number = Number(process.env.APP_PORT) || 8000;
server.build().listen(port, () => console.log(`Server is running on port ${port}`));