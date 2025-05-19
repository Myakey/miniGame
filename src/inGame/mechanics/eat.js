


export default function eat(currentStatus) {
    // Check if the character is already full
    if (currentStatus.hunger <= 0) {
        return currentStatus; // No change needed
    }

    // Calculate the new hunger level after eating
    const newHunger = Math.min(currentStatus.hunger + 30, 100); // Cap at 100

    // Return the updated status
    return {
        ...currentStatus,
        hunger: newHunger,
        energy: currentStatus.energy - 5, // Eating consumes some energy
    };
}