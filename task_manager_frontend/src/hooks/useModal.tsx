import React, { useState, useEffect, useRef } from "react";

export const useModal = (Component: React.FC | React.ReactNode) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Close the modal if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    // Add event listener for detecting clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ModalWrapper = () => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white w-96 p-5 rounded-lg shadow-lg relative"
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            &times;
          </button>
          <div>{Component}</div>
        </div>
      </div>
    );
  };

  return { ModalWrapper, openModal, closeModal };
};
