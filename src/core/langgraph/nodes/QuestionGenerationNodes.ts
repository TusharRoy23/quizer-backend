import { ChatDeepSeek } from "@langchain/deepseek";
import { Command, END, interrupt } from "@langchain/langgraph";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { inject, injectable } from "inversify";
import { askPermissionSchema, departmentNodeSchema, InputValidationSchema, QuestionGenerationState } from "../states/question-generation.state";
import { IQuestionGenerationNodes } from "../interface/IQuestionGenerationNodes";
import { isValidPositiveNumber } from "../../../shared/utils/utils";
import { TYPES } from "../../type.core";
import { IQuestionRepository } from "../../../modules/public/question/interface/IQuestion.repository";

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
            temperature: 0.1,
            cache: false,
        });
    }

    /**
     * Start the conversation.
     */
    async initializeConversation(state: QuestionGenerationState) {
        //! ongoing quiz checker
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
        let prompt = `
                    ${state.lastAssistantMessage}
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
                this.deepSeekModel.withStructuredOutput(askPermissionSchema)
            ).invoke({
                answer: answer
            });
            const permission = result.permission.toLocaleLowerCase();
            if (typeof permission === "string" && permission === "yes") {
                return new Command({ goto: "askForDepartment" });
            } else if (typeof permission === "string" && permission === "no") {
                return new Command({ goto: "endOfDiscussion" });
            }
            prompt = `You have to type "Yes" or "No" for further action.`;
        }
    }

    /**
     * Ask for department
     */
    async askForDepartment(state: QuestionGenerationState) {
        const askDeptSchema = this.deepSeekModel.withStructuredOutput(departmentNodeSchema);
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
                        Return true if it is valid otherwise false & also a message with hints.
                        Also Return 3 topics of the given department as a string array.
                        Remember, user can also ask non-specific dept. Such as Engineering, Policy Maker, etc.
                        These type of dept can be specified. Such as for engineering - software engineering, mechanical engineering,
                        civil engineering, etc.
                        If you find this type of thing, return false & also a message with hints.
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
                prompt = `${department} - ${result?.message}`;
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
    }

    /**
     * Ask for topics
     */
    async askForTopics(state: QuestionGenerationState) {
        const outputSchema = this.deepSeekModel.withStructuredOutput(InputValidationSchema);
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
                        topics: topics.split(",")
                    }
                };
            }
        }
    }

    /**
     * Ask for timer (in minutes)
     */
    async askForTimer(state: QuestionGenerationState) {
        const { department, topics } = state.generationContext;
        let prompt = `
            Got it. Department: ${department}, Topics: ${topics}.
            How long should the timer be (in minutes)?
            Max: 20 minutes.
            Min: 1 minute
        `;
        while (true) {
            const timer = interrupt(prompt);
            if (!isValidPositiveNumber(timer)) {
                prompt = `Time must be an number`;
            } else {
                const number = Number(timer);
                if (number < 1 || number > 20) {
                    prompt = `
                        Max: 20 minutes.
                        Min: 1 minute
                    `;
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
    }

    /**
     * Ask for question count
     */
    async askForQuestionCount(state: QuestionGenerationState) {
        const questionCountArr = [5, 10, 15];
        const { timer } = state.generationContext;
        let prompt = `
            Perfect. The timer is set to ${timer} minute(s).
            How many questions would you like to generate? (5, 10, or 15)
        `;
        while (true) {
            const questionCount = interrupt(prompt);
            if (!isValidPositiveNumber(questionCount)) {
                prompt = `We need valid numbers to generate questions.`;
            } else {
                const number = Number(questionCount);
                if (!questionCountArr.includes(number)) {
                    prompt = `Number should be - 5, 10, or 15`;
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
    }

    /**
     * Confirm before generation
     */
    async askForConfirmGeneration(state: QuestionGenerationState) {
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
            prompt = `You need to type "Yes" or "No" for further action.`;
        }
    }

    async generateQuestions(state: QuestionGenerationState) {
        const { department, topics, timer, question_count } = state.generationContext;
        const quizUUID = await this.questionRepository.generateCustomQuestions({
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
                            content: quizUUID,
                            next_step: "QUIZ"
                        },
                        timestamp: Date.now()
                    },
                ]
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
                            next_step: "END"
                        },
                        timestamp: Date.now()
                    }
                ]
            }
        });
    }
}
