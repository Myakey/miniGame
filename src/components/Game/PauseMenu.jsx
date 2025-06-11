import React, { useState, useEffect } from "react";
import { pauseGame, resumeGame } from "../../inGame/gameController";
import { GUITry } from "../../assets/assetsPreLoad";
import Continue from "../../assets/GUI/continue.png";
import Quit from "../../assets/GUI/quit.png";
import { Pause } from "../../assets/assetsPreLoad";
import { useSaveSlotModal } from "../UI/SlotModal";
import { useGameContext } from "../../context/GameStatusContext";
import { GameState } from "../../hooks/gamestate";

export default function PauseMenu({ onQuit, onSetTime }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 = Resume, 1 = Quit
  const [showSaveModal, setShowSaveModal] = useState(false);

  const { openModalSave, SaveSlotModalComponent } = useSaveSlotModal();

  const buttons = [
    { label: "Resume", action: handleResume },
    { label: "Quit", action: onQuit },
  ];

  function handleResume() {
    setOpenModal(false);
    resumeGame();
  }

  function handlePause() {
    setOpenModal(true);
    pauseGame();
  }

  function handleSelect() {
    buttons[selectedIndex]?.action?.();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (openModal) {
          setOpenModal(false);
          resumeGame();
        } else {
          setOpenModal(true);
          pauseGame();
        }
      }

      if (!openModal) return;

      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + buttons.length) % buttons.length);
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % buttons.length);
      } else if (e.key === "Enter") {
        handleSelect();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal, selectedIndex]);

  // Gamepad support
  useEffect(() => {
    let lastY = 0;
    let lastPressed = false;

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads?.();
      const gp = gamepads?.[0];
      if (!gp || !openModal) return;

      const yAxis = gp.axes[1]; // vertical stick or D-pad
      const aPressed = gp.buttons[0]?.pressed;

      if (yAxis < -0.5 && lastY >= -0.5) {
        setSelectedIndex((prev) => (prev - 1 + buttons.length) % buttons.length);
      } else if (yAxis > 0.5 && lastY <= 0.5) {
        setSelectedIndex((prev) => (prev + 1) % buttons.length);
      }

      if (aPressed && !lastPressed) {
        handleSelect();
      }

      lastY = yAxis;
      lastPressed = aPressed;
    };

    const interval = setInterval(pollGamepad, 100);
    return () => clearInterval(interval);
  }, [openModal, selectedIndex]);

  return (
    <>
      <div className="absolute top-0 left-0 m-3 z-10">
        <button
          onClick={handlePause}
          className="text-white transition duration-300 shadow-md h-13 w-13 hover:cursor-pointer hover:scale-90"
          style={{
              backgroundImage: `url(${Pause})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              imageRendering: "pixelated",
            }}
        >
        </button>
      </div>

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

          <div
            className="relative w-65 h-60 text-center flex flex-col items-center justify-center shadow-2xl fade-in-up"
            style={{
              backgroundImage: `url(${GUITry})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              imageRendering: "pixelated",
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 drop-shadow">Game Paused</h2>

            <button
              onClick={handleResume}
              className={`w-40 h-12 bg-no-repeat bg-center bg-contain mb-2 transition ${
                selectedIndex === 0 ? "scale-110" : "hover:scale-105"
              }`}
              style={{
                backgroundImage: `url(${Continue})`,
                border: "none",
                imageRendering: "pixelated",
              }}
            />

            <button
              onClick={onQuit}
              className={`w-40 h-12 bg-no-repeat bg-center bg-contain mb-2 transition ${
                selectedIndex === 1 ? "scale-110" : "hover:scale-105"
              }`}
              style={{
                backgroundImage: `url(${Quit})`,
                border: "none",
                imageRendering: "pixelated",
              }}
            />

            <button
              onClick={onSetTime}
              className={`w-40 h-12 bg-no-repeat bg-center bg-contain mb-2 transition ${
                selectedIndex === 1 ? "scale-110" : "hover:scale-105"
              }`}
              style={{
                backgroundImage: `url(${Quit})`,
                border: "none",
                imageRendering: "pixelated",
              }}
            />

            <button
              onClick={() => openModalSave()}
              className={`w-40 h-12 bg-no-repeat bg-center bg-contain mb-2 transition ${
                selectedIndex === 1 ? "scale-110" : "hover:scale-105"
              }`}
              style={{
                backgroundImage: `url(${Quit})`,
                border: "none",
                imageRendering: "pixelated",
              }}
            />
          </div>
          {SaveSlotModalComponent}
        </div>
        
      )}
    </>
  );
}
