export interface Task {
    task: string;
    start_date: Date;
    end_date: Date;
    priority: Number;
    status: Boolean;
    parent: string;
    project: string;
    user: string;
}