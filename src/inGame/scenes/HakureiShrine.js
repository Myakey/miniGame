import Phaser, { Game } from "phaser";
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";
// import trialMap from "../../assets/image/InGame/maps/Trial.tmj"
import { useNavigate } from "react-router-dom";
import { handleMovement, registerMovementEvents } from "../movements/handleMovement";
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
    EventBus.emit("OnLocationChange", { location: "House" });
  }

  create(data) {
    registerMovementEvents(this);
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
          GameState.currentAct = "Act2";
          handleSaveVN();
          EventBus.emit("performVN", "act1Data");
        },
      },
    });


    if(GameState.currentAct === "Act1" && GameState.char != "Yukari"){
      this.loadStoryCharacters(1);
    }else if(GameState.currentAct === "Act1"){
      this.loadStoryCharacters(10);
    }else{
      this.act1.body.enable = false;
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
    GameState.currentlocation.currentLoc = "HakureiShrine";
  }

  generateMap() {
    //MAP INITIALIZER
    const map = this.add.tilemap("rumah");
    const Tiles1 = map.addTilesetImage("Tiles1", "Tiles1");
    const Tiles2 = map.addTilesetImage("Tiles2", "Tiles2");
    const object1 = map.addTilesetImage("object1", "4BigSet");
    const object2 = map.addTilesetImage("object", "Objects");
    const legends = map.addTilesetImage("legends", "legends");
    this.map = map;

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
      .setScale(0.3); //character scale
    this.player.body.setCollideWorldBounds(true);

    const legendsLayer = map.createLayer("legends", legends);

    const scale = 5; //map scale
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    floorLayer.setScale(scale);
    wallLayer.setScale(scale);
    objectLayer.setScale(scale);
    door.setScale(scale);
    chestClosed.setScale(scale);
    object1Layer.setScale(scale);
    legendsLayer.setScale(scale);

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

        if (sprite.properties.id === "Intro"){
          this.meiLing = sprite;
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

        if (sprite.properties.id === "act1"){
          this.act1 = sprite;
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


  loadStoryCharacters(currentAct) {
  const characterObjects = this.map.getObjectLayer("characters")?.objects || [];
  const SCALE = 5;

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

