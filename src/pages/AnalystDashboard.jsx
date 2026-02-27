import React, { useState, useEffect, useMemo } from "react";
import {
  FaLayerGroup,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import { BatchModal } from "../components/BatchModal";
import ConfirmModal from "../components/ConfirmModal";
import { DetailItem } from "../components/DetailItem";

import useBatches from "../hooks/useBatches";
import { ANALYST_NAV_ITEMS } from "../constants";

const STATUS_BADGES = {
  active: "bg-green-100 text-green-700",
  upcoming: "bg-yellow-100 text-yellow-700",
  completed: "bg-gray-100 text-gray-700",
};

const AnalystDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const batch = useBatches();
  const [trainers, setTrainers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Analyst",
    email: "analyst@info.com",
  };

  // Fetch trainers for the BatchModal dropdown
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await import("../services/api").then((api) => api.getTrainers());
        setTrainers(res.data);
      } catch (err) {
        console.error("Failed to fetch trainers:", err);
      }
    };
    fetchTrainers();
  }, []);




  const statsCards = useMemo(
    () => [
      { label: "Total Batches", value: batch.stats.total, icon: FaLayerGroup, color: "bg-blue-500" },
      { label: "Active", value: batch.stats.active, icon: FaCheckCircle, color: "bg-green-500" },
      { label: "Upcoming", value: batch.stats.upcoming, icon: FaClock, color: "bg-yellow-500" },
      { label: "Completed", value: batch.stats.completed, icon: FaCheckCircle, color: "bg-purple-500" },
    ],
    [batch.stats],
  );

  const getStatusBadge = (status) => (
    <span className={`px-2 py-1 text-xs rounded-full ${STATUS_BADGES[status] || STATUS_BADGES.completed}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
    </span>
  );

  // Loading / Error states
  if (batch.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (batch.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{batch.error}</div>
      </div>
    );
  }

  return (
    <DashboardLayout
      user={{ ...user, role: "Analyst" }}
      navItems={ANALYST_NAV_ITEMS}
      activeView={activeView}
      onViewChange={setActiveView}
    >
      {/* ─── Dashboard View ─────────────────────────── */}
      {activeView === "dashboard" && (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Analyst Dashboard</h1>
          <p className="text-gray-500 mb-6">
            Welcome back, {user.name}! Here's your batch overview.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, idx) => (
              <div
                key={idx}
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
      )}

      {/* ─── Batches View ───────────────────────────── */}
      {activeView === "batches" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">All Batches</h2>
            <button
              type="button"
              onClick={batch.openAddModal}
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
                {batch.batches.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{b.name}</td>
                    <td>{b.course}</td>
                    <td>{b.trainerName}</td>
                    <td>{b.startDate}</td>
                    <td>{b.endDate}</td>
                    <td>{getStatusBadge(b.status)}</td>
                    <td>{b.studentsCount}</td>
                    <td className="whitespace-nowrap">
                      <button type="button" onClick={() => batch.openViewModal(b)} className="text-blue-600 hover:text-blue-800 mr-2">
                        <FaEye />
                      </button>
                      <button type="button" onClick={() => batch.openEditModal(b)} className="text-indigo-600 hover:text-indigo-800 mr-2">
                        <FaEdit />
                      </button>
                      <button type="button" onClick={() => batch.openDeleteModal(b)} className="text-red-600 hover:text-red-800">
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

      {/* ─── Reports View ───────────────────────────── */}
      {activeView === "reports" && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Analytics & Reports</h2>
          <p className="text-gray-600">
            Coming soon: Visual reports on batch performance, student progress, etc.
          </p>
        </div>
      )}

      {/* ─── Modals ─────────────────────────────────── */}
      {batch.showAddModal && (
        <BatchModal
          title="Add New Batch"
          formData={batch.formData}
          onChange={batch.handleInputChange}
          onSubmit={batch.handleAddBatch}
          onClose={batch.closeModals}
          submitText="Add Batch"
          trainers={trainers}
        />
      )}
      {batch.showEditModal && (
        <BatchModal
          title="Edit Batch"
          formData={batch.formData}
          onChange={batch.handleInputChange}
          onSubmit={batch.handleEditBatch}
          onClose={batch.closeModals}
          submitText="Update Batch"
          trainers={trainers}
        />
      )}

      {/* View Batch Details */}
      {batch.showViewModal && batch.currentBatch && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Batch Details</h3>
              <button type="button" onClick={batch.closeModals} className="text-gray-400 hover:text-gray-600">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Batch Name" value={batch.currentBatch.name} />
              <DetailItem label="Course" value={batch.currentBatch.course} />
              <DetailItem label="Trainer Name" value={batch.currentBatch.trainerName} />
              <DetailItem label="Start Date" value={batch.currentBatch.startDate} />
              <DetailItem label="End Date" value={batch.currentBatch.endDate} />
              <DetailItem label="Status" value={batch.currentBatch.status} />
              <DetailItem label="Students Count" value={batch.currentBatch.studentsCount} />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={batch.closeModals}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={batch.showDeleteModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete batch "${batch.currentBatch?.name}"?`}
        confirmText="Yes, Delete"
        onConfirm={batch.handleDeleteBatch}
        onCancel={batch.closeModals}
      />
    </DashboardLayout>
  );
};

export default AnalystDashboard;