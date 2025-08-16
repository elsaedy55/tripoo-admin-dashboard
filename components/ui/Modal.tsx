import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width = 'max-w-xl' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" dir="rtl">
      <div className={`bg-white rounded-lg shadow-lg w-full ${width} relative`} dir="rtl">
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="إغلاق"
        >
          ×
        </button>
        {title && <div className="px-6 pt-6 pb-2 text-2xl font-bold border-b">{title}</div>}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
