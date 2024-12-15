import React from "react";
import useAuthStore from "../store/useAuthStore";
import Sidebar from "./Sidebar";
import Dropdown, { DropdownOption } from "./DropDown/DropDown";

const Header: React.FC = () => {
  const { user } = useAuthStore();
  const options: DropdownOption[] = [
    {
      type: 'button',
      label: 'logout',
    },
    {
      label: 'amirbk@gmail.ocm',
    },
    {
      label: 'Amr',
    },
    {
      label: 'Amr',
    },
  ];

  return (
    <header className="bg-white text-slate-950 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold hidden lg:block">Geadezist Admin</h1>
      <div className="lg:hidden">
        <Sidebar />
      </div>
<<<<<<< HEAD
      
<div className="flex items-center gap-4 mr-5">
    
    <div className="text-center font-medium dark:text-white">
        <h1 className="text-sm text-black ">{user?.name || "Guest"}</h1>
        <div className="text-sm text-gray-500 ">{user?.role}</div>
    </div>
    <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="logo"/>
</div>
=======

      <div className="flex items-center gap-4 mr-5">

        <div className="text-center font-medium dark:text-white">
          <div>{user?.name || "Guest"}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</div>
        </div>
        <Dropdown trigger={<img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="logo" />} options={options} />      </div>
>>>>>>> 247f6876c481ec916cfc643d218578de7acb640f
    </header>
  );
};

export default Header;
