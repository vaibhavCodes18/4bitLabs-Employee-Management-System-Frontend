import React, { useState, useEffect } from "react";
import {
  FaMicrochip,
  FaTachometerAlt,
  FaLayerGroup,
  FaChartBar,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaTimes,
  FaBars,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import SidebarItem from "../components/SidebarItem";
import * as batchApi from "../services/api.js";
import { DetailItem } from "../components/DetailItem.jsx";
import { BatchModal } from "../components/BatchModal.jsx";

const AnalystDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    trainerName: "", // new field
    startDate: "",
    endDate: "",
    status: "upcoming",
    studentsCount: 0,
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Analyst",
    email: "analyst@info.com",
  };

  // Fetch batches on mount
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await batchApi.getBatches();
        setBatches(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load batches. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    navigate("/login");
    setShowLogoutModal(false);
  };
  const cancelLogout = () => setShowLogoutModal(false);

  const openAddModal = () => {
    setFormData({
      name: "",
      course: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
      studentsCount: 0,
    });
    setShowAddModal(true);
  };

  const openEditModal = (batch) => {
    setCurrentBatch(batch);
    setFormData(batch);
    setShowEditModal(true);
  };

  const openViewModal = (batch) => {
    setCurrentBatch(batch);
    setShowViewModal(true);
  };

  const openDeleteModal = (batch) => {
    setCurrentBatch(batch);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setCurrentBatch(null);
    setFormData({
      name: "",
      course: "",
      startDate: "",
      endDate: "",
      status: "upcoming",
      studentsCount: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBatch = async (e) => {
    e.preventDefault();
    try {
      const response = await batchApi.addBatch({
        ...formData,
        studentsCount: parseInt(formData.studentsCount) || 0,
      });
      setBatches([...batches, response.data]);
      toast.success("Batch added successfully!");
      closeModals();
    } catch (err) {
      toast.error("Failed to add batch. Please try again.");
      console.error(err);
    }
  };

  const handleEditBatch = async (e) => {
    e.preventDefault();
    try {
      const response = await batchApi.updateBatch(currentBatch.id, {
        ...formData,
        studentsCount: parseInt(formData.studentsCount) || 0,
      });
      setBatches(
        batches.map((b) => (b.id === currentBatch.id ? response.data : b)),
      );
      toast.success("Batch updated successfully!");
      closeModals();
    } catch (err) {
      toast.error("Failed to update batch. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteBatch = async () => {
    try {
      await batchApi.deleteBatch(currentBatch.id);
      setBatches(batches.filter((b) => b.id !== currentBatch.id));
      toast.success("Batch deleted successfully!");
      closeModals();
    } catch (err) {
      toast.error("Failed to delete batch. Please try again.");
      console.error(err);
    }
  };

  // Stats calculation
  const totalBatches = batches.length;
  const activeBatches = batches.filter((b) => b.status === "active").length;
  const upcomingBatches = batches.filter((b) => b.status === "upcoming").length;
  const completedBatches = batches.filter(
    (b) => b.status === "completed",
  ).length;

  const stats = [
    {
      label: "Total Batches",
      value: totalBatches,
      icon: FaLayerGroup,
      color: "bg-blue-500",
    },
    {
      label: "Active",
      value: activeBatches,
      icon: FaCheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Upcoming",
      value: upcomingBatches,
      icon: FaClock,
      color: "bg-yellow-500",
    },
    {
      label: "Completed",
      value: completedBatches,
      icon: FaCheckCircle,
      color: "bg-purple-500",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Active
          </span>
        );
      case "upcoming":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
            Upcoming
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            Unknown
          </span>
        );
    }
  };

  // Render loading/error
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Sidebar (unchanged) */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 hidden md:block relative`}
      >
        <div className="p-4 flex items-center space-x-2 border-b">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <FaMicrochip className="text-white text-xl" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">4bitlabs</span>
          )}
        </div>
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {user.name?.charAt(0) || "A"}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user.name || "Analyst"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || "analyst@info.com"}
                </p>
                <p className="text-xs text-indigo-600">Analyst</p>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
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
            onClick={() => setActiveView("dashboard")}
          />
          <SidebarItem
            icon={FaLayerGroup}
            label="Batches"
            active={activeView === "batches"}
            open={sidebarOpen}
            onClick={() => setActiveView("batches")}
          />
          <SidebarItem
            icon={FaChartBar}
            label="Reports"
            active={activeView === "reports"}
            open={sidebarOpen}
            onClick={() => setActiveView("reports")}
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
              onClick={handleLogout}
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
                onClick={() => setActiveView("dashboard")}
              />
              <SidebarItem
                icon={FaLayerGroup}
                label="Batches"
                active={activeView === "batches"}
                open={true}
                onClick={() => setActiveView("batches")}
              />
              <SidebarItem
                icon={FaChartBar}
                label="Reports"
                active={activeView === "reports"}
                open={true}
                onClick={() => setActiveView("reports")}
              />
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header (unchanged) */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-indigo-600">
              <FaBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {user.name?.charAt(0) || "A"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {user.name || "Analyst"}
                </p>
                <p className="text-xs text-gray-500">Analyst</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeView === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Analyst Dashboard
              </h1>
              <p className="text-gray-500 mb-6">
                Welcome back, {user.name}! Here's your batch overview.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
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

              {/* Recent Batches Table */}
              {/* <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Recent Batches
                  </h2>
                  <button
                    onClick={openAddModal}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm flex items-center"
                  >
                    <FaPlus className="mr-1" /> Add Batch
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Batch Name</th>
                        <th className="text-left py-2">Course</th>
                        <th className="text-left py-2">Trainer Name</th>
                        <th className="text-left py-2">Start Date</th>
                        <th className="text-left py-2">End Date</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Students</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.slice(0, 5).map((batch) => (
                        <tr
                          key={batch.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-3 font-medium">{batch.name}</td>
                          <td>{batch.course}</td>
                          <td>{batch.trainerName}</td>
                          <td>{batch.startDate}</td>
                          <td>{batch.endDate}</td>
                          <td>{getStatusBadge(batch.status)}</td>
                          <td>{batch.studentsCount}</td>
                          <td className="whitespace-nowrap">
                            <button
                              onClick={() => openViewModal(batch)}
                              className="text-blue-600 hover:text-blue-800 mr-2"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => openEditModal(batch)}
                              className="text-indigo-600 hover:text-indigo-800 mr-2"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => openDeleteModal(batch)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {batches.length === 0 && (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-4 text-gray-500"
                          >
                            No batches found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div> */}
            </>
          )}

          {activeView === "batches" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  All Batches
                </h2>
                <button
                  onClick={openAddModal}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm flex items-center"
                >
                  <FaPlus className="mr-1" /> Add Batch
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Batch Name</th>
                      <th className="text-left py-2">Course</th>
                      <th className="text-left py-2">Trainer Name</th>
                      <th className="text-left py-2">Start Date</th>
                      <th className="text-left py-2">End Date</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Students</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch) => (
                      <tr key={batch.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-medium">{batch.name}</td>
                        <td>{batch.course}</td>
                        <td>{batch.trainerName}</td>
                        <td>{batch.startDate}</td>
                        <td>{batch.endDate}</td>
                        <td>{getStatusBadge(batch.status)}</td>
                        <td>{batch.studentsCount}</td>
                        <td className="whitespace-nowrap">
                          <button
                            onClick={() => openViewModal(batch)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => openEditModal(batch)}
                            className="text-indigo-600 hover:text-indigo-800 mr-2"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => openDeleteModal(batch)}
                            className="text-red-600 hover:text-red-800"
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
          )}

          {activeView === "reports" && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Analytics & Reports
              </h2>
              <p className="text-gray-600">
                Coming soon: Visual reports on batch performance, student
                progress, etc.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modals (unchanged) */}
      {showAddModal && (
        <BatchModal
          title="Add New Batch"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleAddBatch}
          onClose={closeModals}
          submitText="Add Batch"
        />
      )}
      {showEditModal && (
        <BatchModal
          title="Edit Batch"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleEditBatch}
          onClose={closeModals}
          submitText="Update Batch"
        />
      )}
      {showViewModal && currentBatch && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Batch Details</h3>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Batch Name" value={currentBatch.name} />
              <DetailItem label="Course" value={currentBatch.course} />
              <DetailItem
                label="Trainer Name"
                value={currentBatch.trainerName}
              />
              <DetailItem label="Start Date" value={currentBatch.startDate} />
              <DetailItem label="End Date" value={currentBatch.endDate} />
              <DetailItem label="Status" value={currentBatch.status} />
              <DetailItem
                label="Students Count"
                value={currentBatch.studentsCount}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && currentBatch && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete batch "{currentBatch.name}"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModals}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBatch}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
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

// BatchModal and DetailItem components remain exactly the same as in your original code
// (omitted here for brevity, but keep them as you had them)

export default AnalystDashboard;
