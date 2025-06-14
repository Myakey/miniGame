import { GameState } from '../../hooks/gamestate';
import { jobList } from './jobList';
import { EventBus } from '../EventBus';

export default function work(currentStatus, jobId) {
  const location = GameState.currentlocation.currentLoc;
  const job = jobList[location]?.find(job => job.Id === jobId);

  if (!job) {
    console.error("Invalid job or location");
    return currentStatus;
  }

  const { money, energy, hunger, happiness, hygiene } = job.effects;
  const duration = job.duration;

  // Determine money multiplier based on happiness
  let moneyMult = 1;
  if (currentStatus.happiness >= 75) {
    moneyMult = 1.5;
  } else if (currentStatus.happiness >= 50) {
    moneyMult = 1.25;
  } else {
    moneyMult = 0.75;
  }

  // Pre-calculate new status
  const newEnergy = Math.max(currentStatus.energy + energy, 0);
  const newHunger = Math.max(currentStatus.hunger + hunger, 0);
  const newHappiness = Math.max(currentStatus.happiness + happiness, 0);
  const newHygiene = Math.max(currentStatus.hygiene + hygiene, 0);

  // Check if any stat is too low after job
  if (newEnergy <= 0) {
    EventBus.emit("show-alert", "You're too tired to work!");
    return currentStatus;
  }
  if (newHunger <= 0) {
    EventBus.emit("show-alert", "You're too hungry to work!");
    return currentStatus;
  }
  if (newHappiness <= 0) {
    EventBus.emit("show-alert", "You're too upset to work!");
    return currentStatus;
  }
  if (newHygiene <= 0) {
    EventBus.emit("show-alert", "You're too dirty to work!");
    return currentStatus;
  }

  // Calculate time updates
  const newHour = (currentStatus.time.hour + duration) % 24;
  const newMinute = currentStatus.time.minute; // unchanged unless you want to add randomness
  const crossedMidnight = (currentStatus.time.hour + duration) >= 24;
  const newDay = crossedMidnight ? currentStatus.time.day + 1 : currentStatus.time.day;

  // Update global money
  GameState.money += money * moneyMult;
  console.log("Your money:", GameState.money);

  return {
    ...currentStatus,
    money: currentStatus.money + money * moneyMult,
    energy: newEnergy,
    hunger: newHunger,
    happiness: newHappiness,
    hygiene: newHygiene,
    score: currentStatus.score + 10,
    time: {
      ...currentStatus.time,
      hour: newHour,
      minute: newMinute,
      day: newDay,
    }
  };
}

