import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Project, ProjectResponse } from '../../Interfaces/project';
import { TaskFormData, TaskItemResponse, TaskResponse } from '../../Interfaces/Task';
import { toast } from 'react-toastify';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { PROJECT_URLS, TASKS_URLS, USER_URLS } from '../../services/api/apiConfig';
import { UserList, UserListResponse } from '../../Interfaces/User';

const TaskData: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<TaskFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [projects, setProjects] = useState<Project[]>([] as Project[]);
  const [userName, setUserName] = useState<string>('');
  const [employees, setEmployees] = useState<UserList[]>([] as UserList[]);
  const [taskProjectTitle, setTaskProjectTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserList | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  
  const params = useParams();
  const taskId: string | undefined = params.id;
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Current employee ID being watched
  const currentEmployeeId = watch('employeeId');

  // Function to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch task details for update
  const getTaskDetails = async (id: string): Promise<void> => {
    try {
      const response = await privateAxiosInstance.get<TaskItemResponse>(`${TASKS_URLS.GET_TASKS(id)}`);
      const taskData = response.data;
      // Set form values
      setValue('title', taskData?.title);
      setValue('description', taskData?.description);
      setValue('employeeId', taskData?.employee?.id.toString());
      setTaskProjectTitle(taskData?.project?.title);
      
      // Set selected user for display
      if (taskData?.employee) {
        setSelectedUser({
          id: taskData.employee.id,
          userName: taskData.employee.userName,
          email: taskData.employee.email,
        });
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to fetch task details');
      } else {
        toast.error('An unexpected error occurred while fetching task details');
      }
    }
  };
  
  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = taskId ?
        await privateAxiosInstance.put<TaskResponse>(TASKS_URLS.UPDATE_TASKS(taskId), data)
        : await privateAxiosInstance.post<TaskResponse>(TASKS_URLS.CREATE_TASKS, data);
      
      toast.success(response.data.message || (taskId ? 'Task updated successfully!' : 'Task added successfully!'));
      reset();
      navigate('/dashboard/tasks');
    }
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || (taskId ? 'Failed to update task' : 'Failed to add task'));
      } else {
        toast.error('An unexpected error occurred!');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getProjects = async (): Promise<void> => {
    try {
      const response = await privateAxiosInstance.get<ProjectResponse>(PROJECT_URLS.GET_PROJECTS_BY_MANAGER, {
        params: {
          pageNumber: 1,
          pageSize: 30
        }
      });
      setProjects(response?.data?.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    }
  };
  
  const getUsers = async (page: number = 1): Promise<void> => {
    try {
      const response = await privateAxiosInstance.get<UserListResponse>(USER_URLS.GET_USERS, {
        params: {
          userName,
          pageSize,
          pageNumber: page,
        },
      });

      if (page === 1) {
        setEmployees(response.data.data);
      } else {
        setEmployees(prev => [...prev, ...response.data.data]);
      }
      
      // Calculate total pages
      const totalCount = response.data.totalNumberOfPages || 0;
      setTotalPages(totalCount);
      
      // If we have a selected employee ID but it's not in our current list, find that user
      if (currentEmployeeId && !employees.some(emp => emp.id.toString() === currentEmployeeId)) {
        fetchSelectedUser(currentEmployeeId);
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred";
        toast.error(message);
      } else {
        const message = "An error occurred";
        toast.error(message);
      }
    }
  };
  
  // Fetch a specific user by ID if not in current list
  const fetchSelectedUser = async (userId: string): Promise<void> => {
    try {
      const response = await privateAxiosInstance.get(`${USER_URLS.GET_USER_BY_ID(userId)}`);
      const userData = response.data;
      
      if (userData) {
        setSelectedUser({
          id: userData.id,
          userName: userData.userName,
          email: userData.email || '',
          isActivated: userData.isActivated || false,
          phoneNumber: userData.phoneNumber || '',
          creationDate: userData.creationDate || ''
        });
      }
    } catch (error) {
      console.error("Error fetching selected user:", error);
    }
  };
  
  // Load more users when scrolling to the bottom of the dropdown
  const handleLoadMore = () => {
    if (pageNumber < totalPages) {
      setPageNumber(prev => prev + 1);
      getUsers(pageNumber + 1);
    }
  };
  
  // Search users when userName changes
  useEffect(() => {
    setPageNumber(1); // Reset to first page when search changes
    const delayDebounceFn = setTimeout(() => {
      getUsers(1);
    }, 500);
    
    return () => clearTimeout(delayDebounceFn);
  }, [userName]);
  
  // Load additional users when page number changes
  useEffect(() => {
    if (pageNumber > 1) {
      getUsers(pageNumber);
    }
  }, [pageNumber]);
  
  // Handle user selection
  const handleSelectUser = (user: UserList) => {
    setValue('employeeId', user.id.toString());
    setSelectedUser(user);
    setShowDropdown(false);
  };
  
  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Load projects and initial users
        await Promise.all([getUsers(), !taskId ? getProjects() : null].filter(Boolean));
        
        // If in edit mode, fetch task details
        if (taskId) {
          await getTaskDetails(taskId);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, [taskId]);

  const handleCancel = () => {
    navigate('/dashboard/tasks');
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <div className="contentBg p-3">
        <div className="container">
          <Link to="/dashboard/tasks" className="text-decoration-none textContent d-flex align-items-center mb-2">
            <i className="fa fa-chevron-left me-2"></i>
            <span>View All Tasks</span>
          </Link>
          <h2 className="mb-0 textContent">
            {taskId ? "Edit Task" : "Add a New Task"}
          </h2>
        </div>
      </div>

      <Container className="py-4">
        <Card className="shadow-lg border-0 textContent contentBg rounded-3">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit(onSubmit)} className='filterGroup'>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <Form.Control
                    className='taskDataInput'
                      {...field}
                      type="text"
                      placeholder="Task title"
                      isInvalid={!!errors.title}
                    />
                  )}
                />
                {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <Form.Control
                    className='taskDataInput'
                      {...field}
                      as="textarea"
                      rows={3}
                      placeholder="Task description"
                      isInvalid={!!errors.description}
                    />
                  )}
                />
                {errors.description && (
                  <Form.Control.Feedback type="invalid">
                    {errors.description.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>User</Form.Label>
                    
                    {/* Hidden input for form control */}
                    <Controller
                      name="employeeId"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'User is required' }}
                      render={({ field }) => (
                        <input type="hidden" {...field} />
                      )}
                    />
                    
                    {/* Custom dropdown implementation */}
                    <div className="position-relative filterGroup  textContent" ref={dropdownRef}>
                      {/* Selected user badge */}
                      
                      
                      {/* Search input */}
                      <div className="mb-2 filterGroup">
                        <Form.Control
                          type="text"
                          className='taskDataInput'
                          placeholder="Search for user by name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          onClick={() => setShowDropdown(true)}
                        />
                      </div>
                      {selectedUser && (
                        <div className="mb-2">
                          <Badge 
                            bg="red" 
                            text="textContent" 
                            className="p-2 d-flex align-items-center" 
                            style={{ borderRadius: '4px' }}
                          >
                            <span className='textContent'>{selectedUser.userName}</span>
                            <button 
                              type="button"
                              className="btn btn-sm text-danger ms-2 p-0" 
                              onClick={() => {
                                setSelectedUser(null);
                                setValue('employeeId', '');
                              }}
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </Badge>
                        </div>
                      )}
                      {/* Dropdown menu */}
                      {showDropdown && (
                        <div 
                          className="position-absolute w-100 textContent dropTasks shadow-sm border rounded mt-1 z-3" 
                        >
                          {employees.length > 0 ? (
                            <>
                              {employees.map((employee) => (
                                <div 
                                  key={employee.id} 
                                  className={`p-2 cursor-pointer pointer ${currentEmployeeId === employee.id.toString() ? 'contentBg' : ''}`}
                                  onClick={() => handleSelectUser(employee)}
                                >
                                  {employee.userName}
                                </div>
                              ))}
                              {pageNumber < totalPages && (
                                <div 
                                  className="p-2 text-center textMain pointer" 
                                  onClick={handleLoadMore}
                                >
                                  Load more...
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="p-2 text-center">No users found</div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {errors.employeeId && (
                      <div className="text-danger mt-1 small">
                        {errors.employeeId.message}
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Project</Form.Label>
                    {taskId ? (
                      <p className='textMain'>{taskProjectTitle}</p>
                    ) : (
                      <>
                        <Controller
                          name="projectId"
                          control={control}
                          defaultValue=""
                          rules={{ required: 'Project is required' }}
                          render={({ field }) => (
                            <Form.Select 
                              {...field} 
                              isInvalid={!!errors.projectId}
                            >
                              <option value="">Select Project</option>
                              {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                  {project.title}
                                </option>
                              ))}
                            </Form.Select>
                          )}
                        />
                        {errors.projectId && (
                          <Form.Control.Feedback type="invalid">
                            {errors.projectId.message}
                          </Form.Control.Feedback>
                        )}
                      </>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-between mt-4">
                <Button 
                  variant="outline-dark" 
                  type="button" 
                  onClick={handleCancel}
                  className="px-4 py-2"
                  style={{ borderRadius: '20px' }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="warning" 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white"
                  style={{ borderRadius: '20px', backgroundColor: '#F9A826' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {taskId ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    taskId ? 'Update' : 'Save'
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default TaskData;