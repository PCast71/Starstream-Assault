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
    this.load.image('player', '/sprites/player/Ships/blue-1.png');
    this.load.image('projectile', '/sprites/player/Projectiles/missile-2.png');
    this.load.image('enemy', '/sprites/player/Ships/Enemies/Enemies-1.png');
  }

  create() {
    // Add background scene
    const background = this.scene.add('BackgroundScene', BackgroundScene, true);
    this.scene.bringToTop();

    // Create player sprite
    this.player = this.physics.add.sprite(400, 300, 'player'); // Create player sprite directly

    // Make the sprite bigger
    this.player.setScale(1.5); // Scale the sprite to twice its size
    
    // Create enemy sprite closer to the center of the screen
    this.enemy = this.physics.add.sprite(800, 300, 'enemy'); // Adjusted position
    
    this.enemy.setVelocityX(900);

    // Define cursor keys for arrow key movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Define WASD keys for movement
    this.keys = this.input.keyboard.addKeys('W,A,S,D');

    // Define Spacebar for Projectile
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Create a group for projectiles
    this.projectiles = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 10000,
      runChildUpdate: true,
    });

    this.physics.world.enable(this.projectiles); // Enable physics for projectiles

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

      if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot) {
        console.log("Shooting projectile"); // Log when shooting
        this.shootProjectile();
        this.canShoot = false;
        this.time.delayedCall(100, () => { this.canShoot = true; console.log("Can shoot again"); }) // Log when cooldown is over
      }
    }

    // Update active projectiles
    this.projectiles.getChildren().forEach((projectile) => {
      if (projectile.active) {
        // Handle any update logic for active projectiles
      }
    });
  }

  // Shooting projectile
  shootProjectile() {
    const projectile = this.projectiles.get(this.player.x, this.player.y, 'projectile');

    if (projectile) {
      projectile.setActive(true);
      projectile.setVisible(true);
      projectile.body.velocity.x = 300;
      projectile.angle = 90;
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
