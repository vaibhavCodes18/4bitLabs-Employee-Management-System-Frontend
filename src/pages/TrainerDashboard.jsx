import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
    FaLayerGroup,
    FaCheckCircle,
    FaClock,
    FaClipboardList,
    FaPlus,
    FaTimes,
    FaEye,
    FaEdit,
    FaFileAlt,
    FaCloudUploadAlt,
    FaDownload,
    FaChalkboardTeacher,
    FaTrash,
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import ConfirmModal from "../components/ConfirmModal";
import { notify } from "../utils/notify";
import * as api from "../services/api";
import { TRAINER_NAV_ITEMS } from "../constants";

// ─── Skeleton Row ────────────────────────────────────────────
const SkeletonRow = ({ cols }) => (
    <tr className="animate-pulse border-b border-gray-100">
        {Array.from({ length: cols }).map((_, i) => (
            <td key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-full max-w-[120px]"></div>
            </td>
        ))}
    </tr>
);

// ─── Status Badges ───────────────────────────────────────────
const STATUS_BADGES = {
    active: "bg-emerald-50 text-emerald-700",
    upcoming: "bg-amber-50 text-amber-700",
    completed: "bg-gray-100 text-gray-600",
};

// ─── Batch Progress Modal ────────────────────────────────────
const BatchProgressModal = ({
    title,
    formData,
    onChange,
    onFileChange,
    onSubmit,
    onClose,
    submitText,
    batches,
    isEdit = false,
    isLoading = false,
}) => {
    const fileRef = useRef(null);
    const ButtonSpinner = ({ size = "sm", className = "" }) => {
        const sizeClasses = { sm: "w-4 h-4 border-2", md: "w-5 h-5 border-2" };
        return (
            <span
                className={`inline-block ${sizeClasses[size]} border-current border-t-transparent rounded-full animate-spin ${className}`}
                role="status"
            />
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in border border-gray-100">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                            <FaClipboardList />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5">
                    {/* Batch Selector (only for add) */}
                    {!isEdit && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Select Batch <span className="text-rose-500">*</span>
                            </label>
                            <select
                                name="batchId"
                                value={formData.batchId}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 bg-white text-sm transition appearance-none"
                            >
                                <option value="" disabled>
                                    Choose a batch
                                </option>
                                {batches.map((batch) => (
                                    <option key={batch.id} value={batch.id}>
                                        {batch.name} — {batch.course}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            placeholder="e.g. Week 3: React Hooks Deep Dive"
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 text-sm transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Description <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Describe the progress, topics covered, notes..."
                            rows={4}
                            required
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 text-sm transition resize-none"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Upload Document{" "}
                            <span className="text-gray-400 text-xs">(optional)</span>
                        </label>
                        <div
                            onClick={() => fileRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition group"
                        >
                            <input
                                ref={fileRef}
                                type="file"
                                onChange={onFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg,.zip"
                            />
                            <FaCloudUploadAlt className="text-3xl text-gray-300 group-hover:text-emerald-500 mx-auto mb-2 transition" />
                            {formData.documentName ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaFileAlt className="text-emerald-600 text-sm" />
                                    <span className="text-sm font-medium text-emerald-700">
                                        {formData.documentName}
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Click to upload or drag a file here
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        PDF, DOC, XLS, PPT, Images, ZIP (max 5MB)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <ButtonSpinner size="sm" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            submitText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── View Progress Modal ─────────────────────────────────────
// Helper to generate the correct View URL depending on file type
const getViewUrl = (url, filename) => {
    if (!url || !filename) return "#";
    const ext = filename.split(".").pop().toLowerCase();
    const officeExts = ["doc", "docx", "xls", "xlsx", "ppt", "pptx"];
    // For Office documents, force Google Docs Viewer proxy for professional inline viewing
    if (officeExts.includes(ext)) {
        return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}`;
    }
    // For PDF and Images, modern browsers can securely view them natively
    console.log(url);

    return url;
};

const ViewProgressModal = ({ progress, batchName, onClose }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in border border-gray-100">
            <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                        <FaEye />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Progress Details
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition"
                >
                    <FaTimes size={18} />
                </button>
            </div>

            <div className="p-6 space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                            Batch
                        </p>
                        <p className="text-sm font-semibold text-gray-800">{batchName}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                            Title
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                            {progress.title}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                            Description
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {progress.description}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                            Created At
                        </p>
                        <p className="text-sm text-gray-600">
                            {new Date(progress.createdAt).toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>

                {/* Document */}
                {progress.documentName && (
                    <div className="bg-emerald-50 rounded-xl p-4">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">
                            Attached Document
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FaFileAlt className="text-emerald-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    {progress.documentName}
                                </span>
                            </div>
                            {progress.documentUrl && (
                                <a
                                    href={getViewUrl(progress.documentUrl, progress.documentName)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition"
                                >
                                    <FaEye className="text-[10px]" />
                                    View Document
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition-shadow"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
);

// ═══════════════════════════════════════════════════════════════
// ─── TRAINER DASHBOARD ──────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
const TrainerDashboard = () => {
    const [activeView, setActiveView] = useState("dashboard");

    // Data
    const [batches, setBatches] = useState([]);
    const [allProgress, setAllProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(null);

    // Action loading states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Form
    const INITIAL_FORM = {
        batchId: "",
        title: "",
        description: "",
        documentName: "",
        documentData: "",
    };
    const [formData, setFormData] = useState(INITIAL_FORM);

    // Session user
    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "Trainer",
        email: "trainer@info.com",
    };

    // ─── Fetch Data ────────────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [batchesRes, progressRes] = await Promise.all([
                    api.getBatches(),
                    api.getBatchProgress(),
                ]);
                setBatches(batchesRes.data);
                setAllProgress(progressRes.data);
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

    // ─── Derived: Batches assigned to this trainer ─────────────
    const trainerBatches = useMemo(
        () => batches.filter((b) => b.trainerId === user.id),
        [batches, user.id]
    );

    const trainerBatchIds = useMemo(
        () => new Set(trainerBatches.map((b) => b.id)),
        [trainerBatches]
    );

    // ─── Derived: Progress for this trainer's batches ──────────
    const trainerProgress = useMemo(
        () =>
            allProgress
                .filter((p) => p.trainerId === user.id)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [allProgress, user.id]
    );


    // ─── Stats ─────────────────────────────────────────────────
    const stats = useMemo(
        () => [
            {
                label: "My Batches",
                value: trainerBatches.length,
                icon: FaLayerGroup,
                color: "bg-emerald-500",
            },
            {
                label: "Active Batches",
                value: trainerBatches.filter((b) => b.status === "active").length,
                icon: FaCheckCircle,
                color: "bg-teal-500",
            },
            {
                label: "Progress Entries",
                value: trainerProgress.length,
                icon: FaClipboardList,
                color: "bg-cyan-500",
            },
            {
                label: "Upcoming",
                value: trainerBatches.filter((b) => b.status === "upcoming").length,
                icon: FaClock,
                color: "bg-gray-500",
            },
        ],
        [trainerBatches, trainerProgress]
    );

    // ─── Handlers ──────────────────────────────────────────────
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            notify.error("File size must be under 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prev) => ({
                ...prev,
                documentName: file.name,
                documentData: reader.result,
                file: file,
            }));
        };
        reader.readAsDataURL(file);
    }, []);

    const closeModals = useCallback(() => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowViewModal(false);
        setShowDeleteModal(false);
        setCurrentProgress(null);
        setFormData(INITIAL_FORM);
    }, []);

    const openAddModal = useCallback(() => {
        setFormData(INITIAL_FORM);
        setShowAddModal(true);
    }, []);

    const openEditModal = useCallback((progress) => {
        setCurrentProgress(progress);
        setFormData({
            batchId: progress.batchId,
            title: progress.title,
            description: progress.description,
            documentName: progress.documentName || "",
            documentData: progress.documentData || "",
        });
        setShowEditModal(true);
    }, []);

    const openViewModal = useCallback((progress) => {
        setCurrentProgress(progress);
        setShowViewModal(true);
    }, []);

    const openDeleteModal = useCallback((progress) => {
        setCurrentProgress(progress);
        setShowDeleteModal(true);
    }, []);

    // ─── CRUD ──────────────────────────────────────────────────
    const handleAddProgress = useCallback(async () => {
        if (!formData.batchId) {
            notify.error("Please select a batch.");
            return;
        }
        if (!formData.title.trim() || !formData.description.trim()) {
            notify.error("Title and description are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = new FormData();
            payload.append("batchId", formData.batchId);
            payload.append("trainerId", user.id);
            payload.append("title", formData.title.trim());
            payload.append("description", formData.description.trim());

            if (formData.file) {
                payload.append("file", formData.file);
            }

            const response = await api.addBatchProgress(payload);
            setAllProgress((prev) => [...prev, response.data]);
            notify.success("Batch progress added successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to add progress. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, user, closeModals]);

    const handleEditProgress = useCallback(async () => {
        if (!formData.title.trim() || !formData.description.trim()) {
            notify.error("Title and description are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = new FormData();
            payload.append("title", formData.title.trim());
            payload.append("description", formData.description.trim());

            if (formData.file) {
                payload.append("file", formData.file);
            }

            const response = await api.updateBatchProgress(
                currentProgress.id,
                payload
            );
            setAllProgress((prev) =>
                prev.map((p) => (p.id === currentProgress.id ? response.data : p))
            );
            notify.success("Progress updated successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to update progress. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, currentProgress, closeModals]);

    const handleDeleteProgress = useCallback(async () => {
        setIsDeleting(true);
        try {
            await api.deleteBatchProgress(currentProgress.id);
            setAllProgress((prev) =>
                prev.filter((p) => p.id !== currentProgress.id)
            );
            notify.success("Progress deleted successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to delete progress. Please try again.");
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    }, [currentProgress, closeModals]);

    // ─── Helper: get batch name ────────────────────────────────
    const getBatchName = useCallback(
        (batchId) => {
            const batch = batches.find((b) => b.id === batchId);
            return batch ? `${batch.name} — ${batch.course}` : "Unknown Batch";
        },
        [batches]
    );

    // ─── Loading / Error ──────────────────────────────────────
    if (loading && activeView !== "dashboard") {
        return (
            <DashboardLayout
                user={{ ...user, role: "Trainer" }}
                navItems={TRAINER_NAV_ITEMS}
                activeView={activeView}
                onViewChange={setActiveView}
            >
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">Loading data...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout
                user={{ ...user, role: "Trainer" }}
                navItems={TRAINER_NAV_ITEMS}
                activeView={activeView}
                onViewChange={setActiveView}
            >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-md mx-auto">
                    <div className="w-16 h-16 mx-auto mb-4 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 text-2xl">
                        !
                    </div>
                    <p className="text-rose-600 font-medium">{error}</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            user={{ ...user, role: "Trainer" }}
            navItems={TRAINER_NAV_ITEMS}
            activeView={activeView}
            onViewChange={setActiveView}
        >
            {/* ─── Dashboard View ─────────────────────────── */}
            {activeView === "dashboard" && (
                <div className="animate-fade-in-up">
                    {/* Welcome Banner */}
                    <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 px-8 py-7">
                        <div className="absolute top-0 right-0 w-52 h-52 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-1/3 w-36 h-36 bg-white/5 rounded-full translate-y-1/2" />

                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border border-white/20">
                                    {(user.name || "T").charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-emerald-100 text-xs font-medium mb-0.5">
                                        Welcome back 👋
                                    </p>
                                    <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                                        {user.name || "Trainer"}
                                    </h1>
                                    <p className="text-emerald-100/80 text-xs mt-1">
                                        Here's your training overview for today.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-gray-800">Overview</h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Your batch &amp; progress statistics
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

                    {/* Recent Progress */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                                    <FaClipboardList className="text-lg" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Recent Progress
                                </h2>
                            </div>
                            {trainerBatches.length > 0 && (
                                <button
                                    onClick={openAddModal}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition-shadow"
                                >
                                    <FaPlus className="text-xs" /> Add Progress
                                </button>
                            )}
                        </div>

                        {/* Progress Cards */}
                        {trainerProgress.length > 0 ? (
                            <div className="space-y-4">
                                {trainerProgress.slice(0, 5).map((progress, idx) => (
                                    <div
                                        key={progress.id}
                                        className="flex items-start gap-4 p-4 bg-gray-50/60 rounded-xl border border-gray-100 hover:shadow-sm transition animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 60}ms` }}
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
                                            {progress.title?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="text-sm font-semibold text-gray-800">
                                                    {progress.title}
                                                </h4>
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-medium">
                                                    {getBatchName(progress.batchId)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {progress.description}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(progress.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        { month: "short", day: "numeric", year: "numeric" }
                                                    )}
                                                </span>
                                                {progress.documentName && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                                        <FaFileAlt className="text-[8px]" />
                                                        {progress.documentName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => openViewModal(progress)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="View"
                                            >
                                                <FaEye className="text-sm" />
                                            </button>
                                            <button
                                                onClick={() => openEditModal(progress)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <FaEdit className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">
                                    No progress entries yet
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {trainerBatches.length > 0
                                        ? "Add your first batch progress entry to get started"
                                        : "You need to be assigned to a batch first"}
                                </p>
                            </div>
                        )}

                        {trainerProgress.length > 5 && (
                            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                                <button
                                    onClick={() => setActiveView("batchProgress")}
                                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    View all progress entries →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── My Batches View ──────────────────────────── */}
            {activeView === "myBatches" && (
                <div className="animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                                    <FaLayerGroup className="text-lg" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    My Batches
                                </h2>
                                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
                                    {trainerBatches.length}
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <SkeletonRow key={i} cols={6} />
                                        ))
                                    ) : trainerBatches.length > 0 ? (
                                        trainerBatches.map((batch, idx) => (
                                            <tr
                                                key={batch.id}
                                                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                                                style={{ animationDelay: `${idx * 50}ms` }}
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                            {batch.name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <span>{batch.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                                                        {batch.course}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                    {batch.startDate}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                    {batch.endDate}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${STATUS_BADGES[batch.status] ||
                                                            STATUS_BADGES.completed
                                                            }`}
                                                    >
                                                        {batch.status
                                                            ? batch.status.charAt(0).toUpperCase() +
                                                            batch.status.slice(1)
                                                            : "—"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                                                        {batch.studentCount || 0}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-12">
                                                <FaChalkboardTeacher className="text-4xl text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 font-medium">
                                                    No batches assigned
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    You'll see your batches here once an admin assigns you
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
                                        {trainerBatches.length}
                                    </span>{" "}
                                    batches assigned to you
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── Batch Progress View ──────────────────────── */}
            {activeView === "batchProgress" && (
                <div className="animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                                    <FaClipboardList className="text-lg" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Batch Progress
                                </h2>
                                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium">
                                    {trainerProgress.length}
                                </span>
                            </div>
                            {trainerBatches.length > 0 && (
                                <button
                                    onClick={openAddModal}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition-shadow"
                                >
                                    <FaPlus className="text-xs" /> Add Progress
                                </button>
                            )}
                        </div>

                        {/* Progress Table */}
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50/80">
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Batch
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Document
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        Array.from({ length: 3 }).map((_, i) => (
                                            <SkeletonRow key={i} cols={6} />
                                        ))
                                    ) : trainerProgress.length > 0 ? (
                                        trainerProgress.map((progress, idx) => (
                                            <tr
                                                key={progress.id}
                                                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in"
                                                style={{ animationDelay: `${idx * 50}ms` }}
                                            >
                                                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                            {progress.title?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <span className="max-w-[180px] truncate">
                                                            {progress.title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                                                        {getBatchName(progress.batchId).split(" — ")[0]}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 max-w-[200px]">
                                                    <p className="truncate text-xs">
                                                        {progress.description}
                                                    </p>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {progress.documentName ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium">
                                                            <FaFileAlt className="text-[10px]" />
                                                            <span className="max-w-[100px] truncate">
                                                                {progress.documentName}
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">—</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                                                    {new Date(progress.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        { month: "short", day: "numeric" }
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => openViewModal(progress)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                            title="View"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                        <button
                                                            onClick={() => openEditModal(progress)}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                                            title="Edit"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => openDeleteModal(progress)}
                                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                            title="Delete"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-12">
                                                <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500 font-medium">
                                                    No progress entries yet
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    {trainerBatches.length > 0
                                                        ? "Add your first batch progress entry"
                                                        : "You need to be assigned to a batch first"}
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
                                        {trainerProgress.length}
                                    </span>{" "}
                                    progress entries
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── Modals ────────────────────────────────────── */}

            {/* Add Progress Modal */}
            {showAddModal && (
                <BatchProgressModal
                    title="Add Batch Progress"
                    formData={formData}
                    onChange={handleInputChange}
                    onFileChange={handleFileChange}
                    onSubmit={handleAddProgress}
                    onClose={closeModals}
                    submitText="Add Progress"
                    batches={trainerBatches}
                    isLoading={isSubmitting}
                />
            )}

            {/* Edit Progress Modal */}
            {showEditModal && (
                <BatchProgressModal
                    title="Edit Batch Progress"
                    formData={formData}
                    onChange={handleInputChange}
                    onFileChange={handleFileChange}
                    onSubmit={handleEditProgress}
                    onClose={closeModals}
                    submitText="Update Progress"
                    batches={trainerBatches}
                    isEdit={true}
                    isLoading={isSubmitting}
                />
            )}

            {/* View Progress Modal */}
            {showViewModal && currentProgress && (
                <ViewProgressModal
                    progress={currentProgress}
                    batchName={getBatchName(currentProgress.batchId)}
                    onClose={closeModals}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete progress "${currentProgress?.title}"?`}
                confirmText="Yes, Delete"
                loadingText="Deleting..."
                isLoading={isDeleting}
                confirmClassName="bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200"
                onConfirm={handleDeleteProgress}
                onCancel={closeModals}
            />
        </DashboardLayout>
    );
};

export default TrainerDashboard;
