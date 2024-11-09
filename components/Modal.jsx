"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center rounded-lg justify-center backdrop-blur-sm bg-neutral-200  bg-opacity-50 w-screen h-screen z-50">
      <div className="bg-white flex flex-col justify-between px-8 py-6 rounded-lg shadow-lg w-[50rem] h-[40rem] relative overflow-y-scroll">
        <X onClick={onClose} className="cursor-pointer fixed self-end mb-2" />
        {children}
      </div>
    </div>
  );
}

export default Modal;
