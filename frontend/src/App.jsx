import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthContext } from './auth/AuthContext';
import Navbar from './components/Navbar';

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={auth ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
