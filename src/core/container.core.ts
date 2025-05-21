import { Container } from 'inversify';
import '../modules/index.controller';
import { IDepartmentRepository } from '../modules/public/department/interface/IDepartment.repository';
import { TYPES } from './type.core';
import { DepartmentRepository } from '../modules/public/department/repository/department.repository';
import { IDepartmentService } from '../modules/public/department/interface/IDepartment.service';
import { IDatabaseService } from './interface/IDatabase.service';
import { DatabaseService } from './service/database.service';
import { IQuestionRepository } from '../modules/public/question/interface/IQuestion.repository';
import { QuestionRepository } from '../modules/public/question/repository/question.repository';
import { IQuestionService } from '../modules/public/question/interface/IQuestion.service';
import { QuestionService } from '../modules/public/question/service/question.service';
import { IOpenAIService } from './openai/interface/IOpenAI.service';
import { DeepSeekService } from './openai/deepseek/service/deepseek.service';
import { DepartmentService } from '../modules/public/department/service/department.service';
import { IOpenAIRepository } from './openai/interface/IOpenAI.repository';
import { DeepSeekRepository } from './openai/deepseek/repository/deepseek.repository';

const container = new Container();

//? Database Module
container.bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService);
//? OpenAI Module
container.bind<IOpenAIService>(TYPES.IOpenAIService).to(DeepSeekService);
container.bind<IOpenAIRepository>(TYPES.IOpenAIRepository).to(DeepSeekRepository);

//? Department Module
container.bind<IDepartmentRepository>(TYPES.IDepartmentRepository).to(DepartmentRepository);
container.bind<IDepartmentService>(TYPES.IDepartmentService).to(DepartmentService);

//? Question Module
container.bind<IQuestionRepository>(TYPES.IQuestionRepository).to(QuestionRepository);
container.bind<IQuestionService>(TYPES.IQuestionService).to(QuestionService);

export default container;