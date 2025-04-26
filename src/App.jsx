import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import ProgramsPage from './pages/ProgramsPage';
import './App.css';

function App() {
  return (
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
  );
}

export default App;