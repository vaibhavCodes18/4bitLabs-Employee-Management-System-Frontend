import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaStar,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const TrainersView = ({ trainers, onAdd, onView, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // 'name' or 'email'

  const filteredTrainers = trainers.filter((trainer) => {
    const value = trainer[searchField]?.toLowerCase() || "";
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaChalkboardTeacher className="text-green-600 mr-2" /> Trainers
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm w-full sm:w-auto"
        >
          + Add New Trainer
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search by ${searchField}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Phone</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Specialization</th>
              <th className="text-left py-2">Exp (yrs)</th>
              <th className="text-left py-2">Qualification</th>
              <th className="text-left py-2">Joining Date</th>
              <th className="text-left py-2">Salary</th>
              <th className="text-left py-2">Students</th>
              <th className="text-left py-2">Rating</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.map((trainer) => (
              <tr key={trainer.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium whitespace-nowrap">
                  {trainer.name}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.email || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.phno || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${trainer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : trainer.status === "Inactive"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {trainer.status || "Active"}
                  </span>
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.specialization || trainer.expertise || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.expInYear || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.qualification || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.joiningdate || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  ${trainer.salary?.toLocaleString() || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {trainer.students || 0}
                </td>
                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {trainer.rating || 0}
                  </div>
                </td>
                <td className="py-3 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onView(trainer)} // or onView(trainer/analyst/counsellor)
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(trainer)}
                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(trainer.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTrainers.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-500">
                  No trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainersView;
