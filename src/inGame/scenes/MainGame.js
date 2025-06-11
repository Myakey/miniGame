import Phaser from "phaser";
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";
// import trialMap from "../../assets/image/InGame/maps/Trial.tmj"
import { useNavigate } from "react-router-dom";
import { handleMovement } from "../movements/handleMovement";
import setupPlayerMovement from "../movements/pathFinding";
import { SceneRegistry } from "../SceneRegistry";
import { FlowerField } from "./flowerField";

import { LightingManager } from "../lighting/LightingManager";
import { PlayerLightManager } from "../lighting/PlayerLightManager";
import { LightSource } from "../lighting/lightSource";

import { setupInteractionHandler } from "../../utils/interactionManager";

export class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: "MainGame" });
  }

  preload() {
    GameState.currentlocation.currentLoc = "MainGame";
    EventBus.emit("OnLocationChange", { location: "Small Gensokyo" });
  }

  generateTriggerZone() {
    this.inTriggerZone = null;

    const zones = [
      { x: 170, y: 280, w: 50, h: 50, id: 1 },
      { x: 790, y: 200, w: 50, h: 50, id: 2 },
      { x: 240, y: 650, w: 50, h: 50, id: 3 },
      { x: 900, y: 650, w: 50, h: 50, id: 4 },
      { x: 1270, y: 450, w: 50, h: 50, id: 5 },
      { x: 1000, y: 300, w: 100, h: 100, id: 6 },
    ];

    this.triggerZones = [];

    zones.forEach((zone) => {
      const triggerZone = this.add.zone(zone.x, zone.y, zone.w, zone.h);
      this.physics.world.enable(triggerZone);
      triggerZone.body.setAllowGravity(false);
      triggerZone.body.setImmovable(true);
      triggerZone.triggerId = zone.id; // Add custom property

      this.triggerZones.push(triggerZone);

      this.physics.add.overlap(
        this.player,
        triggerZone,
        () => {
          this.handleTrigger(zone.id);
        },
        null,
        this
      );
    });

    this.interactKey = this.input.keyboard.addKey("E");
  }

  handleTrigger(id) {
    this.inTriggerZone = id;
  }

  generatePlaces() {
    const trySceneChange = () => {
      if (!this.inTriggerZone) return;

      const sceneMap = {
        1: "BlokM",
        2: "Dieng",
        3: "HakureiShrine",
        4: "FlowerField",
        5: "Pantai",
        6: "debugScene",
      };

      const targetScene = sceneMap[this.inTriggerZone];
      if (!targetScene) return;

      const enteringText = this.add
        .text(
          this.cameras.main.centerX,
          -50,
          `Entering ${sceneMap[this.inTriggerZone]}...`,
          {
            fontSize: "48px",
            fill: "#ffffff",
            fontStyle: "bold",
            resolution: 2,
          }
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0);

      this.tweens.add({
        targets: enteringText,
        y: this.cameras.main.centerY,
        duration: 400,
        ease: "Sine.easeOut",
      });

      this.cameras.main.fadeOut(1000, 0, 0, 0);

      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.SaveState();
        enteringText.destroy();
        this.scene.start(targetScene);
      });
    };

    this.interactKey.on("down", trySceneChange);

    // Gamepad X (button index 2)
    this.input.gamepad.on("down", (pad, button, index) => {
      if (index === 2) trySceneChange();
    });
  }

  create() {
    SceneRegistry.setScene(this.scene.key, this);
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const map = this.add.tilemap("map");
    const ground = map.addTilesetImage("TILEMAPS", "GroundTile");
    const sunflowers = map.addTilesetImage("flower", "sunflowers");
    const decoration = map.addTilesetImage("blokM", "MainDetails");
    const home = map.addTilesetImage("home", "Home");
    const galletcity = map.addTilesetImage("blokM2", "galletcity");
    const torches = map.addTilesetImage("obor", "torches");
    const legends = map.addTilesetImage("legends", "legends");

    const groundLayer = map
      .createLayer("Ground", ground)
      .setPipeline("Light2D");
    const tempatLayer = map
      .createLayer("tempat", [home, decoration, sunflowers, galletcity])
      .setPipeline("Light2D");
    const detailsLayer = map
      .createLayer("details", [decoration, home])
      .setPipeline("Light2D");
    const grassLayer = map.createLayer("grass", [ground, torches]).setPipeline("Light2D");

    const startX = GameState.pos_x;
    const startY = GameState.pos_y;

    this.player = this.physics.add
      .sprite(startX, startY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);

    const legendsLayer = map.createLayer("legends", legends);
    legendsLayer.setDepth(2);

    tempatLayer.setDepth(2);

    if (this.sys.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this.lights.enable();
      this.lights.setAmbientColor(0xffffff);

      this.lightingManager = new LightingManager(this);


      const currentHour = this.currentHour();

      // Add light source:
      this.playerLightManager = new PlayerLightManager(this, this.player, {
        radius: 200,
        color: 0xffffff,
        intensity: 6,
      });

      this.lights
        .addLight(this.scale.width / 4, this.scale.height / 4, 600)
        .setColor(0x6688cc)
        .setIntensity(0.9);

      this.lightingManager.initializeWithHour(currentHour);
      this.playerLightManager.initializeWithHour(currentHour);
    } else {
      console.warn("WebGL not supported — skipping lights");
    }

    const scale = 3;
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    groundLayer.setScale(scale);
    tempatLayer.setScale(scale);
    detailsLayer.setScale(scale);
    grassLayer.setScale(scale);
    legendsLayer.setScale(scale);

    this.physics.world.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player);

    // Gamepad
    this.input.gamepad.once("connected", (pad) => {
      this.gamepad = pad;
      console.log("Gamepad connected:", pad.id);
    });
    if (this.input.gamepad.total > 0) {
      const pads = this.input.gamepad.gamepads;
      for (let i = 0; i < pads.length; i++) {
        if (pads[i]) {
          this.gamepad = pads[i];
          console.log("Gamepad already connected:", this.gamepad.id);
        }
      }
    }

    this.generateTriggerZone();
    this.generatePlaces();

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1);
    graphics.strokeRect(
      this.physics.world.bounds.x,
      this.physics.world.bounds.y,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    this.infoBoxBg = this.add
      .rectangle(0, 0, 160, 40, 0x000000, 0.7)
      .setStrokeStyle(2, 0xffffff)
      .setOrigin(0.5)
      .setVisible(false);

    this.infoText = this.add
      .text(0, 0, "Press E / X to Enter", {
        fontSize: "16px",
        fill: "#ffffff",
        align: "center",
        resolution: 2,
      })
      .setOrigin(0.5)
      .setVisible(false);

    // this.time.addEvent({
    //   delay: 1000,
    //   callback: this.tickGameTime,
    //   callbackScope: this,
    //   loop: true,
    // });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    const objects = map.getObjectLayer("Interactables").objects;
    const lights = map.getObjectLayer("lights").objects;
    const SCALE = 3;

    this.interactables = this.physics.add.group();

    objects.forEach((obj) => {
      if (obj.ellipse) {
        // Position of the circle's center (Tiled's obj.x and obj.y are top-left of bounding box)
        const radius = (obj.width * SCALE) / 2;
        const centerX = (obj.x + obj.width / 2) * SCALE;
        const centerY = (obj.y + obj.height / 2) * SCALE;

        const sprite = this.physics.add.sprite(centerX, centerY, null);
        sprite.setOrigin(0.5, 0.5);
        sprite.setVisible(false);
        sprite.body.setAllowGravity(false);

        // Set the body to a circle
        sprite.body.setCircle(radius);

        sprite.properties = {};
        obj.properties?.forEach((prop) => {
          sprite.properties[prop.name] = prop.value;
        });

        this.interactables.add(sprite);

        if (sprite.properties.light) {
          new LightSource(this, x, y, {
            radius: Number(sprite.properties.lightRadius) || 150,
            color: sprite.properties.lightColor || "#ffffff",
            intensity: Number(sprite.properties.lightIntensity) || 1.0,
            nightOnly: sprite.properties.lightNightOnly === true,
            initialHour: this.currentHour(), // you need to pass this in
          });
        }

        if (sprite.properties.collides) {
          sprite.body.setImmovable(true);
          sprite.body.setVelocity(0, 0);
          sprite.body.moves = false;
          if ("pushable" in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
          this.physics.add.collider(this.player, sprite);
        }
      } else {
        const x = (obj.x + obj.width / 2) * SCALE;
        const y = (obj.y + obj.height / 2) * SCALE;

        const sprite = this.physics.add.sprite(x, y, null);
        sprite.setVisible(false); // Still invisible trigger zone
        sprite.body.setAllowGravity(false);

        // 👇 Scale the physics body to match map scale
        sprite.body.setSize(obj.width * SCALE, obj.height * SCALE);
        // 👇 Do NOT call sprite.setScale() unless you want a visible sprite scaled
        // sprite.setScale(SCALE); // ❌ Not needed for invisible area

        // Copy object properties
        sprite.properties = {};
        obj.properties?.forEach((prop) => {
          sprite.properties[prop.name] = prop.value;
        });

        if (sprite.properties.light) {
          new LightSource(this, x, y, {
            radius: Number(sprite.properties.lightRadius) || 150,
            color: sprite.properties.lightColor || "#ffffff",
            intensity: Number(sprite.properties.lightIntensity) || 1.0,
            nightOnly: sprite.properties.lightNightOnly === true,
            initialHour: this.currentHour(), // you need to pass this in
          });
        }

        this.interactables.add(sprite);
        if (sprite.properties.collides) {
          sprite.body.setImmovable(true);
          sprite.body.setVelocity(0, 0);
          sprite.body.moves = false;
          if ("pushable" in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
          this.physics.add.collider(this.player, sprite);
        }
      }
    });

    lights.forEach((obj) => {
        const x = (obj.x + obj.width / 2) * SCALE;
        const y = (obj.y + obj.height / 2) * SCALE;

        const sprite = this.physics.add.sprite(x, y, null);
        sprite.setVisible(false); // Still invisible trigger zone
        sprite.body.setAllowGravity(false);

        // 👇 Scale the physics body to match map scale
        sprite.body.setSize(obj.width * SCALE, obj.height * SCALE);
        // 👇 Do NOT call sprite.setScale() unless you want a visible sprite scaled
        // sprite.setScale(SCALE); // ❌ Not needed for invisible area

        // Copy object properties
        sprite.properties = {};
        obj.properties?.forEach((prop) => {
          sprite.properties[prop.name] = prop.value;
        });

        if (sprite.properties.light) {
          console.log("Adding light source at:", x, y);
          console.log("COLOR : " + sprite.properties.lightColor);
          new LightSource(this, x, y, {
            radius: Number(sprite.properties.lightRadius) || 150,
            color: sprite.properties.lightColor || "#ffffff",
            intensity: Number(sprite.properties.lightIntensity) || 1.0,
            nightOnly: sprite.properties.lightNightOnly || true,
            initialHour: this.currentHour(), // you need to pass this in
          });
        }

        if (sprite.properties.collides) {
          sprite.body.setImmovable(true);
          sprite.body.setVelocity(0, 0);
          sprite.body.moves = false;
          if ("pushable" in sprite.body) sprite.body.pushable = false; // Optional for Phaser 3.60+
          this.physics.add.collider(this.player, sprite);
      }
    });

    this.physics.add.overlap(
      this.player,
      this.interactables,
      (player, obj) => {
        this.currentInteractable = obj;
      },
      null,
      this
    );

    this.generateInteractions();

    EventBus.on("move", this.handleMove, this);
    EventBus.on("stop", this.handleStopInput, this);
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    handleMovement(this);
    this.checkOverlap()

    const playerBounds = this.player.getBounds();
    let inAnyZone = false;
    let currentZoneId = null;

    for (let i = 0; i < this.triggerZones.length; i++) {
      const zone = this.triggerZones[i];
      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          playerBounds,
          zone.getBounds()
        )
      ) {
        inAnyZone = true;
        currentZoneId = zone.triggerId; // You'll need to assign this when creating zones
        break;
      }
    }

    if (inAnyZone) {
      this.inTriggerZone = currentZoneId;
      const offsetY = -50;
      this.infoBoxBg
        .setPosition(this.player.x, this.player.y + offsetY)
        .setVisible(true);
      this.infoText
        .setPosition(this.player.x, this.player.y + offsetY)
        .setVisible(true);
    } else {
      this.inTriggerZone = null;
      this.infoBoxBg.setVisible(false);
      this.infoText.setVisible(false);
    }

    this.infoText.setVisible(inAnyZone);
  }

  handleMove(direction) {
    switch (direction) {
      case "up":
        this.cursors.up.isDown = true;
        break;
      case "down":
        this.cursors.down.isDown = true;
        break;
      case "left":
        this.cursors.left.isDown = true;
        break;
      case "right":
        this.cursors.right.isDown = true;
        break;
    }
  }

  handleStopInput() {
    this.cursors.left.isDown = false;
    this.cursors.right.isDown = false;
    this.cursors.up.isDown = false;
    this.cursors.down.isDown = false;
  }

  SaveState() {
    console.log("Saving state!");
    GameState.pos_x = this.player.x;
    GameState.pos_y = this.player.y;
  }

  handleSaveVN(){
    console.log("Saving state!");
    GameState.pos_x = this.player.x;
    GameState.pos_y = this.player.y;
  }

  shutdown() {
    EventBus.off("move", this.handleMoveInput, this);
  }

  generateInteractions() {
    setupInteractionHandler(this, {
      getPlayer: () => this.player,
      getInteractables: () => this.interactables,
      getKey: () => this.interactKey,
      handleSaveVN: () => this.handleSaveVN(),

      handlers: {
        Mansion: ({ scene }) => {
          this.handleSaveVN();
          const enteringText = this.add
        .text(
          this.cameras.main.centerX,
          -50,
          `Entering Mansion...`,
          {
            fontSize: "48px",
            fill: "#ffffff",
            fontStyle: "bold",
            resolution: 2,
          }
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0);

      this.tweens.add({
        targets: enteringText,
        y: this.cameras.main.centerY,
        duration: 400,
        ease: "Sine.easeOut",
      });

      this.cameras.main.fadeOut(1000, 0, 0, 0);

      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.SaveState();
        enteringText.destroy();
        this.scene.start("Mansion");
      });
        },
        house: ( { scene } ) =>{
          this.handleSaveVN();
          const enteringText = this.add
        .text(
          this.cameras.main.centerX,
          -50,
          `Entering House...`,
          {
            fontSize: "48px",
            fill: "#ffffff",
            fontStyle: "bold",
            resolution: 2,
          }
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0);

      this.tweens.add({
        targets: enteringText,
        y: this.cameras.main.centerY,
        duration: 400,
        ease: "Sine.easeOut",
      });

      this.cameras.main.fadeOut(1000, 0, 0, 0);

      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.SaveState();
        enteringText.destroy();
        this.scene.start("HakureiShrine");
      });
        }
      },
    });
  }

  interactWithArea() {
    console.log("Interacted with the special area!");
    // Add your interaction logic here
  }

  currentHour() {
    console.log(GameState.time.hour);
    return GameState.time.hour;
  }
}
