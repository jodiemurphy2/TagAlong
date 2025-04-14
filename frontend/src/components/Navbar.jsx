import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Register</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
      <Link to="/profile" style={{ marginRight: '1rem' }}>Profile</Link>
      {auth && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
