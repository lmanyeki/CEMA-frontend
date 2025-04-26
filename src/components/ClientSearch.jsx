import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Link 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { searchClients } from '../api.js';

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
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 3
    }}>
      <Typography variant="h6" gutterBottom>
        Search Clients
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        width: { xs: '100%', sm: '80%', md: '60%' },
        justifyContent: 'center'
      }}>
        <TextField
          fullWidth
          label="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: '400px'
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          sx={{
            minWidth: '120px'
          }}
        >
          Search
        </Button>
      </Box>
      
      {searchResults.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: '800px' }}>
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
        </Box>
      )}
    </Box>
  );
}

export default ClientSearch;