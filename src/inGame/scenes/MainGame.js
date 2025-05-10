import Phaser from 'phaser';

export class MainGame extends Phaser.Scene{
    constructor(){
        super({ key: 'MainGame'});

    }

    preload(){
            this.load.spritesheet()
    }
}