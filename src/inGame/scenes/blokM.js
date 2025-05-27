import Phaser from 'phaser';
import { EventBus } from "../EventBus";
import { GameState } from '../../hooks/gamestate';

export class BlokM extends Phaser.Scene{
    constructor(){
        super({ key : "BlokM" });
    }

    preload(){
    }

    create(data) {
    GameState.currentlocation = "blokM";
    console.log("You are now in:", GameState.currentlocation);
    this.add.text(100, 100, "You are in the other scene", { fontSize: "20px", fill: "#fff" });

    const button = this.add.text(100, 150, "Return to Main Scene", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    })
    .setInteractive()
    .on("pointerdown", () => {
      this.scene.start("MainGame", {
        x: data.x,
        y: data.y
      });
    });
  }
}