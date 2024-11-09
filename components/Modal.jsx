"use client";
import { Button } from "./ui/button";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center rounded-lg justify-center backdrop-blur-sm bg-neutral-200  bg-opacity-50 w-screen h-screen z-50">
      <div className="bg-white flex flex-col px-8 py-6 rounded-lg shadow-lg w-[50rem] h-[35rem] relative">
        <Button
          variant="ghost"
          onClick={onClose}
          className="px-4 hover:bg-neutral-200/50 self-end mb-2"
        >
          &times;
        </Button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
