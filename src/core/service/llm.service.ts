import { ChatDeepSeek } from "@langchain/deepseek";
import { ChatOpenAI } from "@langchain/openai";
import { throwException } from "../../shared/errors/all.exception";

export class LLMService {
    private _deepSeekllmModel?: ChatDeepSeek;
    private _openAIllmModel?: ChatOpenAI;

    get deepSeekllmModel() {
        if (!this._deepSeekllmModel) {
            try {
                this._deepSeekllmModel = new ChatDeepSeek({
                    model: 'deepseek-coder',
                    temperature: 1.0,
                    cache: false
                });
            } catch (error) {
                return throwException(error);
            }
        }
        return this._deepSeekllmModel;
    }

    get openAIllmModel() {
        if (!this._openAIllmModel) {
            try {
                this._openAIllmModel = new ChatOpenAI({
                    modelName: 'gpt-4o-mini',
                    temperature: 0.7,
                    cache: false
                });
            } catch (error) {
                return throwException(error);
            }
        }
        return this._openAIllmModel;
    }
}