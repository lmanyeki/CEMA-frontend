import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Chip, Divider } from '@mui/material';
import { getClientProfile } from '../api';

function ClientProfile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClientProfile(id);
        setClient(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!client) return <Typography>Client not found</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {client.name} <Chip label={client.clientId} color="primary" />
      </Typography>
      <Typography variant="subtitle1">Email: {client.email}</Typography>
      <Typography variant="subtitle1">Phone: {client.phone || 'N/A'}</Typography>
      <Typography variant="subtitle1">Age: {client.age || 'N/A'}</Typography>
      <Typography variant="subtitle1">Gender: {client.gender || 'N/A'}</Typography>
      <Typography variant="subtitle1">Address: {client.address || 'N/A'}</Typography>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" sx={{ mt: 3 }}>Enrolled Programs</Typography>
      {client.enrollments.length > 0 ? (
        <List>
          {client.enrollments.map(enrollment => (
            <ListItem key={enrollment.id}>
              <ListItemText
                primary={enrollment.program.name}
                secondary={`Status: ${enrollment.status} • Enrolled: ${new Date(enrollment.enrolledAt).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No program enrollments</Typography>
      )}
    </Box>
  );
}

export default ClientProfile;