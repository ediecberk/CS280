import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectZero from './pages/ProjectZero';
import ProjectOne from './pages/ProjectOne';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-0" element={<ProjectZero />} />
        <Route path="/project-1" element={<ProjectOne />} />
      </Routes>
    </Router>
  );
}
