import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  FaMicrochip,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaTimes,
  FaBars,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaBuilding,
  FaMoneyBillWave,
  FaStar,
  FaGraduationCap,
  FaBriefcase,
  FaUserShield,
  FaCircle,
  FaChevronLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as api from "../services/api";
import SidebarItem from "./SidebarItem";
import ConfirmModal from "./ConfirmModal";

const ROLE_COLORS = {
  admin: {
    gradient: "from-indigo-600 to-indigo-700",
    bg: "bg-indigo-600",
    light: "bg-indigo-50",
    text: "text-indigo-600",
    ring: "ring-indigo-300",
    border: "border-indigo-200",
  },
  analyst: {
    gradient: "from-purple-600 to-purple-700",
    bg: "bg-purple-600",
    light: "bg-purple-50",
    text: "text-purple-600",
    ring: "ring-purple-300",
    border: "border-purple-200",
  },
  counsellor: {
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-600",
    light: "bg-amber-50",
    text: "text-amber-600",
    ring: "ring-amber-300",
    border: "border-amber-200",
  },
  trainer: {
    gradient: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-600",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-300",
    border: "border-emerald-200",
  },
};

const ProfileDetailRow = ({ icon: Icon, label, value, colorClass }) => {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start space-x-3 py-2.5">
      <div className={`mt-0.5 p-1.5 rounded-lg bg-gray-50 ${colorClass}`}>
        <Icon className="text-xs" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-700 truncate mt-0.5">
          {String(value)}
        </p>
      </div>
    </div>
  );
};

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
  const [showProfile, setShowProfile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const displayName = user.fullName || user.name || "User";
  const displayRole = user.role || "Employee";
  const roleKey = displayRole.toLowerCase();
  const colors = ROLE_COLORS[roleKey] || ROLE_COLORS.admin;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfile]);

  const handleNavClick = useCallback(
    (view) => {
      onViewChange(view);
      if (window.innerWidth < 768) setSidebarOpen(false);
    },
    [onViewChange],
  );

  const confirmLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      if (typeof api !== 'undefined' && api.logout) {
        await api.logout();
      }
    } catch {
      // ignore logout errors — still clear session
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setShowLogoutModal(false);
      setIsLoggingOut(false);
    }
  }, [navigate]);

  const toggleProfile = useCallback(() => setShowProfile((prev) => !prev), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-sans flex">
      {/* Desktop Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-72" : "w-20"} bg-white transition-all duration-300 hidden md:flex md:flex-col relative border-r border-gray-100 shadow-sm`}
      >
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-2.5 rounded-xl shadow-md shadow-indigo-200">
              <FaMicrochip className="text-white text-lg" />
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-lg font-bold text-gray-900 tracking-tight">
                  4bitLabs
                </span>
                <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-0.5">
                  Dashboard
                </p>
              </div>
            )}
          </div>
        </div>

        {/* {sidebarOpen && (
          <div className="mx-4 mt-5 mb-3 p-3.5 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-400">{displayRole}</p>
              </div>
            </div>
          </div>
        )} */}

        {sidebarOpen && (
          <p className="px-6 pt-5 pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
            Navigation
          </p>
        )}

        <nav className="mt-1 flex-1 px-3 space-y-1">
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

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center space-x-2.5 w-full px-3.5 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all duration-200"
          >
            <FaSignOutAlt className="text-base" />
            {sidebarOpen && (
              <span className="text-sm font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl p-5 animate-fade-in-up">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-2.5 rounded-xl shadow-md shadow-indigo-200">
                  <FaMicrochip className="text-white text-lg" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    4bitLabs
                  </span>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-0.5">
                    Dashboard
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="mb-4 p-3.5 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                >
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-400">{displayRole}</p>
                </div>
              </div>
            </div>

            <p className="px-2 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">
              Navigation
            </p>
            <nav>
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

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-2.5 w-full px-3.5 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition"
              >
                <FaSignOutAlt className="text-base" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/90 backdrop-blur-lg border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition"
            >
              <FaBars size={18} />
            </button>
            <div className="hidden md:block">
              <h2 className="text-lg font-bold text-gray-800 capitalize">
                {activeView}
              </h2>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {showSearch && (
              <div className="relative hidden sm:block">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 py-2 px-3 pl-10 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 focus:bg-white transition"
                />
              </div>
            )}
            <button className="relative text-gray-400 hover:text-indigo-600 p-2.5 rounded-xl hover:bg-indigo-50 transition">
              <FaBell className="text-lg" />
              <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                3
              </span>
            </button>

            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className={`flex items-center space-x-3 cursor-pointer transition px-2 py-1.5 rounded-xl hover:bg-gray-50 ${showProfile ? "bg-gray-50" : ""}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                >
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {displayName}
                  </p>
                  <p className="text-[11px] text-gray-400">{displayRole}</p>
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[60] overflow-hidden animate-slide-in-right">
                  <div
                    className={`bg-gradient-to-br ${colors.gradient} px-5 pt-5 pb-6 relative`}
                  >
                    <button
                      onClick={() => setShowProfile(false)}
                      className="absolute top-3 right-3 text-white/60 hover:text-white transition"
                    >
                      <FaTimes size={14} />
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl border-2 border-white/30 shadow-lg">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base leading-tight">
                          {displayName}
                        </h3>
                        <span className="inline-block mt-1 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-lg text-white text-[11px] font-medium">
                          {displayRole}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 max-h-72 overflow-y-auto space-y-0.5">
                    <ProfileDetailRow
                      icon={FaEnvelope}
                      label="Email"
                      value={user.email}
                      colorClass={colors.text}
                    />
                    {user.phone && (
                      <ProfileDetailRow
                        icon={FaPhone}
                        label="Phone"
                        value={user.phone}
                        colorClass={colors.text}
                      />
                    )}
                    {user.department && (
                      <ProfileDetailRow
                        icon={FaBuilding}
                        label="Department"
                        value={user.department}
                        colorClass={colors.text}
                      />
                    )}
                    {user.specialization && (
                      <ProfileDetailRow
                        icon={FaGraduationCap}
                        label="Specialization"
                        value={user.specialization}
                        colorClass={colors.text}
                      />
                    )}
                    {user.qualification && (
                      <ProfileDetailRow
                        icon={FaGraduationCap}
                        label="Qualification"
                        value={user.qualification}
                        colorClass={colors.text}
                      />
                    )}
                    {user.experienceYears !== undefined &&
                      user.experienceYears !== null && (
                        <ProfileDetailRow
                          icon={FaBriefcase}
                          label="Experience"
                          value={`${user.experienceYears} year${user.experienceYears !== 1 ? "s" : ""}`}
                          colorClass={colors.text}
                        />
                      )}
                    {user.status && (
                      <div className="flex items-start space-x-3 py-2.5">
                        <div
                          className={`mt-0.5 p-1.5 rounded-lg bg-gray-50 ${colors.text}`}
                        >
                          <FaCircle
                            className="text-xs"
                            style={{
                              color:
                                user.status === "Active" ||
                                  user.status === "active"
                                  ? "#10b981"
                                  : "#9ca3af",
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                            Status
                          </p>
                          <p className="text-sm font-medium text-gray-700 mt-0.5">
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    )}
                    {user.joiningDate && (
                      <ProfileDetailRow
                        icon={FaCalendarAlt}
                        label="Joining Date"
                        value={user.joiningDate}
                        colorClass={colors.text}
                      />
                    )}
                    {user.salary !== undefined && user.salary !== null && (
                      <ProfileDetailRow
                        icon={FaMoneyBillWave}
                        label="Salary"
                        value={`$${Number(user.salary).toLocaleString()}`}
                        colorClass={colors.text}
                      />
                    )}

                  </div>

                  <div
                    className={`px-6 py-3.5 ${colors.light} border-t ${colors.border}`}
                  >
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        setShowLogoutModal(true);
                      }}
                      className={`w-full flex items-center justify-center space-x-2 py-2 rounded-xl ${colors.text} hover:bg-white/60 transition text-sm font-medium`}
                    >
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-6 sm:p-8">{children}</div>
      </main>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        loadingText="Logging out..."
        isLoading={isLoggingOut}
        confirmClassName="bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-200"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

export default DashboardLayout;
