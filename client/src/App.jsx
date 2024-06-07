import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import PhaserGame from "./components/Game/PhaserGame";
import phaserConfig from './components/Game/PhaserConfig'; // Import the configuration object
import { AuthProvider } from './AuthContext';
import './App.css';

function App() {
  const phaserRef = useRef(null);
  const gameInstance = useRef(null); // To store the Phaser game instance

  useEffect(() => {
    if (phaserRef.current) {
      const config = {
        ...phaserConfig,
        parent: phaserRef.current,
        scene: new PhaserGame(), // Make sure to instantiate the scene
      };

      gameInstance.current = new Phaser.Game(config);

      // Clean up the game instance when the component unmounts
      return () => {
        if (gameInstance.current) {
          gameInstance.current.destroy(true);
          gameInstance.current = null;
        }
      };
    }
  }, [phaserRef]);

  return (
    <div className="App">
      <div ref={phaserRef} />
    </div>
  );
}

export default App;
