import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectZero from './pages/ProjectZero';
import ProjectOne from './pages/ProjectOne';
import ProjectTwo from './pages/ProjectTwo';
import ProjectThree from './pages/ProjectThree';
import ProjectFour from './pages/ProjectFour';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-0" element={<ProjectZero />} />
        <Route path="/project-1" element={<ProjectOne />} />
        <Route path="/project-2" element={<ProjectTwo />} />
        <Route path="/project-3" element={<ProjectThree />} />
        <Route path="/project-4" element={<ProjectFour />} />
      </Routes>
    </Router>
  );
}
