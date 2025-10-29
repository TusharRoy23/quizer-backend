import { StateGraph, START, END, interrupt, MemorySaver, Command } from "@langchain/langgraph";
import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { askPermissionSchema, departmentNodeSchema, InputValidationSchema, QuestionGenerationStateSchema } from "../states/question-generation.state";
import { z } from "zod";
import { isValidPositiveNumber } from "../../../shared/utils/utils";
import { NextStep } from "../../../shared/utils/enum";

const checkpointer = new MemorySaver();
const deepSeekModel = new ChatDeepSeek({
    model: 'deepseek-coder',
    temperature: 0.4,
    cache: false
});

const outputSchema = deepSeekModel.withStructuredOutput(InputValidationSchema);


const baseSystemPrompt = `
    You are a teacher for a student. As you will create some questions depends on-
    1. Department- Valid & existing Department.
    2. Topic(s)- Valid topic(s) which must be valid under the given department.
    3. Timer- Valid time in minutes to run the exam. Max: 20 min & Min: 1 min
    4. Question Count- How many questions user want to answer? User can select: 5, 10 or 15 questions.

`;

export const questionGraph = new StateGraph(QuestionGenerationStateSchema)
    .addNode("startConversation", async (state) => {
        const systemPrompt = `
            You're a smart & helpful tutor. You will going to ask about these below topics on your next conversation with the student.
            - Department.
            - Topic(s) of that department.
            - Timer for quiz. And it must be in minutes.
            - Question count for quiz. This will be use for the count of the questions for a quiz.
            Start by greeting & informing about these topics. 
            Please use simple, professional, and educational tone for a student.
            Ask user by saying - "If you want to continue say "Yes" otherwise "No".
        `;
        const prompt = await deepSeekModel.invoke([
            { role: "system", content: systemPrompt }
        ]);
        return {
            messages: [
                {
                    role: "assistant",
                    content: prompt.content,
                    timestamp: Date.now()
                }
            ],
            lastAssistantMessage: prompt.content
        }
    })
    .addNode("askForPermission", async (state) => {
        let prompt = `
                    ${state.lastAssistantMessage}
                `;
        while (true) {
            const answer = interrupt(prompt);
            const sysPrompt = `Return "yes" if the user agreed otherwise "no". If user said none of them, return "none".`;
            const userPrompt = `User said: {answer}`;

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                ["system", sysPrompt],
                ["user", userPrompt]
            ]);
            const result = await promptTemplate.pipe(
                deepSeekModel.withStructuredOutput(askPermissionSchema)
            ).invoke({
                answer: answer
            });
            const permission = result.permission.toLocaleLowerCase();
            if (typeof permission === "string" && permission === "yes") {
                return new Command({ goto: "askForDepartment" });
            } else if (typeof permission === "string" && permission === "no") {
                return new Command({ goto: "endOfDiscussion" });
            }
            prompt = `You have to type **Yes** or **No** for further action.`;
        }
    })
    .addNode("askDepartment", async (state) => {
        const askDeptSchema = deepSeekModel.withStructuredOutput(departmentNodeSchema);
        let prompt = `Let's begin setting up your question generation.
                \n\nPlease tell me the department (e.g., Software Engineering, Math, Physics, Chemistry, etc.).`;
        while (true) {
            const department = interrupt(prompt);

            const sysPrompt = `
                            ${baseSystemPrompt}
                                Check if the given department is valid based on known departments 
                                (e.g., Educational Institution, Engineering, Corporate Office, Software Industry, Medicine, Human Resource etc.).
                                Return:
                                - isValid: true/false
                                - message: short hint if invalid or needs clarification
                                - topics: 3 related topics as a string array
                                If the input is too broad (e.g., Engineering, Policy Maker), return isValid=false and 
                                suggest more specific options (e.g., Software Engineering, Mechanical Engineering).
                            `;
            const userPrompt = `
                                User provided: {department}
                            `;

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                ["system", sysPrompt],
                ["user", userPrompt]
            ]);
            const result = await promptTemplate.pipe(askDeptSchema).invoke({
                department: department
            });

            if (!result.isValid) {
                prompt = `${result?.message}`;
            } else {
                return {
                    messages: [
                        { role: "assistant", content: department, timestamp: Date.now() },
                    ],
                    generationContext: {
                        department: department,
                    },
                    hintFortopics: result.topics || []
                };
            }
        }
    })
    .addNode("askTopics", async (state) => {
        const outputSchema = deepSeekModel.withStructuredOutput(InputValidationSchema);
        const department = state.generationContext?.department;
        const hintFortopics = state.hintFortopics || [];
        let prompt = `Great! You selected **${department}**.
                \n\nPlease provide **up to two topics** within this department.
                \n\n**Note:** Use commas (,) to separate multiple topics.
                \n\nExample: ${hintFortopics?.join(", ")}.`;

        while (true) {
            const topics = interrupt(prompt);
            const sysPrompt = `
                                ${baseSystemPrompt}
                                Now, can you check if these are valid Topics of {department} department?
                                Return true if it is valid otherwise false.
                            `;
            const userPrompt = `
                                Department: {department},
                                Topics: {topics}
                            `;
            const promptTemplate = await ChatPromptTemplate.fromMessages([
                ["system", sysPrompt],
                ["user", userPrompt]
            ]);
            const result = await promptTemplate.pipe(outputSchema).invoke({
                department: department,
                topics: topics
            });

            if (!result.isValid) {
                prompt = `**${topics}** - These topics are invalid for **${department}** Department.
                        \n\nN.B. Please use **comma(,)** separated value for multiple topics`;
            } else {
                return {
                    messages: [
                        { role: "assistant", content: topics, timestamp: Date.now() },
                    ],
                    generationContext: {
                        ...state.generationContext,
                        topics: topics.split(",").map((topic: string) => topic.trim())
                    }
                };
            }
        }
    })
    .addNode("askTimer", async (state) => {
        const { department, topics } = state.generationContext;
        let prompt = `Got it. **Department: ${department}**, **Topics: ${topics}**.
                \n\nHow long should the timer be **(in minutes)**? 
                \n\n**Max**: 20 minutes.
                \n\n**Min**: 1 minute.`;
        while (true) {
            const timer = interrupt(prompt);
            if (!isValidPositiveNumber(timer)) {
                prompt = `Time must be an number`;
            } else {
                const number = Number(timer);
                if (number < 1 || number > 20) {
                    prompt = `**Max**: 20 minutes.
                            **Min**: 1 minute.`;
                } else {
                    return {
                        messages: [
                            { role: "assistant", content: number, timestamp: Date.now() },
                        ],
                        generationContext: {
                            ...state.generationContext,
                            timer: number
                        }
                    };
                }
            }
        }
    })
    .addNode("askQuestionCount", async (state) => {
        const questionCountArr = [5, 10, 15];
        const { timer } = state.generationContext;
        let prompt = `Perfect. The timer is set to **${timer}** minute(s).
        \n\nHow many questions would you like to generate? (**5**, **10**, or **15**)`;
        while (true) {
            const questionCount = interrupt(prompt);
            if (!isValidPositiveNumber(questionCount)) {
                prompt = `We need valid numbers to generate questions.`;
            } else {
                const number = Number(questionCount);
                if (!questionCountArr.includes(number)) {
                    prompt = `Number should be - **5**, **10**, or **15**`;
                } else {
                    return {
                        messages: [
                            { role: "assistant", content: number, timestamp: Date.now() },
                        ],
                        generationContext: {
                            ...state.generationContext,
                            question_count: number
                        }
                    };
                }
            }
        }
    })
    .addNode("askForConfirmGeneration", async (state) => {
        const { department, topics, timer, question_count } = state.generationContext;

        let prompt = `Here's a summary of your setup:
        \n\n**Department**: ${department}
        \n\n**Topics**: ${topics}.
        \n\n**Timer**: ${timer} minutes.
        \n\n**Question Count**: ${question_count}.
        \n\nShould I proceed with question generation?
        \n\nPlease type **Yes** or **No**.`;
        while (true) {
            const isItConfirm = interrupt(prompt);
            if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'no') {
                return new Command({ goto: "endOfDiscussion" });
            } else if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'yes') {
                return new Command({
                    goto: "generateQuestions", update: {
                        messages: [
                            { role: "assistant", content: state.generationContext, timestamp: Date.now() },
                        ]
                    }
                });
            }
            prompt = `You need to type **Yes** or **No** for further action.`;
        }
    })
    .addEdge(START, "startConversation")
    .addEdge("startConversation", "askForPermission")
    .addEdge("askForPermission", "askDepartment")
    .addEdge("askDepartment", "askTopics")
    .addEdge("askTopics", "askTimer")
    .addEdge("askTimer", "askQuestionCount")
    .addEdge("askQuestionCount", "askForConfirmGeneration")
    .addEdge("askForConfirmGeneration", END)
    .compile({
        checkpointer
    });