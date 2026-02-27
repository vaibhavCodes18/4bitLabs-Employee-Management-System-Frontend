import React, { useState, useCallback } from "react";
import {
    FaMicrochip,
    FaSignOutAlt,
    FaBell,
    FaSearch,
    FaTimes,
    FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import ConfirmModal from "./ConfirmModal";

/**
 * Shared dashboard layout with sidebar, header, and mobile drawer.
 * Used by both AdminDashboard and AnalystDashboard to eliminate ~200 lines of duplication.
 *
 * @param {Object}   user        - { fullName/name, email, role }
 * @param {Array}    navItems    - [{ key, icon, label }]
 * @param {string}   activeView  - current view key
 * @param {Function} onViewChange - called with the new view key
 * @param {boolean}  showSearch  - whether to show the search bar in header
 * @param {React.ReactNode} children - main content
 */
const DashboardLayout = ({
    user,
    navItems,
    activeView,
    onViewChange,
    showSearch = false,
    children,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const displayName = user.fullName || user.name || "User";
    const displayRole = user.role || "Employee";

    const handleNavClick = useCallback(
        (view) => {
            onViewChange(view);
            if (window.innerWidth < 768) setSidebarOpen(false);
        },
        [onViewChange],
    );

    const confirmLogout = useCallback(() => {
        navigate("/login");
        setShowLogoutModal(false);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex">
            {/* ─── Desktop Sidebar ──────────────────────────── */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 hidden md:flex md:flex-col relative`}
            >
                {/* Logo */}
                <div className="p-4 flex items-center space-x-2 border-b">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <FaMicrochip className="text-white text-xl" />
                    </div>
                    {sidebarOpen && (
                        <span className="text-xl font-bold text-gray-800">4bitlabs</span>
                    )}
                </div>

                {/* Logout */}
                <div className="p-4">
                    <button
                        type="button"
                        onClick={() => setShowLogoutModal(true)}
                        className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                    >
                        <FaSignOutAlt className="text-lg" />
                        {sidebarOpen && (
                            <span className="text-sm font-medium">Logout</span>
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-2 flex-1">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            active={activeView === item.key}
                            open={sidebarOpen}
                            onClick={() => handleNavClick(item.key)}
                        />
                    ))}
                </nav>
            </aside>

            {/* ─── Mobile Drawer ────────────────────────────── */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="bg-indigo-600 p-2 rounded-lg">
                                    <FaMicrochip className="text-white text-xl" />
                                </div>
                                <span className="text-xl font-bold text-gray-800">
                                    4bitlabs
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(false)}
                                className="text-gray-600"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition mb-4"
                        >
                            <FaSignOutAlt className="text-lg" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                        <nav className="mt-2">
                            {navItems.map((item) => (
                                <SidebarItem
                                    key={item.key}
                                    icon={item.icon}
                                    label={item.label}
                                    active={activeView === item.key}
                                    open={true}
                                    onClick={() => handleNavClick(item.key)}
                                />
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* ─── Main Content Area ────────────────────────── */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-600 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <FaBars size={24} />
                    </button>
                    <div className="flex items-center space-x-4">
                        {showSearch && (
                            <div className="relative hidden sm:block">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        )}
                        <button
                            type="button"
                            className="relative text-gray-600 hover:text-indigo-600"
                        >
                            <FaBell className="text-xl" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                3
                            </span>
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                {displayName.charAt(0)}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-gray-800">
                                    {displayName}
                                </p>
                                <p className="text-xs text-gray-500">{displayRole}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-4 sm:p-6">{children}</div>
            </main>

            {/* ─── Logout Confirmation Modal ────────────────── */}
            <ConfirmModal
                isOpen={showLogoutModal}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                confirmText="Yes, Logout"
                onConfirm={confirmLogout}
                onCancel={() => setShowLogoutModal(false)}
            />
        </div>
    );
};

export default DashboardLayout;
