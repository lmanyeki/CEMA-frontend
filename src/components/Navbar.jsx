import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(45deg, #a86523 30%, #e9a319 90%)',
        boxShadow: '0 3px 5px 2px rgba(185, 147, 40, 0.3)',
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Health Information System
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 600 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/clients" sx={{ fontWeight: 600 }}>
            Clients
          </Button>
          <Button color="inherit" component={Link} to="/programs" sx={{ fontWeight: 600 }}>
            Programs
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

export default Navbar;