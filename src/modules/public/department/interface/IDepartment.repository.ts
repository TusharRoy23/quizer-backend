import { Department, Topic } from "../../types/public.type";

export interface IDepartmentRepository {
    getDepartmentList(): Promise<Department[]>;
    getTopicList(): Promise<Topic[]>;
}