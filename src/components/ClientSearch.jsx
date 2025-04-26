import { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Link } from '@mui/material';
import { searchClients } from './api.js';
import { Link as RouterLink } from 'react-router-dom';

function ClientSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchClients(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching clients:', error);
      setSearchResults([]);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search Clients
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      
      {searchResults.length > 0 && (
        <List>
          {searchResults.map((client) => (
            <ListItem key={client.id}>
              <ListItemText
                primary={client.name}
                secondary={`Email: ${client.email} | Phone: ${client.phone || 'N/A'}`}
              />
              <Link component={RouterLink} to={`/clients/${client.id}`}>
                View Profile
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default ClientSearch;