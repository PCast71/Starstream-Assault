import Phaser from 'phaser';

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BackgroundScene' });
  }

  preload() {
    // Load background assets
    this.load.image('background1', 'sprites/background/stars_1.png');
    this.load.image('nebula1', 'sprites/background/nebula_a_purple.png');
    this.load.image('nebula2', 'sprites/background/nebula_c_blue.png');
    this.load.image('nebula3', 'sprites/background/nebula_b_red.png');
    this.load.image('planet', 'sprites/background/planet_green.png');

    // Load music tracks - Ensure correct paths and file names
    this.load.audio('backgroundMusic1', 'sprites/background/14. Accident Road.mp3');
    this.load.audio('backgroundMusic2', 'sprites/background/18. Boss on Parade 4 MK II.mp3');
    this.load.audio('gameOverSound', 'sprites/background/21. Game Over.mp3');
  }

  create() {
    // Set the width and height of the game
    const gameWidth = 1400;
    const gameHeight = 800;

    // Add background tile sprite
    this.background1 = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'background1');

    // Add nebula images with parallax effect
    this.nebula1 = this.add.image(gameWidth / 2, gameHeight / 2, 'nebula1');
    this.nebula1.setScrollFactor(0.3); // Adjust scroll factor for parallax effect

    this.nebula2 = this.add.image(gameWidth / 2, gameHeight / 2, 'nebula2');
    this.nebula2.setScrollFactor(0.2); // Adjust scroll factor for parallax effect

    this.nebula3 = this.add.image(gameWidth / 2, gameHeight / 2, 'nebula3');
    this.nebula3.setScrollFactor(0.1); // Adjust scroll factor for parallax effect

    // Add a shiny planet in the background
    this.planet = this.add.image(gameWidth * 0.8, gameHeight * 0.5, 'planet');
    this.planet.setDisplaySize(800, 800); // Make the planet big
    this.planet.setTint(0x0000ff); // Add a glowing effect
    this.planet.setAlpha(0.05); // Adjust opacity to make it look distant
    this.planet.setScrollFactor(0); // Ensure the planet doesn't scroll with the camera

    // Create a specular highlight for the planet
    const shine = this.add.image(this.planet.x, this.planet.y, 'planet');
    shine.setDisplaySize(800, 800);
    shine.setTint(0x70a3cc);
    shine.setAlpha(0.5); // Adjust opacity to blend with the planet
    shine.setBlendMode(Phaser.BlendModes.ADD); // Set blend mode to add for shine effect
    shine.setScrollFactor(0); // Ensure the shine doesn't scroll with the camera

    // Add and play the first background music
    this.music1 = this.sound.add('backgroundMusic1', {
      loop: true,
      volume: 0.3, // Adjust volume
    });
    this.music1.play();


    // Add other audio tracks to the cache
    this.music2 = this.sound.add('backgroundMusic2', { volume: 0.3 });
    this.gameOverSound = this.sound.add('gameOverSound', { volume: 0.3 });

  }

  // Method to handle boss death
  handleBossDeath() {
    // Stop the boss battle music
    if (this.music2) {
      this.music2.stop();
    }

    // Play the game over sound
    this.gameOverSound.play();

    // Transition to game over scene or perform any other game over logic
    // Example:
    // this.scene.start('GameOverScene');
  }

  update() {
    // Ensure background1 is defined
    if (this.background1) {
      this.background1.tilePositionX += 0.4; // Adjust horizontal scroll speed
      this.background1.tilePositionY += 0.4; // Adjust vertical scroll speed
    }
  }
}

export default BackgroundScene;
