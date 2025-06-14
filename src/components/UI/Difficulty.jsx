import React from 'react';
import { GameState } from '../../hooks/gamestate';
import { GUITry } from '../../assets/assetsPreLoad';

export default function DifficultyModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  const handleSelect = (level) => {
    GameState.difficulties = level;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
                  className="relative w-55 h-50 text-center flex flex-col items-center justify-center shadow-2xl fade-in-up"
                  style={{
                    backgroundImage: `url(${GUITry})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                  }}
                onClick={e => e.stopPropagation()}
        >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Select Difficulty
        </h2>

        <div className="flex flex-col gap-3">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl transition"
            onClick={() => handleSelect('normal')}
          >
            Normal
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
            onClick={() => handleSelect('hard')}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
}
