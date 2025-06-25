import React, { useState } from 'react';
 // For the plus icon

// --- Popup.jsx Component ---
const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-[#141516] rounded-lg shadow-xl p-6 sm:p-8 max-w-sm w-full mx-auto relative">
        <h3 className="text-2xl font-bold mb-4 text-center">Popup Content</h3>
        <p className="text-center mb-6">
          This is the content for the popup. It's the same for all cards!
        </p>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;