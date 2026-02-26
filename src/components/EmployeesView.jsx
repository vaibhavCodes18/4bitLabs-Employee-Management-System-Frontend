import React, { useState } from "react";
import { FaUsers, FaSearch, FaChalkboardTeacher, FaChartLine, FaUserFriends, FaEye } from "react-icons/fa";

const EmployeesView = ({ employees, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredEmployees = employees.filter((emp) => {
    // Role filter
    if (roleFilter !== "all" && emp.role !== roleFilter) return false;
    // Search by name or email (case-insensitive)
    const nameMatch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = emp.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  const roleIcons = {
    Trainer: FaChalkboardTeacher,
    Analyst: FaChartLine,
    Counsellor: FaUserFriends,
  };
  const roleColors = {
    Trainer: "text-green-600",
    Analyst: "text-purple-600",
    Counsellor: "text-yellow-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaUsers className="text-blue-600 mr-2" /> All Employees
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm w-full sm:w-auto"
        >
          + Add New Employee
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="all">All Roles</option>
          <option value="Trainer">Trainer</option>
          <option value="Analyst">Analyst</option>
          <option value="Counsellor">Counsellor</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Role</th>
              <th className="text-left py-2">Details</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => {
              const RoleIcon = roleIcons[emp.role];
              const roleColor = roleColors[emp.role];
              return (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium whitespace-nowrap">{emp.name}</td>
                  <td className="py-3 whitespace-nowrap">{emp.email || '-'}</td>
                  <td>
                    <div className={`flex items-center ${roleColor}`}>
                      <RoleIcon className="mr-1" /> {emp.role}
                    </div>
                  </td>
                  <td>
                    {emp.role === "Trainer" &&
                      `${emp.specialization || emp.expertise}, ${emp.students} students`}
                    {emp.role === "Analyst" &&
                      `${emp.department}, ${emp.projects} projects`}
                    {emp.role === "Counsellor" &&
                      `${emp.studentsAssigned} students, ${emp.sessionsCompleted} sessions`}
                  </td>
                  <td className="whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onEdit(emp)}
                      className="text-indigo-600 hover:text-indigo-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(emp)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesView;