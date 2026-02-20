import { FaChartLine } from "react-icons/fa";

const AnalystsView = ({ analysts }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <FaChartLine className="text-purple-600 mr-2" /> Analysts
    </h2>
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
                <button className="text-indigo-600 hover:text-indigo-800 mr-2">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm">
      + Add New Analyst
    </button>
  </div>
);
export default AnalystsView;
