import { Scene } from 'phaser';
import { useNavigate } from 'react-router-dom';
import { GameState } from '../../hooks/gamestate';
import { charaList } from '../mechanics/charaList';

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
        // this.load.once('complete', () => {
        // fetch('/public/maps/Trial.tmj')
        //     .then(res => res.json())
        //     .then(mapData => {
        //     this.createMap(mapData);
        //     });
        // });
        this.load.tilemapTiledJSON('map', '/assets/img/map/tilesTest.tmj');
        this.load.image("Grass", '/assets/img/map/grass.png');
        this.load.image("Path", '/assets/img/map/path.png');
        this.load.image("Tree", '/assets/img/map/Tree01a.png');
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
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainGame');
    }
}
