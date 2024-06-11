import Phaser from 'phaser';
import BackgroundScene from './BackgroundScene';
import CollisionScene from './CollisionScene';

class PhaserGame extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.canMoveSprite = true;
    this.canShoot = true;
    this.playerRespawnDelay = 1000; // Adjust respawn delay as needed (in milliseconds)
    this.score = 0; // Add score variable
    this.maxEnemies = 20; // Maximum number of enemies on screen at once
  }

  preload() {
    // Load assets
    this.load.image('player', '/sprites/player/Ships/blue-1.png');
    this.load.image('projectile', '/sprites/player/Projectiles/missile-2.png');
    this.load.image('enemy1', '/sprites/player/Ships/Enemies/Enemies-1.png');
    this.load.image('enemy2', '/sprites/player/Ships/Enemies/Enemies-4.png');
    this.load.image('enemy3', '/sprites/player/Ships/Enemies/Enemies-6.png');
    this.load.spritesheet('explosion', '/sprites/player/Explosion/explosion.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('boss', '/sprites/player/Ships/Enemies/Enemies-6b.png');
    this.load.image('bossProjectile', '/sprites/player/Projectiles/missile-2.png');
    this.load.image('bossProjectile2', '/sprites/player/Projectiles/projectile01-5.png');
  }

  create() {
    // Add scenes
    this.scene.add('BackgroundScene', BackgroundScene, true);
    this.scene.add('CollisionScene', CollisionScene, true);
    this.scene.bringToTop('main');

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

    // Add score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Start spawning enemies after a delay
    this.time.delayedCall(5000, this.startSpawningEnemies, [], this);

    // Spawn boss after a delay (e.g., 90 seconds)
    console.log('Boss will spawn in 90 seconds');
    this.time.delayedCall(90000, this.spawnBoss, [], this); // Ensure the delay is correct
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

      // Update score
      this.updateScore(5); // Assume 5 points for small enemies
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
    // Check if the number of active enemies is below the limit
    if (this.enemies.countActive(true) < this.maxEnemies) {
      const enemyImages = ['enemy1', 'enemy2', 'enemy3'];
      const numEnemies = Phaser.Math.Between(1, 3); // Random number of enemies to spawn (adjust as needed)

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

  startSpawningEnemies() {
    this.enemySpawnEvent = this.time.addEvent({
      delay: 3000, // Adjust delay as needed for enemy spawn rate
      callback: this.spawnEnemies,
      callbackScope: this,
      loop: true
    });
  }

  spawnBoss() {
    console.log('Boss is spawning');
    this.boss = this.physics.add.sprite(400, 50, 'boss'); // Spawn at the top
    this.boss.setScale(3);
    this.boss.setVelocity(0, 100); // Move down initially
    this.boss.health = 800;

    // Create boss projectiles
    this.bossProjectiles = this.physics.add.group({ 
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 100,
      runChildUpdate: true,
    });

    this.bossProjectiles2 = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 100,
      runChildUpdate: true,
    });

    this.physics.world.enable(this.bossProjectiles);
    this.physics.world.enable(this.bossProjectiles2);

    // Boss shooting 
    this.bossShootEvent1 = this.time.addEvent({
      delay: 1000,
      callback: () => this.shootBossProjectile(),
      loop: true
    });

    this.bossShootEvent2 = this.time.addEvent({
      delay: 1500,
      callback: () => this.shootBossProjectile2(),
      loop: true
    });

    // Timer to change boss direction periodically within the right center of the screen
    this.bossMoveEvent = this.time.addEvent({
      delay: 2000,
      callback: () => this.setBossRandomVelocity(),
      loop: true,
      callbackScope: this
    });

    // Collision detection for boss projectiles hitting the player
    this.physics.add.overlap(this.bossProjectiles, this.player, this.handlePlayerHit, null, this);
    this.physics.add.overlap(this.bossProjectiles2, this.player, this.handlePlayerHit, null, this);

    // Collision detection for player projectiles hitting the boss
    this.physics.add.overlap(this.projectiles, this.boss, this.handleBossHit, null, this);
  }

  setBossRandomVelocity() {
    if (this.boss && this.boss.active) {
      const minX = 600; // Constrain movement to the right side
      const maxX = 800;
      const minY = 100; // Constrain movement to the upper part of the screen
      const maxY = 500;
      const randomXVelocity = Phaser.Math.Between(-50, 50); // Control horizontal speed
      const randomYVelocity = Phaser.Math.Between(-50, 50); // Control vertical speed

      // Ensure the boss stays within the constrained area
      const newX = Phaser.Math.Clamp(this.boss.x + randomXVelocity, minX, maxX);
      const newY = Phaser.Math.Clamp(this.boss.y + randomYVelocity, minY, maxY);

      this.boss.setVelocity(newX - this.boss.x, newY - this.boss.y);
    }
  }

  shootBossProjectile() {
    const projectile = this.bossProjectiles.get(this.boss.x, this.boss.y, 'bossProjectile');
    if (projectile) {
      projectile.setActive(true);
      projectile.setVisible(true);
      projectile.body.velocity.x = -300; // Move left
      projectile.body.velocity.y = 0; // No vertical movement
      projectile.angle = 270; 
    }
  }

  shootBossProjectile2() {
    const projectile = this.bossProjectiles2.get(this.boss.x, this.boss.y, 'bossProjectile2');
    if (projectile) {
      projectile.setActive(true);
      projectile.setVisible(true);
      projectile.body.velocity.x = -300; // Move left
      projectile.body.velocity.y = 0; // No vertical movement
      projectile.angle = 270; 
    }
  }

  handlePlayerHit(player, projectile) {
    projectile.setActive(false).setVisible(false);
    projectile.destroy();

    // Handle player being hit by boss projectile
    player.setActive(false).setVisible(false);

    // Add explosion effect
    this.addExplosion(player.x, player.y);

    // Respawn player after delay
    this.respawnPlayer();
  }

  handleBossHit(boss, projectile) {
    projectile.setActive(false).setVisible(false);
    projectile.destroy();

    boss.health -= 10; // Decrease boss health

    if (boss.health <= 0) {
      boss.setActive(false).setVisible(false);

      // Add explosion effect
      this.addExplosion(boss.x, boss.y);

      // Stop boss shooting events
      this.bossShootEvent1.remove();
      this.bossShootEvent2.remove();
      this.bossMoveEvent.remove();

      // Stop enemy spawning event
      this.enemySpawnEvent.remove();

      // Remove boss from the scene
      this.physics.world.remove(boss);

      // Update score
      this.updateScore(10); // Assume 10 points for the boss

      // End game
      this.endGame();
    }
  }

  updateScore(points) {
    this.score += points;
    this.scoreText.setText('Score: ' + this.score);
  }

  endGame() {
    // Stop player movement
    this.canMoveSprite = false;

    // Display game over text
    const gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game Over... for now', {
      fontSize: '64px',
      fill: '#fff'
    }).setOrigin(0.5);

    // Create a semi-transparent background for the text
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.7); // Black with 70% opacity
    background.fillRect(gameOverText.x - gameOverText.width / 2 - 20, gameOverText.y - gameOverText.height / 2 - 20, gameOverText.width + 40, gameOverText.height + 40);
    background.setDepth(-1); // Ensure the background is behind the text
  }
}

export default PhaserGame;