import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="md:w-1/2 text-center md:text-left relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Empower Your Institute with{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            4bitLabs EMS
          </span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-lg mx-auto md:mx-0">
          A unified platform to manage employees, track training, analyze
          performance, and support learners—all in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#roles"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Explore Roles</span>
          </a>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 font-medium text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative z-10">
        <div className="relative animate-float">
          <svg
            className="w-full max-w-md"
            viewBox="0 0 500 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="250" cy="200" r="120" fill="#E0E7FF" />
            <rect
              x="190"
              y="140"
              width="120"
              height="120"
              rx="16"
              fill="#4F46E5"
              fillOpacity="0.2"
            />
            <rect
              x="220"
              y="170"
              width="60"
              height="60"
              rx="8"
              fill="url(#gradient)"
            />
            <circle cx="280" cy="210" r="8" fill="#FFFFFF" />
            <circle cx="220" cy="210" r="8" fill="#FFFFFF" />
            <path
              d="M250 230 L250 250"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M235 245 L265 245"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect
              x="320"
              y="100"
              width="40"
              height="40"
              rx="8"
              fill="#C7D2FE"
            />
            <rect
              x="140"
              y="280"
              width="40"
              height="40"
              rx="8"
              fill="#C7D2FE"
            />
            <defs>
              <linearGradient
                id="gradient"
                x1="220"
                y1="170"
                x2="280"
                y2="230"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          {/* Floating particles */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-pulse animation-delay-1000"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
