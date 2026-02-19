import React from "react";
import {
  FaUserShield,
  FaChalkboardTeacher,
  FaChartLine,
  FaUserFriends,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import RolesSection from "../components/RolesSection";

const LandingPage = () => {
  const ADMIN_USER = {
    fullName: "Vaibhav Sathe",
    username: "admin123",
    email: "admin@info.com",
    password: "admin12",
    role: "admin",
  };
  const admin = JSON.stringify(ADMIN_USER);
  localStorage.setItem("admin", admin);
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <About />

      {/* Roles Section */}
      <RolesSection />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
