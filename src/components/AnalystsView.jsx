import React, { useState } from "react";
import {
  FaChartLine,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
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
      <div className="h-4 bg-gray-200 rounded w-28"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-200 rounded w-12"></div>
    </td>
  </tr>
);

const AnalystsView = ({
  analysts,
  loading,
  onAdd,
  onView,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");

  const filteredAnalysts = analysts.filter((a) =>
    a[searchField]?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
              <FaChartLine className="text-lg" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Analysts</h2>
            <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
              {analysts.length}
            </span>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-200 transition-shadow"
          >
            <FaPlus className="text-xs" /> Add Analyst
          </button>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={`Search by ${searchField}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
            />
          </div>
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className={TH}>Name</th>
                <th className={TH}>Email</th>
                <th className={TH}>Phone</th>
                <th className={TH}>Department</th>
                <th className={TH}>Joined</th>
                <th className={TH}>Salary</th>
                <th className={TH}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filteredAnalysts.length > 0 ? (
                filteredAnalysts.map((analyst, idx) => (
                  <tr
                    key={analyst.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className={`${TD} font-medium text-gray-900`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          {analyst.name?.charAt(0).toUpperCase()}
                        </div>
                        <span>{analyst.name}</span>
                      </div>
                    </td>
                    <td className={TD}>{analyst.email || "—"}</td>
                    <td className={TD}>{analyst.phno || "—"}</td>
                    <td className={TD}>
                      {analyst.department ? (
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                          {analyst.department}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className={TD}>{analyst.joiningdate || "—"}</td>
                    <td className={`${TD} font-medium`}>
                      {analyst.salary
                        ? `$${analyst.salary.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className={TD}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onView(analyst)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          aria-label="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => onEdit(analyst)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => onDelete(analyst.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12">
                    <FaChartLine className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No analysts found
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <span>
              Showing{" "}
              <span className="font-semibold text-gray-600">
                {filteredAnalysts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-600">
                {analysts.length}
              </span>{" "}
              analysts
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalystsView;
