import React, { useState } from "react";
import { FaChalkboardTeacher, FaStar, FaEdit, FaTrash, FaSearch, FaEye, FaPlus } from "react-icons/fa";

const TH = "px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/80 sticky top-0 backdrop-blur-sm";
const TD = "px-4 py-3 text-sm text-gray-600";

const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-gray-100">
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
  </tr>
);

const TrainersView = ({ trainers, loading, onAdd, onView, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");

  const filtered = trainers.filter((t) =>
    t[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
              <FaChalkboardTeacher className="text-lg" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Trainers</h2>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
              {trainers.length}
            </span>
          </div>
          <button onClick={onAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition-shadow">
            <FaPlus className="text-xs" /> Add Trainer
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={`Search by ${searchField}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
            />
          </div>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className={TH}>Name</th>
                <th className={TH}>Email</th>
                <th className={TH}>Phone</th>
                <th className={TH}>Status</th>
                <th className={TH}>Specialization</th>
                <th className={TH}>Exp</th>
                <th className={TH}>Qualification</th>
                <th className={TH}>Joined</th>
                <th className={TH}>Salary</th>
                <th className={TH}>Students</th>
                <th className={TH}>Rating</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length > 0 ? (
                filtered.map((trainer, idx) => (
                  <tr key={trainer.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    <td className={`${TD} font-medium text-gray-900`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {trainer.name?.charAt(0).toUpperCase()}
                        </div>
                        <span>{trainer.name}</span>
                      </div>
                    </td>
                    <td className={TD}>{trainer.email || "—"}</td>
                    <td className={TD}>{trainer.phno || "—"}</td>
                    <td className={TD}>
                      <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${
                        trainer.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {trainer.status || "Active"}
                      </span>
                    </td>
                    <td className={TD}>{trainer.specialization || trainer.expertise || "—"}</td>
                    <td className={TD}>{trainer.expInYear || "—"}</td>
                    <td className={TD}>{trainer.qualification || "—"}</td>
                    <td className={TD}>{trainer.joiningdate || "—"}</td>
                    <td className={`${TD} font-medium`}>{trainer.salary ? `$${trainer.salary.toLocaleString()}` : "—"}</td>
                    <td className={TD}>
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">{trainer.students || 0}</span>
                    </td>
                    <td className={TD}>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-amber-400 text-xs" />
                        <span className="font-medium text-gray-700">{trainer.rating || 0}</span>
                      </div>
                    </td>
                    <td className={TD}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => onView(trainer)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <FaEye />
                        </button>
                        <button onClick={() => onEdit(trainer)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                          <FaEdit />
                        </button>
                        <button onClick={() => onDelete(trainer.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-12">
                    <FaChalkboardTeacher className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No trainers found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <span>Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of <span className="font-semibold text-gray-600">{trainers.length}</span> trainers</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainersView;