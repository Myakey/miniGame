import { GameState } from "../hooks/gamestate";
import { EventBus } from "../inGame/EventBus";

let interval;

export const startGameClock = () => {
  if (interval) return;

  interval = setInterval(() => {
    GameState.time.hour += 1;

    if (GameState.time.hour >= 24) {
      GameState.time.hour = 0;
      GameState.time.day += 1;
    }

    EventBus.emit("timeTick", { time: GameState.time });
  }, 1000);
};
