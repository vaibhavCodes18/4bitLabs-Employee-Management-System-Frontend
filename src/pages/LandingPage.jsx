import React from "react";
import {
  FaMicrochip,
  FaUserShield,
  FaChalkboardTeacher,
  FaChartLine,
  FaUserFriends,
} from "react-icons/fa";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 font-sans">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaMicrochip className="text-indigo-600 text-3xl" />
          <span className="text-2xl font-bold text-gray-800">4bitlabs</span>
        </div>
        <nav className="space-x-4 text-gray-600 font-medium">
          <a href="#home" className="hover:text-indigo-600">
            Home
          </a>
          <a href="#roles" className="hover:text-indigo-600">
            Roles
          </a>
          <a href="#contact" className="hover:text-indigo-600">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Employee Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Streamline your institute operations with our tailored platform for
          4bitlabs. Assign roles, track performance, and empower your team.
        </p>
      </section>

      {/* Roles Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          Our Roles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Admin */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl mb-4 mx-auto">
              <FaUserShield />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Admin
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Full system control, user management, and configuration.
            </p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700 transition">
              Access
            </button>
          </div>

          {/* Trainer */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mb-4 mx-auto">
              <FaChalkboardTeacher />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Trainer
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Manage courses, batches, and trainee progress.
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition">
              Access
            </button>
          </div>

          {/* Analyst */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-3xl mb-4 mx-auto">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Analyst
            </h3>
            <p className="text-gray-600 text-center mt-2">
              View reports, analytics, and performance metrics.
            </p>
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg w-full hover:bg-yellow-700 transition">
              Access
            </button>
          </div>

          {/* Counsellor */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-3xl mb-4 mx-auto">
              <FaUserFriends />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Counsellor
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Student guidance, enrollment, and support.
            </p>
            <button className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg w-full hover:bg-pink-700 transition">
              Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>
            &copy; 2025 4bitlabs. All rights reserved. Empowering software
            training.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
