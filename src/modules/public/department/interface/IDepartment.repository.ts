import { Department, Topic } from "../../types/public.type";

export interface IDepartmentRepository {
    getDepartmentList(): Promise<Department[]>;
    getTopicList(): Promise<Topic[]>;
    getDepartmentByUUID(uuid: string): Promise<Department | null>;
    getTopicsByUUIDsAndDepartmentUUID(uuids: Array<string>, departmentUuid: string): Promise<Topic[] | null>;
}