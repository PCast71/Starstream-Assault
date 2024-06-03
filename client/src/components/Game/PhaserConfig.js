import Phaser from 'phaser';

import  PhaserGame  from './PhaserGame';

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: PhaserGame, // Ensure PhaserGame is defined above
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

export default phaserConfig;
