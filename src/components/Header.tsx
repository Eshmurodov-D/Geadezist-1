import React from "react";
import useAuthStore from "../store/useAuthStore";
import Sidebar from "./Sidebar";

const Header: React.FC = () => {
  const { user } = useAuthStore();
  return (
    <header className="bg-white text-slate-950 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold hidden lg:block">Geadezist Admin</h1>
      <div className="lg:hidden">
        <Sidebar />
      </div>
      
<div className="flex items-center gap-4 mr-5">
    
    <div className="text-center font-medium dark:text-white">
        <div>{user?.name || "Guest"}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</div>
    </div>
    <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="logo"/>
</div>
    </header>
  );
};

export default Header;
