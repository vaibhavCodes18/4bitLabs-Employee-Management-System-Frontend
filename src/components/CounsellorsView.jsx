import { FaUserFriends, FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const CounsellorsView = ({ counsellors, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaUserFriends className="text-yellow-600 mr-2" /> Counsellors
        </h2>
        <button
          onClick={onAdd}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-sm w-full sm:w-auto"
        >
          + Add New Counsellor
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Phone</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Joining Date</th>
              <th className="text-left py-2">Salary</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {counsellors.map((counsellor) => (
              <tr key={counsellor.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium whitespace-nowrap">
                  {counsellor.name}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {counsellor.email || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  {counsellor.phno || "-"}
                </td>
                
                <td className="py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      counsellor.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : counsellor.status === "Inactive"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {counsellor.status || "Active"}
                  </span>
                </td>
                <td className="py-3 whitespace-nowrap">
                  {counsellor.joiningdate || "-"}
                </td>
                <td className="py-3 whitespace-nowrap">
                  ${counsellor.salary?.toLocaleString() || "-"}
                </td>
                <td className="flex py-3 whitespace-nowrap">
                  <button
                  type="button"
                    onClick={() => onEdit(counsellor)}
                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(counsellor.id)}
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
export default CounsellorsView;
