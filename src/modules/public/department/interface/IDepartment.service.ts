import { Department, Topic } from "../../types/public.type";

export interface IDepartmentService {
    getDepartmentList(): Promise<Department[]>;
    getTopicList(): Promise<Topic[]>;
}