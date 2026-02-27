import React, { useState } from "react";
import {
  FaMicrochip,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaArrowRight,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notify";
import { loginByRole } from "../services/api";

// Role → dashboard route mapping
const ROLE_ROUTES = {
  admin: "/admin-dashboard",
  analyst: "/analyst-dashboard",
  // trainer: "/trainer-dashboard",
  counsellor: "/counsellor-dashboard",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, role } = formData;

    if (!role) {
      notify.error("Please select a valid role.");
      setLoading(false);
      return;
    }

    try {
      // Authenticate via json-server for ALL roles
      const user = await loginByRole(role, email, password);

      if (user) {
        // Store session info (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem(
          "user",
          JSON.stringify({ role, ...userWithoutPassword }),
        );

        const displayName = user.fullName || user.name || "User";
        notify.success(`Welcome, ${displayName}!`);

        // Navigate to role-specific dashboard
        const route = ROLE_ROUTES[role];
        if (route) {
          navigate(route);
        } else {
          notify.error(`Dashboard for "${role}" is not available yet.`);
        }
      } else {
        notify.error("Invalid email or password for the selected role.");
      }
    } catch (error) {
      console.error("Login error:", error);
      notify.error("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 font-sans flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Column - Branding (unchanged) */}
        <div className="md:w-1/2 bg-indigo-600 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-white p-2 rounded-lg">
                <FaMicrochip className="text-indigo-600 text-2xl" />
              </div>
              <span className="text-2xl font-bold">4bitlabs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Welcome Back to <br />
              4bitLabs EMS
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Log in with your credentials and role to access your personalized
              dashboard.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaCheckCircle className="text-indigo-200" />
                <span>Secure role‑based access</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaCheckCircle className="text-indigo-200" />
                <span>Real‑time updates & notifications</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaCheckCircle className="text-indigo-200" />
                <span>Seamless team collaboration</span>
              </li>
            </ul>
          </div>
          <div className="mt-8 text-indigo-200 text-sm">
            © 2025 4bitlabs. All rights reserved.
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Sign In</h3>
            <p className="text-gray-500 mt-1">
              Enter your details to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              />
            </div>

            {/* Role Selector */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserTag className="text-gray-400" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent appearance-none bg-white"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="admin">Admin</option>
                <option value="trainer">Trainer</option>
                <option value="analyst">Analyst</option>
                <option value="counsellor">Counsellor</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-700 font-medium bg-transparent border-none cursor-pointer p-0"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
