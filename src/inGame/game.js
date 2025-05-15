import { MainGame } from "./scenes/MainGame";
import { Preloader } from "./scenes/Preloader";
import { BlokM } from "./scenes/blokM";
import { Boot } from "./scenes/Boot";
import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    parent: 'game-container',
    backgroundColor: "#91b2c1",
    // scale: {
    //      mode: Phaser.Scale.RESIZE,
    //     autoCenter: Phaser.Scale.CENTER_BOTH,
    // },
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
        Preloader,
        MainGame,
        BlokM
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;