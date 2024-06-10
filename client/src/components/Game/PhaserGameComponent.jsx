import React, { useEffect } from 'react';
import Phaser from 'phaser';
import PhaserGame from './PhaserGame'; // Ensure correct import path

const PhaserGameComponent = () => {
  useEffect(() => {
    // Create the Phaser game instance
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [PhaserGame],
      parent: 'phaser-game-container', // Ensure Phaser is rendered within the div
      physics: {
        default: 'arcade',
        arcade: {
          debug: false, // Set to true if you want to see physics bodies for debugging
        },
      },
    });

    // Resize the game when the window is resized
    const resize = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);

    // Cleanup function to destroy the game instance on component unmount
    return () => {
      window.removeEventListener('resize', resize);
      game.destroy(true);
    };
  }, []);

  return <div id="phaser-game-container" />;
};

export default PhaserGameComponent;