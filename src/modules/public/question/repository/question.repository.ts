import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BaseRepository } from "../../../../core/repository/base.repository";

@injectable()
export class QuestionRepository extends BaseRepository implements IQuestionRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService, // Replace 'any' with the actual type of your database service
    ) {
        super(databaseService);
    }

    public async generatedQuestions(payload: any): Promise<string> {
        console.log('payload: ', payload);
        // Implement the logic to fetch generated questions from the database
        // For example, using Prisma or any other ORM
        return "Generated questions based on the payload";
    }
}