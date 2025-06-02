import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProfileProvider } from './contexts/UserProfileContext';
import Login from './pages/Login';
import Callback from './pages/Callback';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PersonalSchedule from './pages/PersonalSchedule';
import TeamSchedule from './pages/TeamSchedule';
import CreatePlaylist from './pages/CreatePlaylist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personal-schedule" element={<PersonalSchedule />} />
        <Route path="/team-schedule" element={<TeamSchedule />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;