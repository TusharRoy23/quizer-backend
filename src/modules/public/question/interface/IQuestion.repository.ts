export interface IQuestionRepository {
    generatedQuestions: (payload: any) => Promise<string>;
}