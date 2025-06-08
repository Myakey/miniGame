import bath from './mechanics/bath';
import eat from './mechanics/eat';
import jalan from './mechanics/jalan';
import hunt from './mechanics/hunt';
import work from './mechanics/work';
import sleep from './mechanics/sleep'
import { EventBus } from './EventBus';
import { GameState } from '../hooks/gamestate';

import { SetTime } from '../utils/debugHandler';
// import other actions as needed
// tambahin jobId & itemid karna 1 tempat bisa lebih dr 1 job

const emitEventBus = (updated) =>{
    EventBus.emit('phaser-time-update', { hour: updated.time.hour });
    GameState.time.hour = updated.time.hour; // Update global time state
    GameState.time.day = updated.time.day;
}

export default function handleAction(type, currentStatus, jobId, itemId) {
  let updated;
  switch (type) {
    case 'bath':
      updated = bath(currentStatus);
      break;
    case 'eat':
      updated = eat(currentStatus, itemId);
      break;
    case 'jalan':
      updated = jalan(currentStatus);
      break;
    case 'hunt':
      updated = hunt(currentStatus);
      break;
    case 'work':
      updated = work(currentStatus, jobId);
      break;
    case 'sleep' :
      updated = sleep(currentStatus);
      break;
    case "debug" :
      updated = SetTime(currentStatus, jobId);
      break;
    default:
      updated = currentStatus;
  }
  return updated;
}