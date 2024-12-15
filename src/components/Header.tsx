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
      type:'button',
      label: 'Amr',
    },
  ];

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
        <Dropdown trigger={<h1>salom</h1>} options={options} />      </div>
    </header>
  );
};

export default Header;
