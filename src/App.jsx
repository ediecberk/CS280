import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectZero from './pages/ProjectZero';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-0" element={<ProjectZero />} />
      </Routes>
    </Router>
  );
}
