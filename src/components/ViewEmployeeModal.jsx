import React from "react";
import { FaTimes } from "react-icons/fa";
import { DetailItem } from "./DetailItem"; // Make sure this component exists
import { ROLE_CONFIG } from "../constants";

const roleGradients = {
  Trainer: "from-emerald-500 to-emerald-600",
  Analyst: "from-purple-500 to-purple-600",
  Counsellor: "from-amber-500 to-orange-600",
};

const ViewEmployeeModal = ({ isOpen, employee, role, onClose }) => {
  if (!isOpen || !employee) return null;

  const gradient = roleGradients[role] || "from-indigo-500 to-indigo-600";

  const renderDetails = () => {
    const common = (
      <>
        <DetailItem label="Name" value={employee.name} />
        <DetailItem label="Email" value={employee.email} />
        <DetailItem label="Phone" value={employee.phno} />
      </>
    );

    switch (role) {
      case "Trainer":
        return (
          <>
            {common}
            <DetailItem label="Status" value={employee.status} />
            <DetailItem label="Specialization" value={employee.specialization || employee.expertise} />
            <DetailItem label="Experience" value={`${employee.expInYear} years`} />
            <DetailItem label="Qualification" value={employee.qualification} />
            <DetailItem label="Joining Date" value={employee.joiningdate} />
            <DetailItem label="Salary" value={`$${employee.salary?.toLocaleString()}`} />
            <DetailItem label="Students" value={employee.students} />
            <DetailItem label="Rating" value={employee.rating} />
          </>
        );
      case "Analyst":
        return (
          <>
            {common}
            <DetailItem label="Department" value={employee.department} />
            <DetailItem label="Joining Date" value={employee.joiningdate} />
            <DetailItem label="Salary" value={`$${employee.salary?.toLocaleString()}`} />
          </>
        );
      case "Counsellor":
        return (
          <>
            {common}
            <DetailItem label="Status" value={employee.status} />
            <DetailItem label="Joining Date" value={employee.joiningdate} />
            <DetailItem label="Salary" value={`$${employee.salary?.toLocaleString()}`} />
          </>
        );
      default:
        return common;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in border border-gray-100">
        <div className={`bg-gradient-to-r ${gradient} p-6 rounded-t-2xl`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg border border-white/30">
                {employee.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{employee.name}</h3>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-lg text-white/90 text-xs font-medium">
                  {role}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white p-1 transition">
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50/50">
          {renderDetails()}
        </div>

        <div className="border-t border-gray-100 p-4 flex justify-end">
          <button onClick={onClose} className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 text-sm font-medium transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;