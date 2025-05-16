export interface IDepartmentRepository {
    getDepartmentList(): Promise<Department[]>;
    getTopicList(): Promise<Topic[]>;
}