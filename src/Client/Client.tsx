import { useState, useEffect } from "react";
import axios from "axios";

interface Certificate {
    id: number;
    title: string;
    description: string;
    score: number;
    date: string;
    imageUrl?: string;  // Optional image URL
}

function Dashboard2() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [certificateData, setCertificateData] = useState<Certificate | null>(null);

    const dashboardData = {
        user: {
            name: "sdff sdrb",
            email: "alishersodiqov09@gmail.com",
            avatarUrl: "https://via.placeholder.com/150"
        },
        dropdownItems: [
            {
                label: "Профиль",
                icon: "https://via.placeholder.com/150"
            },
            {
                label: "Чиқиш",
                icon: "https://via.placeholder.com/150"
            }
        ],
        card: {
            title: "test",
            answers: "Тўғри жавоблар:",
            duration: "Вақт давомийлиги:",
            score: "Тўпланган балл:",
            date: "Тест топширилган сана:",
            previewText: "Preview",
            imageUrl: "https://cdn-icons-png.flaticon.com/128/11502/11502607.png",
            additionalInfo: "Қошимча маълумотлар",
            buttonText: "Кутилаётган"
        },
        section: {
            title: "1/3",
            duration: "2 дақ.",
            score: "3.3",
            answers: "03.12.2024"
        },
        mode: {
            imageUrl: "https://cdn-icons-png.flaticon.com/128/11502/11502607.png",
            cancelButtonText: "Чиқиш"
        },
        modal: {
            title: "Сиз аник тизмадан чиқмоқчимисиз?",
            confirmButtonText: "Ҳа",
            cancelButtonText: "Йўқ"
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close modal
    };

    const openImageModal = (imageUrl?: string): void => {
        if (imageUrl) {
            setIsModalOpen(true); // Open modal only if imageUrl is provided
        }
    };

    useEffect(() => {
        axios
            .get("http://142.93.106.195:9090/certificate/2")
            .then((response) => {
                setCertificateData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching certificate data:", error);
            });
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-100 flex-col">
            {/* Navbar */}
            <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">GEADEZIST</h1>

                <div className="flex items-center space-x-4 relative">
                    <div className="text-right">
                        <p className="text-gray-800 font-medium">{dashboardData.user.name}</p>
                        <p className="text-sm text-gray-500">{dashboardData.user.email}</p>
                    </div>
                    <img
                        className="w-10 h-10 rounded-full"
                        src={dashboardData.user.avatarUrl}
                        alt="User Avatar"
                    />
                    <button
                        onClick={toggleDropdown}
                        className="text-gray-600 hover:text-black focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 9l6 6 6-6"
                            />
                        </svg>
                    </button>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-52 w-80 bg-white shadow-lg rounded-md py-2">
                            {dashboardData.dropdownItems.map((item, index) => (
                                <a
                                    key={index}
                                    href="#profile"
                                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    <img
                                        className="h-10 w-10 mr-2 text-gray-500"
                                        src={item.icon}
                                        alt="Icon"
                                    />
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Sidebar */}
            <div className="flex flex-1">
                <aside className="w-80 bg-white shadow-lg p-4">
                    <div className="flex flex-col items-center">
                        <nav className="w-72 space-y-52">
                            <button
                                className="w-full h-14 text-left text-xl translate-y-44 text-gray-700 hover:bg-gray-200 p-3 rounded-lg shadow-lg transition">
                                Тест
                            </button>
                            <button
                                className="w-full h-14 text-left text-xl text-gray-700 hover:bg-gray-200 p-3 rounded-lg shadow-lg transition">
                                Натижалар бўлими
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-24">
                    <header className="flex justify-between items-center mb-40">
                        <h2 className="text-2xl translate-y-32 font-semibold text-black-600">{dashboardData.user.name}</h2>
                        <h2 className="text-4xl -translate-y-3 -translate-x-96 font-bold text-red-600">
                            Сизнинг натижаларингиз
                        </h2>
                    </header>

                    {/* Card Section */}
                    <div className="max-w-md rounded overflow-hidden shadow-xl relative group">
                        {certificateData ? (
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-center">{certificateData.title}</h3>
                                <p className="mt-4 text-gray-600">{certificateData.description}</p>
                                <p className="mt-2 text-gray-600">Баллы: {certificateData.score}</p>
                                <p className="mt-2 text-gray-600">Дата: {certificateData.date}</p>
                                {certificateData.imageUrl && (
                                    <button
                                        onClick={() => openImageModal(certificateData.imageUrl)}
                                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                                    >
                                        Open Image
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">yuklanmoqda...</p>
                        )}
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
                                <h3 className="text-xl font-semibold">{dashboardData.modal.title}</h3>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                                    >
                                        {dashboardData.modal.cancelButtonText}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        {dashboardData.modal.confirmButtonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard2;
