import React from 'react';
import { Link } from 'react-router-dom';
import './startMenu.css';

const StartMenu = () => {
  return (
    <div className="start-menu">
      <h1>Space Shooter Game</h1>
      <div className="buttons">
        <Link to="/game">
          <button>Start Game</button>
        </Link>
        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </div>
    </div>
  );
};

export default StartMenu;
