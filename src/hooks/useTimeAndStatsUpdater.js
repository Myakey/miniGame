import { useEffect, useRef } from "react";
import { EventBus } from "../inGame/EventBus";
import { GameState } from "./gamestate";
import { isPaused } from "../inGame/gameController";

export default function useTimeAndStatsUpdater({ setStatus, setVampireWarning }) {
  const tickCounter = useRef(0);
  const vampireWarningCooldown = useRef(false);
  const isGameOverTriggered = useRef(false);
  const hasEmittedGameOver = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) return;

      tickCounter.current += 1;
      let shouldShowVampireWarning = false;

      const hardMode = GameState.difficulties === "hard" ? 1 : 0;
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
          score: isNewDay
            ? prev.score + (hardMode ? 75 : 50)
            : prev.score,
        };

        // Vampire daytime penalty
        if (GameState.isVampire) {
          const isDay = newHour >= 6 && newHour <= 18;
          const outdoorLocations = ["Dieng", "MainGame", "Pantai"];
          const isOutside = outdoorLocations.includes(GameState.currentlocation.currentLoc);

          if (isDay && isOutside) {
            const vampirePenalty = 2 + hardMode;

            newState.energy = Math.max(prev.energy - vampirePenalty, 0);
            newState.happiness = Math.max(prev.happiness - vampirePenalty, 0);
            newState.hygiene = Math.max(prev.hygiene - vampirePenalty, 0);
            newState.hunger = Math.max(prev.hunger - vampirePenalty, 0);

            if (!vampireWarningCooldown.current) {
              shouldShowVampireWarning = true;
            }
          }
        }

        // Every 10 seconds → hygiene depletes
        if (tickCounter.current % 10 === 0) {
          const hygieneLoss = 1 + hardMode;
          newState.hygiene = Math.max(prev.hygiene - hygieneLoss, 0);
          GameState.hygiene = newState.hygiene;
        }

        // Every 3 seconds → hunger, energy, happiness deplete
        if (tickCounter.current % 3 === 0) {
          const statLoss = 1 + hardMode;

          newState.hunger = Math.max(prev.hunger - statLoss, 0);
          newState.energy = Math.max(prev.energy - statLoss, 0);
          newState.happiness = Math.max(prev.happiness - statLoss, 0);

          GameState.hunger = newState.hunger;
          GameState.energy = newState.energy;
          GameState.happiness = newState.happiness;
        }

        // Always update global time
        GameState.time.minute = newMinute;
        GameState.time.hour = newHour;
        GameState.time.day = newDay;

      if (
        !hasEmittedGameOver.current &&
        (newState.hunger <= 0 ||
          newState.energy <= 0 ||
          newState.happiness <= 0 ||
          newState.hygiene <= 0)
      ) {
        hasEmittedGameOver.current = true;

        EventBus.emit("gameOver", {
          reason: "One or more status values reached 0",
          stats: {
            hunger: newState.hunger,
            energy: newState.energy,
            happiness: newState.happiness,
            hygiene: newState.hygiene,
          },
        });
      }
        return newState;
      });

       if (isGameOverTriggered.current) {
        EventBus.emit("gameOver", isGameOverTriggered.current);
        isGameOverTriggered.current = false;
      }

      // Show vampire warning
      if (shouldShowVampireWarning) {
        setVampireWarning(true);
        vampireWarningCooldown.current = true;

        setTimeout(() => {
          vampireWarningCooldown.current = false;
        }, 10000);
      }
    }, 1000); // 1 second tick

    return () => clearInterval(interval);
  }, [setStatus, setVampireWarning]);
}

