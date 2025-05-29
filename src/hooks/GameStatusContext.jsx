import React, { createContext, useState, useContext } from "react";
import { GameState } from "./gamestate";
import { Game } from "phaser";

const GameStatusContext = createContext();

export function GameStatusProvider({ children }){
    const [status, setStatus] = useState({
        hunger: GameState.hunger,
        energy: GameState.energy,
        hygiene: GameState.hygiene,
        happiness: GameState.happiness,
        money: GameState.money,
        time: {
            hour: GameState.time.hour,
            day: GameState.time.day,
            minute: GameState.time.minute || 0
        }
    })

    const updateStatus = (changes) => {
        setStatus(prev => ({ ...prev, ...changes }));
    };

    return (
        <GameStatusContext.Provider value={{ status, setStatus }}>
            {children}
        </GameStatusContext.Provider>
    );
}


export const useGameContext = () => useContext(GameStatusContext);
