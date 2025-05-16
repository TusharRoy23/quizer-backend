import { inject, injectable } from "inversify";
import { IDepartmentRepository } from "../interface/IDepartment.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BaseRepository } from "../../../../core/repository/base.repository";

@injectable()
export class DepartmentRepository extends BaseRepository implements IDepartmentRepository {
    constructor(
        @inject(TYPES.IDatabaseService) readonly databaseService: IDatabaseService,
    ) {
        super(databaseService);
    }

    async getDepartmentList(): Promise<Department[]> {
        try {
            const prisma = await this.prisma$();
            const department = await prisma.department.findMany();
            return department as Department[];
        } catch (error) {
            throw new Error('Failed to fetch departments');
        }
    }

    async getTopicList(): Promise<Topic[]> {
        try {
            const prisma = await this.prisma$();
            const topic = await prisma.topic.findMany({
                include: {
                    department_topic_departmentTodepartment: {
                        select: {
                            uuid: true,
                            name: true,
                        }
                    }
                },
                omit: {
                    department: true
                }
            });
            return topic as Topic[];
        } catch (error) {
            throw new Error('Failed to fetch topics');
        }
    }
}