import React from "react";
import { FaUserGraduate, FaTimes } from "react-icons/fa";
import ButtonSpinner from "./ButtonSpinner";

// ─── Student Form Modal (Improved) ──────────────────────────
export const StudentModal = ({
  title,
  formData,
  onChange,
  onSubmit,
  onClose,
  submitText,
  isLoading = false,
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
            <FaUserGraduate className="text-lg" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
        >
          <FaTimes size={18} />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={onChange}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={onChange}
            required
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            name="status"
            value={formData.status || "ACTIVE"}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Joining Date
          </label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate || ""}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-amber-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <ButtonSpinner size="sm" />
                <span>Saving...</span>
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
);
