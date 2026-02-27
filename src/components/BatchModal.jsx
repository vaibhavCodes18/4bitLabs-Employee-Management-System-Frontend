import React from "react";
import { FaTimes, FaLayerGroup } from "react-icons/fa";

export const BatchModal = ({
  title,
  formData,
  onChange,
  onSubmit,
  onClose,
  submitText,
  trainers = [],
}) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-scale-in border border-gray-100">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <FaLayerGroup />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition">
          <FaTimes size={16} />
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Batch Name *</label>
            <input type="text" name="name" value={formData.name} onChange={onChange} required
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Course *</label>
            <input type="text" name="course" value={formData.course} onChange={onChange} required
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Trainer Name *</label>
            <select name="trainerName" value={formData.trainerName} onChange={onChange} required
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition">
              <option value="" disabled>Select Trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.name}>{trainer.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={onChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={onChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
            <select name="status" value={formData.status} onChange={onChange}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition">
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="button" onClick={onSubmit} className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200">
            {submitText}
          </button>
        </div>
      </div>
    </div>
  </div>
);