import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TaskChart = ({ tasks }) => {

  const completedByDate = {};

  tasks.forEach(task => {
    if (task.completed && task.createdAt) {
      const dateKey = new Date(task.createdAt)
        .toISOString()
        .split("T")[0];

      completedByDate[dateKey] = (completedByDate[dateKey] || 0) + 1;
    }
  });

  const labels = Object.keys(completedByDate);
  const values = Object.values(completedByDate);

  const data = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: values,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Your Productivity History" },
    },
  };

  return <Line data={data} options={options} />;
};

export default TaskChart;
