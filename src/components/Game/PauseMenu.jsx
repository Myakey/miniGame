import React, { useState, useEffect } from "react";
import { pauseGame, resumeGame } from "../../inGame/gameController";

export default function PauseMenu({ onQuit, onSetTime }) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        // Add your logic here
        if (openModal) {
          setOpenModal(false);
          resumeGame();
        } else {
          setOpenModal(true);
          pauseGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  function handleResume() {
    setOpenModal(false);
    resumeGame();
  }

  function handlePause() {
    setOpenModal(true);
    pauseGame();
  }

  return (
    <>
      {/* Pause Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handlePause}
          className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300 shadow-md"
        >
          Pause
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: "black",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
              filter: "blur",
              opacity: 0.5,
            }}
          />

          <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-2xl fade-in-up">
            <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
            <button
              onClick={handleResume}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full mb-2 w-full transition"
            >
              Resume
            </button>
            <button
              onClick={onQuit}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mb-2 rounded-full w-full transition"
            >
              Quit
            </button>
            <button
              onClick={onSetTime}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-full transition"
            >
              Set Time
            </button>
          </div>
        </div>
      )}
    </>
  );
}
