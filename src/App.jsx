import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import ProgramsPage from './pages/ProgramsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a86523', 
    },
    secondary: {
      main: '#e9a319',  
    },
    background: {
      default: '#fff', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#4a148c',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;