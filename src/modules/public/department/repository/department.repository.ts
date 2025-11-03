import { inject, injectable } from "inversify";
import { IDepartmentRepository } from "../interface/IDepartment.repository";
import { TYPES } from "../../../../core/type.core";
import { IDatabaseService } from "../../../../core/interface/IDatabase.service";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { Department, Topic } from "../../types/public.type";
import { throwException } from "../../../../shared/errors/all.exception";

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
            const department = await prisma.department.findMany({
                where: {
                    is_global: true
                }
            });
            return department as Department[];
        } catch (error) {
            return throwException(error);
        }
    }

    async getTopicsByDepartment(departmentUuid: string): Promise<Topic[]> {
        try {
            const prisma = await this.prisma$();
            const topic = await prisma.topic.findMany({
                where: {
                    department_topic_departmentTodepartment: {
                        uuid: departmentUuid
                    },
                    is_global: true
                },
                omit: {
                    department: true
                }
            });
            return topic as Topic[];
        } catch (error) {
            return throwException(error);
        }
    }

    async getDepartmentByUUID(uuid: string): Promise<Department | null> {
        try {
            const prisma = await this.prisma$();
            const department = await prisma.department.findFirst({
                where: {
                    uuid: uuid
                }
            });

            return department as Department;
        } catch (error) {
            return throwException(error);
        }
    }

    async getTopicsByUUIDsAndDepartmentUUID(uuids: Array<string>, departmentUuid: string): Promise<Topic[] | null> {
        try {
            const prisma = await this.prisma$();
            const topics = await prisma.topic.findMany({
                where: {
                    uuid: {
                        in: uuids
                    },
                    department_topic_departmentTodepartment: {
                        uuid: departmentUuid
                    }
                },
            });

            return topics as Topic[];
        } catch (error) {
            return throwException(error);
        }
    }
}