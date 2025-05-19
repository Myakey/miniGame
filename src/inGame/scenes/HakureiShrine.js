import Phaser from "phaser"

export class HakureiShrine extends Phaser.Scene{
    constructor(){
        super({ key : "HakureiShrine" });
    }

    preload(){
    }

    create(data) {
    this.add.text(100, 100, "Hakurei", { fontSize: "20px", fill: "#fff" });

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
}