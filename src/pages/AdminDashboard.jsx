import { useState } from "react";
import {
  FaMicrochip,
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaChartLine,
  FaUserFriends,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import TrainersView from "../components/TrainersView";
import DashboardView from "../components/DashboardView";
import EmployeesView from "../components/EmployeesView";
import AnalystsView from "../components/AnalystsView";
import CounsellorsView from "../components/CounsellorsView";
import SidebarItem from "../components/SidebarItem";

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

export default AdminDashboard;
