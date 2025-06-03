// LightSource.js
import { EventBus } from "../EventBus";

export class LightSource {
  constructor(scene, x, y, config = {}) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    // Configurable properties
    this.baseRadius = config.radius || 150;
    console.log("INSIDD THE CONFIG" + config.color);
    this.baseColor = Phaser.Display.Color.HexStringToColor(config.color || "#ffffff").color;
    console.log("LightSource color:", this.baseColor);
    this.baseIntensity = config.intensity || 1.0;
    this.nightOnly = config.nightOnly !== undefined ? config.nightOnly : true;

    // Internal state
    this.currentPeriod = null;
    this.visible = false;

    // Add the light (start off)
    this.light = scene.lights.addLight(x, y, this.baseRadius, this.baseColor, 0);

    // Init based on initial hour
    this.updateLightByHour(config.initialHour || 12);

    // Listen for hour updates
    EventBus.on("phaser-time-update", ({ hour }) => {
      this.updateLightByHour(hour);
    });
  }

  updateLightByHour(hour) {
    const newPeriod = this.getPeriodForHour(hour);

    if (newPeriod !== this.currentPeriod) {
      this.currentPeriod = newPeriod;

      if (this.nightOnly) {
        if (newPeriod === "night" || newPeriod === "sunrise") {
          // Wait for ambient transition
          EventBus.once("ambient-transition-complete", (period) => {
            if (period === newPeriod) {
              console.log(`[LightSource] Ambient transition complete for '${period}'`);
              this.fadeIn();
            }
          });
          this.fadeOut(); // Start fade out until ambient confirms
        } else {
          this.fadeOut();
        }
      } else {
        // Always show regardless of time
        this.fadeIn();
      }
    }
  }

  getPeriodForHour(hour) {
    if (hour >= 5 && hour < 17) return "day";
    if (hour >= 17 && hour < 19) return "sunset";
    if (hour >= 19 || hour < 5) return "night";
    // if (hour >= 5 && hour < 6) return "sunrise";
    return "unknown";
  }

  fadeIn(duration = 1000) {
    if (!this.visible) {
      this.visible = true;
      this.scene.tweens.addCounter({
        from: this.light.intensity,
        to: this.baseIntensity,
        duration,
        ease: "Sine.easeInOut",
        onUpdate: (tween) => {
          this.light.setIntensity(tween.getValue());
        }
      });
    }
  }

  fadeOut(duration = 1000) {
    if (this.visible) {
      this.visible = false;
      this.scene.tweens.addCounter({
        from: this.light.intensity,
        to: 0,
        duration,
        ease: "Sine.easeInOut",
        onUpdate: (tween) => {
          this.light.setIntensity(tween.getValue());
        }
      });
    }
  }

  initializeWithHour(hour) {
    this.updateLightByHour(hour);
  }

  destroy() {
    EventBus.off("phaser-time-update", this.updateLightByHour, this);
    this.scene.lights.removeLight(this.light);
  }
}



