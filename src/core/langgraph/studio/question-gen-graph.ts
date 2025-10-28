import { StateGraph, START, END, interrupt, MemorySaver, Command } from "@langchain/langgraph";
import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { askPermissionSchema, departmentNodeSchema, InputValidationSchema, QuestionGenerationStateSchema } from "../states/question-generation.state";
import { z } from "zod";

const checkpointer = new MemorySaver();
const deepSeekModel = new ChatDeepSeek({
    model: 'deepseek-coder',
    temperature: 0.4,
    cache: false
});

const outputSchema = deepSeekModel.withStructuredOutput(InputValidationSchema);


let baseSystemPrompt = `
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
                { role: "assistant", content: prompt.content, timestamp: Date.now() }
            ],
            initConversationMessage: prompt.content
        }
    })
    .addNode("askForPermission", async (state) => {
        let prompt = `
            ${state.initConversationMessage}
        `;
        while (true) {
            const answer = interrupt(prompt);
            const sysPrompt = `
                Return "yes" if the user agreed otherwise "no".
                If user said none of them, return "none".
            `;
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
            if (permission === "yes") {
                return new Command({ goto: "askDepartment" })
            } else if (permission === "no") {
                return new Command({ goto: END });
            } else {
                prompt = `You have to say "Yes" or "No" for further action.`;
            }
        }
    })
    .addNode("askDepartment", async (state) => {
        const askDeptSchema = deepSeekModel.withStructuredOutput(departmentNodeSchema);
        let prompt = `
                    Let's begin setting up your question generation.
                    Please tell me the department (e.g., Software Engineering, Math, Physics, Chemistry, etc.).
                `;
        while (true) {
            const department = interrupt(prompt);

            const sysPrompt = `
            ${baseSystemPrompt}
                Now, can you check if it is a valid Department? 
                Ex. Educational Institution, Corporate Office, & Software Industry
                Return true if it is valid otherwise false.
                Also Return 3 topics of the given department as a string array.
            `;
            const userPrompt = `
                User provide department name: {department}
            `;

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                ["system", sysPrompt],
                ["user", userPrompt]
            ]);
            const result = await promptTemplate.pipe(askDeptSchema).invoke({
                department: department
            });

            if (!result.isValid) {
                prompt = `${department} - This is an invalid Department`;
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
        const department = state.generationContext?.department;
        const hintFortopics = state.hintFortopics || [];
        let prompt = `
            Great! You selected department: ${department}.
            Please provide up to two topics within ${department}.
            N.B. Please use comma(,) separated value for multiple topics
            Example: ${hintFortopics?.join(', ')}, etc.
        `;
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
                prompt = `
                    ${topics} - These topics are invalid for ${department} Department.
                    N.B. Please use comma(,) separated value for multiple topics
                `;
            } else {
                return {
                    messages: [
                        { role: "assistant", content: topics, timestamp: Date.now() },
                    ],
                    generationContext: {
                        ...state.generationContext,
                        topics: topics
                    }
                };
            }
        }
    })
    .addNode("askTimer", async (state) => {
        const { department, topics } = state.generationContext;
        let prompt = `
            Got it. Department: ${department}, Topics: ${topics}.
            How long should the timer be (in minutes)?
            Max: 20 minutes.
            Min: 1 minute
        `;
        while (true) {
            const timer = interrupt(prompt);
            if (typeof timer != "number") {
                prompt = `Time must be an number`;
            } else if (typeof timer === "number" && (timer < 1 || timer > 20)) {
                prompt = `
                    Max: 20 minutes.
                    Min: 1 minute
                `;
            } else {
                return {
                    messages: [
                        { role: "assistant", content: timer, timestamp: Date.now() },
                    ],
                    generationContext: {
                        ...state.generationContext,
                        timer: timer
                    }
                };
            }
        }
    })
    .addNode("askQuestionCount", async (state) => {
        const questionCountArr = [5, 10, 15];
        const { timer } = state.generationContext;
        let prompt = `
            Perfect. The timer is set to ${timer} minute(s).
            How many questions would you like to generate? (5, 10, or 15)
        `;
        while (true) {
            const questionCount = interrupt(prompt);
            if (typeof questionCount != "number" || !questionCountArr.includes(questionCount)) {
                prompt = `We need valid numbers to generate questions. And it should be - 5, 10, or 15`;
            } else {
                return {
                    messages: [
                        { role: "assistant", content: questionCount, timestamp: Date.now() },
                    ],
                    generationContext: {
                        ...state.generationContext,
                        question_count: questionCount
                    }
                };
            }
        }
    })
    .addNode("askForConfirmGeneration", async (state) => {
        const { department, topics, timer, question_count } = state.generationContext;

        let prompt = `
            Here's a summary of your setup:
            - Department: ${department}
            - Topics: ${topics}
            - Timer: ${timer} minutes
            - Question Count: ${question_count}

            Should I proceed with question generation?
            Please type "Yes" or "No".
        `;
        while (true) {
            const isItConfirm = interrupt(prompt);
            if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'yes') {
                return {
                    messages: [
                        { role: "assistant", content: isItConfirm, timestamp: Date.now() },
                    ],
                    confirmedFields: Object.keys(state.generationContext)
                };
            } else if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'no') {
                return new Command({ goto: END })
            } else {
                prompt = `You need to type "Yes" or "No" for further action.`;
            }
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