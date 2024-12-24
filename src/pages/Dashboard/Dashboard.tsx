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
};

export default Dashboard;
