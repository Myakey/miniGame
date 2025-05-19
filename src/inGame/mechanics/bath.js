export default function bath(currentStatus) {
    // Check if the character is already clean
    if (currentStatus.hygiene >= 100) {
        return currentStatus; // No change needed
    }

    // Calculate the new hygiene level after taking a bath
    const newHygiene = Math.min(currentStatus.hygiene + 30, 100); // Cap at 100

    // Return the updated status
    return {
        ...currentStatus,
        hygiene: newHygiene,
        energy: currentStatus.energy - 10, // Taking a bath consumes some energy
    };
}