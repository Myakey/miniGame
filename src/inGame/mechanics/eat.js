import { GameState } from '../../hooks/gamestate';
import { itemsList } from './itemsList';
import { EventBus } from '../EventBus';


export default function eat(currentStatus, id) {
    const item = itemsList.find(i => i.id === id);

    // Check if the character is already full
    if (currentStatus.hunger >= 100) {
        return currentStatus; // No change needed
    }
    const hungerGain = item.hunger;
    const happinessGain = item.happiness;
    const hygieneGain = item.hygiene;
    // Calculate the new hunger level after eating
    const newHunger = Math.min(currentStatus.hunger + hungerGain, 100); // Cap at 100
    const newHappiness = Math.max(currentStatus.happiness + happinessGain, 0);
    const newHygiene = Math.max(currentStatus.hygiene + hygieneGain, 0);
    // Return the updated status
    return {
        ...currentStatus,
        hunger: newHunger,
        happiness: newHappiness,
        hygiene: newHygiene,
        score: currentStatus.score + 5,
    };
}