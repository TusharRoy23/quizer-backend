import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { inject, injectable } from "inversify";
import { TYPES } from "../type.core"
import { IQuestionDiscussionNodes } from "./interface/IQuestionDiscussionNodes";
import { QuestionDiscussionState } from "./states/question-discussion.state";
import { IGraphBuilder } from "./interface/IGraphBuilder";

@injectable()
export class GraphBuilder implements IGraphBuilder {
    constructor(
        @inject(TYPES.IQuestionDiscussion) private questionDiscussionNodes: IQuestionDiscussionNodes
    ) { }

    buildQuestionDiscussionGraph() {
        const builder = new StateGraph(QuestionDiscussionState)
            .addNode("initialize_discussion", (state) => this.questionDiscussionNodes.initializeDiscussion(state))
            .addNode("explain_correctness", (state) => this.questionDiscussionNodes.explainCorrectness(state))
            .addNode("provide_examples", (state) => this.questionDiscussionNodes.provideExamples(state))
            .addNode("explain_incorrect", (state) => this.questionDiscussionNodes.explainIncorrectOptions(state))
            .addNode("give_background", (state) => this.questionDiscussionNodes.giveBackgroundContext(state))
            .addNode("general_clarification", (state) => this.questionDiscussionNodes.generalClarification(state))
            .addNode("clarify_term", (state) => this.questionDiscussionNodes.clarifyTerm(state))
            .addNode("analyze_code_relevance", (state) => this.questionDiscussionNodes.analyzeCodeRelevance(state))
            .addNode("avoid_unnecessary_content", (state) => this.questionDiscussionNodes.avoidUnnecessaryContent(state))

            // Edges configuration
            .addEdge(START, "initialize_discussion")
            .addConditionalEdges("initialize_discussion",
                (state) => state.currentIntent,
                {
                    'explain_correctness': 'explain_correctness',
                    'provide_examples': 'provide_examples',
                    'explain_incorrect': 'explain_incorrect',
                    'give_background': 'give_background',
                    'general_clarification': 'general_clarification',
                    'clarify_term': 'clarify_term',
                    'analyze_code_relevance': 'analyze_code_relevance',
                    'avoid_unnecessary_content': 'avoid_unnecessary_content',
                },

            )
            .addEdge("explain_correctness", END)
            .addEdge("provide_examples", END)
            .addEdge("explain_incorrect", END)
            .addEdge("give_background", END)
            .addEdge("general_clarification", END)
            .addEdge("clarify_term", END)
            .addEdge("analyze_code_relevance", END)
            .addEdge("avoid_unnecessary_content", END);

        const checkpointer = new MemorySaver();

        return builder.compile({
            checkpointer
        });
    }

    get graph() {
        return this.buildQuestionDiscussionGraph();
    }
}