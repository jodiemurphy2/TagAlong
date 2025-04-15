import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; 

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password };
      const response = await registerUser(newUser);
      if (response.status === 201) {
        navigate('/profile');
      } else {
        setErrorMessage('Registration failed.');
      }
      console.log(response);
      navigate('/profile');
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
