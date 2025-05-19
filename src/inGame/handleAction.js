import bath from './mechanics/bath';
import eat from './mechanics/eat';
// import other actions as needed

export default function handleAction(type, currentStatus) {
  switch (type) {
    case 'bath':
      return bath(currentStatus);
    case 'eat':
      return eat(currentStatus);
    // Add more cases like 'sleep', 'work', etc.
    default:
      return currentStatus;
  }
}