import Phaser from "phaser"

import CreatePlayerAnimation from "../movements/animation";
import { handleMovement } from "../movements/handleMovement";
import { GameState } from "../../hooks/gamestate";

export class FlowerField extends Phaser.Scene{
    constructor(){
        super({ key : "FlowerField" });
    }

    preload(){
    }

    create(data) {

    GameState.currentlocation = "flowerField";
    console.log("You are now in:", GameState.currentlocation);

    const startX = 300;
    const startY = 400;

    this.player = this.physics.add.sprite(startX, startY, "Yukari");
    this.player.setScale(0.3);

    this.add.text(100, 100, "FlowerField", { fontSize: "20px", fill: "#fff" });

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

    const button2 = this.add.text(300, 150, "Return to Main Scene", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    })
    .setInteractive()
    .on("pointerdown", () => {
      this.scene.start("DanmakuScene");
    });

     this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SHIFT
        );
  }


  update(){
    handleMovement(this);
  }
}