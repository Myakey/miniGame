import Phaser from "phaser";
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";
// import trialMap from "../../assets/image/InGame/maps/Trial.tmj"
import { useNavigate } from "react-router-dom";
import { handleMovement } from "../movements/handleMovement";
import setupPlayerMovement from "../movements/pathFinding";

import CreatePlayerAnimation from "../movements/animation";

export class MainGame extends Phaser.Scene {
  constructor() {
    super({ key: "MainGame" });
  }

  preload() {}

  handleTrigger(zoneNumber) {
    this.SaveState();
    this.inTriggerZone = zoneNumber;
  }

  generateTriggerZone() {
    this.triggerZone1 = this.add.zone(400, 100, 100, 100);
    this.physics.world.enable(this.triggerZone1);
    this.triggerZone1.body.setAllowGravity(false);
    this.triggerZone1.body.setImmovable(true);

    this.triggerZone2 = this.add.zone(600, 100, 100, 100);
    this.physics.world.enable(this.triggerZone2);
    this.triggerZone2.body.setAllowGravity(false);
    this.triggerZone2.body.setImmovable(true);

    this.triggerZone3 = this.add.zone(400, 300, 100, 100);
    this.physics.world.enable(this.triggerZone3);
    this.triggerZone3.body.setAllowGravity(false);
    this.triggerZone3.body.setImmovable(true);

    this.triggerZone4 = this.add.zone(600, 300, 100, 100);
    this.physics.world.enable(this.triggerZone4);
    this.triggerZone4.body.setAllowGravity(false);
    this.triggerZone4.body.setImmovable(true);

    this.triggerZone5 = this.add.zone(800, 300, 100, 100);
    this.physics.world.enable(this.triggerZone5);
    this.triggerZone5.body.setAllowGravity(false);
    this.triggerZone5.body.setImmovable(true);

    this.triggerZone6 = this.add.zone(1000, 300, 100, 100);
    this.physics.world.enable(this.triggerZone6);
    this.triggerZone6.body.setAllowGravity(false);
    this.triggerZone6.body.setImmovable(true);

    this.inTriggerZone = false;
    this.interactKey = this.input.keyboard.addKey("E");
    this.physics.add.overlap(
      this.player,
      this.triggerZone1,
      () => {
        this.handleTrigger(1);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.triggerZone2,
      () => {
        this.handleTrigger(2);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.triggerZone3,
      () => {
        this.handleTrigger(3);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.triggerZone4,
      () => {
        this.handleTrigger(4);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.triggerZone5,
      () => {
        this.handleTrigger(5);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.triggerZone6,
      () => {
        this.handleTrigger(6);
      },
      null,
      this
    );
  }

  generatePlaces() {
    this.interactKey.on("down", () => {
      switch (this.inTriggerZone) {
        case 1:
          this.scene.start("BlokM");
          break;
        case 2:
          this.scene.start("Dieng");
          break;
        case 3:
          this.scene.start("HakureiShrine");
          break;
        case 4:
          this.scene.start("FlowerField");
          break;
        case 5:
          this.scene.start("Pantai");
          break;
        case 6:
          this.scene.start("debugScene");
          break;
        default:
          break;
      }
      // EventBus.emit("perform-action", "bath");
      //  EventBus.emit("navigate", "/");
    });
  }

  create() {
    //MAP Initializer
    const map = this.add.tilemap("map");
    const ground = map.addTilesetImage("TILEMAPS", "GroundTile");
    // const grass = map.addTilesetImage("grass", "Grass");
    // const trees = map.addTilesetImage("tree", "Tree");
    const groundLayer = map.createLayer("Ground", ground);
    // const grassLayer = map.createLayer("layer2", grass);
    // const obstacleLayer = map.createLayer("layer3", trees);

    const scale = 1;
    groundLayer.setScale(scale);

    //INITIALIZER
    CreatePlayerAnimation(this);
    // const map = this.make.tilemap({ key: "map" });
    const startX = GameState.pos_x;
    const startY = GameState.pos_y;

    this.player = this.physics.add.sprite(startX, startY, "Yukari");
    this.player.setScale(0.3);

    this.cameras.main.setZoom(1);

    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    // Set world bounds to match the map size
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * 1,
      map.heightInPixels * 1
    );

    this.input.gamepad.once(
      "connected",
      function (pad) {
        this.gamepad = pad;
        console.log("Gamepad connected (event):", pad.id);
      },
      this
    );
    // Also check if a gamepad is already connected
    if (this.input.gamepad.total > 0) {
      const pads = this.input.gamepad.gamepads;
      for (let i = 0; i < pads.length; i++) {
        if (pads[i]) {
          this.gamepad = pads[i];
          console.log("Gamepad already connected:", this.gamepad.id);
        }
      }
    }

    this.player.body.setCollideWorldBounds(true);

    this.generateTriggerZone();

    this.cameras.main.startFollow(this.player);

    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000, 1); 
    graphics.strokeRect(
      this.physics.world.bounds.x,
      this.physics.world.bounds.y,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    this.infoText = this.add
      .text(280, 250, "Nice!", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setVisible(false);

    this.generatePlaces();

    //time test
    this.time.addEvent({
      delay: 1000,               // 1 real second = 1 game hour
      callback: this.tickGameTime,
      callbackScope: this,
      loop: true,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    //  this.movement = setupPlayerMovement(this, this.player, map, grassLayer);
    EventBus.on("move", this.handleMove, this);
    EventBus.on("stop", this.handleStopInput, this);
    EventBus.emit("current-scene-ready", this);
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
    console.log("Its here the savestate!");
    GameState.pos_x = this.player.x;
    GameState.pos_y = this.player.y;
  }

  update() {
    handleMovement(this);

    if (this.gamepad) {
      const xButtonPressed = this.gamepad.buttons[2].pressed; // X button (standard mapping)

      const playerBounds = this.player.getBounds();
      const areaBounds = this.triggerZone1.getBounds();

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, areaBounds)
      ) {
        if (xButtonPressed) {
          this.interactWithArea();
        }
      }
    }

    const inZone = Phaser.Geom.Intersects.RectangleToRectangle(
      this.player.getBounds(),
      this.triggerZone1.getBounds()
    );

    this.infoText.setVisible(inZone);
  }

  tickGameTime(){
  GameState.time.hour += 1;
  if (GameState.time.hour >= 24) {
    GameState.time.hour = 0;
    GameState.time.day += 1;
  }
  EventBus.emit("timeTick", { time: GameState.time });
  }

  shutdown() {
    EventBus.off("move", this.handleMoveInput, this);
  }

  interactWithArea() {
    console.log("Interacted with the special area!");
    // Add your interaction logic here
  }
}
