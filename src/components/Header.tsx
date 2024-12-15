// Header.tsx
import React from "react";
// import Dropdown, { DropdownOption } from "./DropDown/Dropdown";
import { useNavigate } from "react-router-dom";
import Dropdown, { DropdownOption } from "./DropDown/DropDown";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const options: DropdownOption[] = [
    {
      label: "Profile",
      type: "text",
      onClick: () => console.log("Navigating to Profile..."),
    },
    {
      label: "Settings",
      type: "button",
      onClick: () => {
        console.log("Navigating to settings...");
        navigate("/settings");
      },
    },
    {
      label: "Logout",
      type: "button",
      onClick: () => {
        console.log("Logging out...");
        navigate("/login");
      },
    },
  ];

  return (
    <header className="ml-[300px]">
      <Dropdown
        trigger={<button className="p-2 bg-blue-500 text-white rounded">Open Menu</button>}
        options={options}
      />
    </header>
  );
};

export default Header;
