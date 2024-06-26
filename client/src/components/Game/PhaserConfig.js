import Phaser from 'phaser';

import PhaserGame from './PhaserGame';
// Import BackgroundScene

const phaserConfig = {
  type: Phaser.AUTO,
  width: 1400,
  height: 800,
  scene: [PhaserGame], // Pass BackgroundScene as an array
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

export default phaserConfig;
