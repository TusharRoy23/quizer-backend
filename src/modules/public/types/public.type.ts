type Department = {
    uuid: string;
    name: string;
    created_at: Date;
}

type Topic = {
    uuid: string;
    name: string;
    department: Department
    created_at: Date;
}