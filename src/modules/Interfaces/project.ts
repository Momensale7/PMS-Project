interface task {
    name:string;
}
export interface Project {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    tasks:task[];
  }
  export interface ProjectUpdate {
    message: string | undefined;
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    manager: {
      id: number;
    };
  }
export interface ProjectInputs {
    title: string;
    description: string;
  }
export interface ProjectResponse {
    data: Project[];
    totalProjects: number;
    totalPages: number;
  }
  export interface DeleteConfirmationProps {
    handleClose: () => void;
    onConfirm: () => void;
    show: boolean;
    message: string;
    isDeleting: boolean;
}
    