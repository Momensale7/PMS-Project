import React, { useEffect } from 'react'
import DashboardCard from '../DashboardCard/DashboardCard';
import { privateAxiosInstance } from '../../services/api/apiInstance';

const TaskStatistics = () => {
    const [taskNumber, setTaskNumber] = React.useState<number | null>(null);
  const [projectNumber, setProjectNumber] = React.useState<number | null>(null);
 
     const getProjectCount = async () => {
        try {
          const { data } = await privateAxiosInstance.get('/Project/manager?pageSize=1&pageNumber=1');
          console.log(data);
          setProjectNumber(data?.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
      };
    
      const getTaskCount = async () => {
        try {
          const { data } = await privateAxiosInstance.get('/Task/manager?pageSize=1&pageNumber=1');
          console.log(data);
          setTaskNumber(data?.totalNumberOfRecords);
        } catch (error) {
          console.log(error);
        }
      };
    
        useEffect(() => {
            getProjectCount();
            getTaskCount();
        }, []);
  return (
    <div className="box-dark-color py-3 bg-dashboard-light rounded-2">
    <div className="card-left-line px-5">
      <h5>Tasks</h5>
      <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
    </div>
    <div className="row p-3">
     
      <div className="col-12 col-sm-6 col-md-6">
        <DashboardCard
          status={'Task Number'}
          number={taskNumber ?? 0}
          color="#E4E4BC"
          icon={<i className="fa-solid fa-list-check"></i>}
        />
      </div>
      <div className="col-12 col-sm-6 col-md-6">
        <DashboardCard
          status={'Projects Number'}
          number={projectNumber ?? 0}
          color="#E7C3D7"
          icon={<i className="fa-solid fa-chalkboard-user"></i>}
        />
      </div>
    </div>
  </div>
  )
}

export default TaskStatistics