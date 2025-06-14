import Phaser from "phaser";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";
import { handleMovement, registerMovementEvents } from "../movements/handleMovement";

import { LightingManager } from "../lighting/LightingManager";
import { PlayerLightManager } from "../lighting/PlayerLightManager";
import { LightSource } from "../lighting/lightSource";

import { setupInteractionHandler } from "../../utils/interactionManager";

import { jalanMCDImage } from "../../assets/assetsPreLoad";

export class BlokM extends Phaser.Scene {
  constructor() {
    super({ key: "BlokM" });
  }

  preload() {
    this.posX = GameState.afterVN
      ? GameState.currentlocation.currentPosX
      : 1200; // Default position if not set
    this.posY = GameState.afterVN
      ? GameState.currentlocation.currentPosY
      : 1500; // Default position if not set
    GameState.currentlocation.currentLoc = "BlokM";
    EventBus.emit("OnLocationChange", { location: "Blok M" });
  }

  create(data) {
    registerMovementEvents(this);
    this.cameras.main.fadeIn(1000, 0, 0, 0);
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
        intensity: 1.5,
      });

      this.lightingManager.initializeWithHour(currentHour);
      this.playerLightManager.initializeWithHour(currentHour);
    } else {
      console.warn("WebGL not supported — skipping lights");
    }

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
        shop: ({ scene }) => {
          EventBus.emit("showShop");
        },
        cashierMCD: ({ scene }) => {
          EventBus.emit("showCustomModal", {
            modalId:
              "jalanConfirmation_" + GameState.currentlocation.currentLoc, // Make modalId unique if content depends on location
            title: `Work in McDonald?`, // Dynamic title
            description: "Do you want to work to increase money ?",
            // You can add specific gains/losses text if you want to display them
            // gainsText: "...",
            // lossesText: "...",
            actionType: "work", // <<< This is CRUCIAL for triggering jalan.js later
            actionParams: {
              jobId: "blokm_mcd",
            },
          });
        },
        act3: ({ scene, handleSaveVN }) => {
          GameState.currentAct = "Act3M";
          handleSaveVN();
          EventBus.emit("performVN", "act3Data");
        },
        workLib: ({ scene }) => {
          EventBus.emit("showCustomModal", {
            modalId:
              "jalanConfirmation_" + GameState.currentlocation.currentLoc,
            title: `Work in Book Store?`,
            description: "Do you want to work to increase money ?",
            // You can add specific gains/losses text if you want to display them
            // gainsText: "...",
            // lossesText: "...",
            actionType: "work", // <<< This is CRUCIAL for triggering jalan.js later
            actionParams: {
              jobId: "blokm_tokobuku",
            },
          });
        },
        jalan: ({ scene }) => {
          EventBus.emit("showCustomModal", {
            modalId:
              "jalanConfirmation_" + GameState.currentlocation.currentLoc, // Make modalId unique if content depends on location
            image: jalanMCDImage,
            title: `Enjoy blok M restaurants?`, // Dynamic title
            description: "Do you want to take a walk to increase Happiness ?",
            // You can add specific gains/losses text if you want to display them
            // gainsText: "...",
            // lossesText: "...",
            actionType: "jalan", // <<< This is CRUCIAL for triggering jalan.js later
            actionParams: {
              /* No specific params needed by jalan.js directly, but structure is there */
            },
          });
        },
      },
    });

    if (GameState.currentAct === "Act3") {
      this.loadStoryCharacters(3);
      this.workLib.body.enable = false;
    } else {
      this.loadStoryCharacters(10);
      this.act3.body.enable = false;
    }
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
    GameState.currentlocation.currentLoc = "BlokM";
  }

  generateMap() {
    const map = this.add.tilemap("blokM");
    const mainTileset = map.addTilesetImage("tileBlokM");
    const decorationBlokM = map.addTilesetImage("decorationBlokM");
    const furnitureBlokM = map.addTilesetImage("furnitureBlokM");
    const storeBlokM = map.addTilesetImage("storeBlokM");
    const LibraryBlokM = map.addTilesetImage("LibraryBlokM");
    const Kosuzu = map.addTilesetImage("Kosuzu");
    const floor1 = map.addTilesetImage("Floor1BlokM");
    const floor2 = map.addTilesetImage("Floor2BlokM");
    const legends = map.addTilesetImage("legends");
    this.map = map;

    const groundLayer = map
      .createLayer("Ground", [mainTileset, LibraryBlokM, floor1, floor2])
      .setPipeline("Light2D");
    const wallLayer = map
      .createLayer("Wall", mainTileset)
      .setPipeline("Light2D");
    const objectLayer = map
      .createLayer(
        "Object", // The name of your layer in Tiled
        [
          decorationBlokM,
          furnitureBlokM,
          storeBlokM,
          LibraryBlokM,
          Kosuzu,
          floor1,
          floor2,
        ]
      )
      .setPipeline("Light2D");
    const legendsLayer = map.createLayer("legends", legends);

    this.player = this.physics.add
      .sprite(this.posX, this.posY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);

    const scale = 3;
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    groundLayer.setScale(scale);
    wallLayer.setScale(scale);
    objectLayer.setScale(scale);
    legendsLayer.setScale(scale);

    wallLayer.setCollisionByProperty({ collides: true });
    objectLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, objectLayer);

    this.physics.world.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setBounds(0, 0, mapWidth * scale, mapHeight * scale);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player);

    //TODO Perbaikin Object Eclipse posisi
    //OBJECTS TRIAL
    //OBJECT TRIAL
    const objects = map.getObjectLayer("Interactables").objects;
    const lights = map.getObjectLayer("lights").objects;
    const SCALE = 3;

    this.interactables = this.physics.add.group();

    objects.forEach((obj) => {
      if (obj.ellipse) {
        // Position of the circle's center (Tiled's obj.x and obj.y are top-left of bounding box)
        const radius = (Math.max(obj.width, obj.height) * SCALE) / 2; // or Math.min(…)
        const centerX = (obj.x + obj.width / 2) * SCALE;
        const centerY = (obj.y + obj.height / 2) * SCALE;

        const sprite = this.physics.add.sprite(centerX, centerY, null);
        sprite.setOrigin(0.5, 0.5);
        sprite.setVisible(false);
        sprite.body.setAllowGravity(false);

        // Set the body to a circle
        sprite.body.setCircle(radius);

        // keep it centred (Arcade puts the circle’s origin at its top‑left):
        sprite.body.setOffset(
          -radius + (obj.width * SCALE) / 2,
          -radius + (obj.height * SCALE) / 2
        );

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

        if (sprite.properties.id === "act3") {
          this.act3 = sprite;
        } else if (sprite.properties.id === "workLib") {
          this.workLib = sprite;
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
        console.log("Overlapping with:", obj.properties?.id); // 🔍 Debug here
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

  showDialog(text) {
    const dialogBox = this.add
      .text(100, 100, text, {
        fontSize: "16px",
        fill: "#fff",
        backgroundColor: "#000",
      })
      .setScrollFactor(0); // UI element stays in place
  }

  currentHour() {
    return GameState.time.hour;
  }

  loadStoryCharacters(currentAct) {
    const characterObjects =
      this.map.getObjectLayer("characters")?.objects || [];
    const SCALE = 3;

    this.storyCharacters = this.physics.add.group();

    characterObjects.forEach((obj) => {
      const props = {};
      obj.properties?.forEach((p) => (props[p.name] = p.value));

      const visibleActs = (props.actVisible || "")
        .split(",")
        .map((str) => Number(str.trim()))
        .filter((n) => !isNaN(n));

      if (!visibleActs.includes(currentAct)) return; // Skip if not for this act

      const x = (obj.x + obj.width / 2) * SCALE;
      const y = (obj.y + obj.height / 2) * SCALE;
      const spriteKey = props.spriteKey || "defaultNPC";

      const sprite = this.physics.add.sprite(x, y, spriteKey);
      sprite.setOrigin(0.5);
      sprite.setDepth(10);
      sprite.body.setImmovable(true);
      sprite.body.setAllowGravity(false);
      sprite.body.setVelocity(0, 0);
      sprite.setDisplaySize(obj.width * SCALE, obj.height * SCALE);

      // Optional: set body size explicitly if needed

      sprite.characterId = obj.name;
      sprite.properties = props;

      // // 👤 Handle interaction, handled outside by you
      // this.storyCharacters.add(sprite);

      // 🚧 Collisions
      if (props.collides !== false) {
        this.physics.add.collider(this.player, sprite);
      }
    });
  }
}
