import React from "react";

function Modal({ children, isOpen, onClose }) {
  if (isOpen) {
    return (
      <div onClick={onClose} className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg mx-4 p-6 rounded-md bg-white relative">
          <button onClick={onClose} className="absolute right-3 top-3 text-gray-800 hover:text-black hover:cursor-pointer">
            x
          </button>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
