import Phaser from 'phaser';
import { EventBus } from "../EventBus";
import { GameState } from '../../hooks/gamestate';

export class Pantai extends Phaser.Scene{
    constructor(){
        super({ key : "Pantai" });
    }

    preload(){
    }

    create(data) {
    GameState.currentlocation = "blokM";
    console.log("You are now in:", GameState.currentlocation);
    this.add.text(100, 100, "Pantai", { fontSize: "20px", fill: "#fff" });

    const button = this.add.text(100, 150, "Return to Main Scene", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      this.scene.start("MainGame");
    });



    const button1 = this.add.text(400, 150, "Bath", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      EventBus.emit("performAction", "bath");
    });

    const button2 = this.add.text(600, 150, "Shop", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      EventBus.emit("showShop");
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shiftKey = this.input.keyboard.addKey(
          Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
  }

  update(){
    
  }
}