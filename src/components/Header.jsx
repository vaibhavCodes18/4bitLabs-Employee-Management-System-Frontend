import React from "react";
import {
  FaMicrochip,
  
} from 'react-icons/fa';
const Header = () => {
  return (
    <header className="container mx-auto px-6 py-5 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <FaMicrochip className="text-white text-2xl" />
        </div>
        <span className="text-2xl font-bold text-gray-800">4bitLabs</span>
      </div>
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
      <a
        href="#roles"
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-md"
      >
        Get Started
      </a>
    </header>
  );
};

export default Header;
