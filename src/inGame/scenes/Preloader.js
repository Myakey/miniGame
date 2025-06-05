import { Scene } from "phaser";
import { useNavigate } from "react-router-dom";
import { GameState } from "../../hooks/gamestate";
import { charaList } from "../mechanics/charaList";
import CreatePlayerAnimation from "../movements/animation";
import { EventBus } from "../EventBus";

import { playSound } from "../../utils/soundHandler";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Circle background ring
    const bgCircle = this.add.graphics();
    bgCircle.lineStyle(6, 0x888888, 1);
    bgCircle.strokeCircle(centerX, centerY, 50);

    // Progress ring
    const progressCircle = this.add.graphics();
    const percentText = this.add
      .text(centerX, centerY, "0%", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.load.on("progress", (progress) => {
      progressCircle.clear();

      progressCircle.lineStyle(6, 0xffffff, 1);

      const startAngle = Phaser.Math.DegToRad(-90); // Start at top
      const endAngle = Phaser.Math.DegToRad(-90 + 360 * progress);

      progressCircle.beginPath();
      progressCircle.arc(centerX, centerY, 50, startAngle, endAngle, false);
      progressCircle.strokePath();
      percentText.setText(`${Math.floor(progress * 100)}%`);
    });

    this.load.on("complete", () => {
      progressCircle.destroy();
      bgCircle.destroy();
    });
  }

  preload() {
    let findChara = GameState.char;
    let foundChara = charaList.find((char) => char.name === findChara);
    console.log(foundChara);
    //MainMap
    this.load.tilemapTiledJSON("map", "/assets/img/map/mainMap.tmj");
    this.load.image("Grass", "/assets/img/map/grass.png");
    this.load.image("Path", "/assets/img/map/path.png");
    this.load.image("Tree", "/assets/img/map/Tree01a.png");
    this.load.image("GroundTile", "/assets/img/map/TILEMAPS.png");
    this.load.image("Home", "/assets/img/map/home.png");
    this.load.image("MainDetails", "/assets/img/map/decoration.png");
    this.load.image("galletcity", "/assets/img/map/galletcity.png");

    //BLOKM
    this.load.tilemapTiledJSON("blokM", "/assets/img/map/blokM/blokM.tmj");
    this.load.image(
      "decorationBlokM",
      "/assets/img/map/blokM/decorationBlokM.png"
    );
    this.load.image(
      "furnitureBlokM",
      "/assets/img/map/blokM/furnitureBlokM.png"
    );
    this.load.image("LibraryBlokM", "/assets/img/map/blokM/LibraryBlokM.png");
    this.load.image("storeBlokM", "/assets/img/map/blokM/storeBlokM.png");
    this.load.image("tileBlokM", "/assets/img/map/blokM/tileBlokM.png");
    this.load.image("Kosuzu", "/assets/img/map/blokM/Kosuzu.png");
    this.load.image("Floor1BlokM", "/assets/img/map/blokM/Floor1BlokM.png");
    this.load.image("Floor2BlokM", "/assets/img/map/blokM/Floor2BlokM.png");


    //Dieng
    this.load.tilemapTiledJSON("dieng", "/assets/img/map/dieng/diengsz.tmj");
    this.load.image(
      "diengTiles",
      "/assets/img/map/dieng/free_pixel_16_woods.png"
    );
    this.load.image("Sanae", "/assets/img/map/dieng/Sanae.png");

    //Hakurei Shrine (Rumah)
    this.load.tilemapTiledJSON("rumah", "/assets/img/map/rumah/rumah.tmj");
    this.load.image("Tiles1", "/assets/img/map/rumah/Tiles1.png");
    this.load.image("Tiles2", "/assets/img/map/rumah/Tiles2.png");
    this.load.image("Objects", "/assets/img/map/rumah/Objects.png");
    this.load.image("4BigSet", "/assets/img/map/rumah/4BigSet.png");
    // this.load.image("toiletFrontOpen", "/assets/img/map/rumah/Object/toiletFrontOpen.png");
    // this.load.image("walls", "/assets/img/map/rumah/Tiles/wallBorder.png")

    //FLowerField
    this.load.tilemapTiledJSON(
      "flowerField",
      "/assets/img/map/FlowerField/flowerField.tmj"
    );
    this.load.image(
      "flowerFieldTiles",
      "/assets/img/map/FlowerField/grass.png"
    );
    this.load.image("sunflowers", "/assets/img/map/FlowerField/SUNFLOWERS.png");
    this.load.image("flowerFieldTree", "/assets/img/map/FlowerField/tree.png");
    this.load.image(
      "flowerFieldFence",
      "/assets/img/map/FlowerField/fence_00.png"
    );
    this.load.image("Yuuka", "/assets/img/map/FlowerField/Yuuka.png");

    //Beach
    this.load.tilemapTiledJSON("pantai", "/assets/img/map/pantai/pantai.tmj");
    this.load.image("beachTiles", "/assets/img/map/pantai/rpg.png");
    this.load.image("treePantai", "/assets/img/map/pantai/Trees.png");
    this.load.script("animatedTiles", "/utils/AnimatedTiles.js");

    //Character SpriteSheets
    this.load.spritesheet("Yukari", foundChara.path, {
      frameWidth: foundChara.width,
      frameHeight: foundChara.height,
    });
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");
  }

  create() {
    CreatePlayerAnimation(this);
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    // console.log(GameState.afterVN);
    // console.log(GameState.currentAct);
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    if(sessionStorage.getItem("debugMode") != null){
      this.scene.start(sessionStorage.getItem("currentPlace"));
    }else{
      if (GameState.currentAct === "intro") {
      EventBus.emit(
        "callObjective",
        "Go to house to talk about it with Yukari. You can also talk to other characters in the map, and interact with objects. Enjoy your adventure!"
      );
    }
    if (GameState.currentAct === "act1") {
      EventBus.emit(
        "callObjective",
        "Find Sanae in Dieng and talk about the incident."
      );
    }
    if (GameState.currentAct === "act2") {
      EventBus.emit(
        "callObjective",
        "Find Kosuzu in Blok M and talk about the incident."
      );
    }

    if (GameState.afterVN) {
      GameState.afterVN = false;
      if (GameState.currentAct === "prologue") {
        GameState.currentAct = "intro";
        EventBus.emit("performVN", "introData");
        GameState.afterVN = true;
      }
      playSound("mainAmbience");
      switch (GameState.currentlocation.currentLoc) {
        case "MainGame":
          this.scene.start("MainGame");
          break;
        case "BlokM":
          this.scene.start("BlokM");
          break;
        case "HakureiShrine":
          this.scene.start("HakureiShrine");
          break;
        case "FlowerField":
          this.scene.start("FlowerField");
          break;
        case "Pantai":
          this.scene.start("Pantai");
          break;
        case "Dieng":
          this.scene.start("Dieng");
          break;
        default:
          this.scene.start("MainGame");
          break;
      }
    } else {
      this.scene.start("MainGame");
    }
    }
    
  }
}
