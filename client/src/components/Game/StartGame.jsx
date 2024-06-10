import React from 'react';
import { Link } from 'react-router-dom';

const StarGame = () => (
  <div>
    <h1>Star Game</h1>
    <button onClick={startGame}>Start Game</button>
    <Link to="/leaderboard">
      <button>View Leaderboard</button>
    </Link>
  </div>
);

const startGame = () => {
  // Logic to start the game
  console.log('Game started!');
};

export default StarGame;
