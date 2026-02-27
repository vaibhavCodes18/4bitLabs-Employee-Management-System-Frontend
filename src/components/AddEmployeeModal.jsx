import React from "react";
import { FaTimes, FaUserPlus } from "react-icons/fa";

const INPUT_CLASS = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition";
const LABEL_CLASS = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

const AddEmployeeModal = ({
  isOpen,
  onClose,
  mode,
  role,
  formData,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const renderFields = () => {
    switch (role) {
      case "Trainer":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Name *</label>
              <input type="text" name="name" value={formData.name || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email *</label>
              <input type="email" name="email" value={formData.email || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Password</label>
              <input type="password" name="password" value={formData.password || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Phone Number</label>
              <input type="tel" name="phno" value={formData.phno || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Status</label>
              <select name="status" value={formData.status || "Active"} onChange={onChange} className={INPUT_CLASS}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS}>Specialization</label>
              <input type="text" name="specialization" value={formData.specialization || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Experience (years)</label>
              <input type="number" name="expInYear" value={formData.expInYear || ""} onChange={onChange} min="0" step="0.5" className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Qualification</label>
              <input type="text" name="qualification" value={formData.qualification || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Joining Date</label>
              <input type="date" name="joiningdate" value={formData.joiningdate || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Salary ($)</label>
              <input type="number" name="salary" value={formData.salary || ""} onChange={onChange} min="0" step="100" className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Students</label>
              <input type="number" name="students" value={formData.students || ""} onChange={onChange} min="0" className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Rating (0-5)</label>
              <input type="number" step="0.1" min="0" max="5" name="rating" value={formData.rating || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
          </div>
        );
      case "Analyst":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Name *</label>
              <input type="text" name="name" value={formData.name || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email *</label>
              <input type="email" name="email" value={formData.email || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Password</label>
              <input type="password" name="password" value={formData.password || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Phone Number</label>
              <input type="tel" name="phno" value={formData.phno || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Status</label>
              <select name="status" value={formData.status || "Active"} onChange={onChange} className={INPUT_CLASS}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS}>Department *</label>
              <input type="text" name="department" value={formData.department || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Joining Date</label>
              <input type="date" name="joiningdate" value={formData.joiningdate || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Salary ($)</label>
              <input type="number" name="salary" value={formData.salary || ""} onChange={onChange} min="0" step="100" className={INPUT_CLASS} />
            </div>
          </div>
        );
      case "Counsellor":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLASS}>Name *</label>
              <input type="text" name="name" value={formData.name || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Email *</label>
              <input type="email" name="email" value={formData.email || ""} onChange={onChange} required className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Password</label>
              <input type="password" name="password" value={formData.password || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Phone Number</label>
              <input type="tel" name="phno" value={formData.phno || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Status</label>
              <select name="status" value={formData.status || "Active"} onChange={onChange} className={INPUT_CLASS}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS}>Joining Date</label>
              <input type="date" name="joiningdate" value={formData.joiningdate || ""} onChange={onChange} className={INPUT_CLASS} />
            </div>
            <div>
              <label className={LABEL_CLASS}>Salary ($)</label>
              <input type="number" name="salary" value={formData.salary || ""} onChange={onChange} min="0" step="100" className={INPUT_CLASS} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 animate-scale-in border border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
              <FaUserPlus />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {mode === "add" ? "Add New" : "Edit"} {role}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition">
            <FaTimes size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {renderFields()}
          <div className="flex justify-end space-x-3 pt-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="button" onClick={onSubmit} className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200">
              {mode === "add" ? "Add" : "Save"} {role}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
