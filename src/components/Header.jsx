import React, { useState } from "react";
import { FaMicrochip, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container mx-auto px-6 py-5 flex justify-between items-center relative">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <FaMicrochip className="text-white text-2xl" />
        </div>
        <span className="text-2xl font-bold text-gray-800">4bitLabs</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <a href="#home" className="hover:text-indigo-600 transition">
          Home
        </a>
        <a href="#about" className="hover:text-indigo-600 transition">
          About
        </a>
        <a href="#roles" className="hover:text-indigo-600 transition">
          Roles
        </a>
        <a href="#contact" className="hover:text-indigo-600 transition">
          Contact
        </a>
      </nav>

      {/* Desktop Get Started Button */}
      <Link
        to="/login"
        className="hidden md:block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md"
      >
        Get Started
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 mt-2 md:hidden z-50">
          <nav className="flex flex-col space-y-3 text-gray-600 font-medium">
            <a
              href="#home"
              className="hover:text-indigo-600 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-indigo-600 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#roles"
              className="hover:text-indigo-600 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Roles
            </a>
            <a
              href="#contact"
              className="hover:text-indigo-600 transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Link
              to="/login"
              className="bg-indigo-600 text-white text-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;