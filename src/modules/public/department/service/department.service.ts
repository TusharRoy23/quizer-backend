import { injectable } from "inversify";
import { IDepartmentRepository } from "../interface/IDepartment.repository";
import { IDepartmentService } from "../interface/IDepartment.service";

@injectable()
export class DepartmentService implements IDepartmentService {
    constructor(private readonly departmentRepository: IDepartmentRepository) { }

    async getDepartmentList(): Promise<Department[]> {
        return this.departmentRepository.getDepartmentList();
    }

    async getTopicList(): Promise<Topic[]> {
        return this.departmentRepository.getTopicList();
    }
}