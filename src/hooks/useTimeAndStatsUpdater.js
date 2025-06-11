import { useEffect, useRef } from "react";
import { EventBus } from "../inGame/EventBus";
import { GameState } from "./gamestate";
import { isPaused } from "../inGame/gameController";
import { Game } from "phaser";

export default function useTimeAndStatsUpdater({
  setStatus,
  setVampireWarning,
}) {
  const tickCounter = useRef(0); // Count total ticks (every 1 sec)
  const vampireWarningCooldown = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tickCounter.current += 1;
        let shouldShowVampireWarning = false;


        setStatus((prev) => {
          const newMinute = (prev.time.minute + 1) % 60;
          const hourChanged = prev.time.minute === 59;
          const newHour = hourChanged
            ? (prev.time.hour + 1) % 24
            : prev.time.hour;
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
            score: isNewDay
              ? prev.score + (GameState.difficulties === "hard" ? 75 : 50)
              : prev.score,
          };

          // Stat depletion logic with different intervals
          if (GameState.isVampire) {
            const isDay = newHour >= 6 && newHour <= 18;
            const outdoorLocations = ["Dieng", "MainGame", "Pantai"];
            const isOutside = outdoorLocations.includes(
              GameState.currentlocation.currentLoc
            );

            if (isDay && isOutside) {
              newState.energy = Math.max(prev.energy - 2, 0);
              newState.happiness = Math.max(prev.happiness - 2, 0);
              newState.hygiene = Math.max(prev.hygiene - 2, 0);
              newState.hunger = Math.max(prev.hunger - 2, 0);

              if (!vampireWarningCooldown.current) {
                shouldShowVampireWarning = true;
              }
            }
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

        if (shouldShowVampireWarning) {
          console.log("Test");
          vampireWarningCooldown.current = true;
          setVampireWarning(true);

          setTimeout(() => {
            vampireWarningCooldown.current = false;
          }, 10000);
        }
      }
    }, 1000); // 1 second tick

    return () => clearInterval(interval);
  }, [setStatus, setVampireWarning]);
}
