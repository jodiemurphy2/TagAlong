import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome to your profile!</h2>
      {auth?.token && <p>You're logged in with token: {auth.token.slice(0, 20)}...</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
