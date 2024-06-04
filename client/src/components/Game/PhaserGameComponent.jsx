import React, { useEffect } from 'react';
import Phaser from 'phaser';
import PhaserGame from './PhaserGame'; // Adjust the path as necessary

let game;

const PhaserGameComponent = () => {
  useEffect(() => {
    // Check if the game already exists
    if (!game) {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: PhaserGame,
        parent: 'phaser-game-container', // Ensure Phaser is rendered within the div
        physics: {
          default: 'arcade',
          arcade: {
            debug: false, // Set to true if you want to see physics bodies for debugging
          },
        },
      });
    }

    // Cleanup function to destroy the game instance on component unmount
    return () => {
      if (game) {
        game.destroy(true);
        game = null;
      }
    };
  }, []);

  return <div id="phaser-game-container" />;
};

export default PhaserGameComponent;
