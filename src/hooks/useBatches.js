import { useState, useEffect, useCallback } from "react";
import * as batchApi from "../services/api";
import { notify } from "../utils/notify";

const INITIAL_FORM = {
    name: "",
    course: "",
    trainerName: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
    studentsCount: 0,
};

/**
 * Custom hook that manages all batch CRUD operations.
 * Extracts business logic from AnalystDashboard.
 */
const useBatches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentBatch, setCurrentBatch] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM);

    // Fetch on mount
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

    // Handlers
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const closeModals = useCallback(() => {
        setShowAddModal(false);
        setShowEditModal(false);
        setShowViewModal(false);
        setShowDeleteModal(false);
        setCurrentBatch(null);
        setFormData(INITIAL_FORM);
    }, []);

    const openAddModal = useCallback(() => {
        setFormData(INITIAL_FORM);
        setShowAddModal(true);
    }, []);

    const openEditModal = useCallback((batch) => {
        setCurrentBatch(batch);
        setFormData(batch);
        setShowEditModal(true);
    }, []);

    const openViewModal = useCallback((batch) => {
        setCurrentBatch(batch);
        setShowViewModal(true);
    }, []);

    const openDeleteModal = useCallback((batch) => {
        setCurrentBatch(batch);
        setShowDeleteModal(true);
    }, []);

    const handleAddBatch = useCallback(async () => {
        try {
            const response = await batchApi.addBatch({
                ...formData,
                studentsCount: parseInt(formData.studentsCount) || 0,
            });
            setBatches((prev) => [...prev, response.data]);
            notify.success("Batch added successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to add batch. Please try again.");
            console.error(err);
        }
    }, [formData, closeModals]);

    const handleEditBatch = useCallback(async () => {
        try {
            const response = await batchApi.updateBatch(currentBatch.id, {
                ...formData,
                studentsCount: parseInt(formData.studentsCount) || 0,
            });
            setBatches((prev) =>
                prev.map((b) => (b.id === currentBatch.id ? response.data : b)),
            );
            notify.success("Batch updated successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to update batch. Please try again.");
            console.error(err);
        }
    }, [formData, currentBatch, closeModals]);

    const handleDeleteBatch = useCallback(async () => {
        try {
            await batchApi.deleteBatch(currentBatch.id);
            setBatches((prev) => prev.filter((b) => b.id !== currentBatch.id));
            notify.success("Batch deleted successfully!");
            closeModals();
        } catch (err) {
            notify.error("Failed to delete batch. Please try again.");
            console.error(err);
        }
    }, [currentBatch, closeModals]);

    // Derived stats
    const stats = {
        total: batches.length,
        active: batches.filter((b) => b.status === "active").length,
        upcoming: batches.filter((b) => b.status === "upcoming").length,
        completed: batches.filter((b) => b.status === "completed").length,
    };

    return {
        batches,
        loading,
        error,
        stats,

        // Modals
        showAddModal,
        showEditModal,
        showViewModal,
        showDeleteModal,
        currentBatch,
        formData,
        handleInputChange,
        closeModals,
        openAddModal,
        openEditModal,
        openViewModal,
        openDeleteModal,
        handleAddBatch,
        handleEditBatch,
        handleDeleteBatch,
    };
};

export default useBatches;
