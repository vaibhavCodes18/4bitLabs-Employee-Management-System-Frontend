import React from "react";


const HeroSection = () => {
  return (
    <section
      id="home"
      className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center"
    >
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Empower Your Institute with{" "}
          <span className="text-indigo-600">4bitLabs EMS</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-lg">
          A unified platform to manage employees, track training, analyze
          performance, and support learners—all in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#roles"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg"
          >
            Explore Roles
          </a>
        </div>
      </div>
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
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
          <rect x="220" y="170" width="60" height="60" rx="8" fill="#4F46E5" />
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
          <rect x="320" y="100" width="40" height="40" rx="8" fill="#C7D2FE" />
          <rect x="140" y="280" width="40" height="40" rx="8" fill="#C7D2FE" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
