import { useEffect } from "react";
import { GameState } from "../hooks/gamestate";
import { loadGameStateFromSlot } from "../utils/saveLoad";
import { useGameContext } from "./GameStatusContext";

export function AutoLoader() {
  const { syncFromGameState } = useGameContext();

  useEffect(() => {
    const slot = localStorage.getItem("pendingLoadSlot");
    if (slot) {
      const loaded = loadGameStateFromSlot(Number(slot));
      if (loaded) {
        Object.assign(GameState, loaded);
        syncFromGameState();
      }
      localStorage.removeItem("pendingLoadSlot"); 
    }
  }, []);

  return null; 
}
