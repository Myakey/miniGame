import Phaser from "phaser";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";

import { handleMovement, registerMovementEvents } from "../movements/handleMovement";

import { LightingManager } from "../lighting/LightingManager";
import { LightSource } from "../lighting/lightSource";
import { PlayerLightManager } from "../lighting/PlayerLightManager";

import { setupInteractionHandler } from "../../utils/interactionManager";

export class Mansion extends Phaser.Scene {
  constructor() {
    super({ key: "Mansion" });
  }

  preload() {
    this.posX = GameState.afterVN
      ? GameState.currentlocation.currentPosX
      : 56;
    this.posY = GameState.afterVN ? GameState.currentlocation.currentPosY : 1723;
    GameState.currentlocation.currentLoc = "Mansion";
    EventBus.emit("OnLocationChange", { location: "Scarlet Mansion" });
  }

  create() {
    registerMovementEvents(this);
    this.cameras.main.fadeIn(1500, 0, 0, 0);
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
            intensity: 5,
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
        Intro: ({ scene, handleSaveVN }) =>{
          GameState.currentAct = "Act1";
          handleSaveVN();
          EventBus.emit("performVN", "introData");
        }
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
    GameState.currentlocation.currentLoc = "Mansion";
  }

  generateMap() {
    const map = this.add.tilemap("mansionMap");
    const mansionTileSet = map.addTilesetImage("mansion_nobg", "mansionHouse");
    const galletCity = map.addTilesetImage("road", "galletcity");
    const ground = map.addTilesetImage("grass", "GroundTile");
    const meiLing = map.addTilesetImage("meiLing", "meiLing");
    const legends = map.addTilesetImage("legends", "legends");

    const groundLayer = map
      .createLayer("ground", [ground, galletCity], 0, 0)
      .setPipeline("Light2D");
    const objectsLayer = map
      .createLayer("object", [ground, mansionTileSet])
      .setPipeline("Light2D");
    const detailsLayer = map
      .createLayer("details", mansionTileSet)
      .setPipeline("Light2D");
    const gerbangLayer = map
      .createLayer("gerbang", mansionTileSet)
      .setPipeline("Light2D");
    

    this.meiLingLayer = map.createLayer("meiLing", meiLing).setPipeline("Light2D");

    this.player = this.physics.add
      .sprite(this.posX, this.posY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);
    const legendsLayer = map.createLayer("legends", legends);
    legendsLayer.setDepth(2);

    const scale = 3;
    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    groundLayer.setScale(scale);
    detailsLayer.setScale(scale);
    objectsLayer.setScale(scale);
    gerbangLayer.setScale(scale);
    this.meiLingLayer.setScale(scale);
    legendsLayer.setScale(scale);

    groundLayer.setCollisionByProperty({ collides: true });
    detailsLayer.setCollisionByProperty({ collides: true });
    objectsLayer.setCollisionByProperty({ collides: true });
    gerbangLayer.setCollisionByProperty({ collides: true });
    this.meiLingLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, detailsLayer);
    this.physics.add.collider(this.player, objectsLayer);
    this.physics.add.collider(this.player, gerbangLayer);
    const meiLingCollider = this.physics.add.collider(this.player, this.meiLingLayer);

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

        if (sprite.properties.id === "Intro"){
          this.meiLing = sprite;
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


    if(GameState.currentAct != "intro"){
      this.meiLing.body.enable = false;
      this.meiLingLayer.setVisible(false);
      meiLingCollider.destroy();
      legendsLayer.setVisible(false);
    }
  }

  currentHour() {
    return GameState.time.hour;
  }
}
