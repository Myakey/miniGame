import { Scene } from 'phaser';
import Yukari from "../../assets/image/InGame/SpriteSheets/Yukari.png";
import { useNavigate } from 'react-router-dom';

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
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        this.load.tilemapTiledJSON("map", "/src/assets/image/InGame/maps/tilesTest.tmj");
        this.load.image("Grass", "/src/assets/image/InGame/maps/grass.png");
        this.load.image("Path", "/src/assets/image/InGame/maps/path.png");
        this.load.image("Tree", "/src/assets/image/InGame/maps/Tree01a.png")
        this.load.spritesheet(
        "Yukari",
        "src/assets/image/InGame/SpriteSheets/Yukari.png",
        {
            frameWidth: 176,
            frameHeight: 240,
        }
        );
            //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainGame');
    }
}
