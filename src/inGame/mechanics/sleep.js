import { GameState } from "../../hooks/gamestate";

export default function sleep(currentStatus) {
  const currentHour = GameState.time.hour;
  const isVampire = GameState.isVampire;

  // Define allowed sleep hours
  const canSleep = isVampire
    ? currentHour >= 7 && currentHour < 19  // Vampires: 07:00–18:59
    : currentHour >= 21 || currentHour < 7; // Humans: 21:00–06:59

  if (!canSleep) return currentStatus;

  // Calculate sleep duration
  let sleepHours;
  if (isVampire) {
    // Vampires sleep until 19:00
    sleepHours = 19 - currentHour;
  } else {
    // Humans sleep until 07:00
    sleepHours = currentHour >= 21
      ? 24 - currentHour + 7
      : 7 - currentHour;
  }

  const energyGained = sleepHours * 10;
  const newEnergy = Math.min(currentStatus.energy + energyGained, 100);

  const newHour = isVampire ? 19 : 7;
  const crossedMidnight = !isVampire && currentHour >= 21;
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
