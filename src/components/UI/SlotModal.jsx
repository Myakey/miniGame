// SaveSlotModal.js
import React, { useState, useEffect, useCallback } from "react";
import { GameState } from "../../hooks/gamestate";
import { loadGameStateFromSlot, saveGameStateToSlot, deleteGameStateSlot, getAllSaveSlots } from "../../utils/saveLoad";
import { useGameContext } from "../../context/GameStatusContext";
import { useNavigate, useLocation } from "react-router-dom";

const SaveSlotModal = ({ isOpen, onClose }) => {
  const [slots, setSlots] = useState([]);
  const { syncFromGameState } = useGameContext();
  const navigate = useNavigate();
    const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setSlots(getAllSaveSlots());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (index) => {
    saveGameStateToSlot(GameState, index + 1);
    setSlots(getAllSaveSlots());
  };

  const handleLoad = (index) => {
  const loadedState = loadGameStateFromSlot(index + 1);
  if (loadedState) {
    Object.assign(GameState, loadedState);
    syncFromGameState();

    // Save selected slot index temporarily
    localStorage.setItem("pendingLoadSlot", index + 1);

    if (location.pathname === "/inGame") {
      window.location.reload();
    } else {
      navigate("/inGame");
    }

    onClose();
  } else {
    alert("No save data in this slot.");
  }
};


  const handleDelete = (index) => {
    deleteGameStateSlot(index + 1);
    setSlots(getAllSaveSlots());
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-blue-50 p-6 rounded-lg w-96 text-black relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-lg"
        >
          ✕
        </button>
        <h2 className="text-2xl mb-4 text-center">Save / Load Game</h2>
        {slots.map((slot, index) => (
          <div key={index} className="mb-4 border p-3 rounded bg-gray-700">
            <p className="mb-2">Slot {index + 1}</p>
            {slot ? (
              <div>
                <p>Character: {slot.char}</p>
                <p>Day: {slot.time.day}</p>
                <p>Location: {slot.currentlocation.currentLoc}</p>
                <div className="mt-2 space-x-2">
                  <button
                    className="px-3 py-1 bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleLoad(index)}
                  >
                    Load
                  </button>
                  <button
                    className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                    onClick={() => handleSave(index)}
                  >
                    Overwrite
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => handleSave(index)}
              >
                Save Here
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export function useSaveSlotModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModalSave = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const SaveSlotModalComponent = (
    <SaveSlotModal isOpen={isOpen} onClose={closeModal} />
  );

  return { openModalSave, closeModal, SaveSlotModalComponent };
}
