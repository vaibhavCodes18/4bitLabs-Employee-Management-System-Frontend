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
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaStar,
  FaGraduationCap,
} from "react-icons/fa";

// Admin credentials (hardcoded for demo)
const ADMIN_USER = {
  fullName: "Vaibhav Sathe",
  username: "admin123",
  email: "admin@info.com",
  password: "admin12",
  role: "admin",
};

// Dummy data for trainers
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

// Dummy data for analysts
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

// Dummy data for counsellors
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

// Stats cards
const stats = [
  { label: "Total Employees", value: 124, icon: FaUsers, color: "bg-blue-500" },
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

  const handleLogout = () => {
    alert(`Logging out ${ADMIN_USER.fullName}... (demo)`);
    // In real app: clear tokens, redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 hidden md:block`}
      >
        <div className="p-4 flex items-center space-x-2 border-b">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaMicrochip className="text-white text-xl" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">4bitlabs</span>
          )}
        </div>
        <nav className="mt-6">
          <SidebarItem
            icon={FaTachometerAlt}
            label="Dashboard"
            active={true}
            open={sidebarOpen}
          />
          <SidebarItem icon={FaUsers} label="Employees" open={sidebarOpen} />
          <SidebarItem
            icon={FaChalkboardTeacher}
            label="Trainers"
            open={sidebarOpen}
          />
          <SidebarItem icon={FaChartLine} label="Analysts" open={sidebarOpen} />
          <SidebarItem
            icon={FaUserFriends}
            label="Counsellors"
            open={sidebarOpen}
          />
          <SidebarItem icon={FaCog} label="Settings" open={sidebarOpen} />
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition w-full"
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
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
            {/* Search */}
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {/* Notifications */}
            <button className="relative text-gray-600 hover:text-indigo-600">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            {/* Admin Info */}
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

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {ADMIN_USER.fullName}!
          </h1>
          <p className="text-gray-500 mb-6">
            Here's what's happening with your teams today.
          </p>
          {/* Admin Info Card (Additional) */}
          <div className="my-8 bg-linear-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                {ADMIN_USER.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {ADMIN_USER.fullName}
                </h3>
                <p className="text-gray-600">{ADMIN_USER.email}</p>
                <p className="text-sm text-indigo-600 mt-1">
                  Role: {ADMIN_USER.role} · Username: {ADMIN_USER.username}
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
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Role Sections */}
          <div className="space-y-8">
            {/* Trainers Section */}
            <section className="bg-white rounded-xl shadow-md p-6">
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
                      <tr
                        key={trainer.id}
                        className="border-b hover:bg-gray-50"
                      >
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
            </section>

            {/* Analysts Section */}
            <section className="bg-white rounded-xl shadow-md p-6">
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
                      <tr
                        key={analyst.id}
                        className="border-b hover:bg-gray-50"
                      >
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
            </section>

            {/* Counsellors Section */}
            <section className="bg-white rounded-xl shadow-md p-6">
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
                      <tr
                        key={counsellor.id}
                        className="border-b hover:bg-gray-50"
                      >
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
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active = false, open }) => {
  return (
    <a
      href="#"
      className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
      }`}
    >
      <Icon className="text-xl" />
      {open && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
};

export default AdminDashboard;
