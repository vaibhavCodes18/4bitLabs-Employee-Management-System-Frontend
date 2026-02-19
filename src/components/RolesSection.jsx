import React from "react";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaChartLine,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RolesSection = () => {
  return (
    <section id="roles" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
          Key Roles
        </h2>
        <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
          Each role is designed to maximize efficiency and collaboration within
          4bitlabs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Admin Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-indigo-500">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl mb-4 mx-auto">
              <FaUserShield />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Admin
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Full system oversight and configuration.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ User & role management</li>
              <li>✓ System settings & security</li>
              <li>✓ Audit logs & reports</li>
            </ul>
            
          </div>

          {/* Trainer Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-green-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mb-4 mx-auto">
              <FaChalkboardTeacher />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Trainer
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Course delivery and trainee progress.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ Batch management</li>
              <li>✓ Lesson plans & materials</li>
              <li>✓ Performance tracking</li>
            </ul>
            
          </div>

          {/* Analyst Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-yellow-500">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-3xl mb-4 mx-auto">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Analyst
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Data insights and business intelligence.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ Custom reports & dashboards</li>
              <li>✓ Student success metrics</li>
              <li>✓ Trend analysis</li>
            </ul>
            
          </div>

          {/* Counsellor Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-pink-500">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-3xl mb-4 mx-auto">
              <FaUserFriends />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Counsellor
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Student support and enrollment.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ Inquiry & admission tracking</li>
              <li>✓ Student counseling records</li>
              <li>✓ Follow-up & engagement</li>
            </ul>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
