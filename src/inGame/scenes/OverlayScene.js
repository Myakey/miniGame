import Phaser from 'phaser';
import { EventBus } from '../EventBus';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene', active: true });
  }

  create() {
    this.scene.bringToTop();
    console.log('OverlayScene create() called');
    this.overlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(999)
      .setScrollFactor(0);

    this.scale.on('resize', (gameSize) => {
    const { width, height } = gameSize;
    this.overlay.setSize(width, height);
  });

    // Use global game event emitter for night/day tint events
    this.game.events.on('set-night', () => {
      this.tweens.add({
        targets: this.overlay,
        alpha: 0.5,
        duration: 1000,
        ease: 'Sine.easeInOut',
      });
    });

    this.game.events.on('set-day', () => {
      this.tweens.add({
        targets: this.overlay,
        alpha: 0,
        duration: 1000,
        ease: 'Sine.easeInOut',
      });
    });

    // Listen to your external event bus for time updates
    EventBus.on('phaser-time-update', ({ hour }) => {
        console.log(`OverlayScene received time update: ${hour}h`);
      this.updateOverlayByHour(hour);
    });

    this.events.once('shutdown', () => {
      this.game.events.off('set-night');
      this.game.events.off('set-day');
      EventBus.off('phaser-time-update');
    });
  }

  updateOverlayByHour(hour) {
    if (hour >= 18 || hour < 6) {
      this.game.events.emit('set-night');
    } else {
      this.game.events.emit('set-day');
    }
  }
}

