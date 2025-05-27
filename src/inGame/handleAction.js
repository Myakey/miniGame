import bath from './mechanics/bath';
import eat from './mechanics/eat';
import jalan from './mechanics/jalan';
import hunt from './mechanics/hunt';
import work from './mechanics/work';
// import other actions as needed
// tambahin jobId & itemid karna 1 tempat bisa lebih dr 1 job
export default function handleAction(type, currentStatus, jobId, itemId) {
  switch (type) {
    case 'bath':
      return bath(currentStatus);
    case 'eat':
      return eat(currentStatus, itemId);
    case 'jalan':
      return jalan(currentStatus);
    case 'hunt':
      return hunt(currentStatus);
    case 'work':
        return work(currentStatus, jobId);
    // Add more cases like 'sleep', 'work', etc.
    default:
      return currentStatus;
  }
}