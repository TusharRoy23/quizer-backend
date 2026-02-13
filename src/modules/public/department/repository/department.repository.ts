import { injectable } from "inversify";
import { IDepartmentRepository } from "../interface/IDepartment.repository";
import { BaseRepository } from "../../../../core/repository/base.repository";
import { Department, Topic } from "../../types/public.type";
import { throwException } from "../../../../shared/errors/all.exception";

@injectable()
export class DepartmentRepository extends BaseRepository implements IDepartmentRepository {
    async getDepartmentList(): Promise<Department[]> {
        try {
            const department = await this.prisma$.department.findMany({
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
            const topic = await this.prisma$.topic.findMany({
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
            const department = await this.prisma$.department.findFirst({
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
            const topics = await this.prisma$.topic.findMany({
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