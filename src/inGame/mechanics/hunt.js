import { GameState } from '../../hooks/gamestate';
import { EventBus } from '../EventBus';

export default function hunt(currentStatus) {
  // ─── 1. Already full? ───
  if (currentStatus.hunger >= 100 && currentStatus.happiness >= 100) {
    return currentStatus;
  }

  // ─── 2. Time validation ───
  const { hour, day } = currentStatus.time;
  const isNight = hour >= 18 || hour < 5;
  if (!isNight) {
    EventBus.emit('show-alert', 'You can only hunt at night!');
    return currentStatus;
  }

  // ─── 3. Calculate time spent and whether we pass midnight ───
  const hoursSpent = hour < 5 ? 5 - hour : (24 - hour) + 5;
  const newDay = hour >= 18 ? day + 1 : day;

  // ─── 4. Gain values based on location ───
  const loc = GameState.currentlocation.currentLoc;
  let hungerGainPerHour = 0;
  let happinessGainPerHour = 0;

  if (loc === 'BlokM') {
    hungerGainPerHour = 20;
    happinessGainPerHour = 5;
  } else if (loc === 'Pantai' || loc === 'Mansion') {
    hungerGainPerHour = 15;
    happinessGainPerHour = 10;
  }

  const totalHungerGain = hungerGainPerHour * hoursSpent;
  const totalHappinessGain = happinessGainPerHour * hoursSpent;
  const totalEnergyCost = 5 * hoursSpent;
  const totalScoreGain = 10 * hoursSpent;

  // ─── 5. Energy fail check ───
  const resultingEnergy = currentStatus.energy - totalEnergyCost;
  if (resultingEnergy <= 0) {
    EventBus.emit('show-alert', "You're too exhausted to hunt!");
    return currentStatus;
  }

  // ─── 6. Return updated state ───
  return {
    ...currentStatus,
    hunger: Math.min(currentStatus.hunger + totalHungerGain, 100),
    happiness: Math.min(currentStatus.happiness + totalHappinessGain, 100),
    energy: resultingEnergy,
    score: currentStatus.score + totalScoreGain,
    time: {
      hour: 5,
      minute: 0,
      day: newDay,
    },
  };
}


