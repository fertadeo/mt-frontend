// app/components/ui/Modal.tsx
"use client";

import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    // El overlay cubre toda la pantalla con fondo semi-transparente.
    // Al hacer clic en el overlay se invoca onClose.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* El contenido del modal detiene la propagación para que no se cierre al hacer clic dentro */}
      <div
        className="bg-white rounded shadow-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
