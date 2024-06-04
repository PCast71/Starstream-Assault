import Phaser from 'phaser';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true;
  }

  preload() {
    // Load assets
    this.load.image('background', '/sprites/background/stars_1.png');
    this.load.image('player', '/sprites/player/Ships/blue-1.png'); // Ensure the key matches in create()
  }

  create() {
    // Add background image
    this.add.image(400, 300, 'background');

    // Add player sprite with physics enabled
    this.sprite = this.physics.add.sprite(400, 300, 'player');

    // Define cursor keys for arrow key movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Define WASD keys for movement
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
  }

  update() {
    if (this.canMoveSprite) {
      this.sprite.setVelocity(0); // Reset velocity

      // Handle arrow key movement
      if (this.cursors.left.isDown) {
        this.sprite.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.sprite.setVelocityX(200);
      }

      if (this.cursors.up.isDown) {
        this.sprite.setVelocityY(-200);
      } else if (this.cursors.down.isDown) {
        this.sprite.setVelocityY(200);
      }

      // Handle WASD key movement
      if (this.keys.A.isDown) {
        this.sprite.setVelocityX(-200);
      } else if (this.keys.D.isDown) {
        this.sprite.setVelocityX(200);
      }

      if (this.keys.W.isDown) {
        this.sprite.setVelocityY(-200);
      } else if (this.keys.S.isDown) {
        this.sprite.setVelocityY(200);
      }
    }
  }

  setCanMoveSprite(canMove) {
    this.canMoveSprite = canMove;
  }
}

export default PhaserGame;
