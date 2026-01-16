// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TaskChart = ({ tasks }) => {

//   const completedByDate = {};

//   tasks.forEach(task => {
//     if (task.completed && task.createdAt) {
//       const dateKey = new Date(task.createdAt)
//         .toISOString()
//         .split("T")[0];

//       completedByDate[dateKey] = (completedByDate[dateKey] || 0) + 1;
//     }
//   });

//   const labels = Object.keys(completedByDate);
//   const values = Object.values(completedByDate);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Completed Tasks",
//         data: values,
//         borderWidth: 2,
//         tension: 0.4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Your Productivity History" },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// export default TaskChart;
import React from "react";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


const TaskChart = ({ tasks }) => {
  const today=new Date()
  
  if (!tasks || tasks.length === 0) {
    return <p className="chart-empty">No task data available</p>;
  }

  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = tasks.filter(t => !t.completed).length;
  const TotalTask=tasks.length
  const overDue=tasks.filter(task=>{
    const taskDate= new Date(task.scheduleDate)
    return  taskDate<today && !task.completed;

  })
  const data = {
    labels: [ "Completed Tasks", "Active Tasks" ,"TotalTask" ,"overDue"],
    datasets: [
      {
        label: "Task Progress",
        data: [completedTasks, activeTasks ,TotalTask,overDue.length],
        backgroundColor: [
          "rgb(34, 197, 94)", 
          "rgb(239, 68, 68)",  
          "rgb(255, 255, 0)",
          "rgb(255, 165, 0)"
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">
       
      </h2>
      <div className="w-80 h-80 flex items-center justify-center">
      <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskChart;

