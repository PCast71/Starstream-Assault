import Phaser from 'phaser';

import BackgroundScene from './BackgroundScene'; // Import BackgroundScene

const phaserConfig = {
  type: Phaser.AUTO,
  width: 1400,
  height: 800,
  scene: [BackgroundScene], // Pass BackgroundScene as an array
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

export default phaserConfig;
