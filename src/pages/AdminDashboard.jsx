import React, { useState, useMemo } from "react";
import { FaUsers, FaChalkboardTeacher, FaChartLine, FaUserFriends } from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import DashboardView from "../components/DashboardView";
import EmployeesView from "../components/EmployeesView";
import TrainersView from "../components/TrainersView";
import AnalystsView from "../components/AnalystsView";
import CounsellorsView from "../components/CounsellorsView";
import AddEmployeeModal from "../components/AddEmployeeModal";
import ConfirmModal from "../components/ConfirmModal";
import ViewEmployeeModal from "../components/ViewEmployeeModal";

import useEmployees from "../hooks/useEmployees";
import { ADMIN_USER, ADMIN_NAV_ITEMS } from "../constants";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const emp = useEmployees();

  const user = JSON.parse(localStorage.getItem("user")) || ADMIN_USER;

  const stats = useMemo(
    () => [
      { label: "Total Employees", value: emp.allEmployees.length, icon: FaUsers, color: "bg-indigo-500" },
      { label: "Trainers", value: emp.trainers.length, icon: FaChalkboardTeacher, color: "bg-emerald-500" },
      { label: "Analysts", value: emp.analysts.length, icon: FaChartLine, color: "bg-purple-500" },
      { label: "Counsellors", value: emp.counsellors.length, icon: FaUserFriends, color: "bg-amber-500" },
    ],
    [emp]
  );

  const renderContent = () => {
    if (emp.loading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading dashboard...</p>
        </div>
      );
    }

    if (emp.error) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-2xl">!</div>
          <p className="text-rose-600 font-medium">{emp.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    switch (activeView) {
      case "dashboard":
        return <DashboardView admin={user} stats={stats} />;
      case "employees":
        return (
          <EmployeesView
            employees={emp.allEmployees}
            loading={emp.loading}
            onAdd={() => emp.openAddModal("Trainer")}
            onEdit={(e) => emp.openEditModal(e.role, e)}
            onDelete={(e) => emp.openDeleteModal(e.role, e.id)}
          />
        );
      case "trainers":
        return (
          <TrainersView
            trainers={emp.trainers}
            loading={emp.loading}
            onAdd={() => emp.openAddModal("Trainer")}
            onView={(t) => emp.openViewModal("Trainer", t)}
            onEdit={(t) => emp.openEditModal("Trainer", t)}
            onDelete={(id) => emp.openDeleteModal("Trainer", id)}
          />
        );
      case "analysts":
        return (
          <AnalystsView
            analysts={emp.analysts}
            loading={emp.loading}
            onAdd={() => emp.openAddModal("Analyst")}
            onView={(a) => emp.openViewModal("Analyst", a)}
            onEdit={(a) => emp.openEditModal("Analyst", a)}
            onDelete={(id) => emp.openDeleteModal("Analyst", id)}
          />
        );
      case "counsellors":
        return (
          <CounsellorsView
            counsellors={emp.counsellors}
            loading={emp.loading}
            onAdd={() => emp.openAddModal("Counsellor")}
            onView={(c) => emp.openViewModal("Counsellor", c)}
            onEdit={(c) => emp.openEditModal("Counsellor", c)}
            onDelete={(id) => emp.openDeleteModal("Counsellor", id)}
          />
        );
      default:
        return <DashboardView admin={user} stats={stats} />;
    }
  };

  return (
    <DashboardLayout
      user={user}
      navItems={ADMIN_NAV_ITEMS}
      activeView={activeView}
      onViewChange={setActiveView}
      showSearch
    >
      {renderContent()}

      <AddEmployeeModal
        isOpen={emp.isModalOpen}
        onClose={emp.closeModal}
        mode={emp.modalMode}
        role={emp.modalRole}
        formData={emp.formData}
        onChange={emp.handleInputChange}
        onSubmit={emp.handleSubmit}
      />

      <ConfirmModal
        isOpen={emp.showDeleteModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete this ${emp.deleteRole?.toLowerCase()}?`}
        confirmText="Yes, Delete"
        confirmClassName="bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200"
        onConfirm={emp.confirmDelete}
        onCancel={emp.cancelDelete}
      />

      <ViewEmployeeModal
        isOpen={emp.showViewModal}
        employee={emp.viewEmployee}
        role={emp.viewRole}
        onClose={emp.closeViewModal}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;