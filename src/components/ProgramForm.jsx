import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { createProgram } from '../api';

function ProgramForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProgram(formData);
      setSuccess(true);
      setFormData({ name: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
        boxShadow: 1
    }}>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Program created!</Alert>}
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