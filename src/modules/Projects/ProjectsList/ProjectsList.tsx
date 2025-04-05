/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Dropdown, Form, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Project, ProjectResponse } from '../../Interfaces/project';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { PROJECT_URLS } from '../../services/api/apiConfig';
import DeleteConfirmation from '../../shared/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import axios from 'axios';
import NoData from '../../shared/NoData/NoData';
import Loading from '../../shared/Loading/Loading';

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemToDelete, setItemToDelete] = useState<number>(NaN);
  const [itemToDeleteName, setItemToDeleteName] = useState<string | null>(null);
  const [deleteModalshow, setDeleteModalshow] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  

  // * get projects list
  const getProjects = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await privateAxiosInstance.get<ProjectResponse>(PROJECT_URLS.GET_PROJECTS_BY_MANAGER, {
        params: {
          title,
          pageNumber,
          pageSize
        }

      });
      setProjects(response?.data?.data)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    } finally {
      setIsLoading(false)
    }
  }
  // * delte peoject
  const deleteProject = async (): Promise<void> => {
    setIsDeleting(true)
    try {
      const response = await privateAxiosInstance.delete(PROJECT_URLS.delete_PROJECT(itemToDelete));
      console.log(response);
      toast.success(response?.data?.message || "Deleted successfully")
      getProjects()
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    } finally {
      setIsDeleting(false)
      setDeleteModalshow(false)
    }
  }
  const handleDeleteClick = (id: number, name: string) => {
    setItemToDelete(id);
    setItemToDeleteName(name);
    setDeleteModalshow(true)
  }

  // *search
  const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setPageNumber(1);
  };
  useEffect(() => {
    getProjects();
  }, [title])




  return (
    <>
      <DeleteConfirmation
        handleClose={() => setDeleteModalshow(false)}
        show={deleteModalshow}
        onConfirm={deleteProject}
        message={`are you sure that you want to delete project ${itemToDeleteName}`}
        isDeleting={isDeleting} />
      <div className='projects'>
        <div className="bg-white d-flex align-items-center justify-content-between py-3 px-4 mb-3">
          <h3 className='h3 textMaster fw-medium'>Projects</h3>
          <Link className='btn bgMain btn-custom text-white' to={'/dashboard/projects/new-Project'}>
            <i className='fa fa-plus me-2'></i>
            Add New Project</Link>
        </div>
        <div className="ms-4 project bg-white pt-3 rounded-2">
          <div className="position-relative ms-4">
            <Form.Control
            onInput={handleTitleValue}
              type="search"
              placeholder="Search by Title"
              className="projecInput searchInput w-200"
            />
            <i className="fa fa-search position-absolute search text-gray-400"></i>
          </div>
          <Table responsive striped bordered hover className='mt-3'>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Creation Date</th>
                <th>Tasks</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <Loading /> : projects.length > 0 ? projects?.map((project, index) => (
                <tr key={index}>
                  <td>{project?.id}</td>
                  <td>{project?.title}</td>
                  <td>{project?.description}</td>
                  <td>{new Date(project?.creationDate).toLocaleString('en-GB', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                  })}</td>
                  <td>{project?.tasks?.map(task => task?.name).join(', ')}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className='bg-transparent border-0' id="dropdown-basic">
                        <i className="fa fa-ellipsis-v textContent"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className='textContent'><i className="fa fa-eye mx-2"></i>View</Dropdown.Item>
                        <Dropdown.Item className='textContent' onClick={() => handleDeleteClick(project?.id, project?.title)}><i className="fa fa-trash mx-2"></i>Delete</Dropdown.Item>
                        <Dropdown.Item className='textContent'><Link className='text-decoration-none textContent' to={`/dashboard/projects/${project?.id}`}><i className="fa fa-edit mx-2"></i>Edit</Link></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )) : <tr><td colSpan={6}><NoData /></td></tr>}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
