import React, { useEffect } from 'react'
import DoughnutChart from '../DoughnutChart/Doughnut Chart';
import { privateAxiosInstance } from '../../services/api/apiInstance';


interface progressCountInterface {
    done: number;
    inProgress: number;
    toDo: number;
}

const ProgressChart = () => {
    const [progressNumber, setProgressNumber] = React.useState<progressCountInterface>({
        done: 0,
        inProgress: 0,
        toDo: 0,
    });

    const getProgressCount = async () => {
        try {
            const { data } = await privateAxiosInstance.get('/Task/count');
            console.log(data);
            setProgressNumber(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProgressCount();
    }, []);
    return (
        <div className="box-dark-color py-3 bg-dashboard-light rounded-2">
            <div className="card-left-line px-5">
                <h5>Progress</h5>
                <p className="text-muted">Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div className="row p-3">
                <div className="col-12">
                    <DoughnutChart
                        labels={['Done', 'In Progress', 'To Do']}
                        chartData={[progressNumber?.done, progressNumber?.inProgress, progressNumber?.toDo]}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgressChart