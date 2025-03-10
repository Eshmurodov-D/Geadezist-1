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
                        total={10} // Example: Set the total to something greater than 0 to show pagination
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;