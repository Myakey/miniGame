import React from "react";
import { useRef, useState, useEffect } from "react";

import Phaser from "phaser";
import { PhaserGame } from '../inGame/PhaserGame'
import '../styles/inGame.css'
import { useNavigate } from 'react-router-dom';

import StatusBars from "../components/Game/StatusBars";
import Button from "../components/UI/Buttons"

function MainGame(){

    let navigate = useNavigate();

    const icons = [{name : "hunger"},{name : "energy"}, {name: "hygiene"} , {name :"happiness"}];


    const [countTest, setCountTest] = useState(0);

    const [canMoveSprite, setCanMoveSprite] = useState(true);

    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({x : 0, y : 0});

    const changeScene = () => {
        const scene = phaserRef.current.scene;

        if(scene){
            scene.changeScene();
        }
    }

    const moveSprite = () =>{
        const scene = phaserRef.current.scene;

        if (scene && scene.scene.key === 'InGame'){
            scene.moveSprite(({ x,y }) =>{
                setSpritePosition({x , y})
            })
        }
    }

    const addSprite = () =>{
        const scene = phaserRef.current.scene;

        if(scene){
            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    }

    const currentScene = (scene) => {

        setCanMoveSprite(scene.scene.key !== 'InGame');
        
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCountTest(c => c + 1); // ✅ Pass a state updater
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    function createStatus(text){
        return(
            <StatusBars icon = {text.name} num={countTest}/>
        )
    }

    return(
       <>
       <div className="flex flex-col items-center">
            <div className="text-8xl">
            <Button text="Back" onClick={()=>{navigate('/')}}/>
                Objective
            </div>
            <div className="flex flex-row gap-5 justify-center text-center">
                {icons.map(createStatus)}
                <div>
                    Money
                </div>
            </div>
            <div id="mainGame">
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            </div>
       </div>
       </>
    )
}

export default MainGame;