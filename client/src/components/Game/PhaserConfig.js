import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: PhaserGame,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

export default phaserConfig;
