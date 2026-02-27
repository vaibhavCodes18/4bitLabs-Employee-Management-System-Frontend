import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaStar,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
  FaPlus,
} from "react-icons/fa";

const TH = "font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap";
const TD = "px-3.5 py-3 text-[13px] text-gray-500";

const TrainersView = ({ trainers, onAdd, onView, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");

  const filteredTrainers = trainers.filter((trainer) => {
    const value = trainer[searchField]?.toLowerCase() || "";
    return value.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-100 gap-3">
          <div className="text-base font-bold text-gray-900 flex items-center gap-2">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <FaChalkboardTeacher />
            </div>
            <span>Trainers</span>
            <span className="ml-2 px-2.5 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-bold">
              {trainers.length}
            </span>
          </div>
          <button type="button" onClick={onAdd} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-green-200 transition-all duration-200 text-sm font-medium">
            <FaPlus className="text-xs" /> Add Trainer
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="text"
              placeholder={`Search by ${searchField}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-3 pl-10 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:bg-white transition"
            />
          </div>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-gray-50">
                <th className={TH}>Name</th>
                <th className={TH}>Email</th>
                <th className={TH}>Phone</th>
                <th className={TH}>Status</th>
                <th className={TH}>Specialization</th>
                <th className={TH}>Exp (yrs)</th>
                <th className={TH}>Qualification</th>
                <th className={TH}>Joined</th>
                <th className={TH}>Salary</th>
                <th className={TH}>Students</th>
                <th className={TH}>Rating</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainers.map((trainer, idx) => (
                <tr key={trainer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                  <td className={`${TD} font-semibold text-gray-800 whitespace-nowrap`}>
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {trainer.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <span>{trainer.name}</span>
                    </div>
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>{trainer.email || "—"}</td>
                  <td className={`${TD} whitespace-nowrap`}>{trainer.phno || "—"}</td>
                  <td className={`${TD} whitespace-nowrap`}>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${trainer.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {trainer.status || "Active"}
                    </span>
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>{trainer.specialization || trainer.expertise || "—"}</td>
                  <td className={`${TD} whitespace-nowrap`}>{trainer.expInYear || "—"}</td>
                  <td className={`${TD} whitespace-nowrap`}>{trainer.qualification || "—"}</td>
                  <td className={`${TD} whitespace-nowrap`}>{trainer.joiningdate || "—"}</td>
                  <td className={`${TD} whitespace-nowrap font-medium`}>{trainer.salary ? `$${trainer.salary.toLocaleString()}` : "—"}</td>
                  <td className={`${TD} whitespace-nowrap`}>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">{trainer.students || 0}</span>
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="font-semibold text-gray-700">{trainer.rating || 0}</span>
                    </div>
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => onView(trainer)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all" title="View Details">
                        <FaEye />
                      </button>
                      <button type="button" onClick={() => onEdit(trainer)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-indigo-500 hover:bg-indigo-50 hover:scale-110 transition-all" title="Edit">
                        <FaEdit />
                      </button>
                      <button type="button" onClick={() => onDelete(trainer.id)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-red-500 hover:bg-red-50 hover:scale-110 transition-all" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTrainers.length === 0 && (
                <tr>
                  <td colSpan="12">
                    <div className="text-center py-10 px-4 text-gray-400">
                      <FaChalkboardTeacher className="text-3xl opacity-30 mb-2 mx-auto" />
                      <p className="font-medium">No trainers found</p>
                      <p className="text-sm mt-1">Try adjusting your search filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filteredTrainers.length}</span> of <span className="font-semibold text-gray-600">{trainers.length}</span> trainers
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainersView;
