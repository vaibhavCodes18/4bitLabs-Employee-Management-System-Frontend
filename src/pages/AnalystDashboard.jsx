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
  upcoming: "bg-yellow-50 text-yellow-700",
  completed: "bg-gray-100 text-gray-500",
};

const AnalystDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const batch = useBatches();
  const [trainers, setTrainers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Analyst",
    email: "analyst@info.com",
  };

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
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_BADGES[status] || STATUS_BADGES.completed}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
    </span>
  );

  if (batch.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          <p className="text-sm text-gray-400 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  if (batch.error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 text-2xl">!</div>
          <p className="text-red-600 font-medium">{batch.error}</p>
        </div>
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
        <div className="animate-fade-in-up">
          {/* Welcome banner */}
          <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-pink-700 px-8 py-7">
            <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border border-white/20">
                  {(user.name || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-purple-200 text-xs font-medium mb-0.5">Welcome back 👋</p>
                  <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">{user.name || "Analyst"}</h1>
                  <p className="text-purple-200/80 text-xs mt-1">Here's your batch overview for today.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-800">Overview</h2>
            <p className="text-xs text-gray-400 mt-1">Your batch management statistics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statsCards.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-100 px-5 py-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
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
      )}

      {/* ─── Batches View ───────────────────────────── */}
      {activeView === "batches" && (
        <div className="animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="flex flex-wrap justify-between items-center mb-5 pb-4 border-b border-gray-100 gap-3">
              <div className="text-base font-bold text-gray-900 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <FaLayerGroup />
                </div>
                <span>All Batches</span>
                <span className="ml-2 px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                  {batch.batches.length}
                </span>
              </div>
              <button
                type="button"
                onClick={batch.openAddModal}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-200 text-sm font-medium"
              >
                <FaPlus className="text-xs" /> Add Batch
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-gray-50">
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Batch Name</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Course</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Trainer</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Start Date</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">End Date</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Status</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Students</th>
                    <th className="font-semibold text-[11px] uppercase tracking-wider text-gray-500 px-3.5 py-3 border-b-2 border-gray-200 text-left whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.batches.map((b, idx) => (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                      <td className="px-3.5 py-3 font-semibold text-gray-800 whitespace-nowrap text-[13px]">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {b.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span>{b.name}</span>
                        </div>
                      </td>
                      <td className="px-3.5 py-3 whitespace-nowrap text-[13px]">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold">{b.course}</span>
                      </td>
                      <td className="px-3.5 py-3 whitespace-nowrap text-gray-500 text-[13px]">{b.trainerName || "—"}</td>
                      <td className="px-3.5 py-3 whitespace-nowrap text-gray-500 text-[13px]">{b.startDate}</td>
                      <td className="px-3.5 py-3 whitespace-nowrap text-gray-500 text-[13px]">{b.endDate}</td>
                      <td className="px-3.5 py-3 whitespace-nowrap">{getStatusBadge(b.status)}</td>
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">{b.studentsCount || 0}</span>
                      </td>
                      <td className="px-3.5 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <button type="button" onClick={() => batch.openViewModal(b)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-blue-500 hover:bg-blue-50 hover:scale-110 transition-all" title="View">
                            <FaEye />
                          </button>
                          <button type="button" onClick={() => batch.openEditModal(b)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-indigo-500 hover:bg-indigo-50 hover:scale-110 transition-all" title="Edit">
                            <FaEdit />
                          </button>
                          <button type="button" onClick={() => batch.openDeleteModal(b)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm text-red-500 hover:bg-red-50 hover:scale-110 transition-all" title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {batch.batches.length === 0 && (
                    <tr>
                      <td colSpan="8">
                        <div className="text-center py-10 px-4 text-gray-400">
                          <FaLayerGroup className="text-3xl opacity-30 mb-2 mx-auto" />
                          <p className="font-medium">No batches found</p>
                          <p className="text-sm mt-1">Create your first batch to get started</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-600">{batch.batches.length}</span> batches
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Reports View ───────────────────────────── */}
      {activeView === "reports" && (
        <div className="animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
              <FaLayerGroup className="text-3xl text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Analytics & Reports</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Coming soon: Visual reports on batch performance, student progress, trainer effectiveness, and more.
            </p>
          </div>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 animate-scale-in border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <FaLayerGroup />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Batch Details</h3>
              </div>
              <button type="button" onClick={batch.closeModals} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition">
                <FaTimes size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-5">
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
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 text-sm font-medium transition-all duration-200"
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