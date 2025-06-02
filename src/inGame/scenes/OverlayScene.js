import Phaser from 'phaser';
import { EventBus } from '../EventBus';

export default class LightingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene', active: true });
    this.currentPeriod = null;
    this.currentAmbient = 0xffffff; // Track current color
  }

  create() {
    this.lights.enable().setAmbientColor(this.currentAmbient);
    this.game.lightingScene = this;

    EventBus.on('phaser-time-update', ({ hour }) => {
      this.setTimeByHour(hour);
      console.log("It enters the Event Bus!");
    });

    this.events.once('shutdown', () => {
      EventBus.off('phaser-time-update');
    });
  }

  setTimeByHour(hour) {
    const isNight = hour >= 19 || hour < 6;
    if (isNight && this.currentPeriod !== 'night') {
      this.currentPeriod = 'night';
      this.transitionAmbientColor(0x222244);
    } else if (!isNight && this.currentPeriod !== 'day') {
      this.currentPeriod = 'day';
      this.transitionAmbientColor(0xffffff);
    }
  }

  transitionAmbientColor(toColor, duration = 1000) {
    const fromColor = Phaser.Display.Color.ValueToColor(this.currentAmbient);
    const target = Phaser.Display.Color.ValueToColor(toColor);

    this.tweens.addCounter({
      from: 0, to: 100, duration,
      onUpdate: tween => {
        const t = tween.getValue();
        const { r, g, b } = Phaser.Display.Color.Interpolate.ColorWithColor(fromColor, target, 100, t);
        const interpolated = Phaser.Display.Color.GetColor(r, g, b);
        this.lights.setAmbientColor(interpolated);
        this.currentAmbient = interpolated; // ✅ Track it here!
      }
    });
  }
}
