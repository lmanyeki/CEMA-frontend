import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import { getClientProfile } from '../api.js';

function ClientProfile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const response = await getClientProfile(id);
        setClient(response.data.client);
        setPrograms(response.data.programs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching client profile:', error);
        setLoading(false);
      }
    };

    fetchClientProfile();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!client) return <Typography>Client not found</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {client.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Email: {client.email}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Phone: {client.phone || 'N/A'}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h5" gutterBottom>
        Enrolled Programs
      </Typography>
      
      {programs.length > 0 ? (
        <List>
          {programs.map((program) => (
            <ListItem key={program.id}>
              <ListItemText
                primary={program.name}
                secondary={program.description}
              />
              <Chip label="Enrolled" color="success" />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>This client is not enrolled in any programs yet.</Typography>
      )}
    </Box>
  );
}

export default ClientProfile;