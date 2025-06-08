import { GameState } from "../../hooks/gamestate";

export default function sleep(currentStatus) {
  const currentHour = GameState.time.hour;

  // Only allow sleep if it's 21:00–23:59 or 00:00–06:59
  const canSleep = currentHour >= 21 || currentHour < 7;
  if (!canSleep) return currentStatus;

  // Calculate how many hours left until 7 AM
  const sleepHours = currentHour >= 21
    ? 24 - currentHour + 7 // e.g., 22 → 9 hours: (24 - 22 + 7 = 9)
    : 7 - currentHour;     // e.g., 3 → 4 hours

  const energyGained = sleepHours * 10;
  const newEnergy = Math.min(currentStatus.energy + energyGained, 100);

  const newHour = 7;
  const crossedMidnight = currentHour >= 21;
  const newDay = crossedMidnight ? currentStatus.time.day + 1 : currentStatus.time.day;

  return {
    ...currentStatus,
    energy: newEnergy,
    time: {
      ...currentStatus.time,
      hour: newHour,
      minute: 0,
      day: newDay,
    },
  };
}
