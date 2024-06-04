import Phaser from 'phaser';

class EnemyCollisionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EnemyCollisionScene' });
  }

  preload() {
    // Load player, enemy, and projectile assets
    this.load.image('player', '/sprites/player.png');
    this.load.image('enemy', '/sprites/enemy.png');
    this.load.image('projectile', '/sprites/projectile.png'); // Add projectile asset
  }

  create() {
    // Create player sprite
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.health = 100; // Add health property to player

    // Create enemy sprite
    this.enemy = this.physics.add.sprite(400, 300, 'enemy');
    this.enemy.health = 100; // Add health property to enemy

    // Enable physics for player and enemy
    this.physics.world.enable([this.player, this.enemy]);

    // Set up collision detection between player and enemy
    this.physics.add.collider(this.player, this.enemy, this.handleCollision, null, this);

    // Create health bar graphics object
    this.healthBar = this.add.graphics();
    this.updateHealthBar(); // Initial health bar setup

    // Create a group for projectiles
    this.projectiles = this.physics.add.group();

    // Set up collision detection between projectiles and enemy
    this.physics.add.collider(this.projectiles, this.enemy, this.handleProjectileCollision, null, this);

    // Shoot projectiles on pointer click
    this.input.on('pointerdown', this.shootProjectile, this);
  }

  handleCollision(player, enemy) {
    // Remove enemy sprite
    enemy.destroy();
    
    // Decrease player's health
    this.player.health -= 20; // Adjust the damage value as needed

    // Check if player health is zero or below
    if (this.player.health <= 0) {
      this.player.health = 0;
      // Handle player death (e.g., restart scene, game over screen, etc.)
      this.scene.restart(); // Restart the scene for simplicity
    } else {
      // Update health bar
      this.updateHealthBar();
    }
  }

  handleProjectileCollision(projectile, enemy) {
    // Destroy projectile
    projectile.destroy();
    
    // Decrease enemy's health
    enemy.health -= 20; // Adjust the damage value as needed

    // Check if enemy health is zero or below
    if (enemy.health <= 0) {
      enemy.health = 0;
      // Handle enemy death (e.g., remove enemy, add points, etc.)
      enemy.destroy();
    }
  }

  updateHealthBar() {
    this.healthBar.clear();

    // Draw background bar
    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(10, 10, 100, 20);

    // Draw health bar
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(10, 10, this.player.health, 20);
  }

  shootProjectile(pointer) {
    // Create a projectile sprite at the player's position
    const projectile = this.projectiles.create(this.player.x, this.player.y, 'projectile');

    // Set velocity for the projectile towards the pointer
    this.physics.moveTo(projectile, pointer.x, pointer.y, 600); // Adjust speed as needed

    // Destroy the projectile after a certain time to prevent memory leaks
    this.time.delayedCall(2000, () => {
      if (projectile.active) {
        projectile.destroy();
      }
    }, null, this);
  }
}

export default EnemyCollisionScene;
