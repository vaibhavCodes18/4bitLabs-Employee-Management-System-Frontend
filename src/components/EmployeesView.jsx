import { FaUsers } from "react-icons/fa";

const EmployeesView = ({ employees, onAdd, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <FaUsers className="text-blue-600 mr-2" /> All Employees
      </h2>
    </div>
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
          {employees.map((emp, idx) => {
            const RoleIcon = emp.roleIcon;
            return (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{emp.name}</td>
                <td>
                  <div className={`flex items-center ${emp.roleColor}`}>
                    <RoleIcon className="mr-1" /> {emp.role}
                  </div>
                </td>
                <td>
                  // Inside EmployeesView, for trainer:
                  {emp.role === "Trainer" &&
                    `${emp.specialization || emp.expertise}, ${emp.expInYear || 0} yrs exp, ${emp.students} students`}
                  {emp.role === "Analyst" &&
                    `${emp.department}, ${emp.projects} projects`}
                  {emp.role === "Counsellor" &&
                    `${emp.studentsAssigned} students, ${emp.sessionsCompleted} sessions`}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => onEdit(emp)}
                    className="text-indigo-600 hover:text-indigo-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(emp)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
export default EmployeesView;
