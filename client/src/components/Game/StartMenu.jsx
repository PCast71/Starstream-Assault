import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './startMenu.css';

const StartMenu = () => {
  const titleScreenAudio = useRef(null);
  const buttonClickSound = useRef(null);

  useEffect(() => {
    // Load title screen audio
    titleScreenAudio.current = new Audio('/sprites/background/04. Title Screen.mp3');
    titleScreenAudio.current.volume = 0.3; // Adjust volume as needed
    titleScreenAudio.current.loop = true;
    titleScreenAudio.current.play();

    // Cleanup function
    return () => {
      if (titleScreenAudio.current) {
        titleScreenAudio.current.pause();
        titleScreenAudio.current.currentTime = 0;
      }
    };
  }, []);

  const loadButtonClickSound = () => {
    buttonClickSound.current = new Audio('/sprites/background/button.mp4');
    buttonClickSound.current.volume = 0.5; // Adjust volume as needed
  };

  const playButtonClickSound = () => {
    if (buttonClickSound.current) {
      buttonClickSound.current.currentTime = 0;
      buttonClickSound.current.play();
    }
  };

  const handleMouseOver = () => {
    loadButtonClickSound();
    playButtonClickSound();
  };

  const handleStartGameButtonClick = () => {
    playButtonClickSound();
    // Additional logic for starting the game...
  };

  const handleLeaderboardButtonClick = () => {
    playButtonClickSound();
    // Additional logic for leaderboard...
  };

  return (
    <div className="start-menu">
      <h1>Starstream Assault</h1>
      <div className="buttons">
        <Link to="/game">
          <button onClick={handleStartGameButtonClick} onMouseOver={handleMouseOver}>Start Game</button>
        </Link>
        <Link to="/leaderboard">
          <button onClick={handleLeaderboardButtonClick} onMouseOver={handleMouseOver}>Leaderboard</button>
        </Link>
      </div>
      <div className="animation-container">
        {/* Player Sprite */}
        <div className="spaceship" style={{ left: '43.3%', bottom: '59%' }}></div>
        <div className="laser-beam" style={{left: '46%', bottom: '58.9%'}}></div>
        
        {/* Boss Laser Beam */}
        <div className="boss-laser-beam" style={{right: '44%', top: '37%'}}></div>

        {/* Enemy Sprites */}
        <div className="enemy" style={{ right: '5%', top: '20%' }}></div>
        <div className="enemy" style={{ right: '15%', top: '30%' }}></div>
        <div className="enemy" style={{ right: '25%', top: '40%' }}></div>
        <div className="enemy" style={{ right: '35%', top: '30%' }}></div>
        <div className="enemy" style={{ right: '25%', top: '20%' }}></div>
        <div className="enemy boss" style={{ right: '40%', top: '35%' }}></div>
      </div>
    </div>
  );
};

export default StartMenu;
