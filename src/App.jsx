import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<SignUpPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
