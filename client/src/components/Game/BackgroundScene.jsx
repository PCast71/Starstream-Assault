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

    // Load music tracks
    this.load.audio('backgroundMusic1', 'sprites/background/14. Accident Road.mp3');
    this.load.audio('backgroundMusic2', 'sprites/background/18. Boss on Parade 4 MK II.mp3');
    this.load.audio('gameOverSound', 'sprites/background/21. Game Over.mp3');
  }

  create() {
    // Add background images
    this.add.image(0, 0, 'background1').setOrigin(0).setDisplaySize(this.game.config.width, this.game.config.height);
    this.add.image(0, 0, 'nebula1').setOrigin(0).setDisplaySize(this.game.config.width, this.game.config.height);
    this.add.image(0, 0, 'nebula2').setOrigin(0).setDisplaySize(this.game.config.width, this.game.config.height);
    this.add.image(0, 0, 'nebula3').setOrigin(0).setDisplaySize(this.game.config.width, this.game.config.height);
    const planet = this.add.image(this.game.config.width * 0.8, this.game.config.height * 0.5, 'planet');
    planet.setDisplaySize(800, 800).setTint(0x0000ff).setAlpha(0.05);

    // Create a shine effect for the planet
    const shine = this.add.image(planet.x, planet.y, 'planet').setDisplaySize(800, 800).setTint(0x70a3cc).setAlpha(0.5);
    shine.setBlendMode(Phaser.BlendModes.ADD);

    // Add background music
    this.music1 = this.sound.add('backgroundMusic1', { loop: true, volume: 0.3 });
    this.music2 = this.sound.add('backgroundMusic2', { volume: 0.3 });
    this.gameOverSound = this.sound.add('gameOverSound', { volume: 0.3 });

    // Play the first background music
    this.music1.play();
  }

  // Method to handle boss death
  handleBossDeath() {
    if (this.music2) {
      this.music2.stop();
    }
    this.gameOverSound.play();
  }

  // Method to play boss music
  playBossMusic() {
    if (this.music2) {
      this.music2.play();
    }
  }
}

export default BackgroundScene;
