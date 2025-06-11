import React, { createContext, useState, useContext, useEffect } from "react";
import { GameState } from "../hooks/gamestate";
import { Game } from "phaser";
import { EventBus } from "../inGame/EventBus";

const GameStatusContext = createContext();

export function GameStatusProvider({ children }) {
  const [status, setStatus] = useState({
    hunger: GameState.hunger,
    energy: GameState.energy,
    hygiene: GameState.hygiene,
    happiness: GameState.happiness,
    money: GameState.money,
    time: {
      hour: GameState.time.hour,
      day: GameState.time.day,
      minute: GameState.time.minute || 0,
    },
    score: GameState.score,
    currentPlace: "Small Gensokyo",
  });

  const syncFromGameState = () => {
    setStatus({
      hunger: GameState.hunger,
      energy: GameState.energy,
      hygiene: GameState.hygiene,
      happiness: GameState.happiness,
      money: GameState.money,
      time: {
        hour: GameState.time.hour,
        day: GameState.time.day,
        minute: GameState.time.minute || 0,
      },
      score: GameState.score,
      currentPlace: GameState.currentlocation.currentLoc,
    });
  };

  useEffect(() => {
    const handleLocationChange = (data) => {
      // Update only the place, keep other stats
      setStatus((prev) => ({
        ...prev,
        currentPlace: data?.location || "Unknown Place",
      }));
    };

    EventBus.on("OnLocationChange", handleLocationChange);

    return () => {
      EventBus.off("OnLocationChange", handleLocationChange);
    };
  }, []);

  const updateStatus = (changes) => {
    setStatus((prev) => ({ ...prev, ...changes }));
  };

  return (
    <GameStatusContext.Provider value={{ status, setStatus, syncFromGameState }}>
      {children}
    </GameStatusContext.Provider>
  );
}

export const useGameContext = () => useContext(GameStatusContext);
