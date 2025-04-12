import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Toast, ToastContainer } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../../Interfaces/project';
import { TaskFormData , employeeId , projectId } from '../../Interfaces/Task';

const AddTaskForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<TaskFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Toast notification states
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [employees, setEmployees] = useState<employeeId[]>([]);
  const [projects, setProjects] = useState<projectId []>([]);
  
  // Watch the form values for logging
  const selectedEmployeeId = watch("employeeId");
  const selectedProjectId = watch("projectId");
  
  // Log when selections change
  useEffect(() => {
    if (selectedEmployeeId) {
      console.log("Selected Employee ID:", selectedEmployeeId);
    }
  }, [selectedEmployeeId]);
  
  useEffect(() => {
    if (selectedProjectId) {
      console.log("Selected Project ID:", selectedProjectId);
    }
  }, [selectedProjectId]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Project/manager?pageSize=10&pageNumber=1",
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setProjects(response.data.data);
      console.log("Projects data:", response.data.data);
      
      // Log project IDs
      response.data.data.forEach((project: Project) => {
        console.log(`Project: ID: ${project.id}`);
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      setErrorMessage('Failed to load projects. Please try again.');
      setShowErrorToast(true);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Users?pageSize=10&pageNumber=1",
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      setEmployees(response.data.data);
      console.log("Employees data:", response.data.data);
      
      // Log employee IDs
      response.data.data.forEach((employee: employeeId) => {
        console.log(`Employee: ${employee.name}, ID: ${employee.id}`);
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      setErrorMessage('Failed to load employees. Please try again.');
      setShowErrorToast(true);
    }
  };

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    console.log("Submitting task with data:", data);
    console.log("Employee ID being sent:", data.employeeId);
    console.log("Project ID being sent:", data.projectId);
    
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Task",
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      console.log("Task created successfully:", response.data);
      setShowSuccessToast(true);
      
      // Redirect after 1.5 seconds (gives the user time to see the success toast)
      setTimeout(() => {
        navigate('/dashboard/tasks');
      }, 1500);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to create task. Please try again.');
      setShowErrorToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Navigate back to tasks dashboard
    navigate('/dashboard/tasks');
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showSuccessToast} 
          onClose={() => setShowSuccessToast(false)} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Task created successfully! Redirecting...</Toast.Body>
        </Toast>
        
        <Toast 
          show={showErrorToast} 
          onClose={() => setShowErrorToast(false)} 
          delay={3000} 
          autohide
          bg="danger"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="bg-white p-3">
        <div className="container">
          <Link to="/dashboard/tasks" className="text-decoration-none text-dark d-flex align-items-center mb-2">
            <i className="fa fa-chevron-left me-2"></i>
            <span>View All Tasks</span>
          </Link>
          <h2 className="mb-0">Add a New Task</h2>
        </div>
      </div>

      <Container className="py-4">
        <Card className="shadow-lg border-0 rounded-3">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <Form.Control
                      {...field}
                      type="text"
                      placeholder="Name"
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
                      {...field}
                      as="textarea"
                      rows={3}
                      placeholder="Description"
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
                    <Controller
                      name="employeeId"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'User is required' }}
                      render={({ field }) => (
                        <Form.Select 
                          {...field} 
                          isInvalid={!!errors.employeeId}
                          onChange={(e) => {
                            field.onChange(e);
                            console.log("Employee ID selected:", e.target.value);
                          }}
                        >
                          <option value="">Select employee</option>
                          {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.name} (ID: {employee.id})
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    />
                    {errors.employeeId && (
                      <Form.Control.Feedback type="invalid">
                        {errors.employeeId.message}
                      </Form.Control.Feedback>
                    )}
                    {selectedEmployeeId && (
                      <small className="text-muted d-block mt-1">
                        Selected ID: {selectedEmployeeId}
                      </small>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Project</Form.Label>
                    <Controller
                      name="projectId"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Project is required' }}
                      render={({ field }) => (
                        <Form.Select 
                          {...field} 
                          isInvalid={!!errors.projectId}
                          onChange={(e) => {
                            field.onChange(e);
                            console.log("Project ID selected:", e.target.value);
                          }}
                        >
                          <option value="">Select Project</option>
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.name} (ID: {project.id})
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
                    {selectedProjectId && (
                      <small className="text-muted d-block mt-1">
                        Selected ID: {selectedProjectId}
                      </small>
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
                      Saving...
                    </>
                  ) : (
                    'Save'
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

export default AddTaskForm;