// Lorenzo - Phaser setup and sprites and eneimes.
import Phaser from 'phaser';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true; // Default value
  }

  preload() {
    // Load assets here
    this.load.image('sprite', 'sprite here'); 

  }

  create() {
    this.sprite = this.physics.add.sprite(400, 300, 'sprite');

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
  }

  update() {
    // Resets the velocity when no key is pressed
    if (this.sprite) {
      this.sprite.setVelocity(0);
    }
  }

  setCanMoveSprite(canMove) {
    this.canMoveSprite = canMove;
  }
}

export { PhaserGame };
