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

const container = new Container();

//? Database Module
container.bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService);

//? Department Module
container.bind<IDepartmentRepository>(TYPES.IDepartmentRepository).to(DepartmentRepository);
container.bind<IDepartmentService>(TYPES.IDepartmentService).to(DepartmentRepository); // Assuming DepartmentRepository implements IDepartmentService

//? Question Module
container.bind<IQuestionRepository>(TYPES.IQuestionRepository).to(QuestionRepository);
container.bind<IQuestionService>(TYPES.IQuestionService).to(QuestionService);

export default container;