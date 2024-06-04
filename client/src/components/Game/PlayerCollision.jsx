import Phaser from 'phaser';

class EnemyCollisionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EnemyCollisionScene' });
  }

  preload() {
    // Load player and enemy assets
    this.load.image('player', '/sprites/player.png');
    this.load.image('enemy', '/sprites/enemy.png');
  }

  create() {
    // Create player sprite
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.health = 100; // Add health property to player
    
    // Create enemy sprite
    this.enemy = this.physics.add.sprite(400, 300, 'enemy');
    
    // Enable physics for player and enemy
    this.physics.world.enable([this.player, this.enemy]);
    
    // Set up collision detection between player and enemy
    this.physics.add.collider(this.player, this.enemy, this.handleCollision, null, this);

    // Create health bar graphics object
    this.healthBar = this.add.graphics();
    this.updateHealthBar(); // Initial health bar setup
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

  updateHealthBar() {
    this.healthBar.clear();

    // Draw background bar
    this.healthBar.fillStyle(0x000000);
    this.healthBar.fillRect(10, 10, 100, 20);

    // Draw health bar
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(10, 10, this.player.health, 20);
  }
}

export default EnemyCollisionScene;















