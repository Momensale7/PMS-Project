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
}
