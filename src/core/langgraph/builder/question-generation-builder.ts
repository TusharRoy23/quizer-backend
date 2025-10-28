import { inject, injectable } from "inversify";
import { StateGraph, START, END, MemorySaver, interrupt } from "@langchain/langgraph";
import { IQuestionGraphBuilder } from "../interface/IQuestionGraphBuilder";
import { TYPES } from "../../type.core";
import { IQuestionGenerationNodes } from "../interface/IQuestionGenerationNodes";
import { QuestionGenerationStateSchema } from "../states/question-generation.state";

const checkpointer = new MemorySaver();

@injectable()
export class QuestionGenerationGraphBuilder implements IQuestionGraphBuilder {

    constructor(
        @inject(TYPES.IQuestionGenerationNodes) private readonly questionGenerationNodes: IQuestionGenerationNodes
    ) { }

    buildGraph() {
        const builder = new StateGraph(QuestionGenerationStateSchema)
            .addNode("initializeConversation", (state) => this.questionGenerationNodes.initializeConversation(state))
            .addNode("askForPermission", (state) => this.questionGenerationNodes.askForPermission(state), {
                ends: ["askForDepartment", END]
            })
            .addNode("askForDepartment", (state) => this.questionGenerationNodes.askForDepartment(state))
            .addNode("askForTopics", (state) => this.questionGenerationNodes.askForTopics(state))
            .addNode("askForTimer", (state) => this.questionGenerationNodes.askForTimer(state))
            .addNode("askForQuestionCount", (state) => this.questionGenerationNodes.askForQuestionCount(state))
            .addNode("askForConfirmGeneration", (state) => this.questionGenerationNodes.askForConfirmGeneration(state), {
                ends: ["endOfDiscussion", END]
            })
            .addNode("generateQuestions", (state) => this.questionGenerationNodes.generateQuestions(state))
            .addNode("endOfDiscussion", (state) => this.questionGenerationNodes.endOfDiscussion(state))
            .addEdge(START, "initializeConversation")
            .addEdge("initializeConversation", "askForPermission")
            .addConditionalEdges("askForPermission", (state) => {
                if (state.lastAssistantMessage === 'yes') {
                    return "askForDepartment";
                } else if (state.lastAssistantMessage === 'no') {
                    return "endOfDiscussion";
                }
                return interrupt(`You have to type "Yes" or "No" for further action.`);
            })
            .addEdge("askForDepartment", "askForTopics")
            .addEdge("askForTopics", "askForTimer")
            .addEdge("askForTimer", "askForQuestionCount")
            .addEdge("askForQuestionCount", "askForConfirmGeneration")
            .addConditionalEdges("askForConfirmGeneration", (state) => {
                const isItConfirm = state.lastAssistantMessage;
                if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'no') {
                    return "endOfDiscussion";
                } else if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'yes') {
                    return "generateQuestions";
                }
                return interrupt(`You need to type "Yes" or "No" for further action.`);
            })
            .addEdge("generateQuestions", END)
            .addEdge("endOfDiscussion", END)

        return builder.compile({
            checkpointer: checkpointer
        });
    }

    get graph() {
        return this.buildGraph();
    }
}