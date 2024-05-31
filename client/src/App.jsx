import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import phaserConfig from './phaserConfig'; // Import the configuration object
import './App.css';

function App() {
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const phaserRef = useRef(null);
  const gameInstance = useRef(null); // To store the Phaser game instance

  useEffect(() => {
    // Initialize Phaser game when the component mounts
    if (phaserRef.current) {
      // Create a new instance of PhaserGame and set it in the config
      const config = {
        ...phaserConfig,
        parent: phaserRef.current,
        scene: new PhaserGame(), // Make sure to instantiate the scene
      };

      gameInstance.current = new Phaser.Game(config);

      // Clean up the game instance when the component unmounts
      return () => {
        gameInstance.current.destroy(true);
      };
    }
  }, [phaserRef]);

  // Function to toggle sprite movement
  const toggleSpriteMovement = () => {
    setCanMoveSprite(!canMoveSprite);
  };

  // Effect to update the Phaser scene with the new canMoveSprite value
  useEffect(() => {
    if (gameInstance.current) {
      const scene = gameInstance.current.scene.scenes[0];
      if (scene && typeof scene.setCanMoveSprite === 'function') {
        scene.setCanMoveSprite(canMoveSprite);
      }
    }
  }, [canMoveSprite]);

  return (
    <div className="App">
      <button onClick={toggleSpriteMovement}>
        {canMoveSprite ? 'Disable Sprite Movement' : 'Enable Sprite Movement'}
      </button>
      <div ref={phaserRef} />
    </div>
  );
}

export default App;
