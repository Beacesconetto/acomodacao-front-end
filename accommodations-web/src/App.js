import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AccommodationPage from "./pages/AccommodationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation/:id" element={<AccommodationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
