import Phaser from 'phaser';
import BackgroundScene from './BackgroundScene';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true;
    this.canShoot = true; // Added variable to track shooting cooldown
  }

  preload() {
    // Load assets
    this.load.image('player', 'sprites/player/Ships/blue-1.png');
    this.load.image('projectile', 'sprites/player/Projectiles/missile-2.png');
    this.load.image('enemy', 'sprites/player/Ships/Enemies/Enemies-1.png');
  }

  create() {
    // Add background scene
    this.scene.add('BackgroundScene', BackgroundScene, true);
    this.scene.bringToTop('main');

    // Create player sprite
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setScale(1.5);

    // Create enemy sprite
    this.enemy = this.physics.add.sprite(800, 300, 'enemy');
    this.setRandomVelocity(this.enemy);

    // Define cursor keys for movement
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Create a group for projectiles
    this.projectiles = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 10000,
    });

    this.time.addEvent({
      delay: 2000, // 2 seconds
      callback: () => this.setRandomVelocity(this.enemy),
      loop: true
    });
  }

  update() {
    if (this.canMoveSprite) {
      this.handlePlayerMovement();
      if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot) {
        this.shootProjectile();
        this.canShoot = false;
        this.time.delayedCall(100, () => { this.canShoot = true; });
      }
    }

    // Update active projectiles
    this.projectiles.getChildren().forEach((projectile) => {
      if (projectile.active) {
        // Handle any update logic for active projectiles
      }
    });
  }

  handlePlayerMovement() {
    this.player.setVelocity(0); // Reset velocity

    // Handle arrow key and WASD key movement
    const moveKeys = {
      left: this.cursors.left.isDown || this.keys.A.isDown,
      right: this.cursors.right.isDown || this.keys.D.isDown,
      up: this.cursors.up.isDown || this.keys.W.isDown,
      down: this.cursors.down.isDown || this.keys.S.isDown,
    };

    if (moveKeys.left) {
      this.player.setVelocityX(-100);
    } else if (moveKeys.right) {
      this.player.setVelocityX(100);
    }

    if (moveKeys.up) {
      this.player.setVelocityY(-100);
    } else if (moveKeys.down) {
      this.player.setVelocityY(100);
    }
  }

  shootProjectile() {
    const projectile = this.projectiles.get(this.player.x, this.player.y, 'projectile');
    if (projectile) {
      projectile.setActive(true);
      projectile.setVisible(true);
      projectile.body.velocity.x = 300;
      projectile.angle = 90;
    }
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
