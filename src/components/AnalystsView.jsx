import { FaChartLine } from "react-icons/fa";
import { useEmployees } from "../context/EmployeeContext";

const AnalystsView = ({ onAdd, onEdit, onDelete }) => {
  const { analysts } = useEmployees();
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
              <th className="text-left py-2">Department</th>
              <th className="text-left py-2">Projects</th>
              <th className="text-left py-2">Success Rate</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {analysts.map((analyst) => (
              <tr key={analyst.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{analyst.name}</td>
                <td>{analyst.department}</td>
                <td>{analyst.projects}</td>
                <td>{analyst.successRate}</td>
                <td>
                  <button
                    onClick={() => onEdit(analyst)}
                    className="text-indigo-600 hover:text-indigo-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(analyst.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
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
