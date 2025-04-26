import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createProgram } from './api.js';

function ProgramForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProgram(formData);
      alert('Program created successfully!');
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Failed to create program');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New Health Program
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Program Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Create Program
      </Button>
    </Box>
  );
}

export default ProgramForm;