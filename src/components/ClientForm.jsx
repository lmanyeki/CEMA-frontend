import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createClient } from '../api.js';

function ClientForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClient(formData);
      alert('Client registered successfully!');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error registering client:', error);
      alert('Failed to register client');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
        mt: 3,
        maxWidth: '800px',
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Register New Client
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Register Client
      </Button>
    </Box>
  );
}

export default ClientForm;