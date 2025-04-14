import React, { useState, useContext } from 'react';
import { registerUser, loginUser } from '../services/api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      const loginResponse = await loginUser({ email: formData.email, password: formData.password });
      login(loginResponse.token);
      navigate('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
