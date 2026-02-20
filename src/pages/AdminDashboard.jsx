import React, { useState } from "react";
import {
  FaMicrochip,
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaChartLine,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaEnvelope,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";

// Admin credentials
const ADMIN_USER = {
  fullName: "Vaibhav Sathe",
  username: "admin123",
  email: "admin@info.com",
  password: "admin12",
  role: "admin",
};

// Dummy data
const trainers = [
  {
    id: 1,
    name: "Rahul Sharma",
    expertise: "React & Node.js",
    students: 45,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Priya Patel",
    expertise: "Python & Data Science",
    students: 38,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Ankit Verma",
    expertise: "Java & Spring Boot",
    students: 52,
    rating: 4.7,
  },
];

const analysts = [
  {
    id: 1,
    name: "Neha Gupta",
    department: "Data Analytics",
    projects: 12,
    successRate: "94%",
  },
  {
    id: 2,
    name: "Rajesh Iyer",
    department: "Business Intelligence",
    projects: 9,
    successRate: "89%",
  },
  {
    id: 3,
    name: "Sneha Desai",
    department: "Market Research",
    projects: 15,
    successRate: "92%",
  },
];

const counsellors = [
  {
    id: 1,
    name: "Kavita Joshi",
    studentsAssigned: 28,
    sessionsCompleted: 134,
    satisfaction: 4.9,
  },
  {
    id: 2,
    name: "Arjun Nair",
    studentsAssigned: 22,
    sessionsCompleted: 98,
    satisfaction: 4.7,
  },
  {
    id: 3,
    name: "Meera Menon",
    studentsAssigned: 31,
    sessionsCompleted: 156,
    satisfaction: 5.0,
  },
];

// Combine all employees for the Employees view
const allEmployees = [
  ...trainers.map((t) => ({
    ...t,
    role: "Trainer",
    roleIcon: FaChalkboardTeacher,
    roleColor: "text-green-600",
  })),
  ...analysts.map((a) => ({
    ...a,
    role: "Analyst",
    roleIcon: FaChartLine,
    roleColor: "text-purple-600",
  })),
  ...counsellors.map((c) => ({
    ...c,
    role: "Counsellor",
    roleIcon: FaUserFriends,
    roleColor: "text-yellow-600",
  })),
];

// Stats cards (only shown on Dashboard)
const stats = [
  {
    label: "Total Employees",
    value: allEmployees.length,
    icon: FaUsers,
    color: "bg-blue-500",
  },
  {
    label: "Trainers",
    value: trainers.length,
    icon: FaChalkboardTeacher,
    color: "bg-green-500",
  },
  {
    label: "Analysts",
    value: analysts.length,
    icon: FaChartLine,
    color: "bg-purple-500",
  },
  {
    label: "Counsellors",
    value: counsellors.length,
    icon: FaUserFriends,
    color: "bg-yellow-500",
  },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard', 'employees', 'trainers', 'analysts', 'counsellors'

  const handleLogout = () => {
    alert(`Logging out ${ADMIN_USER.fullName}... (demo)`);
    window.location.href = "/login";
  };

  // Navigation handler
  const handleNavClick = (view) => {
    setActiveView(view);
  };

  // Render content based on activeView
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView admin={ADMIN_USER} stats={stats} />;
      case "employees":
        return <EmployeesView employees={allEmployees} />;
      case "trainers":
        return <TrainersView trainers={trainers} />;
      case "analysts":
        return <AnalystsView analysts={analysts} />;
      case "counsellors":
        return <CounsellorsView counsellors={counsellors} />;
      default:
        return <DashboardView admin={ADMIN_USER} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 hidden md:block relative`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2 border-b">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaMicrochip className="text-white text-xl" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">4bitlabs</span>
          )}
        </div>

        {/* Logout Button - moved to top, no border */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
          >
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-2">
          <SidebarItem
            icon={FaTachometerAlt}
            label="Dashboard"
            active={activeView === "dashboard"}
            open={sidebarOpen}
            onClick={() => handleNavClick("dashboard")}
          />
          <SidebarItem
            icon={FaUsers}
            label="Employees"
            active={activeView === "employees"}
            open={sidebarOpen}
            onClick={() => handleNavClick("employees")}
          />
          <SidebarItem
            icon={FaChalkboardTeacher}
            label="Trainers"
            active={activeView === "trainers"}
            open={sidebarOpen}
            onClick={() => handleNavClick("trainers")}
          />
          <SidebarItem
            icon={FaChartLine}
            label="Analysts"
            active={activeView === "analysts"}
            open={sidebarOpen}
            onClick={() => handleNavClick("analysts")}
          />
          <SidebarItem
            icon={FaUserFriends}
            label="Counsellors"
            active={activeView === "counsellors"}
            open={sidebarOpen}
            onClick={() => handleNavClick("counsellors")}
          />
          <SidebarItem
            icon={FaCog}
            label="Settings"
            active={activeView === "settings"}
            open={sidebarOpen}
            onClick={() => handleNavClick("settings")}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header (same as before) */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-4 ml-auto">
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button className="relative text-gray-600 hover:text-indigo-600">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {ADMIN_USER.fullName.charAt(0)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {ADMIN_USER.fullName}
                </p>
                <p className="text-xs text-gray-500">{ADMIN_USER.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

// ---------- View Components ----------

const DashboardView = ({ admin, stats }) => (
  <>
    <h1 className="text-2xl font-bold text-gray-800 mb-2">
      Welcome back, {admin.fullName}!
    </h1>
    <p className="text-gray-500 mb-6">
      Here's what's happening with your teams today.
    </p>

    {/* Admin Info Card */}
    <div className="mb-8 bg-linear-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
          {admin.fullName.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{admin.fullName}</h3>
          <p className="text-gray-600">{admin.email}</p>
          <p className="text-sm text-indigo-600 mt-1">
            Role: {admin.role} · Username: {admin.username}
          </p>
        </div>
      </div>
      <button className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
        Edit Profile
      </button>
    </div>

    {/* Stats Cards */}
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

const TrainersView = ({ trainers }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <FaChalkboardTeacher className="text-green-600 mr-2" /> Trainers
    </h2>
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
    <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm">
      + Add New Trainer
    </button>
  </div>
);

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

// Sidebar Item Component (modified to accept onClick)
const SidebarItem = ({ icon: Icon, label, active, open, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      <Icon className="text-xl" />
      {open && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

export default AdminDashboard;
