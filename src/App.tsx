import React from "react";
import "./tailw.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import { CartContext } from "./components/ContextReducer";
import UserCart from "./screens/Cart";
import MyOrders from "./components/MyOrders";
function App() {
  return (
    <>
      <CartContext>
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
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/MyCart" element={<UserCart />} />
            <Route path="MyOrders" element={<MyOrders />} />
          </Routes>
        </Router>
      </CartContext>
    </>
  );
}

export default App;
