import { QuestionDiscussionState } from "../states/question-discussion.state";

export interface IQuestionDiscussionNodes {
    initializeDiscussion(state: typeof QuestionDiscussionState.State): any;
    explainCorrectness(state: typeof QuestionDiscussionState.State): any;
    provideExamples(state: typeof QuestionDiscussionState.State): any;
    explainIncorrectOptions(state: typeof QuestionDiscussionState.State): any;
    giveBackgroundContext(state: typeof QuestionDiscussionState.State): any;
    generalClarification(state: typeof QuestionDiscussionState.State): any;
    clarifyTerm(state: typeof QuestionDiscussionState.State): any;
    analyzeCodeRelevance(state: typeof QuestionDiscussionState.State): any;
    avoidUnnecessaryContent(state: typeof QuestionDiscussionState.State): any;
}