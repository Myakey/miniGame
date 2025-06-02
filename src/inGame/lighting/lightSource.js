// LightSource.js
import { EventBus } from "../EventBus";

export class LightSource {
  constructor(scene, x, y, config = {}) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    // Configurable properties with fallbacks
    this.baseRadius = config.radius || 150;
    this.baseColor = Phaser.Display.Color.HexStringToColor(config.color || "#ffffff").color;
    this.baseIntensity = config.intensity || 1.0;
    this.nightOnly = config.nightOnly || true; // only active at night?

    // Add the light
    this.light = scene.lights.addLight(x, y, this.baseRadius, this.baseColor, this.baseIntensity);

    // Set initial visibility
    this.updateLightByHour(config.initialHour || 12);

    // Listen for hour updates
    EventBus.on("phaser-time-update", ({ hour }) => {
      this.updateLightByHour(hour);
    });
  }

  updateLightByHour(hour) {
    const isNight = hour >= 19 || hour < 6;

    if (this.nightOnly) {
      this.light.setVisible(isNight);
    } else {
      // Optional: you could adjust intensity based on time of day here
      this.light.setVisible(true);
    }
  }

  initializeWithHour(hour) {
    this.updateLightByHour(hour);
  }
}
