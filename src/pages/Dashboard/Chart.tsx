import  { Line } from "react-chartjs-2";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartOne: React.FC = () => {
  const data = {
    labels: ["Сешанба", "Чоршанба"],
    datasets: [
      {
        label: "Ҳафталик маълумот",
        data: [0, 5],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true, max: 200 },
    },
  };

  return (
      <div className="rounded-sm border bg-white px-5 pt-7.5 pb-5 shadow-lg dark:bg-boxdark dark:border-strokedark sm:px-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex min-w-47.5">
          <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary">
            <span className="block h-2.5 w-2.5 rounded-full bg-primary"></span>
          </span>
            <div>
              <p className="font-semibold text-primary">Ҳафталик маълумот</p>
            </div>
          </div>
          <button className="rounded py-1 px-3 text-xs font-medium text-black dark:text-white dark:hover:bg-boxdark">
            Ҳафта
          </button>
        </div>
        <div className="mt-6">
          <Line data={data} options={options} />
        </div>
      </div>
  );
};

export default ChartOne;