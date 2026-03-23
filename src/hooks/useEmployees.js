import { useState, useEffect, useCallback, useMemo } from "react";
import * as api from "../services/api";
import { notify } from "../utils/notify";
import { ROLE_CONFIG } from "../constants";

/**
 * Custom hook that manages all employee CRUD operations.
 * Extracts ~300 lines of business logic from AdminDashboard.
 */
const useEmployees = () => {
    // ─── Data State ──────────────────────────────────────────
    const [trainers, setTrainers] = useState([]);
    const [analysts, setAnalysts] = useState([]);
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ─── Modal State ─────────────────────────────────────────
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add");
    const [modalRole, setModalRole] = useState("Trainer");
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});

    // ─── Delete Modal State ──────────────────────────────────
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteRole, setDeleteRole] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // ─── View Modal State ────────────────────────────────────
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewEmployee, setViewEmployee] = useState(null);
    const [viewRole, setViewRole] = useState(null);

    // ─── API mapping per role ────────────────────────────────
    const roleApi = useMemo(
        () => ({
            Trainer: {
                add: api.addTrainer,
                update: api.updateTrainer,
                delete: api.deleteTrainer,
                setState: setTrainers,
            },
            Analyst: {
                add: api.addAnalyst,
                update: api.updateAnalyst,
                delete: api.deleteAnalyst,
                setState: setAnalysts,
            },
            Counsellor: {
                add: api.addCounsellor,
                update: api.updateCounsellor,
                delete: api.deleteCounsellor,
                setState: setCounsellors,
            },
        }),
        [],
    );

    // ─── Fetch on mount ──────────────────────────────────────
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [trainersRes, analystsRes, counsellorsRes] = await Promise.all([
                    api.getTrainers(),
                    api.getAnalysts(),
                    api.getCounsellors(),
                ]);
                
                // Safely extract arrays, defaulting to [] if null/undefined or not an array
                const getArray = (res) => Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.data) ? res.data.data : []);

                setTrainers(getArray(trainersRes));
                setAnalysts(getArray(analystsRes));
                setCounsellors(getArray(counsellorsRes));
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

    // ─── Derived Data ────────────────────────────────────────
    const allEmployees = useMemo(
        () => [
            ...(trainers || []).map((t) => ({
                ...t,
                role: "Trainer",
                roleIcon: ROLE_CONFIG.Trainer.icon,
                roleColor: ROLE_CONFIG.Trainer.color,
            })),
            ...(analysts || []).map((a) => ({
                ...a,
                role: "Analyst",
                roleIcon: ROLE_CONFIG.Analyst.icon,
                roleColor: ROLE_CONFIG.Analyst.color,
            })),
            ...(counsellors || []).map((c) => ({
                ...c,
                role: "Counsellor",
                roleIcon: ROLE_CONFIG.Counsellor.icon,
                roleColor: ROLE_CONFIG.Counsellor.color,
            })),
        ],
        [trainers, analysts, counsellors],
    );

    // ─── Form Helpers ────────────────────────────────────────
    const buildPayload = useCallback((role, data) => {
        // Extract the admin's ID from localStorage for mapping new employees
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const adminId = currentUser.id || null;

        const base = {
            name: data.name,
            email: data.email || "",
            password: data.password || "",
            phone: data.phone || "",
            status: data.status || "Active",
            joiningDate: data.joiningDate || "",
            salary: parseFloat(data.salary) || 0,
            adminId: adminId,
        };

        if (role === "Trainer") {
            return {
                ...base,
                role: "trainer",
                specialization: data.specialization || "",
                experienceYears: parseFloat(data.experienceYears) || 0,
                qualification: data.qualification || "",
            };
        }
        if (role === "Analyst") {
            return { ...base, role: "analyst", department: data.department || "" };
        }
        if (role === "Counsellor") {
            return { ...base, role: "counsellor", department: data.department || "" };
        }
        return base;
    }, []);

    // ─── Modal Handlers ──────────────────────────────────────
    const openAddModal = useCallback((role) => {
        setModalMode("add");
        setModalRole(role);
        setEditingId(null);
        setFormData({});
        setIsModalOpen(true);
    }, []);

    const openEditModal = useCallback((role, employee) => {
        setModalMode("edit");
        setModalRole(role);
        setEditingId(employee.id);
        setFormData(employee);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setFormData({});
        setEditingId(null);
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    // ─── Submit (Add / Edit) ─────────────────────────────────
    const handleSubmit = useCallback(async () => {
        if (!formData.name) return;

        const { add, update, setState } = roleApi[modalRole];
        const payload = buildPayload(modalRole, formData);

        try {
            if (modalMode === "add") {
                const response = await add(payload);
                const newData = response?.data?.data || response?.data || response;
                
                setState((prev) => [...(prev || []), newData]);
            } else {
                const response = await update(editingId, payload);
                const updatedData = response?.data?.data || response?.data || response;
                
                setState((prev) =>
                    (prev || []).map((item) => (item.id === editingId ? updatedData : item)),
                );
            }
            notify.success(
                `${modalRole} ${modalMode === "add" ? "added" : "updated"} successfully!`,
            );
            closeModal();
        } catch (err) {
            notify.error(
                `Failed to ${modalMode} ${modalRole.toLowerCase()}. Please try again.`,
            );
            console.error(err);
        }
    }, [formData, modalMode, modalRole, editingId, roleApi, buildPayload, closeModal]);

    // ─── Delete ──────────────────────────────────────────────
    const openDeleteModal = useCallback((role, id) => {
        setDeleteRole(role);
        setDeleteId(id);
        setShowDeleteModal(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setShowDeleteModal(false);
        setDeleteRole(null);
        setDeleteId(null);
    }, []);

    const confirmDelete = useCallback(async () => {
        if (!deleteRole || !deleteId) return;

        const { delete: deleteApi, setState } = roleApi[deleteRole];

        try {
            await deleteApi(deleteId);
            setState((prev) => prev.filter((item) => item.id !== deleteId));
            notify.success(`${deleteRole} deleted successfully!`);
        } catch (err) {
            notify.error("Failed to delete employee. Please try again.");
            console.error(err);
        } finally {
            cancelDelete();
        }
    }, [deleteRole, deleteId, roleApi, cancelDelete]);

    // ─── View Modal ──────────────────────────────────────────
    const openViewModal = useCallback((role, employee) => {
        setViewRole(role);
        setViewEmployee(employee);
        setShowViewModal(true);
    }, []);

    const closeViewModal = useCallback(() => {
        setShowViewModal(false);
        setViewEmployee(null);
        setViewRole(null);
    }, []);

    return {
        // Data
        trainers,
        analysts,
        counsellors,
        allEmployees,
        loading,
        error,

        // Add/Edit modal
        isModalOpen,
        modalMode,
        modalRole,
        formData,
        openAddModal,
        openEditModal,
        closeModal,
        handleInputChange,
        handleSubmit,

        // Delete modal
        showDeleteModal,
        deleteRole,
        openDeleteModal,
        cancelDelete,
        confirmDelete,

        // View modal
        showViewModal,
        viewEmployee,
        viewRole,
        openViewModal,
        closeViewModal,
    };
};

export default useEmployees;
