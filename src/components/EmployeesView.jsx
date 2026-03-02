import React, { useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaChalkboardTeacher,
  FaChartLine,
  FaUserFriends,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const TH =
  "px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/80 sticky top-0 backdrop-blur-sm";
const TD = "px-4 py-3 text-sm text-gray-600";

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-gray-100">
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-28"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </td>
  </tr>
);

const EmployeesView = ({ employees, loading, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = employees.filter((emp) => {
    if (roleFilter !== "all" && emp.role !== roleFilter) return false;
    const nameMatch = emp.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const emailMatch = emp.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const roleIcons = {
    Trainer: FaChalkboardTeacher,
    Analyst: FaChartLine,
    Counsellor: FaUserFriends,
  };
  const roleGradients = {
    Trainer: "from-emerald-400 to-emerald-600",
    Analyst: "from-purple-400 to-purple-600",
    Counsellor: "from-amber-400 to-orange-500",
  };
  const roleBadges = {
    Trainer: "bg-emerald-50 text-emerald-700",
    Analyst: "bg-purple-50 text-purple-700",
    Counsellor: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
              <FaUsers className="text-lg" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              All Employees
            </h2>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
              {employees.length}
            </span>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition-shadow"
          >
            <FaPlus className="text-xs" /> Add Employee
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
          >
            <option value="all">All Roles</option>
            <option value="Trainer">Trainer</option>
            <option value="Analyst">Analyst</option>
            <option value="Counsellor">Counsellor</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className={TH}>Name</th>
                <th className={TH}>Email</th>
                <th className={TH}>Role</th>
                <th className={TH}>Details</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length > 0 ? (
                filtered.map((emp, idx) => {
                  const RoleIcon = roleIcons[emp.role];
                  const gradient =
                    roleGradients[emp.role] || "from-gray-400 to-gray-600";
                  const badgeClass =
                    roleBadges[emp.role] || "bg-gray-100 text-gray-600";
                  return (
                    <tr
                      key={emp.id}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <td className={`${TD} font-medium text-gray-900`}>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                          >
                            {emp.name?.charAt(0).toUpperCase()}
                          </div>
                          <span>{emp.name}</span>
                        </div>
                      </td>
                      <td className={TD}>{emp.email || "—"}</td>
                      <td className={TD}>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${badgeClass}`}
                        >
                          {RoleIcon && <RoleIcon className="text-xs" />}{" "}
                          {emp.role}
                        </span>
                      </td>
                      <td className={TD}>
                        {emp.role === "Trainer" &&
                          `${emp.specialization || emp.expertise || "—"}, ${emp.students || 0} students`}
                        {emp.role === "Analyst" &&
                          `${emp.department || "—"}, ${emp.projects || 0} projects`}
                        {emp.role === "Counsellor" &&
                          `${emp.studentsAssigned || 0} students, ${emp.sessionsCompleted || 0} sessions`}
                      </td>
                      <td className={TD}>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onEdit(emp)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => onDelete(emp)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <FaUsers className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No employees found
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search or filter
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <span>
              Showing{" "}
              <span className="font-semibold text-gray-600">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600">
                {employees.length}
              </span>{" "}
              employees
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesView;
