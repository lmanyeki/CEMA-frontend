import { Box } from '@mui/material';
import ProgramForm from '../components/ProgramForm';
import ProgramList from '../components/ProgramList';

function ProgramsPage() {
  return (
    <Box>
      <ProgramForm />
      <ProgramList />
    </Box>
  );
}

export default ProgramsPage;