import Phaser from 'phaser';

class CollisionScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CollisionScene' });
  }

  create() {
    // Add collision detection
    this.physics.add.collider(this.player, this.enemy, this.handleCollision, null, this);
    this.physics.add.overlap(this.projectiles, this.enemy, this.handleProjectileHit, null, this);
  }

  handleCollision(player, enemy) {
    player.setActive(false).setVisible(false);
    enemy.setActive(false).setVisible(false);
    // Add explosion effect
    this.addExplosion(player.x, player.y);
    this.addExplosion(enemy.x, enemy.y);
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
    }
  }

  addExplosion(x, y) {
    const explosion = this.add.sprite(x, y, 'explosion');
    explosion.play('explode');
    this.time.delayedCall(500, () => {
      explosion.destroy();
    });
  }
}

export default CollisionScene;
