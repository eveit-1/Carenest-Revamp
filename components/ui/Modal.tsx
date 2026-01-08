'use client';

import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

interface ModalProps {
  children: React.ReactNode;
  modalOpen: boolean;
  setOpenModal: (open: boolean) => void;
}

export function Modal({ children, modalOpen, setOpenModal }: ModalProps) {
  if (!modalOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-full h-full px-4 py-8 mx-auto rounded-md">
            <span
              className="absolute top-2 right-2 cursor-pointer z-10"
              onClick={() => setOpenModal(false)}
            >
              <AiFillCloseCircle className="fill-primary-red" size={30} />
            </span>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
