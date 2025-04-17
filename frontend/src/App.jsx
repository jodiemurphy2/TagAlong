import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <div className="app-wrapper">
      <Router>
        <Navbar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
