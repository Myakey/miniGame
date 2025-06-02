import Phaser from "phaser";
import { EventBus } from "../EventBus";

export class LightingManager {
  constructor(scene) {
    this.scene = scene;
    this.currentPeriod = null;
    this.currentAmbient = 0xffffff;

    EventBus.on("phaser-time-update", ({ hour }) => {
      this.setTimeByHour(hour);
    });
  }

  setTimeByHour(hour) {
    let period, color;

    if (hour >= 6 && hour < 17) {
      period = "day";
      color = 0xffffff; // bright daylight
    } else if (hour >= 17 && hour < 19) {
      period = "sunset";
      color = 0xff9966; // warm sunset
    } else if (hour >= 19 || hour < 5) {
      period = "night";
      color = 0x222244; // dark night
    } else if (hour >= 5 && hour < 6) {
      period = "sunrise";
      color = 0xffcc99; // soft morning light
    }

    if (this.currentPeriod !== period) {
      this.currentPeriod = period;
      this.transitionAmbientColor(color);
    }
  }

  transitionAmbientColor(toColor, duration = 1000) {
    const fromColor = Phaser.Display.Color.ValueToColor(this.currentAmbient);
    const target = Phaser.Display.Color.ValueToColor(toColor);

    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration,
      onUpdate: (tween) => {
        const t = tween.getValue();
        const { r, g, b } = Phaser.Display.Color.Interpolate.ColorWithColor(
          fromColor,
          target,
          100,
          t
        );
        const interpolated = Phaser.Display.Color.GetColor(r, g, b);
        this.scene.lights.setAmbientColor(interpolated);
        this.currentAmbient = interpolated;
      },
    });
  }

  initializeWithHour(hour) {
    this.setTimeByHour(hour);
  }
}

