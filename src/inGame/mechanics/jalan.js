import { GameState } from '../../hooks/gamestate';
import { EventBus } from '../EventBus';
export default function jalan(currentStatus) {
    // Check if the character is already clean
    const location = GameState.currentlocation.currentLoc;
    if (currentStatus.energy >= 100 && currentStatus.happiness >= 100 ) {
        return currentStatus; // No change needed
    }
    let energyGain;
    let happinessGain;
    let cost;
    let duration;
    if(location === "blokM"){
        energyGain = 10;
        happinessGain = 30;
        cost = 10;
        duration = 2;
    }else if(location === "Dieng"){
        energyGain = 15;
        happinessGain = 15;
        cost =10;
        duration = 2;
    }else if(location === "flowerField"){
        energyGain = 25;
        happinessGain = 5;
        cost = 10;
        duration = 3;
    }else if(location === "rumah"){
        energyGain = 20;
        happinessGain = 20;
        cost = 0;
        duration = 5;
    }
    // Calculate new status
    const newEnergy = Math.min(currentStatus.energy + energyGain, 100); // Cap at 100
    const newHappiness = Math.min(currentStatus.happiness + happinessGain, 100); // Cap at 100
    //When poor
    if (currentStatus.money < cost){
        return currentStatus;
    }
    // Return the updated status

    GameState.time.hour += duration;

    while (GameState.time.hour >= 24) {
        GameState.time.hour -= 24;
        GameState.time.day += 1;
    }
    GameState.money -= cost;
    
    return {
        ...currentStatus,
        happiness: newHappiness,
        energy: newEnergy,
        money: Math.max(currentStatus.money - cost, 0),
    };
}