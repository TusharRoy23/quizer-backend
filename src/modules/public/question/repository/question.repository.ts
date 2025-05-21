import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { IOpenAIService } from "../../../../core/openai/interface/IOpenAI.service";
import { QuestionPayloadType } from "../dto/question-payload.dto";
import { IDepartmentService } from "../../department/interface/IDepartment.service";

@injectable()
export class QuestionRepository extends BaseRepository implements IQuestionRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IOpenAIService) readonly openAIService: IOpenAIService,
        @inject(TYPES.IDepartmentService) readonly departmentService: IDepartmentService,
    ) {
        super(databaseService);
    }

    public async generatedQuestions(payload: QuestionPayloadType): Promise<string> {
        console.log('payload: ', payload);
        const department = await this.departmentService.getDepartmentByUUID(payload.department);
        // console.log('department: ', department);
        if (!department) {
            throw new Error('Department not found');
        }

        const topics = await this.departmentService.getTopicsByUUIDsAndDepartmentUUID(payload.topics, payload.department);
        // console.log('topics: ', topics);
        if (!topics || topics.length === 0) {
            throw new Error('Topics not found');
        }
        const topicNames = topics.map(topic => topic.name).join(', ');

        const prompt = `
            Generate ${payload.question_count} ${payload.difficulty}-level multiple choice quiz questions about ${topicNames} for ${department.name} department.
            Each question should:
            1. Be clear and concise
            2. Have 4 plausible options (labeled a, b, c, d)
            3. Mark the correct answer(s)
            4. Cover different aspects of ${topicNames}
            5. Vary in style (some conceptual, some applied)

            Format the response as a JSON array where each question has:
            {
                "question": "The actual question text",
                "options": ["Option a", "Option b", "Option c", "Option d"],
                "correctAnswer": [1], // index number or 1,2 indices for multiple correct answers
                "questionType": "choice" // or "multiple-choice",
            }

            Example:
            [
                {
                    "question": "What is the capital of France?",
                    "options": ["London", "Berlin", "Paris", "Madrid"],
                    "correctAnswer": [2]
                    "questionType": "choice"
                },
                {
                    "question: "Which are the Frontend frameworkes or libraries?",
                    "options": ["React", "Angular", "Vue", "Django"],
                    "correctAnswer": [0, 1, 2],
                    "questionType": "multiple-choice"
                }
            ]

            Now generate the requested questions about ${topicNames}:
        `;
        console.log('prompt: ', prompt);
        // const response = await this.openAIService.getChatCompletions(prompt);
        // console.log('response: ', response);
        return "Generated questions based on the payload";
    }
}