import {
  FaUsers,
  
} from "react-icons/fa";
const EmployeesView = ({ employees }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <FaUsers className="text-blue-600 mr-2" /> All Employees
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Name</th>
            <th className="text-left py-2">Role</th>
            <th className="text-left py-2">Details</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const RoleIcon = emp.roleIcon;
            return (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{emp.name}</td>
                <td>
                  <div className={`flex items-center ${emp.roleColor}`}>
                    <RoleIcon className="mr-1" /> {emp.role}
                  </div>
                </td>
                <td>
                  {emp.role === "Trainer" &&
                    `${emp.expertise}, ${emp.students} students`}
                  {emp.role === "Analyst" &&
                    `${emp.department}, ${emp.projects} projects`}
                  {emp.role === "Counsellor" &&
                    `${emp.studentsAssigned} students, ${emp.sessionsCompleted} sessions`}
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
            );
          })}
        </tbody>
      </table>
    </div>
    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
      + Add New Employee
    </button>
  </div>
);
export default EmployeesView