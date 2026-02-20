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
} from "react-icons/fa";

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

  // Data states
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
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
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
  };

  // Modal handlers
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
      // Add new employee
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
      // Edit existing employee
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

  // Render content based on activeView
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

      {/* Add/Edit Modal */}
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

// ---------- Modal Component ----------
const AddEmployeeModal = ({
  isOpen,
  onClose,
  mode,
  role,
  formData,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const renderFields = () => {
    switch (role) {
      case "Trainer":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expertise
              </label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Students
              </label>
              <input
                type="number"
                name="students"
                value={formData.students || ""}
                onChange={onChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </>
        );
      case "Analyst":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Projects
              </label>
              <input
                type="number"
                name="projects"
                value={formData.projects || ""}
                onChange={onChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Success Rate (%)
              </label>
              <input
                type="text"
                name="successRate"
                value={formData.successRate || ""}
                onChange={onChange}
                required
                placeholder="e.g., 94%"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </>
        );
      case "Counsellor":
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Students Assigned
              </label>
              <input
                type="number"
                name="studentsAssigned"
                value={formData.studentsAssigned || ""}
                onChange={onChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sessions Completed
              </label>
              <input
                type="number"
                name="sessionsCompleted"
                value={formData.sessionsCompleted || ""}
                onChange={onChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Satisfaction (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="satisfaction"
                value={formData.satisfaction || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            {mode === "add" ? "Add New" : "Edit"} {role}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {renderFields()}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {mode === "add" ? "Add" : "Save"} {role}
            </button>
          </div>
        </form>
      </div>
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

    <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
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

const EmployeesView = ({ employees, onAdd, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <FaUsers className="text-blue-600 mr-2" /> All Employees
      </h2>
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
      >
        + Add New Employee
      </button>
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
                  <button
                    onClick={() => onEdit(emp)}
                    className="text-indigo-600 hover:text-indigo-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
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

const TrainersView = ({ trainers, onAdd, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <FaChalkboardTeacher className="text-green-600 mr-2" /> Trainers
      </h2>
      <button
        onClick={onAdd}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
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

const AnalystsView = ({ analysts, onAdd, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <FaChartLine className="text-purple-600 mr-2" /> Analysts
      </h2>
      <button
        onClick={onAdd}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
      >
        + Add New Analyst
      </button>
    </div>
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
                <button
                  onClick={() => onEdit(analyst)}
                  className="text-indigo-600 hover:text-indigo-800 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(analyst.id)}
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

const CounsellorsView = ({ counsellors, onAdd, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <FaUserFriends className="text-yellow-600 mr-2" /> Counsellors
      </h2>
      <button
        onClick={onAdd}
        className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition text-sm"
      >
        + Add New Counsellor
      </button>
    </div>
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
                <button
                  onClick={() => onEdit(counsellor)}
                  className="text-indigo-600 hover:text-indigo-800 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(counsellor.id)}
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

// Sidebar Item Component
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
