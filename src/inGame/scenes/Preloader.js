import { Scene } from 'phaser';
import { useNavigate } from 'react-router-dom';
import { GameState } from '../../hooks/gamestate';
import { charaList } from '../mechanics/charaList';
import CreatePlayerAnimation from "../movements/animation";

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        const bar = this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        let findChara = GameState.char;
        let foundChara = charaList.find(char => char.name === findChara);
        console.log(foundChara);
        //MainMap
        this.load.tilemapTiledJSON('map', '/assets/img/map/mainMap.tmj');
        this.load.image("Grass", '/assets/img/map/grass.png');
        this.load.image("Path", '/assets/img/map/path.png');
        this.load.image("Tree", '/assets/img/map/Tree01a.png');
        this.load.image("GroundTile", '/assets/img/map/TILEMAPS.png');

        //BLOKM
        this.load.tilemapTiledJSON("blokM", "/assets/img/map/blokM/blokM.tmj");
        this.load.image("decorationBlokM", "/assets/img/map/blokM/decorationBlokM.png");
        this.load.image("furnitureBlokM", "/assets/img/map/blokM/furnitureBlokM.png");
        this.load.image("LibraryBlokM", "/assets/img/map/blokM/LibraryBlokM.png");
        this.load.image("storeBlokM", "/assets/img/map/blokM/storeBlokM.png");
        this.load.image("tileBlokM", "/assets/img/map/blokM/tileBlokM.png");
        this.load.image("Kosuzu", "/assets/img/map/blokM/Kosuzu.png");

        //Dieng
        this.load.tilemapTiledJSON("dieng", "/assets/img/map/dieng/diengsz.tmj");
        this.load.image("diengTiles", "/assets/img/map/dieng/free_pixel_16_woods.png");

        //Hakurei Shrine (Rumah)
        this.load.tilemapTiledJSON("rumah", "/assets/img/map/rumah/rumah.tmj");
        this.load.image("Tiles1", "/assets/img/map/rumah/Tiles1.png");
        this.load.image("Tiles2", "/assets/img/map/rumah/Tiles2.png");
        this.load.image("Objects", "/assets/img/map/rumah/Objects.png");
        this.load.image("4BigSet", "/assets/img/map/rumah/4BigSet.png");
        // this.load.image("toiletFrontOpen", "/assets/img/map/rumah/Object/toiletFrontOpen.png");
        // this.load.image("walls", "/assets/img/map/rumah/Tiles/wallBorder.png")

        //FLowerField

        //Beach


        //Character SpriteSheets
        this.load.spritesheet(
        "Yukari",
        foundChara.path,
        {
            frameWidth: foundChara.width,
            frameHeight: foundChara.height,
        }
        );
            //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
    }

    create ()
    {
        CreatePlayerAnimation(this);
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        console.log(GameState.afterVN);
        if(GameState.afterVN){
             switch(GameState.currentlocation.currentLoc){
            case "MainGame":
                this.scene.start('MainGame');
                break;
            case "BlokM":
                this.scene.start('BlokM');
                break;
            case "HakureiShrine":
                this.scene.start('HakureiShrine');
                break;
            case "FlowerField":
                this.scene.start('FlowerField');
                break;
            case "Pantai":
                this.scene.start('Pantai');
                break;
            case "Dieng":
                this.scene.start('Dieng');
                break;
            default:
                this.scene.start('MainGame');
                break;
        }
        }else{
            this.scene.start("MainGame");
        }
       
    }
}
