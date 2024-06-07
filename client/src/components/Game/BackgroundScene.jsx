import Phaser from 'phaser';

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BackgroundScene' });
  }

  preload() {
    // Load background assets
    this.load.image('background1', '/sprites/background/stars_1.png');
    this.load.image('nebula1', '/sprites/background/nebula_a_purple.png');
    this.load.image('nebula2', '/sprites/background/nebula_c_blue.png');
    this.load.image('nebula3', '/sprites/background/nebula_b_red.png');
    this.load.image('player', '/sprites/player/Ships/blue-1.png'); 
  }

  create() {
    // Set the width and height of the game
    const gameWidth = 1400;
    const gameHeight = 800;

    // Create nebulas group
    this.nebulas = this.add.group();

    // Add background image as tile sprite
    this.background1 = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'background1');
    this.background1.setDepth(-10000000000000); // Set depth behind other objects
    this.background1.setScrollFactor(0); // Make background static

    // Create nebulas
    for (let i = 0; i < 5; i++) {
      const nebula = this.nebulas.create(
        Phaser.Math.Between(0, gameWidth),
        Phaser.Math.Between(0, gameHeight),
        'nebula' + Phaser.Math.Between(1, 3)
      );
      nebula.setDepth(-2); // Set depth behind the player sprite
      nebula.speed = Phaser.Math.FloatBetween(0.1, 0.5);
    }
  }

  update() {
    // Move the background to the left
    this.background1.tilePositionX += 1.5; // Adjust the velocity as needed

    // Update nebulas' positions
    this.nebulas.children.iterate(nebula => {
      nebula.x -= nebula.speed;
      if (nebula.x < -nebula.width) {
        nebula.x = this.scale.width;
        nebula.y = Phaser.Math.Between(0, this.scale.height);
      }
    });
  }
}

export default BackgroundScene;
