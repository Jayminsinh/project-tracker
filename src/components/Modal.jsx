import React from "react";

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center 
               bg-red-200/50 backdrop-blur-sm px-4
               animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white 
                 rounded-2xl shadow-xl p-8
                 animate-scaleIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 
                   flex items-center justify-center
                   rounded-full text-gray-500 
                   hover:bg-gray-100 hover:text-gray-800
                   transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
