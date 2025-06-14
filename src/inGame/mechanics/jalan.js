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
    let hungerGain;
    let cost;
    let duration;
    if(location === "BlokM"){
        hungerGain = 30;
        energyGain = 10;
        happinessGain = 30;
        cost = 30;
        duration = 2;
    }else if(location === "Dieng"){
        hungerGain = 0;
        energyGain = 15;
        happinessGain = 15;
        cost =10;
        duration = 2;
    }else if(location === "FlowerField"){
        hungerGain = 0;
        energyGain = 25;
        happinessGain = 5;
        cost = 10;
        duration = 3;
    }else if(location === "rumah"){
        hungerGain = 0;
        energyGain = 20;
        happinessGain = 20;
        cost = 0;
        duration = 5;
    }else if(location === "Pantai"){
        hungerGain = 0;
        energyGain     = 10; 
        happinessGain  = 30;  
        cost           = 10;  
        duration       = 3;
    }
    // Calculate new status
    const newEnergy = Math.min(currentStatus.energy + energyGain, 100); // Cap at 100
    const newHappiness = Math.min(currentStatus.happiness + happinessGain, 100); // Cap at 100
    const newHunger = Math.min(currentStatus.hunger + hungerGain, 100);
    //When poor
    if (currentStatus.money < cost){
        return currentStatus;
    }
    // Return the updated status

    const newHour = (currentStatus.time.hour + duration) % 24; // Increment hour, wrap around at 24
    const pastMidnight = (currentStatus.time.hour + duration) >= 24;
    const newDay = pastMidnight ? currentStatus.time.day + 1 : currentStatus.time.day; // Increment day if hour wraps around
    
    return {
        ...currentStatus,
        hunger: newHunger,
        happiness: newHappiness,
        energy: newEnergy,
        money: Math.max(currentStatus.money - cost, 0),
        time: {
            minute: currentStatus.time.minute, // Keep the minute unchanged
            hour: newHour,
            day: newDay
        }
    };
}