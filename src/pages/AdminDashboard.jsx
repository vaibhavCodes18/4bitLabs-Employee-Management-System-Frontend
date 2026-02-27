import React, { useState, useMemo, useCallback } from "react";
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

  // Read logged-in user from session (set during login via json-server)
  const user = JSON.parse(localStorage.getItem("user")) || ADMIN_USER;

  // Stats cards — memoized
  const stats = useMemo(
    () => [
      { label: "Total Employees", value: emp.allEmployees.length, icon: FaUsers, color: "bg-blue-500" },
      { label: "Trainers", value: emp.trainers.length, icon: FaChalkboardTeacher, color: "bg-green-500" },
      { label: "Analysts", value: emp.analysts.length, icon: FaChartLine, color: "bg-purple-500" },
      { label: "Counsellors", value: emp.counsellors.length, icon: FaUserFriends, color: "bg-yellow-500" },
    ],
    [emp.allEmployees.length, emp.trainers.length, emp.analysts.length, emp.counsellors.length],
  );

  // Render active view content
  const renderContent = () => {
    if (emp.loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      );
    }

    if (emp.error) {
      return (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          {emp.error}
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
            onAdd={() => emp.openAddModal("Trainer")}
            onEdit={(e) => emp.openEditModal(e.role, e)}
            onDelete={(e) => emp.openDeleteModal(e.role, e.id)}
          />
        );
      case "trainers":
        return (
          <TrainersView
            trainers={emp.trainers}
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

      {/* Add/Edit Employee Modal */}
      <AddEmployeeModal
        isOpen={emp.isModalOpen}
        onClose={emp.closeModal}
        mode={emp.modalMode}
        role={emp.modalRole}
        formData={emp.formData}
        onChange={emp.handleInputChange}
        onSubmit={emp.handleSubmit}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={emp.showDeleteModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete this ${emp.deleteRole?.toLowerCase()}?`}
        confirmText="Yes, Delete"
        onConfirm={emp.confirmDelete}
        onCancel={emp.cancelDelete}
      />

      {/* View Employee Details */}
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
