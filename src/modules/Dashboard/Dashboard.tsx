import React from 'react';
import TaskStatistics from '../shared/TaskStatistics/TaskStatistics';
import UserStatistics from '../shared/UserStatistics/UserStatistics';
import ProgressChart from '../shared/ProgressChart/ProgressChart';

export default function Dashboard() {
  
  return (
    <div className="container-fluid bg-dashboard-body">
      <div className="font-monospace rounded-4 d-flex flex-column justify-content-center header-bg text-white px-2 py-5 lh-lg">
        <h3>
          Welcome <span className="main-color">Upskilling</span>
        </h3>
        <p className="fs-3">You can add project and assign tasks to your team</p>
      </div>
      <div className="row g-3 justify-content-around  mt-2">
        <div className="col-12 col-md-6 col-lg-4 ">
          <TaskStatistics/>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
         <UserStatistics/>
        </div>

        <div className="col-12 col-md-4  ">
         <ProgressChart/>
        </div>

        
      </div>
    </div>
  );

}
