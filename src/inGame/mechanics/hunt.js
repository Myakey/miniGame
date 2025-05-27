import { GameState } from '../../hooks/gamestate';
export default function hunt(currentStatus) {
    // Check if the character is already full
    if (currentStatus.hunger >= 100 && currentStatus.happiness >= 100) {
        return currentStatus; // No change needed
    }
    let hungerGain;
    let Happiness;
    if(GameState.currentlocation === "blokM"){
        hungerGain = 20;
        Happiness = 5;
    }else if(GameState.currentlocation === "Pantai"){
        hungerGain = 15;
        Happiness = 10;
    }
    // Calculate the new hunger level after eating
    const newHunger = Math.min(currentStatus.hunger + hungerGain, 100); // Cap at 100
    const newHappiness = Math.min(currentStatus.happiness + Happiness, 100);

    // Return the updated status
    return {
        ...currentStatus,
        hunger: newHunger,
        happiness: newHappiness,
        energy: currentStatus.energy - 5, // Hunting consumes some energy
    };
}