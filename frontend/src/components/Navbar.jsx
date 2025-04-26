import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../auth/AuthContext";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';

const Navbar = () => {
    const { authState, logout } = useAuthContext();
  
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and Title */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
              <GroupIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Tag-Along
            </Typography>
          </div>
  
          {/* Navigation Links */}
          <div>
            <Button color="inherit" component={Link} to="/">Home</Button>
            {authState.user ? (
              <>
                <Button color="inherit" component={Link} to="/add-event">Add Event</Button>
                <Button color="inherit" component={Link} to="/profile">Profile</Button>
                <Button color="inherit" onClick={logout} component={Link} to="/">Logout</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Navbar;