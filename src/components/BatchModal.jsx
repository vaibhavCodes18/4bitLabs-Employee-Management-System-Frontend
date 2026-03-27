import React from "react";
import { FaTimes, FaLayerGroup } from "react-icons/fa";
import ButtonSpinner from "./ButtonSpinner";

// Reusable DetailItem component (can also be imported from a separate file)


export const BatchModal = ({
  title,
  formData,
  onChange,
  onSubmit,
  onClose,
  submitText,
  trainers = [],
  isLoading = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-scale-in border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
              <FaLayerGroup className="text-lg" />
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Batch Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Batch Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Course *
              </label>
              <input
                type="text"
                name="course"
                value={formData.course || ""}
                onChange={onChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              />
            </div>

            {/* Trainer */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Trainer *
              </label>
              <select
                name="trainerId"
                value={formData.trainerId || ""}
                onChange={onChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              >
                <option value="" disabled>
                  Select Trainer
                </option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate || ""}
                onChange={onChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate || ""}
                onChange={onChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status || "UPCOMING"}
                onChange={onChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
};