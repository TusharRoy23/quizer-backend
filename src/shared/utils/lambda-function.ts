import { LambdaService } from "../../core/service/lambda.service";

(async () => {
    const service = new LambdaService();

    const result = await service.invokeFunction('quizer-generate-question', {
        message: 'hello from code'
    });

    console.log(result);
})();