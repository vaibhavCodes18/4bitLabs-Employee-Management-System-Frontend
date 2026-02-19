import React, { useState } from 'react';
import {
  FaMicrochip,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Sign up data:', formData);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 font-sans flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Column - Branding */}
        <div className="md:w-1/2 bg-indigo-600 p-8 md:p-12 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-white p-2 rounded-lg">
                <FaMicrochip className="text-indigo-600 text-2xl" />
              </div>
              <span className="text-2xl font-bold">4bitlabs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Join the <br />4bitlabs Family
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Create your account to access the Employee Management System and start collaborating with your team.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaCheckCircle className="text-indigo-200" />
                <span>Role‑based access control</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaCheckCircle className="text-indigo-200" />
                <span>Real‑time analytics & reports</span>
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

        {/* Right Column - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
            <p className="text-gray-500 mt-1">Fill in your details to get started</p>
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

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
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
                <option value="" disabled>Select your role</option>
                <option value="admin">Admin</option>
                <option value="trainer">Trainer</option>
                <option value="analyst">Analyst</option>
                <option value="counsellor">Counsellor</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Sign Up</span>
              <FaArrowRight />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;