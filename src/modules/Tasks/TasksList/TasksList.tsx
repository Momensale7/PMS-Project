import React, { useContext } from 'react'
import { Authcontext } from '../../AuthContext/AuthContext'
import TasksBoard from '../../EmployeeTasks/TasksBoard'

export default function TasksList() {
  const authContext = useContext(Authcontext)
  const role = authContext?.role
  return (
    <>
    {role === 'Employee' ? <TasksBoard/> : <h1 className='text-center'>tasks list</h1>}
    </>
  )
}
