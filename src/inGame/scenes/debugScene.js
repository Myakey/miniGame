import Phaser from 'phaser';
import { EventBus } from "../EventBus";

export class debugScene extends Phaser.Scene{
    constructor(){
        super({ key : "debugScene" });
    }

    preload(){
    }

    create() {
    this.add.text(100, 100, "DEBUG SCENE", { fontSize: "20px", fill: "#fff" });

    const button = this.add.text(100, 150, "Return to Main Scene", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      this.scene.start("MainGame");
    });



    const button2 = this.add.text(400, 150, "Bath", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      EventBus.emit("performAction", "bath");
    });

    
  }
}
