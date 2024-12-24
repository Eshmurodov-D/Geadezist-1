import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Sidebar from "./Sidebar";

const Header: React.FC = () => {
  const { user } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem("token");  // Remove token to log out
    navigate("/login"); // Redirect to login page
  };

  return (
      <header className="bg-white text-slate-950 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold hidden lg:block">Geadezist Admin</h1>
        <div className="lg:hidden">
          <Sidebar />
        </div>

        <div className="flex items-center gap-4 mr-5 relative">
          <div className="text-center font-medium dark:text-white">
            <h1 className="text-sm text-black ">{user?.name || "Guest"}</h1>
            <div className="text-sm text-gray-500 ">{user?.role}</div>
          </div>
          <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="profile"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
          />

          {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-2 w-40">
                <ul>
                  <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log("Profile clicked")}
                  >
                    Profile
                  </li>
                  <li
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                  >
                    Logout
                  </li>
                </ul>
              </div>
          )}

          {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Are you sure you want to logout?</h2>
                  <div className="flex justify-end gap-4">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(false)}
                    >
                      No
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleLogout}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </header>
  );
};

export default Header;
