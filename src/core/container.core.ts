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
import { OpenAIService } from './openai/service/openAI.service';
import { DepartmentService } from '../modules/public/department/service/department.service';
import { IOpenAIRepository } from './openai/interface/IOpenAI.repository';
import { OpenAIRepository } from './openai/repository/openAI.repository';
import { IUserRepository } from '../modules/public/user/interface/IUser.repository';
import { IUserService } from '../modules/public/user/interface/IUser.service';
import { UserRepository } from '../modules/public/user/repository/user.repository';
import { UserService } from '../modules/public/user/service/user.service';
import { RequestContextMiddleware } from '../middlewares/request-context.middleware';
import { SessionMiddleware } from '../middlewares/session.middleware';
import { VerbalQuestionRepository } from '../modules/public/question/repository/verbal-question.repository';
import { VerbalQuestionService } from '../modules/public/question/service/verbal-question.service';
import { IVerbalQuestionRepository } from '../modules/public/question/interface/IVerbalQuestion.repository';
import { IVerbalQuestionService } from '../modules/public/question/interface/IVerbalQuestion.service';
import { VerbalUploadMiddleware } from '../middlewares/verbal-upload.middleware';
import { IS3Service } from './interface/IS3.service';
import { S3Service } from './service/s3.service';
import { ILangChainRepository } from './openai/interface/ILangChain.repository';
import { LangChainRepository } from './openai/repository/langChain.repository';
import { LangChainService } from './openai/service/langChain.service';
import { ILangChainService } from './openai/interface/ILangChain.service';
import { IQuestionDiscussionNodes } from './langgraph/interface/IQuestionDiscussionNodes';
import { QuestionDiscussionNodes } from './langgraph/nodes/QuestionDiscussionNodes';
import { IGraphBuilder } from './langgraph/interface/IGraphBuilder';
import { GraphBuilder } from './langgraph/builder/graph-builder';
import { IQuestionDiscussionService } from './langgraph/interface/IQuestionDiscussion.service';
import { QuestionDiscussionService } from './langgraph/service/QuestionDiscussion.service';
import { IQuestionDiscussionRepository } from './langgraph/interface/IQuestionDiscussion.repository';
import { QuestionDiscussionRepository } from './langgraph/repository/QuestionDiscussion.repository';
import { IQuestionGenerationNodes } from './langgraph/interface/IQuestionGenerationNodes';
import { QuestionGenerationNodes } from './langgraph/nodes/QuestionGenerationNodes';
import { IQuestionGraphBuilder } from './langgraph/interface/IQuestionGraphBuilder';
import { QuestionGenerationGraphBuilder } from './langgraph/builder/question-generation-builder';

const container = new Container();

//? Database Module
container.bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService).inSingletonScope();
//? S3 Module
container.bind<IS3Service>(TYPES.IS3Service).to(S3Service).inSingletonScope();
//? OpenAI Module
container.bind<IOpenAIService>(TYPES.IOpenAIService).to(OpenAIService);
container.bind<IOpenAIRepository>(TYPES.IOpenAIRepository).to(OpenAIRepository);

//? LangChain
container.bind<ILangChainRepository>(TYPES.ILangChainRepository).to(LangChainRepository);
container.bind<ILangChainService>(TYPES.ILangChainService).to(LangChainService);

//? LangGraph
container.bind<IGraphBuilder>(TYPES.IGraphBuilder).to(GraphBuilder);
container.bind<IQuestionDiscussionNodes>(TYPES.IQuestionDiscussionNode).to(QuestionDiscussionNodes);
container.bind<IQuestionDiscussionService>(TYPES.IQuestionDiscussionService).to(QuestionDiscussionService);
container.bind<IQuestionDiscussionRepository>(TYPES.IQuestionDiscussionRepository).to(QuestionDiscussionRepository);
container.bind<IQuestionGenerationNodes>(TYPES.IQuestionGenerationNodes).to(QuestionGenerationNodes);
container.bind<IQuestionGraphBuilder>(TYPES.IQuestionGraphBuilder).to(QuestionGenerationGraphBuilder);

container.bind<RequestContextMiddleware>(RequestContextMiddleware).toSelf();
container.bind<SessionMiddleware>(SessionMiddleware).toSelf();
container.bind<VerbalUploadMiddleware>(VerbalUploadMiddleware).toSelf();

//? Department Module
container.bind<IDepartmentRepository>(TYPES.IDepartmentRepository).to(DepartmentRepository);
container.bind<IDepartmentService>(TYPES.IDepartmentService).to(DepartmentService);

//? Question Module
container.bind<IQuestionRepository>(TYPES.IQuestionRepository).to(QuestionRepository);
container.bind<IQuestionService>(TYPES.IQuestionService).to(QuestionService);

//? Verbal Question Module
container.bind<IVerbalQuestionRepository>(TYPES.IVerbalQuestionRepository).to(VerbalQuestionRepository);
container.bind<IVerbalQuestionService>(TYPES.IVerbalQuestionService).to(VerbalQuestionService);

//? User Module
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

export default container;