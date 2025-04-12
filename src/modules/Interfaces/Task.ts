// src/Interfaces/task.ts

export interface Task {
  id: number;
  title: string;
  status: string;
  user: {
    name: string;
  };
  project: {
    title: string;
  };
  creationDate: string;
}

export interface TaskResponse {
  data: Task[];
  totalTasks: number;
  totalPages: number;
  totalNumberOfRecords: number;
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
