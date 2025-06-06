import bath from './mechanics/bath';
import eat from './mechanics/eat';
import jalan from './mechanics/jalan';
import hunt from './mechanics/hunt';
import work from './mechanics/work';
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
  switch (type) {
    case 'bath':
      const updated = bath(currentStatus);
      emitEventBus(updated);
       // Update global day state
      return updated;
    case 'eat':
      return eat(currentStatus, itemId);
    case 'jalan':
      return jalan(currentStatus);
    case 'hunt':
      return hunt(currentStatus);
    case 'work':
        return work(currentStatus, jobId);
    // Add more cases like 'sleep', 'work', etc.
    case "debug" :
        return SetTime(currentStatus, jobId);
    default:
      return currentStatus;
  }
}