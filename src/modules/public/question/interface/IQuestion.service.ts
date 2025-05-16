export interface IQuestionService {
    generatedQuestions: (payload: any) => Promise<string>;
}