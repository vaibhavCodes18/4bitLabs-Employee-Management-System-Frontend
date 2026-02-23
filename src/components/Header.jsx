import React, { useState } from "react";
import { FaMicrochip, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with enhanced styling */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-2 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
            <FaMicrochip className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            4bitLabs
          </span>
        </Link>

        {/* Desktop Navigation with animated underline */}
        <nav className="hidden md:flex space-x-8">
          {["Home", "About", "Roles", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-600 font-medium group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Login Button */}
        <Link
          to="/login"
          className="hidden md:inline-flex items-center justify-center px-6 py-2.5 font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Login
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-indigo-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="absolute inset-0 bg-indigo-50 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
          {isMenuOpen ? <FaTimes size={24} className="relative" /> : <FaBars size={24} className="relative" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown with glass effect */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg rounded-b-2xl p-6 md:hidden z-50 border-t border-gray-100 animate-slideDown">
          <nav className="flex flex-col space-y-4">
            {["Home", "About", "Roles", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Link
              to="/login"
              className="bg-linear-to-r from-indigo-600 to-purple-600 text-white text-center px-4 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;