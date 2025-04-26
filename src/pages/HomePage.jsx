import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  People as ClientsIcon,
  MedicalServices as ProgramsIcon,
  Search as SearchIcon,
  Description as ReportsIcon,
  Home as HomeIcon,
  AppRegistration as RegisterIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        p: 4,
        backgroundColor: 'primary.main',
        color: 'white',
        borderRadius: 4,
        boxShadow: 3,
        position: 'relative'
      }}>
        <ProgramsIcon sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          fontSize: 60,
          opacity: 0.2
        }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Health Information System
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Comprehensive patient management for better healthcare
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          component={Link}
          to="/clients"
          endIcon={<ArrowIcon />}
          sx={{ 
            fontSize: '1.1rem',
            px: 4,
            py: 1.5
          }}
        >
          Get Started
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', mx: 'auto', maxWidth: '100%' }}>
            <ClientsIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              <strong>Client Management</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Easily register and manage client information with our intuitive interface.
            </Typography>
            <Button
              component={Link}
              to="/clients"
              startIcon={<SearchIcon />}
              size="medium"
              sx={{ mt: 1 }}
            >
              View Clients
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
            <ProgramsIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              <strong>Program Enrollment</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Quickly enroll clients in health programs like TB, Malaria, and HIV.
            </Typography>
            <Button
              component={Link}
              to="/programs"
              startIcon={<RegisterIcon />}
              size="small"
              sx={{ mt: 1 }}
            >
              Browse Programs
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center', mx: 'auto', maxwidth: '100%' }}>
            <ReportsIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
              <strong>Reporting</strong>
            </Typography>
            <Typography variant="body1" paragraph>
              Generate comprehensive reports on client participation and program statistics.
            </Typography>
            <Button
              component={Link}
              to="/reports"
              startIcon={<ReportsIcon />}
              size="small"
              sx={{ mt: 1 }}
            >
              View Reports
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ 
        mt: 10,
        textAlign: 'center', 
        p: 7,
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 6,
        position: 'relative'
      }}>
        <HomeIcon sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          fontSize: 40,
          color: 'primary.main',
          opacity: 0.8
        }} />
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          Ready to transform your health management?
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          size="large"
          component={Link}
          to="/programs"
          endIcon={<ArrowIcon />}
          sx={{ 
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
            mt: 2
          }}
        >
          Explore Programs
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;