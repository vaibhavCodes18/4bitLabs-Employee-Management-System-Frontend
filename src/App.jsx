import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import AnalystDashboard from "./pages/AnalystDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
// import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/analyst-dashboard" element={<AnalystDashboard />} />
          <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
