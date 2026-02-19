import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/about" element="about" />
          <Route path="/feedback" element="feedback" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
