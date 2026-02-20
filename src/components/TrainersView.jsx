import { FaChalkboardTeacher, FaStar } from "react-icons/fa";

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
              <th className="text-left py-2">Expertise</th>
              <th className="text-left py-2">Students</th>
              <th className="text-left py-2">Rating</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{trainer.name}</td>
                <td>{trainer.expertise}</td>
                <td>{trainer.students}</td>
                <td>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {trainer.rating}
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => onEdit(trainer)}
                    className="text-indigo-600 hover:text-indigo-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(trainer.id)}
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

export default TrainersView;
