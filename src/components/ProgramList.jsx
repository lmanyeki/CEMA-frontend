import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { getAllPrograms } from '../api';

function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getAllPrograms();
        if (Array.isArray(response?.data)) {
        setPrograms(response.data);
      } else {
        throw new Error('Invalid programs data format');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Typography color="error" variant="body1">
        Error loading programs: {error}
      </Typography>
    );
  }
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Available Health Programs
      </Typography>
      {programs.length > 0 ? (
        <List>
          {programs.map((program) => (
            <ListItem key={program.id}>
              <ListItemText
                primary={program.name}
                secondary={program.description}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No programs available yet.</Typography>
      )}
    </Box>
  );
}

export default ProgramList;