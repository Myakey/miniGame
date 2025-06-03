export default function bath(currentStatus) {
    // Check if the character is already clean
    if (currentStatus.hygiene >= 100) {
        return currentStatus; // No change needed
    }

    // Calculate the new hygiene level after taking a bath
    const newHygiene = Math.min(currentStatus.hygiene + 30, 100); // Cap at 100
    const newHour = (currentStatus.time.hour + 10) % 24; // Increment hour, wrap around at 24
    const newDay = currentStatus.time.hour === 23 ? currentStatus.time.day + 1 : currentStatus.time.day; // Increment day if hour wraps around
    console.log(`Bath taken: Hygiene increased to ${newHygiene}, Time updated to ${newHour}:${currentStatus.time.minute} on day ${newDay}`);

    // Return the updated status
    return {
        ...currentStatus,
        hygiene: newHygiene,
        time: {
            minute: currentStatus.time.minute, // Keep the minute unchanged
            hour: newHour,
            day: newDay
        }
    };
}