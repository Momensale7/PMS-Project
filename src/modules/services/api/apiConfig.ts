export const baseURL= "https://upskilling-egypt.com:3003/api/v1"
export const imgURL="https://upskilling-egypt.com:3003/"


export const USER_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Register`,
    FORGET_PASS:`/Users/Reset/Request`,
    RESET_PASS:`/Users/Reset`,
    CHANGE_PASS:`/Users/ChangePassword`,
    GET_USERS:`/Users`,
    GET_USERS_COUNT:`/Users/count`,
    VERIFY:`/Users/Verify`,
}

export const PROJECT_URLS = {
    GET_PROJECTS_BY_MANAGER: '/Project/manager',
    GET_PROJECTS_BY_EMPLOYEE: '/Project/employee',
    CREATE_PROJECT: '/Project',
    UPDATE_PROJECT: (id: string | undefined) => `/Project/${id}`,
    delete_PROJECT: (id: number) => `/Project/${id}`,
    GET_PROJECT: (id: string |  undefined) => `/Project/${id}`,
  };

  export const TASKS_URLS = {
    GET_TASKS_BY_MANAGER: "/Task/manager",
    GET_TASKS_BY_EMPLOYEE: "/Task/employee",
    CREATE_TASKS: "/Task",
    UPDATE_TASKS: (id: string | undefined) => `/Task/${id}`,
    DELETE_TASKS: (id: number) => `/Task/${id}`,
    GET_TASKS: (id: string | undefined) => `/Task/${id}`,
  };
  export const TASK_URLS = {
    GET_ALL_MY_ASSIGNED_TASKS: '/Task',
    CHANGE_TASK_STATUS:(id:number)=>`/Task/${id}/change-status`
  };
  
