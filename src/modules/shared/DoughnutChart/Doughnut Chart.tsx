import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  chartData: number[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ labels, chartData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: chartData,
        backgroundColor: ["#E5E6F4", "#F4F4E5", "#F4E5ED"],
        hoverBackgroundColor: ["#CFD1EC", "#E4E4BC", "#E7C3D7"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "Task Status Overview",
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
