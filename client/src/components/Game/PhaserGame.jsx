import Phaser from 'phaser';
import BackgroundScene from './BackgroundScene';
import CollisionScene from './CollisionScene';
class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true;
    this.canShoot = true;
    this.playerRespawnDelay = 1000; // Adjust respawn delay as needed (in milliseconds)
  }

  preload() {
    // Load assets
 this.load.image('player', '/sprites/player/Ships/blue-1.png');
    this.load.image('projectile', '/sprites/player/Projectiles/missile-2.png');
    this.load.image('enemy1', '/sprites/player/Ships/Enemies/Enemies-1.png');
    this.load.image('enemy2', '/sprites/player/Ships/Enemies/Enemies-4.png');
    this.load.image('enemy3', '/sprites/player/Ships/Enemies/Enemies-6.png');
    this.load.spritesheet('explosion', '/sprites/player/Explosion/explosion.png', { frameWidth: 64, frameHeight: 64 });
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

   
  }

  create() {
    // Add scenes
    this.scene.add('BackgroundScene', BackgroundScene, true);
    this.scene.add('CollisionScene', CollisionScene, true);
    this.scene.bringToTop();

    // Create player sprite
    this.player = this.physics.add.sprite(400, 300, 'player').setScale(1.5);

    // Define controls

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Create projectiles group
    this.projectiles = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 10000,
    });


    this.time.addEvent({
      delay: 2000, // 2 seconds
      callback: () => this.setRandomVelocity(this.enemy),
      loop: true

    this.physics.world.enable(this.projectiles);

    // Create a group for enemies
    this.enemies = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      runChildUpdate: true,
    });

    // Add collision detection
    this.physics.add.collider(this.player, this.enemies, this.handleCollision, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.handleProjectileHit, null, this);

    // Add explosion animation
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23 }),
      frameRate: 20,
      hideOnComplete: true,

    });

    // Spawn random enemies
    this.spawnEnemies();
  }

  update() {

    if (this.canMoveSprite) {
      this.handlePlayerMovement();
      if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot) {
        this.shootProjectile();
        this.canShoot = false;
        this.time.delayedCall(100, () => { this.canShoot = true; });
      }

    // Movement and shooting logic
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-100);
    if (this.cursors.right.isDown) this.player.setVelocityX(100);
    if (this.cursors.up.isDown) this.player.setVelocityY(-100);
    if (this.cursors.down.isDown) this.player.setVelocityY(100);
    if (this.keys.A.isDown) this.player.setVelocityX(-100);
    if (this.keys.D.isDown) this.player.setVelocityX(100);
    if (this.keys.W.isDown) this.player.setVelocityY(-100);
    if (this.keys.S.isDown) this.player.setVelocityY(100);

    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot) {
      this.shootProjectile();
      this.canShoot = false;
      this.time.delayedCall(100, () => { this.canShoot = true; });

    }
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

  handleCollision(player, enemy) {
    player.setActive(false).setVisible(false);
    enemy.setActive(false).setVisible(false);
    
    // Add explosion effect
    this.addExplosion(player.x, player.y);
    this.addExplosion(enemy.x, enemy.y);

    // Respawn player after delay
    this.respawnPlayer();
  }

  handleProjectileHit(projectile, enemy) {
    projectile.setActive(false).setVisible(false);
    projectile.destroy();

    if (!enemy.hitCount) enemy.hitCount = 0;
    enemy.hitCount++;

    if (enemy.hitCount >= 5) {
      enemy.setActive(false).setVisible(false);

      // Add explosion effect
      this.addExplosion(enemy.x, enemy.y);

      // Remove enemy from the scene
      this.enemies.remove(enemy);
    }
}

  addExplosion(x, y) {
    const explosion = this.add.sprite(x, y, 'explosion');
    explosion.play('explode');
    this.time.delayedCall(500, () => {
      explosion.destroy();
    });
  }

  respawnPlayer() {
    this.time.delayedCall(this.playerRespawnDelay, () => {
      this.player.setActive(true).setVisible(true);
      this.player.setPosition(400, 300); // Adjust respawn position as needed
    });
  }

  spawnEnemies() {
    const enemyImages = ['enemy1', 'enemy2', 'enemy3'];
    const numEnemies = Phaser.Math.Between(5, 10); // Random number of enemies

    for (let i = 0; i < numEnemies; i++) {
      const x = Phaser.Math.Between(800, 1400); // Spawn enemies off-screen
      const y = Phaser.Math.Between(50, 750); // Random vertical position

      const enemyImage = enemyImages[Phaser.Math.Between(0, enemyImages.length - 1)];
      const enemy = this.enemies.create(x, y, enemyImage);
      
      // Set random velocity for the enemy
      this.setRandomVelocity(enemy);

      // Timer to change enemy direction periodically
      this.time.addEvent({
        delay: 2000,
        callback: () => this.setRandomVelocity(enemy),
        loop: true,
        callbackScope: this
      });
    }
  }

  setRandomVelocity(sprite) {
    if (sprite && sprite.active) {
      const minVelocity = -100;
      const maxVelocity = 100;
      const randomXVelocity = Phaser.Math.Between(minVelocity, maxVelocity);
      const randomYVelocity = Phaser.Math.Between(minVelocity, maxVelocity);
      sprite.setVelocity(randomXVelocity, randomYVelocity);
    }

  }
}

export default PhaserGame;
