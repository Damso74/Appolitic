import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Results from './components/Results'; // Import du composant Results

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </Router>
);

export default AppRoutes;
