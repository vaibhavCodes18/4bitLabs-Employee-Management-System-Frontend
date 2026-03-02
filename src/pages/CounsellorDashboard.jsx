import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaUserGraduate,
  FaCheckCircle,
  FaLayerGroup,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaExchangeAlt,
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";
import { DetailItem } from "../components/DetailItem";
import { notify } from "../utils/notify";
import * as api from "../services/api";
import { COUNSELLOR_NAV_ITEMS } from "../constants";
import { StudentModal } from "../components/StudentModal";

// ─── Initial Form State ─────────────────────────────────────
const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  status: "active",
  joiningDate: "",
};

const STATUS_BADGES = {
  active: "bg-emerald-50 text-emerald-700",
  inactive: "bg-gray-100 text-gray-600",
};

// ─── Skeleton Row for Loading ───────────────────────────────
const SkeletonRow = ({ cols }) => (
  <tr className="animate-pulse border-b border-gray-100">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-full max-w-[120px]"></div>
      </td>
    ))}
  </tr>
);

// ─── Main Component ──────────────────────────────────────────
const CounsellorDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");

  // Data state
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showBatchStudentsModal, setShowBatchStudentsModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [viewingBatch, setViewingBatch] = useState(null);

  // Session user
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Counsellor",
    email: "counsellor@info.com",
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentsRes, batchesRes, assignmentsRes] = await Promise.all([
          api.getStudents(),
          api.getBatches(),
          api.getAssignments(),
        ]);
        setStudents(studentsRes.data);
        setBatches(batchesRes.data);
        setAssignments(assignmentsRes.data);
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

  // ─── Handlers ──────────────────────────────────────────────
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const closeModals = useCallback(() => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    setShowAssignModal(false);
    setShowTransferModal(false);
    setShowBatchStudentsModal(false);
    setViewingBatch(null);
    setCurrentStudent(null);
    setFormData(INITIAL_FORM);
    setSelectedBatch("");
  }, []);

  const openAddModal = useCallback(() => {
    setFormData(INITIAL_FORM);
    setShowAddModal(true);
  }, []);

  const openEditModal = useCallback((student) => {
    setCurrentStudent(student);
    setFormData(student);
    setShowEditModal(true);
  }, []);

  const openViewModal = useCallback((student) => {
    setCurrentStudent(student);
    setShowViewModal(true);
  }, []);

  const openDeleteModal = useCallback((student) => {
    setCurrentStudent(student);
    setShowDeleteModal(true);
  }, []);

  const openAssignModal = useCallback(
    (student) => {
      setCurrentStudent(student);
      const studentAssignments = assignments.filter(
        (a) => a.studentId === student.id,
      );
      if (studentAssignments.length > 0) {
        setShowTransferModal(true);
      } else {
        setShowAssignModal(true);
      }
    },
    [assignments],
  );

  // ─── CRUD Operations ──────────────────────────────────────
  const handleAddStudent = useCallback(async () => {
    try {
      const response = await api.addStudent(formData);
      setStudents((prev) => [...prev, response.data]);
      notify.success("Student added successfully!");
      closeModals();
    } catch (err) {
      notify.error("Failed to add student. Please try again.");
      console.error(err);
    }
  }, [formData, closeModals]);

  const handleEditStudent = useCallback(async () => {
    try {
      const response = await api.updateStudent(currentStudent.id, formData);
      setStudents((prev) =>
        prev.map((s) => (s.id === currentStudent.id ? response.data : s)),
      );
      notify.success("Student updated successfully!");
      closeModals();
    } catch (err) {
      notify.error("Failed to update student. Please try again.");
      console.error(err);
    }
  }, [formData, currentStudent, closeModals]);

  const handleDeleteStudent = useCallback(async () => {
    try {
      // Find all assignments for this student
      const studentAssignments = assignments.filter(
        (a) => a.studentId === currentStudent.id,
      );

      // Delete the student
      await api.deleteStudent(currentStudent.id);

      // Delete each assignment and decrement the batch studentsCount
      for (const assignment of studentAssignments) {
        await api.deleteAssignment(assignment.id);
        const batch = batches.find((b) => b.id === assignment.batchId);
        if (batch) {
          const newCount = Math.max((batch.studentsCount || 0) - 1, 0);
          await api.updateBatch(batch.id, {
            ...batch,
            studentsCount: newCount,
          });
          setBatches((prev) =>
            prev.map((b) =>
              b.id === batch.id ? { ...b, studentsCount: newCount } : b,
            ),
          );
        }
      }

      // Update local state
      const assignmentIds = studentAssignments.map((a) => a.id);
      setAssignments((prev) =>
        prev.filter((a) => !assignmentIds.includes(a.id)),
      );
      setStudents((prev) => prev.filter((s) => s.id !== currentStudent.id));
      notify.success("Student deleted successfully!");
      closeModals();
    } catch (err) {
      notify.error("Failed to delete student. Please try again.");
      console.error(err);
    }
  }, [currentStudent, closeModals, assignments, batches]);

  const handleAssignBatch = useCallback(async () => {
    if (!selectedBatch) {
      notify.error("Please select a batch.");
      return;
    }
    const alreadyAssigned = assignments.some(
      (a) => a.studentId === currentStudent.id && a.batchId === selectedBatch,
    );
    if (alreadyAssigned) {
      notify.error("Student is already assigned to this batch.");
      return;
    }
    try {
      const response = await api.assignStudentToBatch({
        studentId: currentStudent.id,
        batchId: selectedBatch,
      });
      setAssignments((prev) => [...prev, response.data]);
      const targetBatch = batches.find((b) => b.id === selectedBatch);
      if (targetBatch) {
        const newCount = (targetBatch.studentsCount || 0) + 1;
        await api.updateBatch(selectedBatch, {
          ...targetBatch,
          studentsCount: newCount,
        });
        setBatches((prev) =>
          prev.map((b) =>
            b.id === selectedBatch ? { ...b, studentsCount: newCount } : b,
          ),
        );
      }
      notify.success("Student assigned to batch successfully!");
      closeModals();
    } catch (err) {
      notify.error("Failed to assign student. Please try again.");
      console.error(err);
    }
  }, [selectedBatch, currentStudent, closeModals, assignments, batches]);

  // ─── Batch Transfer ──────────────────────────────────────
  const handleTransferBatch = useCallback(async () => {
    if (!selectedBatch) {
      notify.error("Please select a new batch.");
      return;
    }
    const currentAssignments = assignments.filter(
      (a) => a.studentId === currentStudent.id,
    );
    const alreadyInTarget = currentAssignments.some(
      (a) => a.batchId === selectedBatch,
    );
    if (alreadyInTarget) {
      notify.error("Student is already in this batch.");
      return;
    }
    try {
      for (const assignment of currentAssignments) {
        await api.deleteAssignment(assignment.id);
        const oldBatch = batches.find((b) => b.id === assignment.batchId);
        if (oldBatch) {
          const newCount = Math.max((oldBatch.studentsCount || 0) - 1, 0);
          await api.updateBatch(oldBatch.id, {
            ...oldBatch,
            studentsCount: newCount,
          });
          setBatches((prev) =>
            prev.map((b) =>
              b.id === oldBatch.id ? { ...b, studentsCount: newCount } : b,
            ),
          );
        }
      }
      const oldIds = currentAssignments.map((a) => a.id);
      setAssignments((prev) => prev.filter((a) => !oldIds.includes(a.id)));
      const response = await api.assignStudentToBatch({
        studentId: currentStudent.id,
        batchId: selectedBatch,
      });
      setAssignments((prev) => [...prev, response.data]);
      const targetBatch = batches.find((b) => b.id === selectedBatch);
      if (targetBatch) {
        const newCount = (targetBatch.studentsCount || 0) + 1;
        await api.updateBatch(selectedBatch, {
          ...targetBatch,
          studentsCount: newCount,
        });
        setBatches((prev) =>
          prev.map((b) =>
            b.id === selectedBatch ? { ...b, studentsCount: newCount } : b,
          ),
        );
      }
      notify.success("Student transferred to new batch successfully!");
      closeModals();
    } catch (err) {
      notify.error("Failed to transfer student. Please try again.");
      console.error(err);
    }
  }, [selectedBatch, currentStudent, closeModals, assignments, batches]);

  // ─── Helper: Get assigned batches for a student ──────────
  const getStudentBatches = useCallback(
    (studentId) => {
      const studentAssignments = assignments.filter(
        (a) => a.studentId === studentId,
      );
      const uniqueBatchIds = [
        ...new Set(studentAssignments.map((a) => a.batchId)),
      ];
      return uniqueBatchIds
        .map((batchId) => batches.find((b) => b.id === batchId))
        .filter(Boolean);
    },
    [assignments, batches],
  );

  // ─── Helper: Get students assigned to a batch ────────────
  const getBatchStudents = useCallback(
    (batchId) => {
      const batchAssignments = assignments.filter(
        (a) => a.batchId === batchId && a.studentId,
      );
      const uniqueStudentIds = [
        ...new Set(batchAssignments.map((a) => a.studentId)),
      ];
      return uniqueStudentIds
        .map((studentId) => students.find((s) => s.id === studentId))
        .filter(Boolean);
    },
    [assignments, students],
  );

  const openBatchStudentsModal = useCallback((batch) => {
    setViewingBatch(batch);
    setShowBatchStudentsModal(true);
  }, []);

  // ─── Derived Stats ────────────────────────────────────────
  const stats = useMemo(
    () => [
      {
        label: "Total Students",
        value: students.length,
        icon: FaUserGraduate,
        color: "bg-amber-500",
      },
      {
        label: "Active Students",
        value: students.filter((s) => s.status === "active").length,
        icon: FaCheckCircle,
        color: "bg-emerald-500",
      },
      {
        label: "Total Batches",
        value: batches.length,
        icon: FaLayerGroup,
        color: "bg-indigo-500",
      },
      {
        label: "Inactive",
        value: students.filter((s) => s.status === "inactive").length,
        icon: FaClock,
        color: "bg-gray-500",
      },
    ],
    [students, batches],
  );

  // ─── Student Table (reused) ───────────────────────────────
  const renderStudentTable = (studentList, showActions = true) => {
    const cols = showActions ? 6 : 5;
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Joining Date
              </th>
              {showActions && (
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonRow key={i} cols={cols} />
              ))
            ) : studentList.length > 0 ? (
              studentList.map((student, idx) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {student.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {student.phone || "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${STATUS_BADGES[student.status] || STATUS_BADGES.inactive}`}
                    >
                      {student.status
                        ? student.status.charAt(0).toUpperCase() +
                        student.status.slice(1)
                        : "Unknown"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {student.joiningDate || "—"}
                  </td>
                  {showActions && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openViewModal(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditModal(student)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => openDeleteModal(student)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                        {(() => {
                          const hasAssignment = assignments.some(
                            (a) => a.studentId === student.id,
                          );
                          return (
                            <button
                              onClick={() => openAssignModal(student)}
                              className={`p-2 rounded-lg transition ${hasAssignment ? "text-orange-600 hover:bg-orange-50" : "text-emerald-600 hover:bg-emerald-50"}`}
                              title={
                                hasAssignment
                                  ? "Transfer Batch"
                                  : "Assign to Batch"
                              }
                            >
                              {hasAssignment ? (
                                <FaExchangeAlt />
                              ) : (
                                <FaUserGraduate />
                              )}
                            </button>
                          );
                        })()}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={cols} className="text-center py-12">
                  <FaUserGraduate className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No students found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add your first student to get started
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  // ─── Loading / Error ──────────────────────────────────────
  if (loading && activeView !== "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-2xl">
            !
          </div>
          <p className="text-rose-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      user={{ ...user, role: "Counsellor" }}
      navItems={COUNSELLOR_NAV_ITEMS}
      activeView={activeView}
      onViewChange={setActiveView}
    >
      {/* ─── Dashboard View ─────────────────────────── */}
      {activeView === "dashboard" && (
        <div className="animate-fade-in-up">
          {/* Welcome Banner */}
          <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-orange-700 px-8 py-7">
            <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border border-white/20">
                  {(user.name || "C").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-orange-100 text-xs font-medium mb-0.5">
                    Welcome back 👋
                  </p>
                  <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {user.name || "Counsellor"}
                  </h1>
                  <p className="text-orange-100/80 text-xs mt-1">
                    Here's your student management overview.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-800">Overview</h2>
            <p className="text-xs text-gray-400 mt-1">
              Your student and batch statistics
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div
                  className={`${stat.color} w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm`}
                >
                  <stat.icon className="text-lg" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Students */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                  <FaUserGraduate className="text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Students
                </h2>
              </div>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-amber-200 transition-shadow"
              >
                <FaPlus className="text-xs" /> Add Student
              </button>
            </div>
            {renderStudentTable(students.slice(0, 5), true)}
            {!loading && students.length > 5 && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <button
                  onClick={() => setActiveView("students")}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  View all students →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Students View ──────────────────────────── */}
      {activeView === "students" && (
        <div className="animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                  <FaUserGraduate className="text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  All Students
                </h2>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-medium">
                  {students.length}
                </span>
              </div>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-amber-200 transition-shadow"
              >
                <FaPlus className="text-xs" /> Add Student
              </button>
            </div>
            {renderStudentTable(students, true)}
            {!loading && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                <span>
                  Showing{" "}
                  <span className="font-semibold text-gray-600">
                    {students.length}
                  </span>{" "}
                  students
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Batches View ───────────────────────────── */}
      {activeView === "batches" && (
        <div className="animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <FaLayerGroup className="text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Batches</h2>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                  {batches.length}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Batch Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Trainer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <SkeletonRow key={i} cols={8} />
                    ))
                  ) : batches.length > 0 ? (
                    batches.map((batch, idx) => (
                      <tr
                        key={batch.id}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                              {batch.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <span>{batch.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                            {batch.course}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {batch.trainerName || "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {batch.startDate}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {batch.endDate}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${batch.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : batch.status === "upcoming"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {batch.status
                              ? batch.status.charAt(0).toUpperCase() +
                              batch.status.slice(1)
                              : "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">
                            {batch.studentsCount || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => openBatchStudentsModal(batch)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition"
                            title="View Students"
                          >
                            <FaEye className="text-xs" /> View Students
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-12">
                        <FaLayerGroup className="text-4xl text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">
                          No batches found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {!loading && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                <span>
                  Showing{" "}
                  <span className="font-semibold text-gray-600">
                    {batches.length}
                  </span>{" "}
                  batches
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Batch Students Modal ─────────────────────── */}
      {showBatchStudentsModal &&
        viewingBatch &&
        (() => {
          const batchStudents = getBatchStudents(viewingBatch.id);
          return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 animate-scale-in border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                      <FaLayerGroup className="text-lg" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Students in {viewingBatch.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {viewingBatch.course} · Trainer:{" "}
                        {viewingBatch.trainerName || "—"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModals}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {batchStudents.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50/80">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchStudents.map((student, idx) => (
                          <tr
                            key={student.id}
                            className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                                  {student.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <span>{student.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.email}
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.phone || "—"}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${STATUS_BADGES[student.status] || STATUS_BADGES.inactive}`}
                              >
                                {student.status
                                  ? student.status.charAt(0).toUpperCase() +
                                  student.status.slice(1)
                                  : "—"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {student.joiningDate || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FaUserGraduate className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">
                      No students assigned
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Assign students to this batch to see them here
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    Total:{" "}
                    <span className="font-semibold text-gray-600">
                      {batchStudents.length}
                    </span>{" "}
                    student{batchStudents.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={closeModals}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-200 text-sm font-medium transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* ─── Add Student Modal ───────────────────────── */}
      {showAddModal && (
        <StudentModal
          title="Add New Student"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleAddStudent}
          onClose={closeModals}
          submitText="Add Student"
        />
      )}

      {/* ─── Edit Student Modal ──────────────────────── */}
      {showEditModal && (
        <StudentModal
          title="Edit Student"
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleEditStudent}
          onClose={closeModals}
          submitText="Update Student"
        />
      )}

      {/* ─── View Student Details Modal ───────────────── */}
      {showViewModal &&
        currentStudent &&
        (() => {
          const assignedBatches = getStudentBatches(currentStudent.id);
          return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-scale-in border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                      <FaUserGraduate className="text-lg" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Student Details
                    </h3>
                  </div>
                  <button
                    onClick={closeModals}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-5">
                  <DetailItem label="Name" value={currentStudent.name} />
                  <DetailItem label="Email" value={currentStudent.email} />
                  <DetailItem label="Phone" value={currentStudent.phone} />
                  <DetailItem label="Status" value={currentStudent.status} />
                  <DetailItem
                    label="Joining Date"
                    value={currentStudent.joiningDate}
                  />
                </div>

                {/* Assigned Batches Section */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FaLayerGroup className="text-indigo-500" />
                    Assigned Batches
                  </h4>
                  {assignedBatches.length > 0 ? (
                    <div className="space-y-2.5">
                      {assignedBatches.map((batch) => (
                        <div
                          key={batch.id}
                          className="flex items-center justify-between bg-indigo-50/60 rounded-xl p-3.5 border border-indigo-100"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {batch.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {batch.course} · Trainer:{" "}
                              {batch.trainerName || "—"}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {batch.startDate} → {batch.endDate}
                            </p>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${batch.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : batch.status === "upcoming"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {batch.status
                              ? batch.status.charAt(0).toUpperCase() +
                              batch.status.slice(1)
                              : "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      No batches assigned yet.
                    </p>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModals}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-amber-200 text-sm font-medium transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* ─── Assign to Batch Modal ───────────────────── */}
      {showAssignModal && currentStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                  <FaUserGraduate className="text-lg" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Assign to Batch
                </h3>
              </div>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Select a batch for{" "}
              <span className="font-semibold text-gray-700">
                {currentStudent.name}
              </span>
            </p>

            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 transition mb-5"
            >
              <option value="">Select a batch</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name} ({batch.course})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModals}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignBatch}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all duration-200"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Batch Transfer Modal ────────────────────── */}
      {showTransferModal &&
        currentStudent &&
        (() => {
          const currentBatches = getStudentBatches(currentStudent.id);
          const currentBatchIds = currentBatches.map((b) => b.id);
          return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                      <FaExchangeAlt className="text-lg" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Batch Transfer
                    </h3>
                  </div>
                  <button
                    onClick={closeModals}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  Transfer{" "}
                  <span className="font-semibold text-gray-700">
                    {currentStudent.name}
                  </span>{" "}
                  to a new batch
                </p>

                {/* Current Batch Info */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Current Batch
                  </label>
                  {currentBatches.length > 0 ? (
                    <div className="space-y-2">
                      {currentBatches.map((batch) => (
                        <div
                          key={batch.id}
                          className="flex items-center justify-between bg-orange-50 rounded-xl p-3.5 border border-orange-200"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {batch.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {batch.course} · Trainer:{" "}
                              {batch.trainerName || "—"}
                            </p>
                          </div>
                          <span
                            className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${batch.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {batch.status
                              ? batch.status.charAt(0).toUpperCase() +
                              batch.status.slice(1)
                              : "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      No batch currently assigned.
                    </p>
                  )}
                </div>

                {/* New Batch Selection */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Transfer To
                  </label>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition"
                  >
                    <option value="">Select new batch</option>
                    {batches
                      .filter((b) => !currentBatchIds.includes(b.id))
                      .map((batch) => (
                        <option key={batch.id} value={batch.id}>
                          {batch.name} ({batch.course})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModals}
                    className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTransferBatch}
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-orange-200 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <FaExchangeAlt /> Transfer
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* ─── Delete Confirmation Modal ───────────────── */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete student "${currentStudent?.name}"?`}
        confirmText="Yes, Delete"
        confirmClassName="bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200"
        onConfirm={handleDeleteStudent}
        onCancel={closeModals}
      />
    </DashboardLayout>
  );
};

export default CounsellorDashboard;
