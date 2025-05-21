import Phaser from 'phaser';

export default class DanmakuScene extends Phaser.Scene {
  constructor() {
    super('DanmakuScene');
  }

  preload() {
    // Load player and bullet assets
    this.load.image('player', 'assets/player.png'); // 32x32 or similar
    this.load.image('enemyBullet', 'assets/bullet.png');
  }

  create() {
    // Player
    this.player = this.physics.add.sprite(400, 500, 'player');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    // Bullet group
    this.enemyBullets = this.physics.add.group();

    // Fire bullet patterns
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => this.spawnBulletCircle(400, 100, 12, 100),
    });

    // Player hit detection
    this.physics.add.overlap(this.player, this.enemyBullets, () => {
      this.scene.restart(); // Restart on hit
    });
  }

  update(time, delta) {
    this.handlePlayerMovement();
  }

  handlePlayerMovement() {
    const speed = 200;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
    if (this.cursors.right.isDown) this.player.setVelocityX(speed);
    if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
    if (this.cursors.down.isDown) this.player.setVelocityY(speed);
  }

  spawnBulletCircle(x, y, count, speed) {
    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const bullet = this.enemyBullets.create(x, y, 'enemyBullet');
      bullet.setVelocity(vx, vy);
      bullet.setCollideWorldBounds(false);
      bullet.setScale(0.5);
    }
  }
}
