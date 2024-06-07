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

    // Music tracks
    this.load.audio('backgroundMusic1', 'sprites/background/14. Accident Road.mp3');
    this.load.audio('backgroundMusic2', 'sprites/background/18. Boss on Parade 4 MK II.mp3');
    this.load.audio('gameOverSound', 'sprites/background/21. Game Over.mp3');
  }

  create() {
    // Set the width and height of the game
    const gameWidth = 1400;
    const gameHeight = 800;

    // Create nebulas group
    this.nebulas = this.add.group();
    
    // Add background image as tile sprite
    this.background1 = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'background1');
    this.background1.setScrollFactor(0); // Make background static
    this.background1.setDepth(0); // Set depth for background
    
    // Add and play the first background music
    this.music1 = this.sound.add('backgroundMusic1', {
      loop: false,
      volume: 0.5,
    });

    // Add the second background music (boss music)
    this.music2 = this.sound.add('backgroundMusic2', {
      loop: true, // Loop until the boss is defeated
      volume: 0,
    });

    // Add the game over sound
    this.gameOverSound = this.sound.add('gameOverSound', {
      loop: false,
      volume: 0.5,
    });

    // Play the first music track
    this.music1.play();

    // Set a timer to transition the music tracks after 1 minute and 30 seconds
    this.time.delayedCall(90000, this.transitionToBossMusic, [], this); // 90000ms = 1.5 minutes

    // Create nebulas
    for (let i = 0; i < 5; i++) {
      const nebula = this.nebulas.create(
        Phaser.Math.Between(0, gameWidth),
        Phaser.Math.Between(0, gameHeight),
        'nebula' + Phaser.Math.Between(1, 3)
      );
      nebula.speed = Phaser.Math.FloatBetween(0.1, 0.5);
      nebula.setDepth(1); // Set depth for nebulas
    }
  }

  transitionToBossMusic() {
    // Start playing the boss music
    this.music2.play();

    // Create a fade effect for both tracks over 4 seconds
    const fadeDuration = 4000;
    const fadeStep = 100; // How often to update the volume (in ms)
    const fadeSteps = fadeDuration / fadeStep;
    let currentStep = 0;

    this.time.addEvent({
      delay: fadeStep,
      repeat: fadeSteps - 1,
      callback: () => {
        currentStep++;
        this.music1.setVolume(0.5 - (currentStep * 0.5 / fadeSteps));
        this.music2.setVolume(currentStep * 0.5 / fadeSteps);
      },
    });

    // Stop the first track after fading out
    this.time.delayedCall(fadeDuration, () => {
      this.music1.stop();
    });
  }

  // Call this method when the boss is defeated
  onBossDefeated() {
    // Fade out the boss music and play the game over sound
    const fadeDuration = 4000;
    const fadeStep = 100; // How often to update the volume (in ms)
    const fadeSteps = fadeDuration / fadeStep;
    let currentStep = 0;

    this.time.addEvent({
      delay: fadeStep,
      repeat: fadeSteps - 1,
      callback: () => {
        currentStep++;
        this.music2.setVolume(0.5 - (currentStep * 0.5 / fadeSteps));
      },
    });

    this.time.delayedCall(fadeDuration, () => {
      this.music2.stop();
      this.gameOverSound.play();
    });
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
