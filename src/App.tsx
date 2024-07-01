import React from "react";
import "./tailw.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Footer"
            element={
              <div>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
