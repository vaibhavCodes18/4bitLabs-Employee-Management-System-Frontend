import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import AnalystDashboard from "./pages/AnalystDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          
          {/* Protected Role-Based Dashboards */}
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/analyst-dashboard" 
            element={<ProtectedRoute allowedRoles={['analyst']}><AnalystDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/counsellor-dashboard" 
            element={<ProtectedRoute allowedRoles={['counsellor']}><CounsellorDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/trainer-dashboard" 
            element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
