import { ChatDeepSeek } from "@langchain/deepseek";
import { Command, END, interrupt } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { inject, injectable } from "inversify";
import { askPermissionSchema, departmentNodeSchema, HandlerSchema, HelperSchema, InputValidationSchema, Intent, IntentSchema, NodeMap, QuestionGenerationState } from "../states/question-generation.state";
import { IQuestionGenerationNodes } from "../interface/IQuestionGenerationNodes";
import { isValidPositiveNumber } from "../../../shared/utils/utils";
import { TYPES } from "../../type.core";
import { IQuestionRepository } from "../../../modules/public/question/interface/IQuestion.repository";
import { NextStep } from "../../../shared/utils/enum";

const baseSystemPrompt = `
    You are a teacher for a student. As you will create some questions depends on-
    1. Department- Valid & existing Department.
    2. Topic(s)- Valid topic(s) which must be valid under the given department.
    3. Timer- Valid time in minutes to run the exam. Max: 20 min & Min: 1 min
    4. Question Count- How many questions user want to answer? User can select: 5, 10 or 15 questions.

`;

@injectable()
export class QuestionGenerationNodes implements IQuestionGenerationNodes {
    private deepSeekModel: ChatDeepSeek;

    constructor(
        @inject(TYPES.IQuestionRepository) private readonly questionRepository: IQuestionRepository
    ) {
        this.deepSeekModel = new ChatDeepSeek({
            model: "deepseek-coder",
            temperature: 0.4,
            cache: false,
        });
    }

    /**
     * Start the conversation.
     */
    async initializeConversation(state: QuestionGenerationState) {
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
        const prompt = await this.deepSeekModel.invoke([
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
    }

    /*
        Ask for permission for further action
    */
    async askForPermission(state: QuestionGenerationState) {
        let prompt = `${state.lastAssistantMessage}`;
        while (true) {
            const answer = interrupt(prompt);
            const sysPrompt = `Return "yes" if the user agreed otherwise "no". If user said none of them, return "none".`;
            const userPrompt = `User said: {answer}`;

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                ["system", sysPrompt],
                ["user", userPrompt]
            ]);
            const result = await promptTemplate.pipe(
                this.deepSeekModel.withStructuredOutput(askPermissionSchema)
            ).invoke({
                answer: answer
            });
            const permission = result.permission.toLocaleLowerCase();
            if (typeof permission === "string" && permission === "yes") {
                return new Command({ goto: "askForDepartment", update: { lastAssistantMessage: null } });
            } else if (typeof permission === "string" && permission === "no") {
                return new Command({ goto: "endOfDiscussion", update: { lastAssistantMessage: null } });
            }
            prompt = `You have to type **Yes** or **No** for further action.`;
        }
    }

    /**
     * Ask for department
     */
    async askForDepartment(state: QuestionGenerationState) {
        const askDeptSchema = this.deepSeekModel.withStructuredOutput(departmentNodeSchema);
        let prompt = `Let's begin setting up your question generation.
                        \n\nPlease tell me the department (e.g., Software Engineering, Math, Physics, Chemistry, etc.).`;
        if (state.lastAssistantMessage) {
            prompt = `${state.lastAssistantMessage}\n\nNow, select your department.`;
        }
        while (true) {
            const department = interrupt(prompt);
            const intent = await this.detectGlobalIntent(department);

            // Handle global intents
            if (intent !== 'continue') {
                const value = {
                    lastUserMessage: department,
                    generationContext: {
                        ...state.generationContext,
                        lastNode: "department"
                    }
                };
                return this.handleGlobalIntent({
                    intent,
                    valueForChangeHandler: value,
                    valueForInfoHandler: value,
                    valueForHelper: value
                });
            }

            const sysPrompt = `
                                    ${baseSystemPrompt}
                                        Check if the given department is valid based on known departments 
                                        (e.g., Educational Institution, Engineering, Corporate Office, Software Industry, Medicine, Human Resource etc.).
                                        Return:
                                        - isValid: true/false
                                        - message: short hint if invalid or needs clarification
                                        - topics: 3 related topics as a string array
                                        If the input is too broad, return isValid=false and suggest more specific options.
                                    `;

            const promptTemplate = await ChatPromptTemplate.fromMessages([
                ["system", sysPrompt],
                ["user", "User provided: {department}"]
            ]);
            const result = await promptTemplate.pipe(askDeptSchema).invoke({
                department: department
            });

            if (!result.isValid) {
                prompt = `${result?.message}`;
            } else {
                return new Command({
                    goto: "askForTopics",
                    update: {
                        messages: [
                            { role: "assistant", content: department, timestamp: Date.now() },
                        ],
                        generationContext: {
                            ...state.generationContext,
                            department,
                            topics: [],
                            lastNode: "department"
                        },
                        hintFortopics: result.topics || [],
                        lastAssistantMessage: null
                    }
                });
            }
        }
    }

    /**
     * Ask for topics
     */
    async askForTopics(state: QuestionGenerationState) {
        const outputSchema = this.deepSeekModel.withStructuredOutput(InputValidationSchema);
        const department = state.generationContext?.department;
        const hintFortopics = state.hintFortopics || [];
        let prompt = `Great! You selected **${department}**.
                        \n\nPlease provide **up to two topics** within this department.
                        \n\n**Note:** Use commas (,) to separate multiple topics.
                        \n\nExample: ${hintFortopics?.join(", ")}.`;

        if (state.lastAssistantMessage) {
            prompt = `${state.lastAssistantMessage}\n\nNow, select your topic(s).\n\nN.B. Please use **comma(,)** separated value for multiple topics`;
        }

        if (!department) {
            return this.routeTo("askForDepartment", {
                ...state.generationContext,
                lastAssistantMessage: "You need to select **department** first."
            });
        }

        while (true) {
            const topics = interrupt(prompt);
            const intent = await this.detectGlobalIntent(topics);
            const stateValue = {
                lastUserMessage: topics,
                generationContext: {
                    ...state.generationContext,
                    lastNode: "topics"
                },
                lastAssistantMessage: state.lastAssistantMessage
            };

            // Handle global intents
            if (intent !== 'continue') {
                return this.handleGlobalIntent({
                    intent,
                    valueForChangeHandler: stateValue,
                    valueForInfoHandler: stateValue,
                    valueForHelper: stateValue
                });
            }

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
                // prompt = `**${topics}** - These topics are invalid for **${department}** Department.
                //         \n\nN.B. Please use **comma(,)** separated value for multiple topics`;
                return this.handleGlobalIntent({
                    intent: Intent.HELP,
                    valueForChangeHandler: stateValue,
                    valueForInfoHandler: stateValue,
                    valueForHelper: stateValue
                });
            } else {
                const topicArr = topics.split(",").map((topic: string) => topic.trim()) as string[];
                if (topicArr?.length <= 2) {
                    return new Command({
                        goto: "askForTimer",
                        update: {
                            messages: [
                                { role: "assistant", content: topics, timestamp: Date.now() },
                            ],
                            generationContext: {
                                ...state.generationContext,
                                topics: topicArr,
                                lastNode: "topics"
                            },
                            lastAssistantMessage: null
                        }
                    });
                } else {
                    prompt = `Please provide **up to two topics** within this department - **${department}**`;
                }
            }
        }
    }

    /**
     * Ask for timer (in minutes)
     */
    async askForTimer(state: QuestionGenerationState) {
        const { department, topics } = state.generationContext;
        let prompt = `Got it. **Department: ${department}**, **Topics: ${topics}**.
                \n\nHow long should the timer be **(in minutes)**? 
                \n\n**Max**: 20 minutes.
                \n\n**Min**: 1 minute.`;

        if (state.lastAssistantMessage) {
            prompt = `${state.lastAssistantMessage}\n\nHow many minutes do you need?`;
        }

        if (!topics.length) {
            return this.routeTo("askForTopics", {
                ...state.generationContext,
                lastAssistantMessage: "You need to select **topic(s)** first."
            });
        }

        while (true) {
            const timer = interrupt(prompt);
            const intent = await this.detectGlobalIntent(timer);

            // Handle global intents
            if (intent !== 'continue') {
                const value = {
                    lastUserMessage: timer,
                    generationContext: {
                        ...state.generationContext,
                        lastNode: "timer"
                    }
                };
                return this.handleGlobalIntent({
                    intent,
                    valueForChangeHandler: value,
                    valueForInfoHandler: value,
                    valueForHelper: value
                });
            }

            if (!isValidPositiveNumber(timer)) {
                prompt = `Time must be an number`;
            } else {
                const number = Number(timer);
                if (number < 1 || number > 20) {
                    prompt = `**Max**: 20 minutes.
                            **Min**: 1 minute.`;
                } else {
                    return new Command({
                        goto: "askForQuestionCount",
                        update: {
                            messages: [
                                { role: "assistant", content: number, timestamp: Date.now() },
                            ],
                            generationContext: {
                                ...state.generationContext,
                                timer: number,
                                lastNode: "timer"
                            },
                            lastAssistantMessage: null
                        }
                    });
                }
            }
        }
    }

    /**
     * Ask for question count
     */
    async askForQuestionCount(state: QuestionGenerationState) {
        const questionCountArr = [5, 10, 15];
        const { timer } = state.generationContext;
        let prompt = `Perfect. The timer is set to **${timer}** minute(s).
                \n\nHow many questions would you like to generate? (**5**, **10**, or **15**)`;

        if (state.lastAssistantMessage) {
            prompt = `${state.lastAssistantMessage}\n\nHow many questions do you want?`;
        }

        if (!timer) {
            return this.routeTo("askForTimer", {
                ...state.generationContext,
                lastAssistantMessage: "You need to select **timer** first."
            });
        }

        while (true) {
            const questionCount = interrupt(prompt);
            const intent = await this.detectGlobalIntent(questionCount);

            // Handle global intents
            if (intent !== 'continue') {
                const value = {
                    lastUserMessage: questionCount,
                    generationContext: {
                        ...state.generationContext,
                        lastNode: "question_count"
                    }
                };
                return this.handleGlobalIntent({
                    intent,
                    valueForChangeHandler: value,
                    valueForInfoHandler: value,
                    valueForHelper: value
                });
            }

            if (!isValidPositiveNumber(questionCount)) {
                prompt = `We need valid numbers to generate questions.`;
            } else {
                const number = Number(questionCount);
                if (!questionCountArr.includes(number)) {
                    prompt = `Number should be - **5**, **10**, or **15**`;
                } else {
                    return new Command({
                        goto: "askForConfirmGeneration",
                        update: {
                            messages: [
                                { role: "assistant", content: number, timestamp: Date.now() },
                            ],
                            generationContext: {
                                ...state.generationContext,
                                question_count: number,
                                lastNode: "question_count"
                            },
                            lastAssistantMessage: null
                        }
                    });
                }
            }
        }
    }

    /**
     * Confirm before generation
     */
    async askForConfirmGeneration(state: QuestionGenerationState) {
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
            const intent = await this.detectGlobalIntent(isItConfirm);
            // Handle global intents
            if (intent !== 'continue') {
                const value = {
                    lastUserMessage: isItConfirm,
                    generationContext: {
                        ...state.generationContext,
                        lastNode: "confirmation"
                    }
                };
                return this.handleGlobalIntent({
                    intent,
                    valueForChangeHandler: value,
                    valueForInfoHandler: null,
                    valueForHelper: null
                });
            };
            if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'no') {
                return new Command({ goto: "endOfDiscussion" });
            } else if (typeof isItConfirm === "string" && isItConfirm.toLowerCase() === 'yes') {
                return new Command({
                    goto: "generateQuestions", update: {
                        messages: [
                            { role: "assistant", content: state.generationContext, timestamp: Date.now() },
                        ],
                        lastAssistantMessage: null
                    }
                });
            }
            prompt = `You need to type **Yes** or **No** for further action.`;
        }
    }

    async generateQuestions(state: QuestionGenerationState) {
        const { department, topics, timer, question_count } = state.generationContext;
        const questionGeneratePayload = await this.questionRepository.generateCustomQuestions({
            department: department || '',
            topics: topics,
            timer: timer || 1,
            question_count: question_count || 5
        });
        return new Command({
            goto: END, update: {
                messages: [
                    {
                        role: "assistant",
                        content: {
                            content: questionGeneratePayload,
                            next_step: NextStep.QUIZ
                        },
                        timestamp: Date.now()
                    },
                ],
                generationContext: {}
            }
        });
    }

    async changeHandler(state: QuestionGenerationState) {
        const sysPrompt = `
                        1. Identify which quiz setup element user wants to change.
                        2. If you don't indentify, return none:
                        - department
                        - topics
                        - timer
                        - question_count
                        - none
                        Return only one of these as field value & a short message as a reaction depends on how the student asking.
                    `;
        const promptTemplate = await ChatPromptTemplate.fromMessages([
            ["system", sysPrompt],
            ["user", "User said: {input}"]
        ]);
        const result = await promptTemplate.pipe(
            this.deepSeekModel.withStructuredOutput(HandlerSchema)
        ).invoke({ input: state.lastUserMessage });
        console.log('result: ', result);
        const field = result.field;
        if (field === "none") {
            const userInput = interrupt(`What would you like to change?\n\n(department/topics/timer/question-count)`);
            return new Command({ goto: "changeHandler", update: { ...state.generationContext, lastUserMessage: userInput } });
        }

        return new Command({
            goto: NodeMap[field as keyof typeof NodeMap] || "initializeConversation",
            update: {
                lastAssistantMessage: result.message
            }
        });
    }

    async infoHandler(state: QuestionGenerationState): Promise<Command<"askForDepartment" | "initializeConversation" | "askForTopics" | "askForTimer" | "askForQuestionCount">> {
        const lastNode = state.generationContext.lastNode;
        const infoMap = {
            department: "The department represents the main subject area of the quiz, such as Software Engineering or Mathematics.",
            topics: "Topics are specific areas within the chosen department, like 'Algorithms' under Software Engineering.",
            timer: "The timer sets how long the student has to complete the quiz, in minutes.",
            question_count: "The number of questions that will be generated for the quiz.",
            none: ""
        };

        const sysPrompt = `
                Identify which concept the user is asking about:
                - department
                - topics
                - timer
                - question_count
                - none
                Return only one of these.
                `;
        const promptTemplate = await ChatPromptTemplate.fromMessages([
            ["system", sysPrompt],
            ["user", "User said: {input} & keyword: {keyword}"]
        ]);

        const result = await promptTemplate.pipe(
            this.deepSeekModel.withStructuredOutput(HandlerSchema)
        ).invoke({ input: state.lastUserMessage, keyword: lastNode });

        const field = result.field;

        return new Command({
            goto: NodeMap[lastNode as keyof typeof NodeMap] || "initializeConversation",
            update: {
                lastAssistantMessage: infoMap[field]
            },
        });
    }

    async askForHelp(state: QuestionGenerationState) {
        const { department, topics, timer, question_count, lastNode } = state.generationContext;
        if (!department && lastNode) {
            return new Command({
                goto: NodeMap[lastNode as keyof typeof NodeMap] || "initializeConversation",
                update: {
                    ...state.generationContext,
                    lastAssistantMessage: "You need to select a department first."
                }
            })
        }
        let sysPrompt = `
                    You are a teacher for a student. Student is asking for help to select topics of the relevant department, 
                    Or about the exam time, or help with the question count in a quiz. Student may also ask for topic(s) with
                    education/difficulty/tranding etc.
                    Read carefully what the student want. If you need more clarification, you can ask student like- 
                    "On which part do you need help?". And this was your last message - "${state.lastAssistantMessage}"
                    And only help with the selection of ${lastNode}. Please return your response and keep it short & concise.
                `;
        let userPrompt = `
                Student asked: {input}.
                department: {department}.
                `;
        if (topics?.length) { userPrompt += `topic(s): ${topics.join(',')}.` }
        if (timer) { userPrompt += `quiz duration: ${timer}. Max: 20 min, Min: 1 min` };
        if (question_count) { userPrompt += `question count: ${question_count}.` }
        userPrompt += `need help to select: {lastNode}.`


        const promptTemplate = await ChatPromptTemplate.fromMessages([
            ["system", sysPrompt],
            ["user", userPrompt]
        ]);

        const result = await promptTemplate.pipe(
            this.deepSeekModel.withStructuredOutput(HelperSchema)
        ).invoke({
            input: state.lastUserMessage,
            department: department,
            lastNode: lastNode
        });

        return new Command({
            goto: NodeMap[lastNode as keyof typeof NodeMap] || "initializeConversation",
            update: {
                ...state.generationContext,
                lastAssistantMessage: result.response
            }
        });
    }

    async endOfDiscussion(state: QuestionGenerationState) {
        return new Command({
            goto: END,
            update: {
                messages: [
                    {
                        role: "assistant",
                        content: {
                            content: "Thank you for your time. You can close the chat.",
                            next_step: NextStep.END
                        },
                        timestamp: Date.now()
                    }
                ],
                generationContext: {}
            }
        });
    }

    private async detectGlobalIntent(userInput: string): Promise<Intent> {
        const sysPrompt = `
            You are a precise intent classifier.
            Identify if the user wants to:
            - "exit" → stop, quit, end, or cancel the process
            - "change" → modify or update a previous value
            - "info" → ask for meaning/explanation/clearance about department, topic, timer, or question count
            - "continue" → provide a normal valid input. But check is it really are topic(s) or ask for help. If it is Help, return "help"
            - "help" → need help/assist to find/select/choose/look department, topic, timer, or question count or if you need more information.
            Respond only with one of: exit, change, info, continue, help
        `;

        const promptTemplate = await ChatPromptTemplate.fromMessages([
            ["system", sysPrompt],
            ["user", "User said: {input}"]
        ]);

        const result = await promptTemplate
            .pipe(this.deepSeekModel.withStructuredOutput(IntentSchema))
            .invoke({ input: userInput });

        return result.intent;
    }

    private handleGlobalIntent({ intent, valueForChangeHandler, valueForInfoHandler, valueForHelper }: {
        intent: string, valueForChangeHandler: any, valueForInfoHandler: any, valueForHelper: any
    }) {
        if (intent === "exit") return new Command({ goto: "endOfDiscussion" });
        if (intent === "change") return new Command({
            goto: "changeHandler",
            update: valueForChangeHandler
        });
        if (intent === "info" && valueForInfoHandler) return new Command({
            goto: "infoHandler",
            update: valueForInfoHandler
        });
        if (intent === Intent.HELP) return new Command({
            goto: "askForHelp",
            update: valueForHelper
        });
    }

    private routeTo(route: string, data: any) {
        return new Command({
            goto: route,
            update: data
        })
    }
}