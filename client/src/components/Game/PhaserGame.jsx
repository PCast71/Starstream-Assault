import Phaser from 'phaser';
import BackgroundScene from './BackgroundScene';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true;
  }

  preload() {
    // Load assets
    this.load.image('player', 'sprites/player/Ships/blue-1.png'); // Load player sprite
    // Ensure the key matches in create()
  }

  create() {
    // Add background scene
    const background = this.scene.add('BackgroundScene', BackgroundScene, true);
    this.scene.bringToTop();

    // Create player sprite
    this.player = this.physics.add.sprite(400, 300, 'player'); // Create player sprite directly

    // Make the sprite bigger
    this.player.setScale(1.5); // Scale the sprite to twice its size

    // Define cursor keys for arrow key movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Define WASD keys for movement
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
  }

  update() {
    if (this.canMoveSprite) {
      this.player.setVelocity(0); // Reset velocity

      // Handle arrow key movement
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-100);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(100);
      }

      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-100);
      } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(100);
      }

      // Handle WASD key movement
      if (this.keys.A.isDown) {
        this.player.setVelocityX(-100);
      } else if (this.keys.D.isDown) {
        this.player.setVelocityX(100);
      }

      if (this.keys.W.isDown) {
        this.player.setVelocityY(-100);
      } else if (this.keys.S.isDown) {
        this.player.setVelocityY(100);
      }
    }
  }

  setCanMoveSprite(canMove) {
    this.canMoveSprite = canMove;
  }
}

export default PhaserGame;
