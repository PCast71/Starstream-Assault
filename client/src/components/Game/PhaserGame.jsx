import Phaser from 'phaser';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true; // Default value
  }

  preload() {
    // Load assets here
    this.load.image('background', '/sprites/background/stars_1.png'); // Load background image
    this.load.image('sprites', '/sprites/player/Ships/blue-1.png'); // Load player sprite
  }

  create() {
    // Create background
    this.add.image(400, 300, 'background'); // Display background image

    // Create sprite with physics enabled
    this.sprite = this.physics.add.sprite(400, 300, 'player'); // Use 'player' instead of 'sprite'

    // Define cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Listen to keyboard events
    this.input.keyboard.on('keydown', (event) => {
      if (this.canMoveSprite) {
        switch (event.key) {
          case 'ArrowUp':
            this.sprite.setVelocityY(-200);
            break;
          case 'ArrowDown':
            this.sprite.setVelocityY(200);
            break;
          case 'ArrowLeft':
            this.sprite.setVelocityX(-200);
            break;
          case 'ArrowRight':
            this.sprite.setVelocityX(200);
            break;
          default:
            break;
        }
      }
    });

    // Listen to keyboard events for key release
    this.input.keyboard.on('keyup', (event) => {
      // Reset velocity when any arrow key is released
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        this.sprite.setVelocity(0);
      }
    });
  }

  // No need to modify the update method

  setCanMoveSprite(canMove) {
    this.canMoveSprite = canMove;
  }
}

// Initialize the game
const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: PhaserGame
});

export default PhaserGame;
