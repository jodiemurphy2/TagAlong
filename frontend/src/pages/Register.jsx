import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; 
import { Box, Typography, TextField, Button, Container, Alert } from '@mui/material';


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
    <Container maxWidth="sm">
      <Box p={3}>
        <Typography variant="h4" gutterBottom align="center">Register</Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <form onSubmit={handleRegister}>
          <Box mb={3}>
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;