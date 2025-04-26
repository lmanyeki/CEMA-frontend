import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  CircularProgress, 
  Alert,
  Button
} from '@mui/material';
import { getEnrollmentStats, getClientDemographics } from '../api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ReportsPage() {
  const [value, setValue] = useState(0);
  const [enrollmentStats, setEnrollmentStats] = useState([]);
  const [demographics, setDemographics] = useState({ totalClients: 0,
    byGender: {},
    byAgeGroup: {}});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsResponse, demoResponse] = await Promise.all([
        getEnrollmentStats(),
        getClientDemographics()
      ]);
      const statsData = statsResponse.data || [];
      const formattedStats = Array.isArray(statsData) 
        ? statsData 
        : [statsData].filter(Boolean);
      const demoData = demoResponse.data || {};
      const formattedDemo = {
          totalClients: demoData.totalClients || 0,
          byGender: demoData.byGender || {},
          byAgeGroup: demoData.byAgeGroup || {}
        };

      setEnrollmentStats(formattedStats);
      setDemographics(formattedDemo);
    } catch (error) {
      console.error('Error loading reports:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load reports: {error}
        </Alert>
        <Button variant="contained" onClick={loadData}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>System Reports</Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Program Enrollments" />
          <Tab label="Client Demographics" />
        </Tabs>
      </Paper>
      
      <TabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Program</TableCell>
                <TableCell align="right">Total Enrollments</TableCell>
                <TableCell align="right">Active</TableCell>
                <TableCell align="right">Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enrollmentStats.length > 0 ? (
                enrollmentStats.map((program) => (
                  <TableRow key={program.programId}>
                    <TableCell>{program.programName}</TableCell>
                    <TableCell align="right">{program.totalEnrollments}</TableCell>
                    <TableCell align="right">{program.activeEnrollments}</TableCell>
                    <TableCell align="right">{program.completedEnrollments}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No enrollment data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>Gender Distribution</Typography>
            {Object.entries(demographics.byGender).length > 0 ? (
              Object.entries(demographics.byGender).map(([gender, count]) => (
                <Typography key={gender}>
                  {gender}: {count} ({(count / (demographics.totalClients || 1) * 100).toFixed(1)}%)
                </Typography>
              ))
            ) : (
              <Typography>No gender data available</Typography>
            )}
          </Paper>
          
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>Age Groups</Typography>
            {Object.entries(demographics.byAgeGroup).length > 0 ? (
              Object.entries(demographics.byAgeGroup).map(([group, count]) => (
                <Typography key={group}>
                  {group}: {count} ({(count / (demographics.totalClients || 1) * 100).toFixed(1)}%)
                </Typography>
              ))
            ) : (
              <Typography>No age group data available</Typography>
            )}
          </Paper>
        </Box>
      </TabPanel>
    </Box>
  );
}