import Phaser, { Game } from "phaser";
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";
// import trialMap from "../../assets/image/InGame/maps/Trial.tmj"
import { useNavigate } from "react-router-dom";
import { handleMovement } from "../movements/handleMovement";
import setupPlayerMovement from "../movements/pathFinding";

import CreatePlayerAnimation from "../movements/animation";

import { LightingManager } from "../lighting/LightingManager";
import { PlayerLightManager } from "../lighting/PlayerLightManager";
import { LightSource } from "../lighting/lightSource";

import { GameStatusProvider } from "../../context/GameStatusContext";

import { setupInteractionHandler } from "../../utils/interactionManager";

import { BathImage, SleepImage } from "../../assets/assetsPreLoad";

export class HakureiShrine extends Phaser.Scene {
  constructor() {
    super({ key: "HakureiShrine" });
  }

  preload() {
    this.posX = GameState.afterVN ? GameState.currentlocation.currentPosX : 768; // Default position if not set
    this.posY = GameState.afterVN
      ? GameState.currentlocation.currentPosY
      : 1392; // Default position if not set
    GameState.currentlocation.currentLoc = "HakureiShrine";
    GameState.afterVN = false;
  }

  create(data) {
    this.cameras.main.fadeIn(1500, 0, 0, 0);

    console.log("Renderer Type:", this.sys.game.renderer.type);
    this.generateMap();

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

      this.lightingManager.initializeWithHour(currentHour);
      this.playerLightManager.initializeWithHour(currentHour);
    } else {
      console.warn("WebGL not supported — skipping lights");
    }

    const button = this.add
      .text(100, 150, "Return to Main Scene", {
        fontSize: "18px",
        fill: "#0f0",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("MainGame");
      });

    //Past this point is the modified version of the modularity
    setupInteractionHandler(this, {
      getPlayer: () => this.player,
      getInteractables: () => this.interactables,
      getKey: () => this.eKey,
      handleSaveVN: () => this.handleSaveVN(),

      handlers: {
        out: ({ scene }) => {
          const enteringText = this.add
            .text(this.cameras.main.centerX, -50, "Exiting....", {
              fontSize: "48px",
              fill: "#ffffff",
              fontStyle: "bold",
              resolution: 2,
            })
            .setOrigin(0.5)
            .setDepth(1000)
            .setScrollFactor(0);
          GameState.afterVN = false;
          this.cameras.main.fadeOut(1000, 0, 0, 0);

          this.cameras.main.once("camerafadeoutcomplete", () => {
            enteringText.destroy();
            this.scene.start("MainGame");
          });
        },
        bath: ({ scene }) => {
          EventBus.emit("showCustomModal", {
            // modalId: "jalanConfirmation_" + GameState.currentlocation.currentLoc, // Make modalId unique if content depends on location
            title: `Bath?`, // Dynamic title
            description: "Do you want to bath to clean yourself up?",
            image : BathImage,
            // gainsText: "8",
            // lossesText: "0",
            actionType: "bath", // <<< This is CRUCIAL for triggering jalan.js later
            actionParams: {
              /* No specific params needed by jalan.js directly, but structure is there */
            },
          });
        },
        sleep: ({ scene }) => {
          this.handleSaveVN(); // If you want to save player state before modal
          EventBus.emit("showCustomModal", {
            modalId: "jalanConfirmation_rumah", // Make modalId unique if content depends on location
            title: `Sleep?`, // Dynamic title
            description: "Do you want to sleep to increase energy?",
            image: SleepImage,
            // You can add specific gains/losses text if you want to display them
            // gainsText: "...",
            // lossesText: "...",
            actionType: "sleep", //TRIGERRING THE ACTION
            actionParams: {
              /* No specific params needed by jalan.js directly, but structure is there */
            },
          });
          this.currentInteractable = null;
        },
        act1: ({ scene, handleSaveVN }) => {
          GameState.currentAct = "act1";
          handleSaveVN();
          EventBus.emit("performVN", "act1Data");
        },
      },
    });
  }

  update() {
    handleMovement(this);
    this.checkOverlap();
  }

  handleSaveVN() {
    if (typeof GameState.currentlocation !== "object") {
      GameState.currentlocation = {
        currentPosX: 0,
        currentPosY: 0,
        currentLoc: "",
      };
    }

    GameState.currentlocation.currentPosX = this.player.x;
    GameState.currentlocation.currentPosY = this.player.y;
    GameState.currentlocation.currentLoc = "rumah";
  }

  generateMap() {
    //MAP INITIALIZER
    const map = this.add.tilemap("rumah");
    const Tiles1 = map.addTilesetImage("Tiles1", "Tiles1");
    const Tiles2 = map.addTilesetImage("Tiles2", "Tiles2");
    const object1 = map.addTilesetImage("object1", "4BigSet");
    const object2 = map.addTilesetImage("object", "Objects");

    const floorLayer = map
      .createLayer("ground", [Tiles1, Tiles2, object1])
      .setPipeline("Light2D");
    const wallLayer = map.createLayer("wall", object1).setPipeline("Light2D");
    const objectLayer = map
      .createLayer("object", [object1, object2])
      .setPipeline("Light2D");
    const door = map
      .createLayer("doorClosed", [object1])
      .setPipeline("Light2D");
    const chestClosed = map
      .createLayer("chestClosed", [object1])
      .setPipeline("Light2D");
    const object1Layer = map
      .createLayer("object1", object2)
      .setPipeline("Light2D");

    this.player = this.physics.add
      .sprite(this.posX, this.posY, "Yukari")
      .setScale(0.28); //character scale
    this.player.body.setCollideWorldBounds(true);

    const scale = 5; //map scale
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    floorLayer.setScale(scale);
    wallLayer.setScale(scale);
    objectLayer.setScale(scale);
    door.setScale(scale);
    chestClosed.setScale(scale);
    object1Layer.setScale(scale);

    wallLayer.setCollisionByProperty({ collides: true });
    objectLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, objectLayer);

    this.physics.world.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player);

    const objects = map.getObjectLayer("door").objects;
    const lights = map.getObjectLayer("lights").objects;
    const SCALE = 5; //object scale

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

    //JUST USING FOR TRIAL
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.physics.add.overlap(
      this.player,
      this.interactables,
      (player, obj) => {
        // console.log("Overlapping with:", obj.properties?.id); // 🔍 Debug here
        this.currentInteractable = obj;
      },
      null,
      this
    );
    //------------------------------

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
    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
  }

  currentHour() {
    console.log(GameState.time.hour);
    return GameState.time.hour;
  }

}


function playEyeOpeningTransition(scene, onComplete) {
  // Create a full-screen transparent graphics object
  const maskShape = scene.make.graphics({ x: 0, y: 0, add: false });

  // Draw an eye-like ellipse (in white, used as a mask)
  maskShape.fillStyle(0xffffff);
  maskShape.fillEllipse(scene.cameras.main.centerX, scene.cameras.main.centerY, 20, 5); // Small to start

  // Create a mask from that graphics
  const eyeMask = maskShape.createGeometryMask();

  // Apply the mask to the camera
  scene.cameras.main.setMask(eyeMask);

  // Tween to scale up the ellipse (eye opening)
  scene.tweens.add({
    targets: maskShape,
    props: {
      scaleX: { value: 100, duration: 1000, ease: 'Sine.easeOut' },
      scaleY: { value: 100, duration: 1000, ease: 'Sine.easeOut' },
    },
    onUpdate: () => {
      maskShape.clear();
      maskShape.fillStyle(0xffffff);
      maskShape.fillEllipse(scene.cameras.main.centerX, scene.cameras.main.centerY, 20 * maskShape.scaleX, 5 * maskShape.scaleY);
    },
    onComplete: () => {
      scene.cameras.main.clearMask(true); // Remove mask after transition
      if (onComplete) onComplete();
    },
  });
}
