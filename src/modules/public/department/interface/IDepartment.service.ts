export interface IDepartmentService {
    getDepartmentList(): Promise<Department[]>;
    getTopicList(): Promise<Topic[]>;
}