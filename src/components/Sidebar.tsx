import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobil versiyada sidebarni boshqarish
    const { user } = useAuthStore();
    const location = useLocation(); // Hozirgi yo'nalishni olish

    // Menyu elementlari (rol asosida ko'rinadigan)
    const menuItems = [
        { name: "Бошқарув панели", path: "/dashboard", roles: ["superadmin"] },
        { name: "Категория", path: "/categories", roles: ["superadmin", "testadmin"] },
        { name: "Тест", path: "/test", roles: ["superadmin", "testadmin"] },
        { name: "Фойдаланувчилар", path: "/users", roles: ["superadmin"] },
        { name: "Фойдаланувчилар натижаси", path: "/user-results", roles: ["superadmin", "admin"] },
        { name: "Ходимлар", path: "/employees", roles: ["superadmin"] },
        { name: "Манзил", path: "/addresses", roles: ["superadmin"] },
    ];
    // Sidebarni ochish-yopish funksiyasi
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div>
            {/* Sidebar faqat `admin` bo'lmagan foydalanuvchilar uchun ko'rsatiladi */}
            {user?.role !== "admin" && (
                <div className="relative">
                    {/* Mobil uchun hamburger tugmasi */}
                    <button className="lg:hidden p-4 text-black" onClick={toggleSidebar}>
                        ☰
                    </button>

                    {/* Sidebar tarkibi */}
                    <div
                        className={`lg:block w-64 bg-white text-slate-900 fixed inset-0 lg:relative lg:w-64 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            } lg:translate-x-0 transition-transform duration-300`}
                    >
                        {/* Mobilda yopish tugmasi */}
                        <div
                            className="lg:hidden w-full text-right"
                        > <button onClick={toggleSidebar} className="mt-4 mr-4">
                                ✖
                            </button>
                        </div>

                        {/* Menyu elementlari */}
                        <ul className="p-4 flex flex-col w-full bg-white gap-y-5 mt-20">
                            {menuItems
                                .filter((item) => item.roles.includes(user?.role || ""))
                                .map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className={`block w-full p-2 rounded border border-slate-400 text-left hover:bg-slate-100 ${location.pathname === item.path
                                                ? "bg-slate-200"
                                                : ""
                                                }`}
                                            onClick={toggleSidebar}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
