import React, { useState, useEffect } from "react";
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
import * as api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

// Admin credentials
const ADMIN_USER = {
  fullName: "Vaibhav Sathe",
  username: "admin123",
  email: "admin@info.com",
  password: "admin12",
  role: "admin",
};

const AdminDashboard = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [viewRole, setViewRole] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  // Data states
  const [trainers, setTrainers] = useState([]);
  const [analysts, setAnalysts] = useState([]);
  const [counsellors, setCounsellors] = useState([]);

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalRole, setModalRole] = useState("Trainer");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRole, setDeleteRole] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Logout confirmation modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [trainersRes, analystsRes, counsellorsRes] = await Promise.all([
          api.getTrainers(),
          api.getAnalysts(),
          api.getCounsellors(),
        ]);
        setTrainers(trainersRes.data);
        setAnalysts(analystsRes.data);
        setCounsellors(counsellorsRes.data);
        setError(null);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("AdminDashboard Mounted");
  }, []);

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

  const openViewModal = (role, employee) => {
    setViewRole(role);
    setViewEmployee(employee);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewEmployee(null);
    setViewRole(null);
  };

  // Logout handlers
  const handleLogoutClick = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    navigate("/login");
    setShowLogoutModal(false);
  };
  const cancelLogout = () => setShowLogoutModal(false);

  // Delete handlers
  const openDeleteModal = (role, id) => {
    setDeleteRole(role);
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteRole(null);
    setDeleteId(null);
  };
  const confirmDelete = async () => {
    if (!deleteRole || !deleteId) return;
    try {
      switch (deleteRole) {
        case "Trainer":
          await api.deleteTrainer(deleteId);
          setTrainers((prev) => prev.filter((t) => t.id !== deleteId));
          break;
        case "Analyst":
          await api.deleteAnalyst(deleteId);
          setAnalysts((prev) => prev.filter((a) => a.id !== deleteId));
          break;
        case "Counsellor":
          await api.deleteCounsellor(deleteId);
          setCounsellors((prev) => prev.filter((c) => c.id !== deleteId));
          break;
        default:
          return;
      }
      toast.success(`${deleteRole} deleted successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      toast.error("Failed to delete employee. Please try again.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error(err);
    } finally {
      cancelDelete();
    }
  };

  const handleNavClick = (view) => {
    setActiveView(view);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Modal handlers (add/edit) – unchanged
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      if (modalMode === "add") {
        switch (modalRole) {
          case "Trainer": {
            const trainerData = {
              name: formData.name,
              email: formData.email || "",
              password: formData.password || "",
              phno: formData.phno || "",
              status: formData.status || "Active",
              specialization:
                formData.specialization || formData.expertise || "",
              expInYear: parseFloat(formData.expInYear) || 0,
              qualification: formData.qualification || "",
              joiningdate: formData.joiningdate || "",
              salary: parseFloat(formData.salary) || 0,
              students: parseInt(formData.students) || 0,
              rating: parseFloat(formData.rating) || 0,
            };

            const response = await api.addTrainer(trainerData);
            const newTrainer = { ...response.data, id: response.data.id };
            setTrainers((prev) => [...prev, newTrainer]);
            break;
          }
          case "Analyst": {
            const analystData = {
              name: formData.name,
              email: formData.email || "",
              password: formData.password || "",
              phno: formData.phno || "",
              department: formData.department || "",
              status: formData.status || "Active",
              joiningdate: formData.joiningdate || "",
              salary: parseFloat(formData.salary) || 0,
            };
            const response = await api.addAnalyst(analystData);
            setAnalysts((prev) => [...prev, response.data]);
            break;
          }
          case "Counsellor": {
            const response = await api.addCounsellor({
              name: formData.name,
              email: formData.email || "",
              password: formData.password || "",
              phno: formData.phno || "",
              status: formData.status || "Active",
              department: formData.department || "",
              joiningdate: formData.joiningdate || "",
              salary: parseFloat(formData.salary) || 0,
            });
            setCounsellors((prev) => [...prev, response.data]);
            break;
          }
          default:
            return;
        }
      } else {
        // Edit mode
        switch (modalRole) {
          case "Trainer": {
            const trainerData = {
              name: formData.name,
              email: formData.email || "",
              password: formData.password || "",
              phno: formData.phno || "",
              status: formData.status || "Active",
              specialization:
                formData.specialization || formData.expertise || "",
              expInYear: parseFloat(formData.expInYear) || 0,
              qualification: formData.qualification || "",
              joiningdate: formData.joiningdate || "",
              salary: parseFloat(formData.salary) || 0,
              students: parseInt(formData.students) || 0,
              rating: parseFloat(formData.rating) || 0,
            };
            const response = await api.updateTrainer(editingId, trainerData);
            setTrainers((prev) =>
              prev.map((t) => (t.id === editingId ? response.data : t)),
            );
            break;
          }
          case "Analyst": {
            const analystData = {
              name: formData.name,
              email: formData.email || "",
              password: formData.password || "",
              phno: formData.phno || "",
              department: formData.department || "",
              status: formData.status || "Active",
              joiningdate: formData.joiningdate || "",
              salary: parseFloat(formData.salary) || 0,
            };
            const response = await api.updateAnalyst(editingId, analystData);
            setAnalysts((prev) =>
              prev.map((a) => (a.id === editingId ? response.data : a)),
            );
            break;
          }
          case "Counsellor": {
            const response = await api.updateCounsellor(editingId, {
              name: formData.name,
              email: formData.email || "",
              password: formData.password || "",
              phno: formData.phno || "",
              status: formData.status || "Active",
              department: formData.department || "",
              joiningdate: formData.joiningdate || "",
              salary: parseFloat(formData.salary) || 0,
            });
            setCounsellors((prev) =>
              prev.map((c) => (c.id === editingId ? response.data : c)),
            );
            break;
          }
          default:
            return;
        }
      }
      closeModal();
    } catch (err) {
      toast.error(`Failed to ${modalMode} employee. Please try again.`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error(err);
    }
    return false;
  };

  // Render content based on activeView
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          {error}
        </div>
      );
    }

    switch (activeView) {
      case "dashboard":
        return <DashboardView admin={ADMIN_USER} stats={stats} />;
      case "employees":
        return (
          <EmployeesView
            employees={allEmployees}
            onAdd={() => openAddModal("Trainer")}
            onEdit={(emp) => openEditModal(emp.role, emp)}
            onDelete={(emp) => openDeleteModal(emp.role, emp.id)}
          />
        );
      case "trainers":
        return (
          <TrainersView
            trainers={trainers}
            onAdd={() => openAddModal("Trainer")}
            onView={(trainer) => openViewModal("Trainer", trainer)}
            onEdit={(trainer) => openEditModal("Trainer", trainer)}
            onDelete={(id) => openDeleteModal("Trainer", id)}
          />
        );
      case "analysts":
        return (
          <AnalystsView
            analysts={analysts}
            onAdd={() => openAddModal("Analyst")}
            onView={(analyst) => openViewModal("Analyst", analyst)}
            onEdit={(analyst) => openEditModal("Analyst", analyst)}
            onDelete={(id) => openDeleteModal("Analyst", id)}
          />
        );
      case "counsellors":
        return (
          <CounsellorsView
            counsellors={counsellors}
            onAdd={() => openAddModal("Counsellor")}
            onView={(counsellor) => openViewModal("Counsellor", counsellor)}
            onEdit={(counsellor) => openEditModal("Counsellor", counsellor)}
            onDelete={(id) => openDeleteModal("Counsellor", id)}
          />
        );
      default:
        return <DashboardView admin={ADMIN_USER} stats={stats} />;
    }
  };
  const DetailItem = ({ label, value }) => (
    <div className="border-b border-gray-100 pb-2">
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-base font-medium text-gray-800 mt-1">{value || "-"}</p>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar (unchanged) */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 hidden md:block relative`}
      >
        <div className="p-4 flex items-center space-x-2 border-b">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaMicrochip className="text-white text-xl" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">4bitlabs</span>
          )}
        </div>

        <div className="p-4">
          <button
            onClick={handleLogoutClick}
            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
          >
            <FaSignOutAlt className="text-lg" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>

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

      {/* Mobile Drawer (unchanged) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
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
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition mb-4"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="text-sm font-medium">Logout</span>
            </button>
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
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
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
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {ADMIN_USER.fullName}
                </p>
                <p className="text-xs text-gray-500">{ADMIN_USER.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">{renderContent()}</div>
      </main>

      {/* Add/Edit Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        role={modalRole}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {deleteRole?.toLowerCase()}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* View Employee Modal */}
      {showViewModal && viewEmployee && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header with role color */}
            <div
              className={`p-6 rounded-t-xl ${
                viewRole === "Trainer"
                  ? "bg-green-50 border-b-2 border-green-200"
                  : viewRole === "Analyst"
                    ? "bg-purple-50 border-b-2 border-purple-200"
                    : "bg-yellow-50 border-b-2 border-yellow-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  {viewRole === "Trainer" && (
                    <FaChalkboardTeacher className="text-green-600 mr-2" />
                  )}
                  {viewRole === "Analyst" && (
                    <FaChartLine className="text-purple-600 mr-2" />
                  )}
                  {viewRole === "Counsellor" && (
                    <FaUserFriends className="text-yellow-600 mr-2" />
                  )}
                  {viewEmployee.name} – {viewRole} Details
                </h3>
                <button
                  onClick={closeViewModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {viewRole === "Trainer" && (
                <>
                  <DetailItem label="Name" value={viewEmployee.name} />
                  <DetailItem label="Email" value={viewEmployee.email} />
                  <DetailItem label="Phone" value={viewEmployee.phno} />
                  <DetailItem label="Status" value={viewEmployee.status} />
                  <DetailItem
                    label="Specialization"
                    value={
                      viewEmployee.specialization || viewEmployee.expertise
                    }
                  />
                  <DetailItem
                    label="Experience"
                    value={`${viewEmployee.expInYear} years`}
                  />
                  <DetailItem
                    label="Qualification"
                    value={viewEmployee.qualification}
                  />
                  <DetailItem
                    label="Joining Date"
                    value={viewEmployee.joiningdate}
                  />
                  <DetailItem
                    label="Salary"
                    value={`$${viewEmployee.salary?.toLocaleString()}`}
                  />
                  <DetailItem label="Students" value={viewEmployee.students} />
                  <DetailItem label="Rating" value={viewEmployee.rating} />
                </>
              )}

              {viewRole === "Analyst" && (
                <>
                  <DetailItem label="Name" value={viewEmployee.name} />
                  <DetailItem label="Email" value={viewEmployee.email} />
                  <DetailItem label="Phone" value={viewEmployee.phno} />
                  <DetailItem
                    label="Department"
                    value={viewEmployee.department}
                  />
                  <DetailItem
                    label="Joining Date"
                    value={viewEmployee.joiningdate}
                  />
                  <DetailItem
                    label="Salary"
                    value={`$${viewEmployee.salary?.toLocaleString()}`}
                  />
                  <DetailItem label="Projects" value={viewEmployee.projects} />
                  <DetailItem
                    label="Success Rate"
                    value={viewEmployee.successRate}
                  />
                </>
              )}

              {viewRole === "Counsellor" && (
                <>
                  <DetailItem label="Name" value={viewEmployee.name} />
                  <DetailItem label="Email" value={viewEmployee.email} />
                  <DetailItem label="Phone" value={viewEmployee.phno} />
                  <DetailItem label="Status" value={viewEmployee.status} />
                  <DetailItem
                    label="Joining Date"
                    value={viewEmployee.joiningdate}
                  />
                  <DetailItem
                    label="Salary"
                    value={`$${viewEmployee.salary?.toLocaleString()}`}
                  />
                  <DetailItem
                    label="Students Assigned"
                    value={viewEmployee.studentsAssigned}
                  />
                  <DetailItem
                    label="Sessions Completed"
                    value={viewEmployee.sessionsCompleted}
                  />
                  <DetailItem
                    label="Satisfaction"
                    value={viewEmployee.satisfaction}
                  />
                </>
              )}
            </div>

            {/* Footer with close button */}
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
