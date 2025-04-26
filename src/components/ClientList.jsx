import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Button,
  Typography,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getAllClients } from '../api';

export default function ClientList({ open, onClose }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllClients();
      
      const clientsData = response?.data || [];
      const normalizedClients = Array.isArray(clientsData) 
        ? clientsData 
        : [clientsData].filter(Boolean); 
      
      setClients(normalizedClients);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError(err.message || 'Failed to load clients');
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchClients();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Registered Clients
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small"
                onClick={fetchClients}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        ) : clients.length === 0 ? (
          <Typography>No clients registered yet</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id || client.clientId}>
                    <TableCell>{client.clientId || client.id}</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone || '-'}</TableCell>
                    <TableCell>{client.age || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
}