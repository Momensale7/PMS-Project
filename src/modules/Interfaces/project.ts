interface task {
    title:string;
}
export interface Project {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    task:task[];
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
    totalNumberOfRecords: number;

  }
  export interface DeleteConfirmationProps {
    handleClose: () => void;
    onConfirm: () => void;
    show: boolean;
    message: string;
    isDeleting: boolean;
}
    