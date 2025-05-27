import Phaser from 'phaser';
import { EventBus } from "../EventBus";
import { GameState } from '../../hooks/gamestate';



export class debugScene extends Phaser.Scene{
    constructor(){
        super({ key : "debugScene" });
    }

    preload(){
    }

    create() {
    GameState.currentlocation ="blokM";
    console.log("You are now in:", GameState.currentlocation);

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
      EventBus.emit("performAction", {type:"bath"});
    });

    const button3 = this.add.text(500, 150, "Jalan-Jalan", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      EventBus.emit("performAction", {type:"jalan"});
    });


    const button4 = this.add.text(100, 200, "Hunt", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      EventBus.emit("performAction", {type:"hunt"});
    });

    const button5 = this.add.text(100, 250, "Kerja di MCD", {
      fontSize: "18px",
      fill: "#0f0",
      backgroundColor: "#000",
      padding: { x: 10, y: 5 }
    }).setInteractive()
    .on("pointerdown", () => {
      EventBus.emit("performAction", {type:"work", jobId:"blokm_mcd"});
    });

    // const button5 = this.add.text(400, 150, "Bath", {
    //   fontSize: "18px",
    //   fill: "#0f0",
    //   backgroundColor: "#000",
    //   padding: { x: 10, y: 5 }
    // }).setInteractive()
    // .on("pointerdown", () => {
    //   EventBus.emit("performAction", "bath");
    // });

    // const button6 = this.add.text(400, 150, "Bath", {
    //   fontSize: "18px",
    //   fill: "#0f0",
    //   backgroundColor: "#000",
    //   padding: { x: 10, y: 5 }
    // }).setInteractive()
    // .on("pointerdown", () => {
    //   EventBus.emit("performAction", "bath");
    // });

    // const button7 = this.add.text(400, 150, "Bath", {
    //   fontSize: "18px",
    //   fill: "#0f0",
    //   backgroundColor: "#000",
    //   padding: { x: 10, y: 5 }
    // }).setInteractive()
    // .on("pointerdown", () => {
    //   EventBus.emit("performAction", "bath");
    // });
  }
}
