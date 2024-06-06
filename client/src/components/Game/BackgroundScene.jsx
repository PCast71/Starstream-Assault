import Phaser from 'phaser';

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BackgroundScene' });
  }

  preload() {
    // Load background assets
    this.load.image('background1', '/sprites/background/stars_1.png');
    this.load.image('planet', '/sprites/background/planet_orange.png');
  }

  create() {
    // Set the width and height of the game
    const gameWidth = 1400;
    const gameHeight = 800;

    // Add background image as tile sprite
    this.background1 = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'background1');
    this.background1.setDepth(-1); // Set depth behind other objects
    this.background1.setScrollFactor(0); // Make background static

    // Add planet image
    this.planet = this.add.image(gameWidth / 7, gameHeight / 7, 'planet');
    this.planet.setScale(2); // Scale the planet image
    this.planet.setDepth(-2); // Set depth behind other objects

  }

  update() {
    // Move the background to the left
    this.background1.tilePositionX += 0.25; // Adjust the velocity as needed
  }
}

export default BackgroundScene;
