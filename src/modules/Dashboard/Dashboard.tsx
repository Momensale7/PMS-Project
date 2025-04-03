import React, { useEffect } from 'react'
import DashboardCard from '../shared/DashboardCard/DashboardCard'
import DoughnutChart from '../shared/DoughnutChart/Doughnut Chart'
import { privateAxiosInstance } from '../services/api/apiInstance'
import { USER_URLS } from '../services/api/apiConfig'
interface userCountInterface{
  activatedEmployeeCount:number,
deactivatedEmployeeCount:number

}
export default function Dashboard() {
  const [isLoading,setIsLoading]=React.useState<Boolean>(false)
  const [userData,setUserData]=React.useState<null|userCountInterface>(null)
  const [taskNumber,setTaskNumber]=React.useState<number>(null)
  const [projectNumber,setProjectNumber]=React.useState<number>(null)
  const [progressNumber,setProgressNumber]=React.useState<number>(null)
  const getUserCount= async()=>{
    try {
      const {data}=await privateAxiosInstance.get(USER_URLS.GET_USERS_COUNT)
        console.log(data)
        setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }
  const getProgetCount= async()=>{
    try {
      const {data}=await privateAxiosInstance.get("/Project/manager?pageSize=1&pageNumber=1")
        console.log(data)
        setProjectNumber(data?.totalNumberOfRecords)
    } catch (error) {
      console.log(error)
    }
  }
  const getTaskCount= async()=>{
    try {
      const {data}=await privateAxiosInstance.get("/Task/manager?pageSize=1&pageNumber=1")
        console.log(data)
        setTaskNumber(data?.totalNumberOfRecords)
    } catch (error) {
      console.log(error)
    }
  }
  const getProgressCount= async()=>{
    try {
      const {data}=await privateAxiosInstance.get("/Project/?pageSize=1&pageNumber=1")
        console.log(data)
        setProgressNumber(data?.totalNumberOfRecords)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserCount()
    getProgetCount()
    getTaskCount()
    getProgressCount()
  },[])
  return (
    <div className='container-fluid bg-dashboard-body'>
      <div className=' font-monospace rounded-4   d-flex flex-column justify-content-center header-bg  text-white px-2 py-5 lh-lg'>
        <h3 >Welcome <span className='main-color '>Upskilling</span></h3>
        <p className='fs-3'>You can add project and assign tasks to your team</p>
      </div>
      <div className="row g-4 mt-2 ">
      <div className="  col-12 col-md-7 ">
        <div className='py-3 bg-dashboard-light rounded-2 '>

        <div className='card-left-line px-5'>
          <h5>Tasks</h5>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
         <div className="row p-3 ">
          <div className=" col-12 col-sm-6 col-md-4">
          <DashboardCard status={"Progress"} number={progressNumber} color="#CFD1EC" icon={<i className="fa-solid fa-bars-progress"></i>} />
          </div>
          <div className=" col-12 col-sm-6 col-md-4">
          <DashboardCard status={"Task Number"} number={taskNumber} color="#E4E4BC" icon={<i className="fa-solid fa-list-check"></i>} />
          </div>
          <div className=" col-12 col-sm-6 col-md-4">
          <DashboardCard status={"Progects Number"} number={projectNumber} color="#E7C3D7" icon={<i className="fa-solid fa-chalkboard-user"></i>} />
          </div>
         </div>
        </div>

      </div>
      
      <div className="  col-12 col-md-5 ">
        <div className='py-3 bg-dashboard-light rounded-2 '>

        <div className='card-left-line px-5'>
          <h5>Users</h5>
          <p className='text-muted'>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
         <div className="row p-3">
          <div className=" col-12 col-sm-6 col-md-5">
        <DashboardCard status={"active"} number={userData?.activatedEmployeeCount} color="#CFD1EC" icon={<i className="fa-solid fa-users"></i>} />
          </div>
          <div className=" col-12 col-sm-6 col-md-5">
        <DashboardCard status={"inactive"} number={userData?.deactivatedEmployeeCount}  color="#E4E4BC" icon={<i className="fa-solid fa-users-slash"></i>} />

          </div>
         </div>
        </div>

      </div>

      <div className='col-12 d-flex justify-items-center align-items-center'>
          <h4 className='mx-auto'>Task Status Overview</h4>
      </div>
      {/* <div className='col-6 d-flex justify-items-center align-items-center'>
          <p className='mx-auto'>Task Status Overview.</p>
      </div> */}
      <div className='col-12 col-sm-6'>
      {userData && taskNumber !== null && projectNumber !== null && (
  <DoughnutChart labels={["Progress","Task Number","Projects Number"]} 
    chartData={[progressNumber ?? 0, taskNumber ?? 0, projectNumber ?? 0]}
  />
)}
      </div>
      <div className='col-12  col-sm-6'>
      <DoughnutChart labels={["active","inactiver"]} chartData={[userData?.activatedEmployeeCount,userData?.deactivatedEmployeeCount]}/>
      </div>
      </div>
    </div>
  )
}
