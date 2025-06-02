import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { MainGame } from "./scenes/MainGame";
import { Dieng } from "./scenes/Dieng";
import { Pantai } from "./scenes/Pantai";
import { FlowerField } from "./scenes/flowerField";
import { BlokM } from "./scenes/blokM";
import { HakureiShrine } from "./scenes/HakureiShrine";
import { debugScene } from "./scenes/debugScene";
import DanmakuScene from "./scenes/danMaku";

import OverlayScene from "./scenes/OverlayScene";

import DanMakuTrial from "./danMakuSpecific/scenes/Game";

import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    parent: 'game-container',
    backgroundColor: "#000000",
    pixelArt: true,
    scale: {
         mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true, // optional
      },
    },
    input:{
      gamepad: true,
    },
    scene: [
        Boot,
        OverlayScene,
        Preloader,
        MainGame,
        BlokM,
        Dieng,
        HakureiShrine,
        Pantai,
        FlowerField,
        debugScene,
        DanmakuScene,
        DanMakuTrial
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;