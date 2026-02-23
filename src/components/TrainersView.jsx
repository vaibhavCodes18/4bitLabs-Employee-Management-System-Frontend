import { FaChalkboardTeacher, FaStar, FaEdit, FaTrash } from "react-icons/fa";

const TrainersView = ({ trainers, onAdd, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaChalkboardTeacher className="text-green-600 mr-2" /> Trainers
        </h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm w-full sm:w-auto"
        >
          + Add New Trainer
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
              <th className="text-left py-2">Specialization</th>
              <th className="text-left py-2">Exp (yrs)</th>
              <th className="text-left py-2">Qualification</th>
              <th className="text-left py-2">Joining Date</th>
              <th className="text-left py-2">Salary</th>
              <th className="text-left py-2">Students</th>
              <th className="text-left py-2">Rating</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium whitespace-nowrap">{trainer.name}</td>
                <td className="py-3 whitespace-nowrap">{trainer.email || '-'}</td>
                <td className="py-3 whitespace-nowrap">{trainer.phno || '-'}</td>
                <td className="py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    trainer.status === 'Active' ? 'bg-green-100 text-green-700' :
                    trainer.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {trainer.status || 'Active'}
                  </span>
                </td>
                <td className="py-3 whitespace-nowrap">{trainer.specialization || trainer.expertise || '-'}</td>
                <td className="py-3 whitespace-nowrap">{trainer.expInYear || '-'}</td>
                <td className="py-3 whitespace-nowrap">{trainer.qualification || '-'}</td>
                <td className="py-3 whitespace-nowrap">{trainer.joiningdate || '-'}</td>
                <td className="py-3 whitespace-nowrap">${trainer.salary?.toLocaleString() || '-'}</td>
                <td className="py-3 whitespace-nowrap">{trainer.students || 0}</td>
                <td className="py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {trainer.rating || 0}
                  </div>
                </td>
                <td className="py-3 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(trainer)}
                    className="text-indigo-600 hover:text-indigo-800 mr-3"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(trainer.id)}
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

export default TrainersView;