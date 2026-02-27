import React from "react";
import {
    FaChalkboardTeacher,
    FaChartLine,
    FaUserFriends,
    FaTimes,
} from "react-icons/fa";
import { DetailItem } from "./DetailItem";
import { ROLE_CONFIG } from "../constants";

/**
 * View employee details modal.
 * Extracted from AdminDashboard to keep the page component lean.
 */
const ViewEmployeeModal = ({ isOpen, employee, role, onClose }) => {
    if (!isOpen || !employee) return null;

    const roleConfig = ROLE_CONFIG[role];
    const RoleIcon = roleConfig?.icon;

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
                        <DetailItem
                            label="Specialization"
                            value={employee.specialization || employee.expertise}
                        />
                        <DetailItem
                            label="Experience"
                            value={`${employee.expInYear} years`}
                        />
                        <DetailItem label="Qualification" value={employee.qualification} />
                        <DetailItem label="Joining Date" value={employee.joiningdate} />
                        <DetailItem
                            label="Salary"
                            value={`$${employee.salary?.toLocaleString()}`}
                        />
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
                        <DetailItem
                            label="Salary"
                            value={`$${employee.salary?.toLocaleString()}`}
                        />
                    </>
                );
            case "Counsellor":
                return (
                    <>
                        {common}
                        <DetailItem label="Status" value={employee.status} />
                        <DetailItem label="Joining Date" value={employee.joiningdate} />
                        <DetailItem
                            label="Salary"
                            value={`$${employee.salary?.toLocaleString()}`}
                        />
                    </>
                );
            default:
                return common;
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className={`p-6 rounded-t-xl ${roleConfig?.headerBg || ""}`}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                            {RoleIcon && (
                                <RoleIcon className={`${roleConfig.color} mr-2`} />
                            )}
                            {employee.name} – {role} Details
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderDetails()}
                </div>

                {/* Footer */}
                <div className="border-t p-4 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeModal;
