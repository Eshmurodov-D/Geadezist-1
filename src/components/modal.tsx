import React, { ReactNode } from "react";
import Button from "./Button"; // Button komponentasini import qilamiz

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode; // Modal ichidagi kontent uchun prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Modal faqat isOpen true bo'lganda ko'rinadi

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal bosh qismi (header) */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          {/* Yopish tugmasi */}
          <Button
            onClick={onClose} // Modalni yopish uchun onClick event handler
          >
            &times; {/* X harfi (yopish tugmasi) */}
          </Button>
        </div>

        {/* Modal ichidagi kontent (children) */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;


