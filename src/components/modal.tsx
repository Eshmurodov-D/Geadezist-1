import React, { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <Button variant="secondary" size="small" onClick={onClose}>
            &times;
          </Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

