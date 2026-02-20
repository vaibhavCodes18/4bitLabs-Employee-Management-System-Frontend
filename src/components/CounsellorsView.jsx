import { FaUserFriends, FaStar } from "react-icons/fa";

const CounsellorsView = ({ counsellors }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <FaUserFriends className="text-yellow-600 mr-2" /> Counsellors
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Students Assigned</th>
            <th className="text-left py-2">Sessions</th>
            <th className="text-left py-2">Satisfaction</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {counsellors.map((counsellor) => (
            <tr key={counsellor.id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium">{counsellor.name}</td>
              <td>{counsellor.studentsAssigned}</td>
              <td>{counsellor.sessionsCompleted}</td>
              <td>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  {counsellor.satisfaction}
                </div>
              </td>
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
    <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-sm">
      + Add New Counsellor
    </button>
  </div>
);
export default CounsellorsView;
