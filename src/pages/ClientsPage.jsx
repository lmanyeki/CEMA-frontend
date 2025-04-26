import { Box } from '@mui/material';
import ClientForm from '../components/ClientForm';
import ClientSearch from '../components/ClientSearch';

function ClientsPage() {
  return (
    <Box>
      <ClientForm />
      <ClientSearch />
    </Box>
  );
}

export default ClientsPage;