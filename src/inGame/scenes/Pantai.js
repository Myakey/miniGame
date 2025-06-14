import Phaser from "phaser";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";

import { handleMovement, registerMovementEvents } from "../movements/handleMovement";

import { LightingManager } from "../lighting/LightingManager";
import { PlayerLightManager } from "../lighting/PlayerLightManager";
import { LightSource } from "../lighting/lightSource";

import { setupInteractionHandler } from "../../utils/interactionManager";
import { swimBeach } from "../../assets/assetsPreLoad";

export class Pantai extends Phaser.Scene {
  constructor() {
    super({ key: "Pantai" });
  }

  preload() {
    this.posX = GameState.afterVN
      ? GameState.currentlocation.currentPosX
      : 1086;
    this.posY = GameState.afterVN ? GameState.currentlocation.currentPosY : 80;
    GameState.currentlocation.currentLoc = "Pantai";
    EventBus.emit("OnLocationChange", { location: "South Beach" });
  }

  create(data) {
    registerMovementEvents(this);
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.load.once("complete", () => {
      this.generateMap();
    });
    this.load.start();

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

    this.add.text(100, 100, "Pantai", { fontSize: "20px", fill: "#fff" });

    const button = this.add
      .text(100, 150, "Return to Main Scene", {
        fontSize: "18px",
        fill: "#0f0",
        backgroundColor: "#000",
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("DrawScene");
      });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    setupInteractionHandler(this, {
      getPlayer: () => this.player,
      getInteractables: () => this.interactables,
      getKey: () => this.eKey,
      handleSaveVN: () => console.log("Saved at pantai"),

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
        shop: ({scene}) =>{
          EventBus.emit("showShop");
        },
      beachPlay: ({scene}) =>{
        EventBus.emit("showCustomModal", {
                  modalId: "jalanConfirmation_" + GameState.currentlocation.currentLoc, // Make modalId unique if content depends on location
                  image: swimBeach,
                  title: `Want To Swim?`, // Dynamic title
                  description: "Do you want to swim to increase mood ?",
                  // You can add specific gains/losses text if you want to display them
                  // gainsText: "...",
                  // lossesText: "...",
                  actionType: "jalan", // <<< This is CRUCIAL for triggering jalan.js later
                  actionParams: {
                    /* No specific params needed by jalan.js directly, but structure is there */
                  },
                });
      }
      },
    });

    this.loadStoryCharacters(1);
  }

  update() {
    handleMovement(this);
    this.checkOverlap();
  }

  generateMap() {
    const map = this.add.tilemap("pantai");
    const mainTileset = map.addTilesetImage("beach", "beachTiles");
    const toko = map.addTilesetImage("toko", "decorationBlokM");
    const tree = map.addTilesetImage("tree", "treePantai");
    const torches = map.addTilesetImage("obor", "torches");
    this.map = map;

    console.log(Phaser.VERSION);

    const groundLayer = map
      .createLayer("ground", mainTileset, 0, 0)
      .setPipeline("Light2D");
    const detailsLayer = map
      .createLayer("details", [mainTileset, toko])
      .setPipeline("Light2D");
    const treeLayer = map.createLayer("trees", [tree, torches]).setPipeline("Light2D");
    const payungLayer = map
      .createLayer("payung", mainTileset)
      .setPipeline("Light2D");

    this.player = this.physics.add
      .sprite(this.posX, this.posY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);

    const scale = 3;
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    groundLayer.setScale(scale);
    detailsLayer.setScale(scale);
    treeLayer.setScale(scale);
    payungLayer.setScale(scale);

    groundLayer.setCollisionByProperty({ collides: true });
    detailsLayer.setCollisionByProperty({ collides: true });
    treeLayer.setCollisionByProperty({ collides: true });
    payungLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, detailsLayer);
    this.physics.add.collider(this.player, treeLayer);
    this.physics.add.collider(this.player, payungLayer);

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

    loadStoryCharacters(currentAct) {
  const characterObjects = this.map.getObjectLayer("characters")?.objects || [];
  const SCALE = 3;

  this.storyCharacters = this.physics.add.group();

  characterObjects.forEach((obj) => {
    const props = {};
    obj.properties?.forEach(p => props[p.name] = p.value);

    const visibleActs = (props.actVisible || "")
      .split(",")
      .map(str => Number(str.trim()))
      .filter(n => !isNaN(n));

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

  currentHour() {
    return GameState.time.hour;
  }
}
