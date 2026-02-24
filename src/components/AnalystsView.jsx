import { FaChartLine, FaEdit, FaTrash } from "react-icons/fa";

const AnalystsView = ({ analysts, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaChartLine className="text-purple-600 mr-2" /> Analysts
        </h2>
        <button
          onClick={onAdd}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm w-full sm:w-auto"
        >
          + Add New Analyst
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Phone</th>
              <th className="text-left py-2">Department</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Joining Date</th>
              <th className="text-left py-2">Salary</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {analysts.map((analyst) => (
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      analyst.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : analyst.status === "Inactive"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {analyst.status || "Active"}
                  </span>
                </td>
                <td className="py-3 whitespace-nowrap">
                  {analyst.joiningdate || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  ${analyst.salary?.toLocaleString() || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(analyst)}
                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(analyst.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalystsView;
