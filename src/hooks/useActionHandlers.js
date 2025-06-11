import { useEffect, useRef, useState } from "react";
import { EventBus } from "../inGame/EventBus";
import { pauseGame, resumeGame } from "../inGame/gameController";
import handleActionLogic from "../inGame/handleAction";
import { GameState } from "./gamestate";
import { Game } from "phaser";
import { stopAllSounds } from "../utils/soundHandler";

export default function useActionHandlers({
  setStatus,
  VNSelector,
  setConfirmationModalData,
  setIsConfirmationModalOpen,
  setIsActionPlaying,
  setCurrentActionTypeForAnimation
}) {
  const gradualUpdateInterval = useRef(null);
  const finalStatusRef = useRef(null);

  const [gradualTrigger, setGradualTrigger] = useState(null);

  const gradualRef = useRef({
  active: false,
  totalMinutes: 0,
  steps: 0,
  diffs: {},
});

  const calculateMinuteDiff = (prevTime, newTime) => {
    let prevTotal =
      prevTime.day * 24 * 60 + prevTime.hour * 60 + (prevTime.minute || 0);
    let newTotal =
      newTime.day * 24 * 60 + newTime.hour * 60 + (newTime.minute || 0);
    return Math.max(newTotal - prevTotal, 1); // Avoid 0
  };

  const applyStatusDiffGradually = (prev, next) => {
  pauseGame();

  const keys = ["hunger", "energy", "hygiene", "happiness", "money"];
  const totalMinutes = calculateMinuteDiff(prev.time, next.time);
  const diffs = {};

  finalStatusRef.current = next; 

  console.log("Gradual update triggered with total minutes:", totalMinutes);

  keys.forEach((key) => {
    diffs[key] = (next[key] - prev[key]) / totalMinutes;
  });

  setGradualTrigger({ totalMinutes, diffs });
};

useEffect(() => {
  if (!gradualTrigger) return;

  pauseGame();

  gradualRef.current.active = true;
  gradualRef.current.totalMinutes = gradualTrigger.totalMinutes;
  gradualRef.current.steps = 0;
  gradualRef.current.diffs = gradualTrigger.diffs;

  if (gradualUpdateInterval.current) {
    clearInterval(gradualUpdateInterval.current);
  }

  gradualUpdateInterval.current = setInterval(() => {
    const cur = gradualRef.current;
    const keys = Object.keys(cur.diffs);

    cur.steps++;
    setStatus((s) => {
      const newState = { ...s };
      keys.forEach((key) => {
        newState[key] += cur.diffs[key];
        newState[key] = Math.min(Math.max(newState[key], 0), 100);
      });

      newState.time.minute++;
      if (newState.time.minute >= 60) {
        newState.time.minute = 0;
        newState.time.hour++;
        EventBus.emit("phaser-time-update", { hour: newState.time.hour });
        if (newState.time.hour >= 24) {
          newState.time.hour = 0;
          newState.time.day++;
        }
      }

      return newState;
    });

    if (cur.steps >= cur.totalMinutes) {
      GameState.time.minute = finalStatusRef.current.time.minute; // Update global time state
      GameState.time.hour = finalStatusRef.current.time.hour; // Update global time state
      GameState.time.day = finalStatusRef.current.time.day;
      GameState.energy = finalStatusRef.current.energy; // Update global energy state
      GameState.hunger = finalStatusRef.current.hunger; // Update global hunger state
      GameState.hygiene = finalStatusRef.current.hygiene; // Update global hygiene state
      GameState.happiness = finalStatusRef.current.happiness; // Update global happiness state
      GameState.money = finalStatusRef.current.money; // Update global money state
      clearInterval(gradualUpdateInterval.current);
      gradualUpdateInterval.current = null;
      cur.active = false;
      resumeGame();
      setGradualTrigger(null); // cleanup
      setIsActionPlaying(false);
      setCurrentActionTypeForAnimation(null);

    }
  }, 50);

  return () => {
    if (gradualUpdateInterval.current) {
      clearInterval(gradualUpdateInterval.current);
    }
  };
}, [gradualTrigger]);

   const handleExecuteAction = (payload) => {
  const { type, jobId, itemId } = payload;
  console.log("handleExecuteAction triggered with:", payload);

  // Get current status manually (since we shouldn't use `setStatus(prev => {...})`)
  let currentStatus;
  setStatus((prev) => {
    currentStatus = { ...prev }; // Clone to prevent mutation
    return prev; // Don't update here
  });

  const newStatus = handleActionLogic(type, currentStatus, jobId, itemId);
  finalStatusRef.current = newStatus;

  console.log("Previous status time:", currentStatus.time);
  console.log("New status time:", newStatus.time);

  applyStatusDiffGradually(currentStatus, newStatus);
};

const skipGradualUpdate = () => {
  if (!gradualRef.current.active) return;

  const finalStatus = finalStatusRef.current;

  setStatus((s) => ({
    ...s,
    ...finalStatus,
    time: { ...s.time, ...finalStatus.time },
  }));

  GameState.time.minute = finalStatus.time.minute; // Update global time state
  GameState.time.hour = finalStatus.time.hour;
  GameState.time.day = finalStatus.time.day;
  GameState.energy = finalStatus.energy;
  GameState.hunger = finalStatus.hunger;
  GameState.hygiene = finalStatus.hygiene;
  GameState.happiness = finalStatus.happiness;
  GameState.money = finalStatus.money;

  EventBus.emit("phaser-time-update", { hour: finalStatus.time.hour });

  if (gradualUpdateInterval.current) {
    clearInterval(gradualUpdateInterval.current);
    gradualUpdateInterval.current = null;
  }

  gradualRef.current.active = false;
  resumeGame();
  setGradualTrigger(null);
  setIsActionPlaying(false);
  setCurrentActionTypeForAnimation(null);

  console.log("Gradual update skipped.");
};


  const handlePerformVN = (chapter) => {
    GameState.afterVN = true;
    stopAllSounds();
    VNSelector(chapter);
  };

  const handleShowCustomModal = (data) => {
    setConfirmationModalData({
      title: data.title || "Konfirmasi",
      image: data.image || undefined,
      description: data.description || "Apakah kamu yakin?",
      gainsText: data.gainsText || "",
      lossesText: data.lossesText || "",
      actionType: data.actionType,
      actionParams: data.actionParams,
      modalId: data.modalId,
    });
    setIsConfirmationModalOpen(true);
    pauseGame();
  };

  useEffect(() => {
    EventBus.on("performAction", handleExecuteAction);
    EventBus.on("performVN", handlePerformVN);
    EventBus.on("showCustomModal", handleShowCustomModal);
    EventBus.on("skipAction", skipGradualUpdate);

    return () => {
      EventBus.off("performAction", handleExecuteAction);
      EventBus.off("performVN", handlePerformVN);
      EventBus.off("showCustomModal", handleShowCustomModal);
      EventBus.off("skipAction", skipGradualUpdate);
    };
  }, [
    setStatus,
    VNSelector,
    setConfirmationModalData,
    setIsConfirmationModalOpen,
  ]);
}
