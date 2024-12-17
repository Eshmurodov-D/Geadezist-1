// Dropdown.tsx
import React, { useState, useEffect, ReactNode } from "react";

export interface DropdownOption {
  label: string;
  type?: "button" | "text";
  onClick?: () => void; 
}

interface DropdownProps {
  trigger: ReactNode;
  options: DropdownOption[];
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, options }) => {
  const [isOpen, setIsOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown-container relative inline-block">
      {/* Trigger to open/close dropdown */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown menu, only visible if isOpen is true */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // Close dropdown when an option is selected
                  closeDropdown();
                  // Call the onClick handler if it exists
                  option.onClick && option.onClick();
                }}
              >
                {option.type === "button" ? (
                  // If the option type is 'button', render a button
                  <button className="w-full text-left">
                    {option.label}
                  </button>
                ) : (
                  // If the option type is 'text', just render a span
                  <span>{option.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;