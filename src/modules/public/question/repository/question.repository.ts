import { inject, injectable } from "inversify";
import { IQuestionRepository } from "../interface/IQuestion.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { IOpenAIService } from "../../../../core/openai/interface/IOpenAI.service";
import { QuestionGeneratePayloadType } from "../dto/question-generate-payload.dto";
import { IDepartmentService } from "../../department/interface/IDepartment.service";
import { IUserService } from "../../user/interface/IUser.service";
import { Department, Participant, Question, QuestionLog, Topic } from "../../types/public.type";
import { QuestionSavePayloadType } from "../dto/question-save-payload.dto";
import { NotFoundException, throwException } from "../../../../shared/errors/all.exception";
import { RequestContext } from "../../../../shared/context/request-context";

type QuestionLogPayloadType = {
    department: number;
    participant: number | undefined;
    timer: number;
    question_count: number;
    difficulty: string;
}
@injectable()
export class QuestionRepository extends BaseRepository implements IQuestionRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
        @inject(TYPES.IOpenAIService) readonly openAIService: IOpenAIService,
        @inject(TYPES.IDepartmentService) readonly departmentService: IDepartmentService,
        @inject(TYPES.IUserService) readonly userService: IUserService,
    ) {
        super(databaseService);
    }

    public async generatedQuestions(payload: QuestionGeneratePayloadType): Promise<string> {
        try {
            const participant = this.getParticipant();
            const department = await this.departmentService.getDepartmentByUUID(payload.department);
            if (!department) {
                throw new NotFoundException('Department not found');
            }

            const topics = await this.departmentService.getTopicsByUUIDsAndDepartmentUUID(payload.topics, payload.department);
            if (!topics || topics.length === 0) {
                throw new NotFoundException('Topics not found');
            }

            const questionPayload: QuestionLogPayloadType = {
                department: department?.id,
                participant: participant?.id,
                timer: payload.timer,
                question_count: payload.question_count,
                difficulty: payload.difficulty,
            };
            const promptResponse = await this.getPromptQuestions(payload, department, topics);
            const questionLog = await this.saveQuestionLog(questionPayload);
            await this.connectTopicsWithQuestionLog(topics, questionLog.id);
            await this.saveQuestions(promptResponse, questionLog.id);

            return questionLog.uuid; // Return the UUID of the question log
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getGeneratedQuestions(questionLogUUID: string): Promise<Question[]> {
        // This method is not implemented in the original code.
        // Implement the logic to retrieve generated questions from the database.
        const participant = this.getParticipant();
        try {
            const prisma = await this.prisma$();
            const questions = await prisma.question_log_question.findMany({
                where: {
                    question_log: {
                        uuid: questionLogUUID,
                        completed: false,
                        participant: participant?.id // Ensure the question log belongs to the participant
                    }
                }
            });
            if (!questions || questions.length === 0) {
                throw new NotFoundException('No questions found. Please generate questions first.');
            }
            return questions.map((question: Question) => ({
                uuid: question.uuid,
                question: question.question,
                options: question.options,
                question_type: question.question_type,
            }));
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async saveAnswerForQuestion(questionLogUUID: string, payload: QuestionSavePayloadType): Promise<Question> {
        // This method is not implemented in the original code.
        // Implement the logic to submit answers for questions.
        try {
            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    completed: false, // Ensure the question log is not completed
                }
            });

            if (!questionLog) {
                throw new NotFoundException('Question log not found or already completed');
            }

            const submittedAnswers = payload.answers.sort((a, b) => a - b);
            const update = await prisma.question_log_question.update({
                where: {
                    uuid: payload.uuid,
                    question_log: {
                        completed: false, // Ensure the question log is not completed
                    }
                },
                data: {
                    selected_answer: submittedAnswers,
                }
            });

            const { answer, created_at, question_log_id, ...questionData } = update;

            return questionData as Question;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async submitQuestionLog(questionLogUUID: string): Promise<string> {
        // This method is not implemented in the original code.
        // Implement the logic to submit the question log and retrieve the questions.
        try {
            const prisma = await this.prisma$();
            const questionLog = await this.getQuestionLogByUUID(questionLogUUID, false);

            const questions = await prisma.question_log_question.findMany({
                where: {
                    question_log_id: questionLog.id,
                },
            });


            const result = {
                timer: questionLog.timer,
                difficulty: questionLog.difficulty,
                total_questions: questionLog.question_count,
                total_answers: 0,
                correct_answers: 0,
                score: 0
            };

            questions.forEach((question: Question) => {
                if (question.selected_answer.length > 0) {
                    result.total_answers += 1
                }

                if (question.answer.join(',') === question.selected_answer.join(',')) {
                    result.correct_answers += 1;
                }
            });

            result.score = (result.correct_answers / result.total_questions) * 100;
            //! PROBLEM: An operation failed because it depends on one or more records 
            //! that were required but not found. Record to update not found.
            const questionLogUpdate = await prisma.question_log.update({
                where: {
                    uuid: questionLogUUID,
                    completed: false, // Ensure the question log is not completed
                },
                data: {
                    completed: true, // Mark the question log as completed,
                    score: result.score,
                    total_answers: result.total_answers,
                    total_correct: result.correct_answers,
                }
            });

            if (!questionLogUpdate) {
                throw new NotFoundException('Question log not found or already completed');
            }

            return "Question log submitted successfully. You can now retrieve the questions.";
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getQuizResult(questionLogUUID: string): Promise<QuestionLog> {
        // This method is not implemented in the original code.
        // Implement the logic to retrieve the quiz result based on the question log UUID.
        try {
            const questionLog = await this.getQuestionLogByUUID(questionLogUUID, true);
            console.log('questionLog: ', questionLog);

            return questionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    public async getQuestionLogs(): Promise<QuestionLog[]> {
        try {
            const participant = this.getParticipant();
            const prisma = await this.prisma$();
            const questionLogs = await prisma.question_log.findMany({
                where: {
                    participant: participant?.id,
                    completed: true, // Only retrieve completed question logs
                },
            });
            return questionLogs.map((questionLog: any) => ({
                uuid: questionLog.uuid,
                department: questionLog.question_department,
                timer: questionLog.timer,
                difficulty: questionLog.difficulty,
                question_count: questionLog.question_count,
                completed: questionLog.completed,
                score: questionLog.score,
                total_answers: questionLog.total_answers,
                total_correct: questionLog.total_correct,
            })) as QuestionLog[];
        } catch (error) {
            return throwException(error);
        }

        return []
    }

    private async getQuestionLogByUUID(questionLogUUID: string, isCompleted: boolean = true): Promise<QuestionLog> {
        // This method is not implemented in the original code. 
        try {
            const participant = this.getParticipant();

            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log.findUnique({
                where: {
                    uuid: questionLogUUID,
                    completed: isCompleted, // Ensure the question log is not completed
                    participant: participant?.id
                },
                include: {
                    question_department: true,
                    // participant: true
                }
            });
            if (!questionLog) {
                throw new NotFoundException('Question log not found or not completed');
            }

            const result = {
                id: questionLog.id,
                uuid: questionLog.uuid,
                department: questionLog.question_department,
                timer: questionLog.timer,
                difficulty: questionLog.difficulty,
                question_count: questionLog.question_count,
                completed: questionLog.completed,
                score: questionLog.score,
                total_answers: questionLog.total_answers,
                total_correct: questionLog.total_correct,
            }

            return result as QuestionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async saveQuestionLog(payload: QuestionLogPayloadType) {
        // Save the question log to the database
        // This is a placeholder function. Implement the actual logic to save the question log.
        try {
            const prisma = await this.prisma$();
            const questionLog = await prisma.question_log.create({
                data: payload
            });
            return questionLog;
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async getPromptQuestions(payload: QuestionGeneratePayloadType, department: Department, topics: Topic[]): Promise<Question[]> {
        // Get the prompt questions from the DeepSeek
        // This is a placeholder function. Implement the actual logic to get the prompt questions.
        try {
            const prompt = this.getPromptForQuiz(department, topics, payload);
            const response = await this.openAIService.getChatCompletions(prompt);
            const parsedJSON = JSON.parse(response);
            return parsedJSON['questions'];
        } catch (error) {
            return throwException(error);
        }
    }

    private async saveQuestions(questions: Question[], questionLogId: number): Promise<void> {
        // Save the questions to the database
        // This is a placeholder function. Implement the actual logic to save the questions.
        try {
            const prisma = await this.prisma$();
            const questionData = questions.map((question: Question) => ({
                question_log_id: questionLogId,
                question: question.question,
                options: question.options, // Ensure options are trimmed
                answer: question.answer.sort((a, b) => a - b), // Sort the answer indices
                question_type: question.question_type,
                explanation: question.explanation, // Ensure explanation is trimmed
            }));
            const count = await prisma.question_log_question.createMany({
                data: questionData,
                skipDuplicates: true, // Skip duplicates if any
            });

            if (count.count === 0) {
                throw new NotFoundException('No questions were saved');
            }
        } catch (error: any) {
            return throwException(error);
        }
    }

    private async connectTopicsWithQuestionLog(topics: Topic[], questionLogId: number): Promise<number> {
        // Connect the topics with the question log
        // This is a placeholder function. Implement the actual logic to connect the topics with the question log.
        try {
            const prisma = await this.prisma$();
            const payload = topics.map(topic => ({
                question_log_id: questionLogId,
                topic_id: topic.id,
            }));
            const count = await prisma.question_log_topic.createMany({
                data: payload,
                skipDuplicates: true, // Skip duplicates if any
            });

            return count.count; // Return the number of connected topics
        } catch (error: any) {
            return throwException(error);
        }
    }

    private getPromptForQuiz(department: Department, topics: Topic[], payload: QuestionGeneratePayloadType): string {
        const topicNames = topics.map(topic => topic.name).join(', ');
        const prompt = `
            Generate ${payload.question_count} UNIQUE ${payload.difficulty}-level multiple choice quiz 
            questions about ${topicNames} for ${department.name} department.
            
            **Requirements:**
            1. Each question must be **completely unique** (avoid repeating common quiz questions).
            2. Cover **different aspects and subtopics** of ${topicNames}.
            3. Include **some less common but still relevant concepts**.
            4. Vary question formats (**definition, scenario-based, comparison, etc.**).
            5. Provide a **clear and concise explanation** for why the correct answer is right.
            6. Ensure explanations are **instructive** (not just repeating the answer).

            **Response Format (JSON):**
            {
                "questions": [
                    {
                        "question": "The question text",
                        "options": ["Option A", "Option B", "Option C", "Option D"],
                        "answer": [1], // Index of correct option(s)
                        "question_type": "CHOICE" | "MULTIPLE_CHOICE",
                        "explanation": "A clear explanation of why the answer is correct."
                    },
                    // More questions...
                ]
            }

            **Example:**
            {
                "questions": [
                    {
                        "question": "What is the capital of France?",
                        "options": ["London", "Berlin", "Paris", "Madrid"],
                        "answer": [2],
                        "question_type": "CHOICE",
                        "explanation": "Paris is the capital of France, a well-known fact in geography. London is the capital of the UK, Berlin is Germany's capital, and Madrid is Spain's capital."
                    },
                    {
                        "question": "Which of these are frontend frameworks?",
                        "options": ["React", "Angular", "Vue", "Django"],
                        "answer": [0, 1, 2],
                        "question_type": "MULTIPLE_CHOICE",
                        "explanation": "React, Angular, and Vue are all JavaScript frontend frameworks. Django, however, is a Python backend framework and does not belong in this list."
                    }
                ]
            }

            **Now generate the requested questions about ${topicNames}:**
        `;
        return prompt;
    }

    private getParticipant() {
        // This method is not implemented in the original code.
        // Implement the logic to retrieve the participant from the request context.
        const participant = RequestContext.getParticipant();
        if (!participant) {
            throw new NotFoundException('Participant not found');
        }
        return participant;
    }
}