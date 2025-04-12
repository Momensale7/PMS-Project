// src/Interfaces/task.ts
 type  Manager = {
  userName: string;
}
 type Employee = {
  userName: string;
  id:number
};
 type Project = {
    title: string;
    manager: Manager;
    id:number
  };

export interface Task {
  id: number;
  title: string;
  status: string;
  project: Project;
  employee: Employee;
  description: string;
  creationDate: string;
}

export interface TaskResponse {
  message?: string ;
  data: Task[];
  totalTasks: number;
  totalPages: number;
  totalNumberOfRecords: number;
}
export interface TaskItemResponse {
  title: string;
  description: string;
  employee: {
    id: number;
    userName:string;
    email:string;
  };
  project: {
    id: number;
    title:string
  };
}
export interface TaskFormData {
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
}

export interface employeeId {
  id: string;
  name: string;
}

export interface projectId {
  id: string;
  name: string;
}