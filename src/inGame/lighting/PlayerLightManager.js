import { EventBus } from "../EventBus";

export class PlayerLightManager {
  constructor(scene, player, options = {}) {
    this.scene = scene;
    this.player = player;
    this.radius = options.radius || 200;
    this.intensity = options.intensity || 3;
    this.enabled = true;
    this.temp = this.intensity; // Temporary variable for intensity

    this.color = options.color || 0x222244;

    this.light = this.scene.lights
      .addLight(player.x, player.y, this.radius)
      .setColor(this.color)
      .setIntensity(0); // Start at 0 for smooth entry

    this.player.setPipeline("Light2D");

    this.scene.events.on("update", this.update, this);
    this.scene.events.once("shutdown", this.destroy, this);

    EventBus.on("phaser-time-update", this.onTimeUpdate, this);
  }

  update() {
    if (this.enabled) {
      this.light.x = this.player.x;
      this.light.y = this.player.y;
    }
  }

  onTimeUpdate({ hour }) {
    const periodColor = this.getColorForHour(hour);
    this.transitionColor(periodColor);

    const isNight = hour >= 19 || hour < 5;
    if (isNight) {
      console.log("Night time detected, enabling light");
      this.enable();
    } else {
      this.disable();
    }
  }

  getColorForHour(hour) {
    if (hour >= 6 && hour < 17) {
      return 0xffffff;
    } else if (hour >= 17 && hour < 19) {
      return 0xff9966;
    } else if (hour >= 19 || hour < 5) {
      return 0x222244;
    } else if (hour >= 5 && hour < 6) {
      return 0xffcc99;
    }
  }

  transitionColor(toColor, duration = 1000) {
    const fromColor = Phaser.Display.Color.ValueToColor(this.color);
    const targetColor = Phaser.Display.Color.ValueToColor(toColor);

    this.scene.tweens.addCounter({
      from: 0,
      to: 100,
      duration,
      onUpdate: (tween) => {
        const t = tween.getValue();
        const { r, g, b } = Phaser.Display.Color.Interpolate.ColorWithColor(
          fromColor,
          targetColor,
          100,
          t
        );
        const interpolated = Phaser.Display.Color.GetColor(r, g, b);
        this.setColor(interpolated);
      },
    });

    this.color = toColor;
  }

  transitionIntensity(toIntensity, duration = 1000, onComplete = null) {
    const fromIntensity = this.light.intensity;
    console.log(
      "Transitioning intensity from",
      fromIntensity,
      "to",
      toIntensity
    );

    this.scene.tweens.addCounter({
      from: fromIntensity,
      to: toIntensity,
      duration,
      ease: "Sine.easeInOut",
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.light.setIntensity(value);
      },
      onComplete: () => {
        this.intensity = toIntensity;
        if (onComplete) onComplete();
      },
    });
  }

  setColor(color) {
    this.color = color;
    this.light.setColor(color);
  }

  setIntensity(
    intensity,
    transition = true,
    duration = 1000,
    onComplete = null
  ) {
    if (transition) {
      this.transitionIntensity(intensity, duration, onComplete);
    } else {
      this.intensity = intensity;
      this.light.setIntensity(intensity);
      if (onComplete) onComplete();
    }
  }

  enable() {
  if (!this.enabled || this.light.intensity === 0) {
    console.log("Enabling PlayerLightManager light");

    // Mark light as not yet active to avoid render flash
    this.light.setIntensity(0);
    this.player.setPipeline("Light2D");

    // Transition in FIRST, then mark as enabled
    this.setIntensity(this.temp, true, 1000, () => {
      this.enabled = true;
      this.intensity = this.temp;
      console.log("Light fade-in complete");
    });
  }
}



  disable() {
    if (this.enabled) {
      console.log("Disabling PlayerLightManager light");
      this.setIntensity(0, true, 1000, () => {
        this.enabled = false;
      });
    }
  }

  destroy() {
    this.scene.events.off("update", this.update, this);
    EventBus.off("phaser-time-update", this.onTimeUpdate, this);
    this.scene.lights.removeLight(this.light);
  }

  initializeWithHour(hour) {
    console.log("Initializing PlayerLightManager with hour:", hour);
    const isNight = hour >= 19 || hour < 5;

    // Immediately apply correct state
    const color = this.getColorForHour(hour);
    this.setColor(color);

    if (isNight) {
      this.enabled = true;
      this.setIntensity(this.intensity); // no transition for first frame
    } else {
      this.enabled = false;
      this.setIntensity(0);
    }
  }
}
