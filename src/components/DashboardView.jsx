const DashboardView = ({ admin, stats }) => {
  // Handle both fullName (admin) and name (other roles) fields
  const displayName = admin.fullName || admin.name || "User";

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome back, {displayName}!
      </h1>
      <p className="text-gray-500 mb-6">
        Here's what's happening with your teams today.
      </p>

      <div className="mb-8 bg-linear-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
            {displayName.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{displayName}</h3>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-sm text-indigo-600 mt-1">
              Role: {admin.role}
              {admin.username && <> · Username: {admin.username}</>}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition"
          >
            <div className={`${stat.color} p-3 rounded-lg text-white`}>
              <stat.icon className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardView;