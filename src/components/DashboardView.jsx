import { FaArrowUp } from "react-icons/fa";

const DashboardView = ({ admin, stats }) => {
  const displayName = admin.name || "User";

  return (
    <div className="animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-8 py-7">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-white/5 rounded-full translate-y-1/2" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border border-white/20">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-medium mb-0.5">Welcome back 👋</p>
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">{displayName}</h1>
              <div className="flex items-center mt-1.5 gap-2">
                <span className="px-2 py-0.5 bg-white/15 rounded-md text-white/90 text-[11px]">
                  {admin.email}
                </span>

              </div>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-indigo-200 text-xs">Role</p>
            <p className="text-white font-bold text-base capitalize">{admin.role}</p>
          </div>
        </div>
      </div>

      {/* Overview label */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">Overview</h2>
        <p className="text-xs text-gray-400 mt-1">Here's what's happening with your teams today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 px-5 py-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200 animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className={`${stat.color} w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0`}>
              <stat.icon className="text-lg" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;