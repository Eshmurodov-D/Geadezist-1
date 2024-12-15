import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard2() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

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
        modal: {
            title: "Сиз аник тизмадан чиқмоқчимиз?",
            confirmButtonText: "Ҳа",
            cancelButtonText: "Йўқ"
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        navigate("/Register");
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
                            {/*<button*/}
                            {/*    onClick={openModal}*/}
                            {/*    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:opacity-100 transition-opacity duration-300 ease-in-out"*/}
                            {/*>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        className="h-10 w-10 mr-2 text-gray-500"*/}
                            {/*        fill="none"*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*        strokeWidth="2"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            strokeLinecap="round"*/}
                            {/*            strokeLinejoin="round"*/}
                            {/*            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-6V7"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*    {dashboardData.dropdownItems[1].label}*/}
                            {/*</button>*/}
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
                            <button className="min-w-96 mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition">
                                {dashboardData.card.buttonText}
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl mb-4">{dashboardData.modal.title}</h3>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                {dashboardData.modal.cancelButtonText}
                            </button>
                            <button
                                onClick={handleLogout} // Handle redirection on "Ҳа"
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                {dashboardData.modal.confirmButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard2;
