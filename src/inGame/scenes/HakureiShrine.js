import Phaser from "phaser"
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { EventBus } from "../EventBus";
import { GameState } from "../../hooks/gamestate";
// import trialMap from "../../assets/image/InGame/maps/Trial.tmj"
import { useNavigate } from "react-router-dom";
import { handleMovement } from "../movements/handleMovement";
import setupPlayerMovement from "../movements/pathFinding";

import CreatePlayerAnimation from "../movements/animation";

export class HakureiShrine extends Phaser.Scene{
    constructor(){
        super({ key : "HakureiShrine" });
    }

    preload(){
    }


    create(data){
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    GameState.currentlocation = "HakureiShrine";
    
    //MAP INITIALIZER
    const map = this.add.tilemap("rumah");
    const floor = map.addTilesetImage("bathFloor", "BathroomFloor");
    const toilet = map.addTilesetImage("toiletFrontOpen", "toiletFrontOpen");
    const walls = map.addTilesetImage("wallBorder", "walls")

    const floorLayer = map.createLayer("floor", floor);
    const toiletLayer = map.createLayer("toilet", toilet);
    const wallsLayer = map.createLayer("wall", walls);

    

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // wallsLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255),
    //   faceColor: new Phaser.Display.Color(0, 255, 0, 255),
    // });

    const mapWidth = map.widthInPixels;
    const mapHeight = map.heightInPixels;

    const scaleFactor = 5; // or any scale factor you want (1.5, 2, etc.)

    floorLayer.setScale(scaleFactor);
    toiletLayer.setScale(scaleFactor);
    wallsLayer.setScale(scaleFactor)

    wallsLayer.setCollisionByProperty({ collides: true });
    // Set world bounds to match the map size
    this.physics.world.setBounds(0, 0, mapWidth * 5, mapHeight * 5);

    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * 5,
      map.heightInPixels * 5
    );

    this.add.text(100, 100, "Hakurei", { fontSize: "20px", fill: "#fff" });


    const startX = GameState.pos_x;
    const startY = GameState.pos_y;
    
    this.player = this.physics.add.sprite(startX, startY, "Yukari");
    this.player.setScale(0.3);

    this.physics.add.collider(this.player, wallsLayer);
    
    this.cameras.main.setZoom(1);

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
    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SHIFT
        );

    const button = this.add.text(100, 150, "Return to Main Scene", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    })
    .setInteractive()
    .on("pointerdown", () => {
      this.scene.start("MainGame");
    });
  }

  update(){
    handleMovement(this);
  }
}