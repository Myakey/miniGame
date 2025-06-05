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

export class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: "MainGame" });
  }

  preload() {}

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
            resolution: 2
          }
          
        )
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0);


        this.tweens.add({
    targets: enteringText,
    y: this.cameras.main.centerY,
    duration: 400,
    ease: "Sine.easeOut"
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
    const decoration = map.addTilesetImage("blokM","MainDetails");
    const home = map.addTilesetImage("home", "Home")
    const galletcity = map.addTilesetImage("blokM2", "galletcity");

    const groundLayer = map.createLayer("Ground", ground).setPipeline("Light2D")
    const tempatLayer = map.createLayer("tempat", [home, decoration, sunflowers, galletcity]).setPipeline("Light2D")
    const detailsLayer = map.createLayer("details", [decoration, home]).setPipeline("Light2D");
    const grassLayer = map.createLayer("grass", ground).setPipeline("Light2D");

    const startX = GameState.pos_x;
    const startY = GameState.pos_y;

//     // 👇 Add minimap camera BEFORE scaling layers
// const miniCamera = this.cameras.add(
//   this.scale.width - 210, // x
//   10,                     // y
//   200,                    // width
//   150                     // height
// );

// miniCamera.setZoom(0.2); // Adjust as needed
// miniCamera.setBackgroundColor(0x000000);
// miniCamera.scrollX = 0;
// miniCamera.scrollY = 0;

// Optional: Draw border
// this.add.graphics()
//   .lineStyle(2, 0xffffff, 1)
//   .strokeRect(this.scale.width - 210, 10, 200, 150)
//   .setScrollFactor(0)
//   .setDepth(1000); // Always on top

    this.player = this.physics.add
      .sprite(startX, startY, "Yukari")
      .setScale(0.3);
    this.player.body.setCollideWorldBounds(true);

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

        this.lights.addLight(this.scale.width / 4, this.scale.height / 4, 600)
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
        resolution: 2
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

    EventBus.on("move", this.handleMove, this);
    EventBus.on("stop", this.handleStopInput, this);
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    handleMovement(this);

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

  // tickGameTime() {
  //   GameState.time.hour += 1;
  //   if (GameState.time.hour >= 24) {
  //     GameState.time.hour = 0;
  //     GameState.time.day += 1;
  //   }
  //   EventBus.emit("timeTick", { time: GameState.time });
  // }

  shutdown() {
    EventBus.off("move", this.handleMoveInput, this);
  }

  interactWithArea() {
    console.log("Interacted with the special area!");
    // Add your interaction logic here
  }

  currentHour(){
    console.log(GameState.time.hour);
    return GameState.time.hour;
  }
}
