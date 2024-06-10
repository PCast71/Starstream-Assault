import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartMenu from './components/Game/StartMenu';
import LeaderBoard from './components/Leaderboard/Leaderboard';
import PhaserGame from './components/Game/PhaserGame'; // Import PhaserGame as a regular component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StartMenu />} />
        <Route path="/game" element={<PhaserGame />} /> 
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
