import React from 'react';
import { Link } from 'react-router-dom';
import './startMenu.css';


const StartMenu = () => {
  return (
    <div className="start-menu">
      <h1>Starstream Assault</h1>
      <div className="buttons">
        <Link to="/game">
          <button>Start Game</button>
        </Link>
        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </div>
      <div className="animation-container">
        {/* Player Sprite */}
        <div className="spaceship" style={{ left: '5%', bottom: '50%' }}></div>

        {/* Enemy Sprites */}
        <div className="enemy" style={{ right: '5%', top: '20%' }}></div>
        <div className="enemy" style={{ right: '15%', top: '30%' }}></div>   
        <div className="enemy" style={{ right: '15%', top: '10%' }}></div>
        <div className="enemy boss" style={{ right: '5%', top: '40%' }}></div>
      </div>
    </div>

      
  );
};

export default StartMenu;
