<<<<<<< HEAD
import { Select, Pagination } from 'antd';
import { BiCategory } from 'react-icons/bi';
import { FaCircleQuestion, FaUsers } from 'react-icons/fa6';
import { PiArrowsOutCardinal } from 'react-icons/pi';
import ChartOne from './Chart'; // Assuming ChartOne is in the same directory

const { Option } = Select;

const Dashboard = () => {
  const cardData = [
    { title: "Умумий категория", icon: <BiCategory className="text-2xl text-primary" /> },
    { title: "Умумий савол", icon: <FaCircleQuestion className="text-2xl text-primary" /> },
    { title: "Умумий натижа", icon: <PiArrowsOutCardinal className="text-2xl text-primary" /> },
    { title: "Жами фойдаланувчилар", icon: <FaUsers className="text-2xl text-primary" /> },
  ];

  return (
    <div className="p-4">
      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            </div>
            <div className="w-14 h-14 flex justify-center items-center rounded-full bg-gray-200 dark:bg-gray-700">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
       <div className="mt-6">
        <ChartOne />
      </div> 

      {/* Filters and Table Section */}
      <div className="mt-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Select
            placeholder="Категорияни танланг"
            className="w-full sm:w-1/2"
            style={{ height: 40 }}
            allowClear
          >
            <Option value="1">Category 1</Option>
            <Option value="2">Category 2</Option>
          </Select>
          <Select
            placeholder="Вилоятни танланг"
            className="w-full sm:w-1/2"
            style={{ height: 40 }}
            allowClear
          >
            <Option value="1">Region 1</Option>
            <Option value="2">Region 2</Option>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                {["Т/Р", "Исм", "Фамилия", "Категория номи", "Натижа (Тўғри жавоблар/Умумий саволлар)"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2 text-left text-gray-800 dark:text-white font-medium"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                >
                  Статистика топилмади
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <Pagination
            showSizeChanger={false}
            responsive
            defaultCurrent={1}
            total={10} 
          />
        </div>
      </div>
    </div>
  );
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get('http://142.93.106.195:9090/api/dashboard');
                setChartData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
        datasets: [
            {
                label: 'Natija',
                data: chartData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Haftalik Natijalar Grafiki',
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Red Section */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="font-bold text-lg">Umumiy Kategoriya</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="font-bold text-lg">Umumiy Savol</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="font-bold text-lg">Umumiy Natija</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h2 className="font-bold text-lg">Jami Foydalanuvchilar</h2>
                </div>
            </div>

            {/* Yellow Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 ">
                <h2 className="font-bold text-xl mb-4">Haftalik ma'lumot</h2>
                <div className="w-1/2 mx-auto">
                    <Line data={data} options={options} />
                </div>
            </div>

            {/* Purple Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search branch name..."
                        className="border border-gray-300 rounded-lg p-2 w-1/3"
                    />
                    <select className="border border-gray-300 rounded-lg p-2">
                        <option value="">Viloyatni tanlang</option>
                    </select>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">T/P</th>
                        <th className="border p-2">Ism</th>
                        <th className="border p-2">Familiya</th>
                        <th className="border p-2">Kategoriya</th>
                        <th className="border p-2">Natija (To'g'ri javoblar/savollar soni)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border p-2" colSpan={5}>
                            Ma'lumotlar topilmadi
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
>>>>>>> 0ea9d96b983c8d309ca22e86b7702c8d457710e3
};

export default Dashboard;
