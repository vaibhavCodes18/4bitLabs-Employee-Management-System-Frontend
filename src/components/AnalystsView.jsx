import React, { useState } from "react";
import { FaChartLine, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";

const AnalystsView = ({ analysts, onAdd, onView, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");

  const filteredAnalysts = analysts.filter((analyst) => {
    const value = analyst[searchField]?.toLowerCase() || "";
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaChartLine className="text-purple-600 mr-2" /> Analysts
        </h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm w-full sm:w-auto"
        >
          + Add New Analyst
        </button>
      </div>

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

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Phone</th>
              <th className="text-left py-2">Department</th>
              <th className="text-left py-2">Joining Date</th>
              <th className="text-left py-2">Salary</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalysts.map((analyst) => (
              <tr key={analyst.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium whitespace-nowrap">
                  {analyst.name}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {analyst.email || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {analyst.phno || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">{analyst.department}</td>
                <td className="py-3 whitespace-nowrap">
                  {analyst.joiningdate || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  ${analyst.salary?.toLocaleString() || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onView(analyst)} // or onView(trainer/analyst/counsellor)
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(analyst)}
                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(analyst.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {filteredAnalysts.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No analysts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalystsView;
