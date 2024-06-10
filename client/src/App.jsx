import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import PhaserConfig from './components/Game/PhaserConfig';
import './App.css';

function App() {
  const phaserRef = useRef(null);
  const gameInstance = useRef(null); // To store the Phaser game instance

  useEffect(() => {
    if (phaserRef.current) {
      const config = {
        ...PhaserConfig,
        parent: phaserRef.current,
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
