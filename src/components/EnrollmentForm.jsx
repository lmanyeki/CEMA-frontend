import { useState, useEffect } from 'react';
import { Box, Typography, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getAllPrograms, enrollClient } from '../api.js';

function EnrollmentForm({ clientId }) {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getAllPrograms();
        setPrograms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleEnroll = async () => {
    try {
      await enrollClient({ clientId, programId: selectedProgram });
      alert('Client enrolled successfully!');
      setSelectedProgram('');
    } catch (error) {
      console.error('Error enrolling client:', error);
      alert('Failed to enroll client');
    }
  };

  if (loading) return <Typography>Loading programs...</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Enroll Client in Program
      </Typography>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Select Program</InputLabel>
        <Select
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
          label="Select Program"
        >
          {programs.map((program) => (
            <MenuItem key={program.id} value={program.id}>
              {program.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleEnroll}
        disabled={!selectedProgram}
        sx={{ mt: 2 }}
      >
        Enroll Client
      </Button>
    </Box>
  );
}

export default EnrollmentForm;