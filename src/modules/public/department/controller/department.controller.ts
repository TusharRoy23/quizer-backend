import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import { IDepartmentService } from "../interface/IDepartment.service";
import { TYPES } from "../../../../core/type.core";

@controller("/department")
export class DepartmentController {
    constructor(
        @inject(TYPES.IDepartmentService) private readonly departmentService: IDepartmentService, // Replace 'any' with the actual type of your service
    ) { }

    @httpGet("/")
    public async getDepartmentList(req: Request, res: Response) {
        const results = await this.departmentService.getDepartmentList();
        return res.status(200).json({
            status: 200,
            data: results,
        });
    }

    @httpGet("/topic")
    public async getTopicList(req: Request, res: Response) {
        const results = await this.departmentService.getTopicList();
        return res.status(200).json({
            status: 200,
            data: results,
        });
    }

}