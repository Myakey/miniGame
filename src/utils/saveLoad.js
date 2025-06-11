// utils/saveLoad.js
const SLOT_KEY_PREFIX = 'game_save_slot_';

export function saveGameStateToSlot(gameState, slotNumber) {
  const key = `${SLOT_KEY_PREFIX}${slotNumber}`;
  localStorage.setItem(key, JSON.stringify(gameState));
}

export function loadGameStateFromSlot(slotNumber) {
  const key = `${SLOT_KEY_PREFIX}${slotNumber}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function deleteGameStateSlot(slotNumber) {
  const key = `${SLOT_KEY_PREFIX}${slotNumber}`;
  localStorage.removeItem(key);
}

export function getAllSaveSlots(slotCount = 3) {
  return Array.from({ length: slotCount }, (_, i) => {
    const data = localStorage.getItem(`${SLOT_KEY_PREFIX}${i + 1}`);
    return data ? JSON.parse(data) : null;
  });
}
