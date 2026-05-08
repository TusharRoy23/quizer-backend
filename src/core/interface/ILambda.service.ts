export interface ILambdaService {
    invokeFunction(functionName: string, payload: any): Promise<any>;
}