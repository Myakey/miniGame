import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from './game'
import { EventBus } from './EventBus';
import { useNavigate } from "react-router-dom";

export const PhaserGame = forwardRef(function PhaserGame ({ currentActiveScene }, ref){
    const game = useRef();

    const navigate = useNavigate();

    useLayoutEffect(() => {

        if (game.current === undefined){
            game.current = StartGame("game-container");

            if(ref != null){
                ref.current = { game: game.current, scene: null};
            }

        }

        return () => {
            if (game.current){
                game.current.destroy(true);
                game.current = undefined;
            }
        }
    }, [ref]);

    useEffect(() => {

        EventBus.on('current-scene-ready', (currentScene) =>{

            if (currentActiveScene instanceof Function){
                currentActiveScene(currentScene);
            }
            ref.current.scene = currentScene;
        })

        EventBus.on("navigate", navigate);

        return () =>{
            EventBus.removeListener('current-scene-ready');
            EventBus.off("navigate", navigate);
        }
    }, [currentActiveScene, ref])

    return (
        <div id="game-container" className="w-full h-full"></div>
    )
}
)