import { EventBus } from '../EventBus';

export class PlayerLightManager {
  constructor(scene, player, options = {}) {
    this.scene = scene;
    this.player = player;
    this.radius = options.radius || 200;
    this.color = options.color || 0xffffff;
    this.intensity = options.intensity || 3;
    this.enabled = true;

    this.light = this.scene.lights.addLight(player.x, player.y, this.radius)
      .setColor(this.color)
      .setIntensity(this.intensity);

    this.player.setPipeline('Light2D');

    this.scene.events.on('update', this.update, this);
    this.scene.events.once('shutdown', this.destroy, this);

    // Listen to time updates to toggle player light on/off
    EventBus.on('phaser-time-update', this.onTimeUpdate, this);
  }

  update() {
    if (this.enabled) {
      this.light.x = this.player.x;
      this.light.y = this.player.y;
    }
  }

  onTimeUpdate({ hour }) {
    const isNight = hour >= 19 || hour < 6;
    if (isNight) {
      this.enable();
    } else {
      this.disable();
    }
  }

  setColor(color) {
    this.color = color;
    this.light.setColor(color);
  }

  setIntensity(intensity) {
    this.intensity = intensity;
    if (this.enabled) {
      this.light.setIntensity(intensity);
    }
  }

  enable() {
    if (!this.enabled) {
      this.enabled = true;
      this.light.setIntensity(this.intensity);
    }
  }

  disable() {
    if (this.enabled) {
      this.enabled = false;
      this.light.setIntensity(0);
    }
  }

  destroy() {
    this.scene.events.off('update', this.update, this);
    EventBus.off('phaser-time-update', this.onTimeUpdate, this);
    this.scene.lights.removeLight(this.light);
  }

  initializeWithHour(hour) {
    console.log("Initializing PlayerLightManager with hour:", hour);
    this.onTimeUpdate({ hour });
  }
}

