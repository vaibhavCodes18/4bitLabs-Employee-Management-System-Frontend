import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import RolesSection from "../components/RolesSection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 font-sans">
      <Header />
      <HeroSection />
      <About />
      <RolesSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
