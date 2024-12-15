import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Dashboard2() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const dashboardData = {
        user: {
            name: "sdff sdrb",
            email: "alishersodiqov09@gmail.com",
            avatarUrl: "https://via.placeholder.com/150"
        },
        dropdownItems: [
            {
                label: "Профил",
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
            additionalInfo: "Қўшимча йўналишлардан ишланганлар",
            buttonText: "Кутилмоқда"
        },
        section: {
            title: "1/3",
            duration: "2 дақ.",
            score: "3.3",
            answers: "03.12.2024",
        },
        mode: {
            imageUrl: "data:image/jpeg;base64,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",
            cancelButtonText: "Chiqish",
        },
        modal: {
            title: "Сиз аник тизмадан чиқмоқчимиз?",
            confirmButtonText: "Ҳа",
            cancelButtonText: "Йўқ"
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openImageModal = (imageUrl: string): void => {
        if (!imageUrl) {
            return;
        }
        setIsModalOpen(true);
    };


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
                        <div
                            className="w-96 h-52 flex items-center justify-center ml-8 translate-y-6 -mb-16 relative"
                            onClick={() => openImageModal(dashboardData.card.imageUrl)} // Open modal on click
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-96 h-64 translate-y-8 bg-gray-200 text-gray-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                ></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <path d="M21 15l-5-5L5 21"></path>
                            </svg>
                            <div className="rounded-md absolute inset-0 bg-gray-800 h-64 translate-y-2 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                <img
                                    src={dashboardData.card.imageUrl}
                                    alt="Eye Icon"
                                    className="w-12 h-12"
                                />
                                <h1 className="">{dashboardData.card.previewText}</h1>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <h3 className="text-xl translate-y-32 font-semibold text-red-600 text-center mb-8">
                                {dashboardData.card.title}
                            </h3>
                            <div className="text-xl text-gray-600 space-y-3 font-sans translate-y-32">
                                <p>{dashboardData.card.answers}</p>
                                <p>{dashboardData.card.duration}</p>
                                <p>{dashboardData.card.score}</p>
                                <p>{dashboardData.card.date}</p>
                            </div>
                            <div className="text-base font-sans -translate-y-4 mb-6 space-y-4">
                                <p className="font-bold text-right text-gray-500">{dashboardData.section.title}</p>
                                <p className="font-bold text-right text-gray-500">{dashboardData.section.duration}</p>
                                <p className="font-bold text-right text-gray-500">{dashboardData.section.score}</p>
                                <p className="font-bold text-right text-gray-500">{dashboardData.section.answers}</p>
                            </div>
                            <p className="text-red-600 font-medium mt-3 text-center text-xl">
                                {dashboardData.card.additionalInfo}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2 text-center">
                            <button className="min-w-96 mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full">
                                {dashboardData.card.buttonText}
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <img
                            src={dashboardData.mode.imageUrl}
                            alt="Modal"
                            className="w-full h-auto"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            >
                                {dashboardData.mode.cancelButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard2;
