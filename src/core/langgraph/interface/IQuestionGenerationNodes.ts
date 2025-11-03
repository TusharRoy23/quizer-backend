import { QuestionGenerationState } from "../states/question-generation.state";

export interface IQuestionGenerationNodes {
    initializeConversation(state: QuestionGenerationState): any;
    askForPermission(state: QuestionGenerationState): any;
    askForDepartment(state: QuestionGenerationState): any;
    askForTopics(state: QuestionGenerationState): any;
    askForTimer(state: QuestionGenerationState): any;
    askForQuestionCount(state: QuestionGenerationState): any;
    askForConfirmGeneration(state: QuestionGenerationState): any;
    endOfDiscussion(state: QuestionGenerationState): any;
    generateQuestions(state: QuestionGenerationState): any;
    changeHandler(state: QuestionGenerationState): any;
    infoHandler(state: QuestionGenerationState): any;
    askForHelp(state: QuestionGenerationState): any;
}