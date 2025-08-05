import { Department, Topic } from "../../types/public.type";

export interface IDepartmentService {
    getDepartmentList(): Promise<Department[]>;
    getTopicsByDepartment(departmentUuid: string): Promise<Topic[]>;
    getDepartmentByUUID(uuid: string): Promise<Department | null>;
    getTopicsByUUIDsAndDepartmentUUID(uuids: Array<string>, departmentUuid: string): Promise<Topic[] | null>;
}