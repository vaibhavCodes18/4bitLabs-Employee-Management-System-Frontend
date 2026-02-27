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
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";
import { DetailItem } from "../components/DetailItem";
import { notify } from "../utils/notify";
import * as api from "../services/api";

// ─── Nav Items ───────────────────────────────────────────────
const COUNSELLOR_NAV_ITEMS = [
    { key: "dashboard", icon: FaUserGraduate, label: "Dashboard" },
    { key: "students", icon: FaUserGraduate, label: "Students" },
    { key: "batches", icon: FaLayerGroup, label: "Batches" },
];

// ─── Initial Form State ─────────────────────────────────────
const INITIAL_FORM = {
    name: "",
    email: "",
    phone: "",
    status: "active",
    joiningDate: "",
};

const STATUS_BADGES = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
};

// ─── Student Form Modal ──────────────────────────────────────
const StudentModal = ({ title, formData, onChange, onSubmit, onClose, submitText }) => (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <FaTimes size={20} />
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button type="button" onClick={onSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        {submitText}
                    </button>
                </div>
            </div>
        </div>
    </div>
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
    const [currentStudent, setCurrentStudent] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [selectedBatch, setSelectedBatch] = useState("");

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

    const openAssignModal = useCallback((student) => {
        setCurrentStudent(student);
        setShowAssignModal(true);
    }, []);

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
            await api.deleteStudent(currentStudent.id);
            setStudents((prev) => prev.filter((s) => s.id !== currentStudent.id));
            notify.success("Student deleted successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to delete student. Please try again.");
            console.error(err);
        }
    }, [currentStudent, closeModals]);

    const handleAssignBatch = useCallback(async () => {
        if (!selectedBatch) {
            notify.error("Please select a batch.");
            return;
        }
        try {
            const response = await api.assignStudentToBatch({
                studentId: currentStudent.id,
                batchId: selectedBatch,
            });
            // Update local assignments state so View modal shows it immediately
            setAssignments((prev) => [...prev, response.data]);
            notify.success("Student assigned to batch successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to assign student. Please try again.");
            console.error(err);
        }
    }, [selectedBatch, currentStudent, closeModals]);

    // ─── Helper: Get assigned batches for a student ──────────
    const getStudentBatches = useCallback(
        (studentId) => {
            const studentAssignments = assignments.filter((a) => a.studentId === studentId);
            // Deduplicate by batchId
            const uniqueBatchIds = [...new Set(studentAssignments.map((a) => a.batchId))];
            return uniqueBatchIds
                .map((batchId) => batches.find((b) => b.id === batchId))
                .filter(Boolean);
        },
        [assignments, batches],
    );

    // ─── Derived Stats ────────────────────────────────────────
    const stats = useMemo(
        () => [
            { label: "Total Students", value: students.length, icon: FaUserGraduate, color: "bg-blue-500" },
            { label: "Active Students", value: students.filter((s) => s.status === "active").length, icon: FaCheckCircle, color: "bg-green-500" },
            { label: "Total Batches", value: batches.length, icon: FaLayerGroup, color: "bg-purple-500" },
            { label: "Inactive", value: students.filter((s) => s.status === "inactive").length, icon: FaClock, color: "bg-yellow-500" },
        ],
        [students, batches],
    );

    const getStatusBadge = (status) => (
        <span className={`px-2 py-1 text-xs rounded-full ${STATUS_BADGES[status] || STATUS_BADGES.inactive}`}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
        </span>
    );

    // ─── Student Table (reused in dashboard & students views) ──
    const renderStudentTable = (studentList) => (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Phone</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Joining Date</th>
                        <th className="text-left py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 font-medium">{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{getStatusBadge(student.status)}</td>
                            <td>{student.joiningDate}</td>
                            <td className="whitespace-nowrap">
                                <button type="button" onClick={() => openViewModal(student)} className="text-blue-600 hover:text-blue-800 mr-2" title="View">
                                    <FaEye />
                                </button>
                                <button type="button" onClick={() => openEditModal(student)} className="text-indigo-600 hover:text-indigo-800 mr-2" title="Edit">
                                    <FaEdit />
                                </button>
                                <button type="button" onClick={() => openDeleteModal(student)} className="text-red-600 hover:text-red-800 mr-2" title="Delete">
                                    <FaTrash />
                                </button>
                                <button type="button" onClick={() => openAssignModal(student)} className="text-green-600 hover:text-green-800" title="Assign to Batch">
                                    <FaUserGraduate />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {studentList.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                No students found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    // ─── Loading / Error ──────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>
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
                <>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Counsellor Dashboard</h1>
                    <p className="text-gray-500 mb-6">Welcome back, {user.name}! Here's your overview.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition">
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

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Students</h2>
                            <button type="button" onClick={openAddModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm flex items-center">
                                <FaPlus className="mr-1" /> Add Student
                            </button>
                        </div>
                        {renderStudentTable(students.slice(0, 5))}
                    </div>
                </>
            )}

            {/* ─── Students View ──────────────────────────── */}
            {activeView === "students" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">All Students</h2>
                        <button type="button" onClick={openAddModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm flex items-center">
                            <FaPlus className="mr-1" /> Add Student
                        </button>
                    </div>
                    {renderStudentTable(students)}
                </div>
            )}

            {/* ─── Batches View ───────────────────────────── */}
            {activeView === "batches" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Batches</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Batch Name</th>
                                    <th className="text-left py-2">Course</th>
                                    <th className="text-left py-2">Trainer</th>
                                    <th className="text-left py-2">Start Date</th>
                                    <th className="text-left py-2">End Date</th>
                                    <th className="text-left py-2">Status</th>
                                    <th className="text-left py-2">Students</th>
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
                                        <td>
                                            <span className={`px-2 py-1 text-xs rounded-full ${batch.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                                {batch.status ? batch.status.charAt(0).toUpperCase() + batch.status.slice(1) : "—"}
                                            </span>
                                        </td>
                                        <td>{batch.studentsCount}</td>
                                    </tr>
                                ))}
                                {batches.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">No batches found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ─── Modals ─────────────────────────────────── */}

            {/* Add Student */}
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

            {/* Edit Student */}
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

            {/* View Student Details */}
            {showViewModal && currentStudent && (() => {
                const assignedBatches = getStudentBatches(currentStudent.id);
                return (
                    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Student Details</h3>
                                <button type="button" onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DetailItem label="Name" value={currentStudent.name} />
                                <DetailItem label="Email" value={currentStudent.email} />
                                <DetailItem label="Phone" value={currentStudent.phone} />
                                <DetailItem label="Status" value={currentStudent.status} />
                                <DetailItem label="Joining Date" value={currentStudent.joiningDate} />
                            </div>

                            {/* ─── Assigned Batches Section ────────── */}
                            <div className="mt-6 border-t pt-4">
                                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                                    <FaLayerGroup className="text-indigo-600 mr-2" />
                                    Assigned Batches
                                </h4>
                                {assignedBatches.length > 0 ? (
                                    <div className="space-y-3">
                                        {assignedBatches.map((batch) => (
                                            <div
                                                key={batch.id}
                                                className="flex items-center justify-between bg-indigo-50 rounded-lg p-3 border border-indigo-100"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-800">{batch.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {batch.course} · Trainer: {batch.trainerName || "—"}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {batch.startDate} → {batch.endDate}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${batch.status === "active"
                                                            ? "bg-green-100 text-green-700"
                                                            : batch.status === "upcoming"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {batch.status
                                                        ? batch.status.charAt(0).toUpperCase() + batch.status.slice(1)
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
                                <button type="button" onClick={closeModals} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Assign to Batch */}
            {showAssignModal && currentStudent && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Assign to Batch</h3>
                            <button type="button" onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Select a batch for <span className="font-semibold">{currentStudent.name}</span>
                        </p>
                        <select
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
                        >
                            <option value="">Select a batch</option>
                            {batches.map((batch) => (
                                <option key={batch.id} value={batch.id}>
                                    {batch.name} ({batch.course})
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-3">
                            <button type="button" onClick={closeModals} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button type="button" onClick={handleAssignBatch} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete student "${currentStudent?.name}"?`}
                confirmText="Yes, Delete"
                onConfirm={handleDeleteStudent}
                onCancel={closeModals}
            />
        </DashboardLayout>
    );
};

export default CounsellorDashboard;