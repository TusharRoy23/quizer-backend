import { LambdaClient, InvokeCommandInput, LogType, InvokeCommand } from "@aws-sdk/client-lambda";
import { injectable } from 'inversify';
import { ILambdaService } from "../interface/ILambda.service";

@injectable()
export class LambdaService implements ILambdaService {
    private readonly lambdaClient: LambdaClient;

    constructor() {
        this.lambdaClient = new LambdaClient({
            region: process.env.AWS_LAMBDA_REGION || 'us-east-1'
        })
    }

    async invokeFunction(functionName: string, payload: any): Promise<any> {
        console.log('invoked payload: ', payload);
        const input: InvokeCommandInput = {
            FunctionName: functionName,
            InvocationType: 'RequestResponse',
            LogType: LogType.None,
            Payload: Buffer.from(JSON.stringify(payload))
        }

        try {
            const command = new InvokeCommand(input);
            const response = await this.lambdaClient.send(command);

            let parsed: any = null;
            if (response.Payload) {
                const rawPayload = Buffer.from(response.Payload).toString('utf-8');
                parsed = JSON.parse(rawPayload);
            }

            if (response.FunctionError) {
                console.error(`Error invoking Lambda function ${functionName}:`, response.FunctionError);
                throw new Error(`Lambda invocation error: ${response.FunctionError}`);
            }
            return parsed
        } catch (error) {
            console.error(`Error invoking Lambda function ${functionName}:`, error);
            throw new Error(`Lambda invocation error: ${error}`);
        }
    }
}