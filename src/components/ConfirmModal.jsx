import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ConfirmModal = ({ isOpen, title, message, confirmText = "Confirm", cancelText = "Cancel", confirmClassName = "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200", onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-500">
            <FaExclamationTriangle className="text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`px-5 py-2.5 rounded-xl text-sm font-medium text-white transition shadow-md hover:shadow-lg ${confirmClassName}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;