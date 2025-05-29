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
  //masukkin dari list job
  const { money, energy, hunger, happiness, hygiene, } = job.effects;
  const duration = job.duration;
  //mood ngefek hasil kerja
  let moneyMult = 1;
  if (currentStatus.happiness >= 75) {
    moneyMult = 1.5;
  } else if (currentStatus.happiness >= 50) {
    moneyMult = 1.25;
  } else {
    moneyMult = 0.75;
  }

  GameState.time.hour += duration;

  while (GameState.time.hour >= 24) {
    GameState.time.hour -= 24;
    GameState.time.day += 1;
  }

   EventBus.emit("timeTick", { time: GameState.time });

   GameState.money += money * moneyMult;
   console.log("Your money:", GameState.money);

  return {
    ...currentStatus,
    money: currentStatus.money + money * moneyMult,
    energy: Math.max(currentStatus.energy + energy, 0),
    hunger: Math.max(currentStatus.hunger + hunger, 0),
    happiness: Math.max(currentStatus.happiness + happiness, 0),
    hygiene: Math.max(currentStatus.hygiene + hygiene, 0),
    score: currentStatus.score + 10,
  };
}
