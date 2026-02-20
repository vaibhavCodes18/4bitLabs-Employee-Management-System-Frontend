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
  FaStar,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import SidebarItem from "../components/SidebarItem";
import AddEmployeeModal from "../components/AddEmployeeModal";
import DashboardView from "../components/DashboardView";
import CounsellorsView from "../components/CounsellorsView";
import AnalystsView from "../components/AnalystsView";
import TrainersView from "../components/TrainersView";
import EmployeesView from "../components/EmployeesView";

// Admin credentials
const ADMIN_USER = {
  fullName: "Vaibhav Sathe",
  username: "admin123",
  email: "admin@info.com",
  password: "admin12",
  role: "admin",
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  // Data states (unchanged)
  const [trainers, setTrainers] = useState([
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
  ]);

  const [analysts, setAnalysts] = useState([
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
  ]);

  const [counsellors, setCounsellors] = useState([
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
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalRole, setModalRole] = useState("Trainer");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Combine all employees for Employees view
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

  // Stats cards
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

  const handleLogout = () => {
    alert(`Logging out ${ADMIN_USER.fullName}... (demo)`);
    window.location.href = "/login";
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    // On mobile, close drawer after navigation
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Modal handlers (unchanged)
  const openAddModal = (role) => {
    setModalMode("add");
    setModalRole(role);
    setEditingId(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const openEditModal = (role, employee) => {
    setModalMode("edit");
    setModalRole(role);
    setEditingId(employee.id);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (modalMode === "add") {
      // Add logic (same as before)
      let newId;
      let updatedData;

      switch (modalRole) {
        case "Trainer":
          newId = Math.max(...trainers.map((t) => t.id), 0) + 1;
          updatedData = {
            id: newId,
            name: formData.name,
            expertise: formData.expertise || "",
            students: parseInt(formData.students) || 0,
            rating: parseFloat(formData.rating) || 0,
          };
          setTrainers((prev) => [...prev, updatedData]);
          break;
        case "Analyst":
          newId = Math.max(...analysts.map((a) => a.id), 0) + 1;
          updatedData = {
            id: newId,
            name: formData.name,
            department: formData.department || "",
            projects: parseInt(formData.projects) || 0,
            successRate: formData.successRate || "0%",
          };
          setAnalysts((prev) => [...prev, updatedData]);
          break;
        case "Counsellor":
          newId = Math.max(...counsellors.map((c) => c.id), 0) + 1;
          updatedData = {
            id: newId,
            name: formData.name,
            studentsAssigned: parseInt(formData.studentsAssigned) || 0,
            sessionsCompleted: parseInt(formData.sessionsCompleted) || 0,
            satisfaction: parseFloat(formData.satisfaction) || 0,
          };
          setCounsellors((prev) => [...prev, updatedData]);
          break;
        default:
          return;
      }
    } else {
      // Edit logic (same as before)
      switch (modalRole) {
        case "Trainer":
          setTrainers((prev) =>
            prev.map((t) =>
              t.id === editingId
                ? {
                    ...t,
                    name: formData.name,
                    expertise: formData.expertise,
                    students: parseInt(formData.students),
                    rating: parseFloat(formData.rating),
                  }
                : t,
            ),
          );
          break;
        case "Analyst":
          setAnalysts((prev) =>
            prev.map((a) =>
              a.id === editingId
                ? {
                    ...a,
                    name: formData.name,
                    department: formData.department,
                    projects: parseInt(formData.projects),
                    successRate: formData.successRate,
                  }
                : a,
            ),
          );
          break;
        case "Counsellor":
          setCounsellors((prev) =>
            prev.map((c) =>
              c.id === editingId
                ? {
                    ...c,
                    name: formData.name,
                    studentsAssigned: parseInt(formData.studentsAssigned),
                    sessionsCompleted: parseInt(formData.sessionsCompleted),
                    satisfaction: parseFloat(formData.satisfaction),
                  }
                : c,
            ),
          );
          break;
        default:
          return;
      }
    }
    closeModal();
  };

  const handleDelete = (role, id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      switch (role) {
        case "Trainer":
          setTrainers((prev) => prev.filter((t) => t.id !== id));
          break;
        case "Analyst":
          setAnalysts((prev) => prev.filter((a) => a.id !== id));
          break;
        case "Counsellor":
          setCounsellors((prev) => prev.filter((c) => c.id !== id));
          break;
        default:
          return;
      }
    }
  };

  // Render content based on activeView (unchanged)
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView admin={ADMIN_USER} stats={stats} />;
      case "employees":
        return (
          <EmployeesView
            employees={allEmployees}
            onAdd={() => openAddModal("Trainer")}
            onEdit={(emp) => openEditModal(emp.role, emp)}
            onDelete={(emp) => handleDelete(emp.role, emp.id)}
          />
        );
      case "trainers":
        return (
          <TrainersView
            trainers={trainers}
            onAdd={() => openAddModal("Trainer")}
            onEdit={(trainer) => openEditModal("Trainer", trainer)}
            onDelete={(id) => handleDelete("Trainer", id)}
          />
        );
      case "analysts":
        return (
          <AnalystsView
            analysts={analysts}
            onAdd={() => openAddModal("Analyst")}
            onEdit={(analyst) => openEditModal("Analyst", analyst)}
            onDelete={(id) => handleDelete("Analyst", id)}
          />
        );
      case "counsellors":
        return (
          <CounsellorsView
            counsellors={counsellors}
            onAdd={() => openAddModal("Counsellor")}
            onEdit={(counsellor) => openEditModal("Counsellor", counsellor)}
            onDelete={(id) => handleDelete("Counsellor", id)}
          />
        );
      default:
        return <DashboardView admin={ADMIN_USER} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 hidden md:block relative`}
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

        {/* Logout Button */}
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

      {/* Mobile Drawer - slides in when sidebarOpen is true on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <FaMicrochip className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold text-gray-800">
                  4bitlabs
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {/* Logout Button in Drawer */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition mb-4"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm font-medium">Logout</span>
            </button>
            {/* Navigation in Drawer */}
            <nav className="mt-2">
              <SidebarItem
                icon={FaTachometerAlt}
                label="Dashboard"
                active={activeView === "dashboard"}
                open={true}
                onClick={() => handleNavClick("dashboard")}
              />
              <SidebarItem
                icon={FaUsers}
                label="Employees"
                active={activeView === "employees"}
                open={true}
                onClick={() => handleNavClick("employees")}
              />
              <SidebarItem
                icon={FaChalkboardTeacher}
                label="Trainers"
                active={activeView === "trainers"}
                open={true}
                onClick={() => handleNavClick("trainers")}
              />
              <SidebarItem
                icon={FaChartLine}
                label="Analysts"
                active={activeView === "analysts"}
                open={true}
                onClick={() => handleNavClick("analysts")}
              />
              <SidebarItem
                icon={FaUserFriends}
                label="Counsellors"
                active={activeView === "counsellors"}
                open={true}
                onClick={() => handleNavClick("counsellors")}
              />
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header - responsive */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
          <div className="flex items-center space-x-4">
            {/* Search - hidden on mobile */}
            <div className="relative hidden sm:block">
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
            {/* Admin Info - hide name on very small screens */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {ADMIN_USER.fullName.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {ADMIN_USER.fullName}
                </p>
                <p className="text-xs text-gray-500">{ADMIN_USER.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 sm:p-6">{renderContent()}</div>
      </main>

      {/* Add/Edit Modal (unchanged) */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        role={modalRole}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminDashboard;
