import Phaser from "phaser";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";

import { handleMovement, registerMovementEvents } from "../movements/handleMovement";
import setupPlayerMovement from "../movements/pathFinding";

import CreatePlayerAnimation from "../movements/animation";

import { LightingManager } from "../lighting/LightingManager";
import { PlayerLightManager } from "../lighting/PlayerLightManager";
import { LightSource } from "../lighting/lightSource";

import { jalanDiengImage } from "../../assets/assetsPreLoad"

export class Dieng extends Phaser.Scene {
  constructor() {
    super({ key: "Dieng" });
  }

  preload() {
    this.posX = GameState.afterVN
      ? GameState.currentlocation.currentPosX
      : 1130; // Default position if not set
    this.posY = GameState.afterVN
      ? GameState.currentlocation.currentPosY
      : 1356; // Default position if not set
    GameState.currentlocation.currentLoc = "Dieng";
    EventBus.emit("OnLocationChange", { location: "Dieng" });
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
        intensity: 1,
      });

      this.lightingManager.initializeWithHour(currentHour);
      this.playerLightManager.initializeWithHour(currentHour);
    } else {
      console.warn("WebGL not supported — skipping lights");
    }

    if(GameState.currentAct === "Act2"){
      this.loadStoryCharacters(2);
      this.act31.body.enable = false;
    }else if(GameState.currentAct === "Act3M"){
      this.loadStoryCharacters(2);
      this.act2.body.enable = false;
    }else {
      this.act2.body.enable = false;
      this.act31.body.enable = false;
    }
  }

  update() {
    handleMovement(this);
    console.log(this.player.x);
    console.log(this.player.y);
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
    GameState.currentlocation.currentLoc = "Dieng";
  }

  checkOverlap() {
    if (!this.player || !this.interactables) return;

    let stillOverlapping = false;
    this.currentInteractable = null;

    this.interactables.children.iterate((obj) => {
      if (obj && this.physics.overlap(this.player, obj)) {
        this.currentInteractable = obj;
        stillOverlapping = true;
      }
    });

    if (this.currentInteractable && Phaser.Input.Keyboard.JustDown(this.eKey)) {
      const id = this.currentInteractable.properties?.id;
      console.log("Player pressed E near object with ID:", id);

      // Example for "jalan2" needing confirmation ini TEST doang
      if (id === "jalan2") {
        // Or any other ID that should trigger a "jalan-jalan" action
        this.handleSaveVN(); // If you want to save player state before modal
        EventBus.emit("showCustomModal", {
          modalId: "jalanConfirmation_" + GameState.currentlocation.currentLoc, // Make modalId unique if content depends on location
          image: jalanDiengImage,
          title: `Jalan-jalan di ${GameState.currentlocation.currentLoc}?`, // Dynamic title
          description: "Do you want to take a walk to increase Happiness ?",
          // You can add specific gains/losses text if you want to display them
          // gainsText: "...",
          // lossesText: "...",
          actionType: "jalan", // <<< This is CRUCIAL for triggering jalan.js later
          actionParams: {
            /* No specific params needed by jalan.js directly, but structure is there */
          },
        });
        this.currentInteractable = null; // Prevent immediate re-trigger
      }
      // // Example for a "work" spot needing confirmation
      // else if (id === "work_spot_mcd") { // Assuming you have an object with this ID in Tiled
      //     this.handleSaveVN();
      //     EventBus.emit("showCustomModal", {
      //         modalId: "workConfirmationMcd",
      //         title: "Kerja di McD?",
      //         description: "Kerja shift selama 4 jam.",
      //         gainsText: "Uang +50 (bisa lebih jika bahagia).",
      //         lossesText: "Energi -30, Kelaparan -10.",
      //         actionType: "work",
      //         actionParams: { jobId: "blokm_mcd" } // Parameters for the work action
      //     });
      //     this.currentInteractable = null;
      // }
      // ... (your existing else if for "out", and switch for VN triggers) ...
      else if (id === "out") {
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
      } else if (id) {
        switch (id) {
          case "prologue":
            this.handleSaveVN();
            EventBus.emit("performVN", "prologueData");
            break;
          case "intro":
            this.handleSaveVN();
            EventBus.emit("performVN", "introData");
            break;
          case "act1":
            this.handleSaveVN();
            EventBus.emit("performVN", "act1Data");
            break;
          case "act2":
            GameState.currentAct = "Act3";
            this.handleSaveVN();
            EventBus.emit("performVN", "act2Data");
            break;
          case "act3":
            this.handleSaveVN();
            EventBus.emit("performVN", "act3Data");
            break;
          case "act31":
            this.handleSaveVN();
            EventBus.emit("performVN", "act3_1Data");
            break;
          case "act32":
            this.handleSaveVN();
            EventBus.emit("performVN", "act3_2Data");
            break;
          case "act4":
            this.handleSaveVN();
            EventBus.emit("performVN", "act4Data");
            break;
          default:
            console.log("unhandled ID for confirmation/VN:", id);
            break;
        }
      }
    }
  }

  generateMap() {
    const map = this.add.tilemap("dieng");
    const tiles = map.addTilesetImage("tiles", "diengTiles");
    const Sanae = map.addTilesetImage("Sanae", "Sanae");
    const torches = map.addTilesetImage("obor", "torches");
    this.map = map;

    const tileLayer1 = map
      .createLayer("Tile Layer 1", tiles)
      .setPipeline("Light2D");
    const tileLayer2 = map
      .createLayer("Tile Layer 2", tiles)
      .setPipeline("Light2D");
    const tileLayer3 = map
      .createLayer("Tile Layer 3", tiles)
      .setPipeline("Light2D");
    const tree = map.createLayer("tree", [tiles, torches]).setPipeline("Light2D");
    const SanaeLayer = map.createLayer("Sanae", Sanae).setPipeline("Light2D");

    this.player = this.physics.add
      .sprite(this.posX, this.posY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);

    const scale = 3;
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    tileLayer1.setScale(scale);
    tileLayer2.setScale(scale);
    tileLayer3.setScale(scale);
    tree.setScale(scale);
    SanaeLayer.setScale(scale);

    tileLayer1.setCollisionByProperty({ collides: true });
    tileLayer2.setCollisionByProperty({ collides: true });
    tileLayer3.setCollisionByProperty({ collides: true });
    tree.setCollisionByProperty({ collides: true });
    SanaeLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, tileLayer1);
    this.physics.add.collider(this.player, tileLayer2);
    this.physics.add.collider(this.player, tileLayer3);
    this.physics.add.collider(this.player, tree);
    this.physics.add.collider(this.player, SanaeLayer);

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

        if (sprite.properties.id === "act2"){
          this.act2 = sprite;
        }else if (sprite.properties.id === "act31"){
          this.act31 = sprite;
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

  currentHour() {
    return GameState.time.hour;
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
}
