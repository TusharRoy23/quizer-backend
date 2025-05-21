import { inject, injectable } from "inversify";
import { IDepartmentRepository } from "../interface/IDepartment.repository";
import { IDepartmentService } from "../interface/IDepartment.service";
import { Department, Topic } from "../../types/public.type";
import { TYPES } from "../../../../core/type.core";

@injectable()
export class DepartmentService implements IDepartmentService {
    constructor(
        @inject(TYPES.IDepartmentRepository) private readonly departmentRepository: IDepartmentRepository
    ) { }

    async getDepartmentList(): Promise<Department[]> {
        return await this.departmentRepository.getDepartmentList();
    }

    async getTopicList(): Promise<Topic[]> {
        return await this.departmentRepository.getTopicList();
    }

    async getDepartmentByUUID(uuid: string): Promise<Department | null> {
        return await this.departmentRepository.getDepartmentByUUID(uuid);
    }

    async getTopicsByUUIDsAndDepartmentUUID(uuids: Array<string>, departmentUuid: string): Promise<Topic[] | null> {
        return await this.departmentRepository.getTopicsByUUIDsAndDepartmentUUID(uuids, departmentUuid);
    }
}