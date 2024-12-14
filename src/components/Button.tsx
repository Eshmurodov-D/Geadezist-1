import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded shadow border border-gray-300 hover:bg-gray-200 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
