import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<SignUpPage/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
