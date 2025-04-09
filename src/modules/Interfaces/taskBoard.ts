import { Project } from './project';
export type Status = 'ToDo' | 'InProgress' | 'Done';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    project:Project
}
export interface TaskResponse {
    data: Task[];
    pageSize: number;
    pageNumber: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
}
export interface ColumnProps {
    id: string,
    title: string,
    tasks: Task[]
}
export interface TaskItemProps {
    task: Task
}
