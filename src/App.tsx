import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Planning from './pages/Planning';
import Team from './pages/Team';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;

