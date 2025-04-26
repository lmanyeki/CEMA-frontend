import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getAllPrograms } from '../api.js';

function ProgramList() {
  const [programs, setPrograms] = useState([]);
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

  if (loading) return <Typography>Loading programs...</Typography>;

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