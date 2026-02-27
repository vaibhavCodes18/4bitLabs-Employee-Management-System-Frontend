import React, { useState } from "react";
import { FaUsers, FaSearch, FaChalkboardTeacher, FaChartLine, FaUserFriends, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const TH = "font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap";
const TD = "px-3.5 py-3 text-[13px] text-gray-500";

const EmployeesView = ({ employees, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredEmployees = employees.filter((emp) => {
    if (roleFilter !== "all" && emp.role !== roleFilter) return false;
    const nameMatch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = emp.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const roleIcons = {
    Trainer: FaChalkboardTeacher,
    Analyst: FaChartLine,
    Counsellor: FaUserFriends,
  };
  const roleGradients = {
    Trainer: "from-green-400 to-emerald-600",
    Analyst: "from-purple-400 to-purple-600",
    Counsellor: "from-amber-400 to-orange-500",
  };
  const roleBadges = {
    Trainer: "bg-green-50 text-green-600",
    Analyst: "bg-purple-50 text-purple-600",
    Counsellor: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-100 gap-3">
          <div className="text-base font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <FaUsers />
            </div>
            <span>All Employees</span>
            <span className="ml-2 px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
              {employees.length}
            </span>
          </div>
          <button type="button" onClick={onAdd} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 text-sm font-medium">
            <FaPlus className="text-xs" /> Add Employee
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-3 pl-10 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:bg-white transition"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
          >
            <option value="all">All Roles</option>
            <option value="Trainer">Trainer</option>
            <option value="Analyst">Analyst</option>
            <option value="Counsellor">Counsellor</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-gray-50">
                <th className={TH}>Name</th>
                <th className={TH}>Email</th>
                <th className={TH}>Role</th>
                <th className={TH}>Details</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp, idx) => {
                const RoleIcon = roleIcons[emp.role];
                const gradient = roleGradients[emp.role] || "from-gray-400 to-gray-600";
                const badgeClass = roleBadges[emp.role] || "bg-gray-50 text-gray-600";
                return (
                  <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    <td className={`${TD} font-semibold text-gray-800 whitespace-nowrap`}>
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                          {emp.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td className={`${TD} whitespace-nowrap`}>{emp.email || '—'}</td>
                    <td className={TD}>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${badgeClass}`}>
                        {RoleIcon && <RoleIcon className="text-xs" />} {emp.role}
                      </span>
                    </td>
                    <td className={`${TD} text-xs`}>
                      {emp.role === "Trainer" &&
                        `${emp.specialization || emp.expertise || "—"}, ${emp.students || 0} students`}
                      {emp.role === "Analyst" &&
                        `${emp.department || "—"}, ${emp.projects || 0} projects`}
                      {emp.role === "Counsellor" &&
                        `${emp.studentsAssigned || 0} students, ${emp.sessionsCompleted || 0} sessions`}
                    </td>
                    <td className={`${TD} whitespace-nowrap`}>
                      <div className="flex items-center space-x-1">
                        <button type="button" onClick={() => onEdit(emp)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-indigo-500 hover:bg-indigo-50 hover:scale-110 transition-all" title="Edit">
                          <FaEdit />
                        </button>
                        <button type="button" onClick={() => onDelete(emp)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-red-500 hover:bg-red-50 hover:scale-110 transition-all" title="Delete">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="5">
                    <div className="text-center py-10 px-4 text-gray-400">
                      <FaUsers className="text-3xl opacity-30 mb-2 mx-auto" />
                      <p className="font-medium">No employees found</p>
                      <p className="text-sm mt-1">Try adjusting your search or role filter</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filteredEmployees.length}</span> of <span className="font-semibold text-gray-600">{employees.length}</span> employees
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeesView;