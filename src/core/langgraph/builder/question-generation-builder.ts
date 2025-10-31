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
            .addNode("askForDepartment", (state) => this.questionGenerationNodes.askForDepartment(state), {
                ends: ["askForTopics", "changeHandler", "infoHandler", "askForHelp"]
            })
            .addNode("askForTopics", (state) => this.questionGenerationNodes.askForTopics(state), {
                ends: ["askForTimer", "changeHandler", "infoHandler", "askForHelp"]
            })
            .addNode("askForTimer", (state) => this.questionGenerationNodes.askForTimer(state), {
                ends: ["askForQuestionCount", "changeHandler", "infoHandler", "askForHelp"]
            })
            .addNode("askForQuestionCount", (state) => this.questionGenerationNodes.askForQuestionCount(state), {
                ends: ["askForConfirmGeneration", "changeHandler", "infoHandler", "askForHelp"]
            })
            .addNode("askForConfirmGeneration", (state) => this.questionGenerationNodes.askForConfirmGeneration(state), {
                ends: ["endOfDiscussion", "generateQuestions", END]
            })
            .addNode("askForHelp", (state) => this.questionGenerationNodes.askForHelp(state), {
                ends: ["askForDepartment", "initializeConversation", "askForTopics", "askForTimer", "askForQuestionCount"]
            })
            .addNode("generateQuestions", (state) => this.questionGenerationNodes.generateQuestions(state))
            .addNode("changeHandler", (state) =>
                this.questionGenerationNodes.changeHandler(state),
                { ends: ["askForDepartment", "initializeConversation", "askForTopics", "askForTimer", "askForQuestionCount"] }
            )
            .addNode("infoHandler", (state) =>
                this.questionGenerationNodes.infoHandler(state), {
                ends: ["askForDepartment", "initializeConversation", "askForTopics", "askForTimer", "askForQuestionCount"]
            }
            )
            .addNode("endOfDiscussion", (state) => this.questionGenerationNodes.endOfDiscussion(state))
            .addEdge(START, "initializeConversation")
            .addEdge("initializeConversation", "askForPermission");

        return builder.compile({
            checkpointer: checkpointer
        });
    }

    get graph() {
        return this.buildGraph();
    }
}