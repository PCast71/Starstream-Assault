import Phaser from 'phaser';
import BackgroundScene from './BackgroundScene';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true;
  }

  preload() {
    // Load assets
    this.load.image('player', '/sprites/player/Ships/blue-1.png'); // Ensure the key matches in create()
    this.load.image('enemy', '/sprites/player/Ships/Enemies/Enemies-1.png');
  }

  create() {
    // Add background scene
    this.scene.add('BackgroundScene', BackgroundScene, true);
 
    // Create player sprite
    this.player = this.physics.add.sprite(400, 300, 'player'); // Create player sprite directly

    // Create enemy sprite
    this.enemy = this.physics.add.sprite(1420, 400, 'enemy');

    this.enemy.setVelocityX(900);

    // Define cursor keys for arrow key movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Define WASD keys for movement
    this.keys = this.input.keyboard.addKeys('W,A,S,D');

    this.setRandomVelocity(this.enemy);

    this.time.addEvent({
      delay: 2000, // 2 seconds
      callback: () => this.setRandomVelocity(this.enemy),
      loop: true
    });
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

  setRandomVelocity(sprite) {
    const minVelocity = -100;
    const maxVelocity = 100;

    const randomXVelocity = Phaser.Math.Between(minVelocity, maxVelocity);
    const randomYVelocity = Phaser.Math.Between(minVelocity, maxVelocity);

    sprite.setVelocity(randomXVelocity, randomYVelocity);
  }
}

export default PhaserGame;
