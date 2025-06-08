import { useEffect, useRef } from "react";
import { EventBus } from "../inGame/EventBus";
import { GameState } from "./gamestate";
import { isPaused } from "../inGame/gameController";
import { Game } from "phaser";

export default function useTimeAndStatsUpdater({ setStatus }) {
  const tickCounter = useRef(0); // Count total ticks (every 1 sec)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tickCounter.current += 1;

        setStatus((prev) => {
          const newMinute = (prev.time.minute + 1) % 60;
          const hourChanged = prev.time.minute === 59;
          const newHour = hourChanged ? (prev.time.hour + 1) % 24 : prev.time.hour;
          const isNewDay = hourChanged && prev.time.hour === 23;
          const newDay = isNewDay ? prev.time.day + 1 : prev.time.day;

          if (hourChanged) {
            EventBus.emit("phaser-time-update", { hour: newHour });
            GameState.time.hour = newHour;
          }

          const newState = {
            ...prev,
            time: {
              ...prev.time,
              minute: newMinute,
              hour: newHour,
              day: newDay,
            },
            score: isNewDay ? prev.score + (GameState.difficulties === "hard" ? 75 : 50) : prev.score,
          };

          // Stat depletion logic with different intervals
          if (tickCounter.current % 5 === 0) {
            // Every 5 seconds
            newState.health = Math.max((prev.health || 100) - 1, 0);
          }

          if (tickCounter.current % 10 === 0) {
            // Every 10 seconds
            newState.hygiene = Math.max(prev.hygiene - 1, 0);
            GameState.hygiene = newState.hygiene; // Update global hygiene state
          }

          if (tickCounter.current % 3 === 0) {
            // Every 3 seconds
            newState.hunger = Math.max(prev.hunger - 1, 0);
            newState.energy = Math.max(prev.energy - 1, 0);
            newState.happiness = Math.max(prev.happiness - 1, 0);
            GameState.hunger = newState.hunger; // Update global hunger state
            GameState.energy = newState.energy; // Update global energy state
            GameState.happiness = newState.happiness; // Update global happiness state
          }
          GameState.time.minute = newMinute; // Update global time state
          GameState.time.day = newDay; // Update global day state
          GameState.time.hour = newHour; // Update global hour state
          return newState;
        });
      }
    }, 1000); // 1 second tick

    return () => clearInterval(interval);
  }, [setStatus]);
}
