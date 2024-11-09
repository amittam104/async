"use client";
import { X } from "lucide-react";

function ConfirmationModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center rounded-lg justify-center backdrop-blur-sm bg-neutral-100  bg-opacity-30 w-screen h-screen z-60">
      <div className="bg-white flex flex-col justify-between px-8 py-6 rounded-lg shadow-lg w-auto h-auto relative overflow-y-scroll">
        {/* <X onClick={onClose} className="cursor-pointer fixed self-end mb-2" /> */}
        {children}
      </div>
    </div>
  );
}

export default ConfirmationModal;
