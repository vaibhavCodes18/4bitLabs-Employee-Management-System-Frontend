import {
    FaTachometerAlt,
    FaUsers,
    FaChalkboardTeacher,
    FaChartLine,
    FaUserFriends,
    FaLayerGroup,
    FaChartBar,
    FaUserGraduate,
    FaClipboardList
} from "react-icons/fa";

// ─── Default Admin Display Info (fallback only) ──────────────
// Auth credentials are now in db.json, NOT here.
export const ADMIN_USER = {
    fullName: "Vaibhav Sathe",
    username: "admin123",
    email: "admin@info.com",
    role: "admin",
};

// ─── Toast Configuration ─────────────────────────────────────
export const TOAST_STYLE = {
    style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
    },
    iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
    },
};

// ─── Role Metadata ───────────────────────────────────────────
export const ROLE_CONFIG = {
    Trainer: {
        icon: FaChalkboardTeacher,
        color: "text-green-600",
        bgColor: "bg-green-500",
        headerBg: "bg-green-50 border-b-2 border-green-200",
    },
    Analyst: {
        icon: FaChartLine,
        color: "text-purple-600",
        bgColor: "bg-purple-500",
        headerBg: "bg-purple-50 border-b-2 border-purple-200",
    },
    Counsellor: {
        icon: FaUserFriends,
        color: "text-yellow-600",
        bgColor: "bg-yellow-500",
        headerBg: "bg-yellow-50 border-b-2 border-yellow-200",
    },
};

// ─── Admin Sidebar Navigation ────────────────────────────────
export const ADMIN_NAV_ITEMS = [
    { key: "dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { key: "employees", icon: FaUsers, label: "Employees" },
    { key: "trainers", icon: FaChalkboardTeacher, label: "Trainers" },
    { key: "analysts", icon: FaChartLine, label: "Analysts" },
    { key: "counsellors", icon: FaUserFriends, label: "Counsellors" },
];

// ─── Analyst Sidebar Navigation ──────────────────────────────
export const ANALYST_NAV_ITEMS = [
    { key: "dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { key: "batches", icon: FaLayerGroup, label: "Batches" },
    { key: "reports", icon: FaChartBar, label: "Reports" },
];

// ─── Trainer Sidebar Navigation ──────────────────────────────
export const TRAINER_NAV_ITEMS = [
    { key: "dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { key: "myBatches", icon: FaLayerGroup, label: "My Batches" },
    { key: "batchProgress", icon: FaClipboardList, label: "Batch Progress" },
];

// ─── Counsellor Sidebar Navigation ───────────────────────────────
export const COUNSELLOR_NAV_ITEMS = [
    { key: "dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { key: "students", icon: FaUserGraduate, label: "Students" },
    { key: "batches", icon: FaLayerGroup, label: "Batches" },
];