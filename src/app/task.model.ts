export interface Task {
    _id: string;
    task: string;
    start_date: Date;
    end_date: Date;
    priority: Number;
    status: Boolean;
    parent: string;
    project: string;
    user: string;
}