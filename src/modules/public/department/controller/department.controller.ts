import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { IDepartmentService } from "../interface/IDepartment.service";
import { TYPES } from "../../../../core/type.core";
import { ValidateUUIDParam } from "../../../../middlewares/validate-uuid.middleware";
import AuthStrategy from "../../../../shared/strategy/access-token.strategy";

@controller("/department", AuthStrategy.authenticate("jwt", { session: false }))
export class DepartmentController {
    constructor(
        @inject(TYPES.IDepartmentService) private readonly departmentService: IDepartmentService, // Replace 'any' with the actual type of your service
    ) { }

    @httpGet("/")
    public async getDepartmentList(req: Request, res: Response) {
        const results = await this.departmentService.getDepartmentList();
        return res.status(200).json({
            data: results,
        });
    }

    @httpGet("/topic/:departmentUUID", ValidateUUIDParam("departmentUUID"))
    public async getTopicsByDepartment(req: Request, res: Response) {
        const departmentUUID = req.params.departmentUUID;
        const results = await this.departmentService.getTopicsByDepartment(departmentUUID);
        return res.status(200).json({
            data: results,
        });
    }

}