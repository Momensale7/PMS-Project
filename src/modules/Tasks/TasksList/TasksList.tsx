import React, { useEffect, useState } from "react";
import { Dropdown, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Task, TaskResponse } from "../../Interfaces/Task";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { TASKS_URLS } from "../../services/api/apiConfig";
import DeleteConfirmation from "../../shared/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import axios from "axios";
import NoData from "../../shared/NoData/NoData";
import Loading from "../../shared/Loading/Loading";


export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(8);
  const [itemToDelete, setItemToDelete] = useState<number>(NaN);
  const [itemToDeleteName, setItemToDeleteName] = useState<string | null>(null);
  const [deleteModalshow, setDeleteModalshow] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const getTasks = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await privateAxiosInstance.get<TaskResponse>(
        TASKS_URLS.GET_TASKS_BY_MANAGER,
        {
          params: {
            title,
            pageNumber,
            pageSize,
          },
        }
      );
      setTasks(response?.data?.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "🦄 Something went wrong!"
        );
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (): Promise<void> => {
    setIsDeleting(true);
    try {
      const response = await privateAxiosInstance.delete(
        TASKS_URLS.DELETE_TASKS(itemToDelete)
      );
      toast.success(response?.data?.message || "Deleted successfully");
      getTasks();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "🦄 Something went wrong!"
        );
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setIsDeleting(false);
      setDeleteModalshow(false);
    }
  };

  const handleDeleteClick = (id: number, name: string) => {
    setItemToDelete(id);
    setItemToDeleteName(name);
    setDeleteModalshow(true);
  };

  const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setPageNumber(1);
  };

  useEffect(() => {
    getTasks();
  }, [title]);

  return (
    <>
      <DeleteConfirmation
        handleClose={() => setDeleteModalshow(false)}
        show={deleteModalshow}
        onConfirm={deleteTask}
        message={`Are you sure that you want to delete task ${itemToDeleteName}`}
        isDeleting={isDeleting}
      />
      <div className="tasks">
        <div className="bg-white d-flex align-items-center justify-content-between py-3 px-4 mb-3">
          <h3 className="h3 textMaster fw-medium">Tasks</h3>
          <Link
            className="btn bgMain btn-custom text-white"
            to={"/dashboard/tasks/new-Task"}
          >
            <i className="fa fa-plus me-2"></i>
            Add New Task
          </Link>
        </div>
        <div className="ms-4 task bg-white pt-3 rounded-2 ">
          <div className="position-relative ms-4" style={{ width: "250px" }}>
            <Form.Control
              onInput={handleTitleValue}
              type="search"
              placeholder="Search by Title"
              className="taskInput searchInput"
              style={{
                borderRadius: "2rem",
                paddingLeft: "2.5rem", // علشان نعمل space بين الأيقونة والنص
              }}
            />
            <i
              className="fa fa-search position-absolute text-gray-400"
              style={{
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none", // علشان الأيقونة متأثرش على الكتابة
              }}
            ></i>
          </div>

          <Table
            responsive
            striped
            bordered
            hover
            className="mt-3 "
            style={{ marginBottom: "130px" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Project</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loading />
              ) : tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task?.id}</td>
                    <td>{task?.title}</td>
                    <td>
                      <div
                        style={{
                          backgroundColor:
                            task.status === "ToDo"
                              ? "#E4E1F5"
                              : task.status === "InProgress"
                              ? "#EF9B28A3"
                              : task.status === "Done"
                              ? "#009247"
                              : "#ccc",
                          color: task.status === "Done" ? "#fff" : "#000",
                          fontWeight: "500",
                          padding: "8px 30px",
                          borderRadius: "7rem",
                          width: "fit-content",
                        }}
                      >
                        {task?.status}
                      </div>
                    </td>

                    <td>{task?.project?.title}</td>
                    <td>
                      {new Date(task?.creationDate).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      <Dropdown style={{ borderRadius: "3rem" }}>
                        <Dropdown.Toggle
                          className="bg-transparent border-0"
                          id="dropdown-basic"
                        >
                          <i className="fa fa-ellipsis-v textContent"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item className="textContent">
                            <i className="fa fa-eye mx-2"></i>View
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="textContent"
                            onClick={() =>
                              handleDeleteClick(task?.id, task?.title)
                            }
                          >
                            <i className="fa fa-trash mx-2"></i>Delete
                          </Dropdown.Item>
                          <Dropdown.Item className="textContent">
                            <Link
                              className="text-decoration-none textContent"
                              to={`/dashboard/tasks/${task?.id}`}
                            >
                              <i className="fa fa-edit mx-2"></i>Edit
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
