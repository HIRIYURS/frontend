export interface Project {
    _id: string;
    project_name: string;
    start_date: Date;
    end_date: Date;
    priority: Number;
    user: string;
}