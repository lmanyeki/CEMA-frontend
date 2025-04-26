import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import { createClient, enrollClient, getAllPrograms } from '../api';
import ClientList from './ClientList';

function ClientForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    programId: ''
  });

  const [programs, setPrograms] = useState([]);
  const [showClientList, setShowClientList] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await getAllPrograms();
      if (error) {
        setError(error);
      } else {
          setPrograms(data);
      }
      setLoading(false);
    };
    fetchPrograms();
  }, []);
  if (loading) return <Typography>Loading programs...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientResponse = await createClient({
        ...formData,
        clientId: `CL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
      });
      
      if (formData.programId) {
        await enrollClient({
          clientId: clientResponse.data.id,
          programId: formData.programId
        });
      }
      
      alert('Client registered successfully!');
      navigate('/clients');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
        mt: 3,
        maxWidth: '700px',
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
      <TextField
        fullWidth margin="normal" type="number"
        label="Age" name="age"
        value={formData.age}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth margin="normal" select
        label="Gender" name="gender"
        value={formData.gender}
        onChange={handleChange}      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      
      <TextField
        fullWidth margin="normal"
        label="Address" name="address"
        value={formData.address}
        onChange={handleChange}      />
      
      <TextField
        fullWidth margin="normal" select
        label="Enroll in Program (Optional)" name="programId"
        value={formData.programId}
        onChange={handleChange}      >
        <MenuItem value="">None</MenuItem>
        {Array.isArray(programs) && programs.map((program) => (
          <MenuItem key={program.id} value={program.id}>
            {program.name} ({program.code})
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained">
            Register Client
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowClientList(true)}
          >
            Show All Clients
          </Button>
      </Box>
      <ClientList 
        open={showClientList} 
        onClose={() => setShowClientList(false)} 
      />
    </Box>
  );
}

export default ClientForm;