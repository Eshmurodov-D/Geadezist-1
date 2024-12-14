import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useAuthStore from "../store/useAuthStore";

const AdminLayout: React.FC = () => {
    const { user } = useAuthStore(); // Foydalanuvchi ma'lumotini olish
    return (
        <div className="flex min-h-screen flex-col">
            {/* Header (yuqori qism) */}
            <header className="w-full bg-white">
                <Header />
            </header>
            <div className="flex flex-1">
                {/* Sidebar (chap qism), admin foydalanuvchilardan yashiriladi */}
                {user?.role !== "admin" && (
                    <div className="lg:block w-64 bg-white hidden">
                        <Sidebar />
                    </div>
                )}
                {/* Asosiy kontent (o'ng qism) */}
                <main className="flex-1 p-4 bg-gray-200 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default AdminLayout;
