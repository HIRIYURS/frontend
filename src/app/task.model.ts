export interface Task {
    task: String;
    start_date: Date;
    end_date: Date;
    priority: Number;
    status: Boolean;
    parent: String;
    project: String;
    user: String;
}