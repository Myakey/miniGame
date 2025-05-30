import React from "react";
import { useRef, useState, useEffect } from "react";

import Phaser from "phaser";
import { PhaserGame } from "../inGame/PhaserGame";
import "../styles/inGame.css";
import { useNavigate } from "react-router-dom";

import StatusBars from "../components/Game/StatusBars";
import Button from "../components/UI/Buttons";
import { GameState } from "../hooks/gamestate";
import { EventBus } from "../inGame/EventBus";
import { soundAssets } from "../assets/assetsPreLoad";
import { startGameClock } from "../inGame/time";

import handleActionLogic from "../inGame/handleAction";

import { useGameContext } from "../hooks/GameStatusContext";
import { pauseGame, resumeGame, isPaused } from "../inGame/gameController";
import ArrowControls from "../inGame/movements/arrows";
//test modal && Action scene
import ActionFlow from "../components/Game/Actionscene";
import Modal from "../components/UI/ModalBox";
import Shop from "../components/Game/Shop";
import ObjectivePanel from "../components/Game/Objective";

import Inventory from "../components/Game/Inventory";
import PauseMenu from "../components/Game/PauseMenu";

import {useVNSelector} from "../components/VN/VNSELECTOR";

import ShopInteraction from "../components/Game/ShopInteraction";

function MainGame() {
  let navigate = useNavigate();
  let VNSelector = useVNSelector();

  const icons = [
    { name: "hunger",
      color: "bg-green-500"
     },
    { name: "energy",
      color: "bg-yellow-500",
     },
    { name: "hygiene",
      color: "bg-blue-500"
     },
    { name: "happiness",
      color: "bg-pink-500"
     },
  ];
  const { status, setStatus } = useGameContext();
  const [countTest, setCountTest] = useState(0);
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const phaserRef = useRef();
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [Time, setTime] = useState(GameState.time);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isActionPlaying, setIsActionPlaying] = useState(false);
  const [currentActionTypeForAnimation, setCurrentActionTypeForAnimation] = useState(null); // To pass to ActionFlow
  const [actionAnimationTimeoutId, setActionAnimationTimeoutId] = useState(null);  const [confirmationModalData, setConfirmationModalData] = useState({
    title: "",
    description: "",
    gainsText: "",
    lossesText: "",
    actionType: null,
    actionParams: null,
    modalId: null,
  });

  const currentScene = (scene) => {
    setCanMoveSprite(scene.scene.key !== "InGame");
  };

  //Use Effect buat ngehubungin React sama Action di Phaser. Jadi waktu ada action tertentu di Phaser, maka React akan nerima dan akan update context di sini yaa
  //Update ini supaya logic jobId bisa di pass
  useEffect(() => {
    
    const handleExecuteAction = (payload) => {
      console.log("Received performAction event to execute:", payload);
      // Assuming payload is { type, jobId, itemId } as emitted by handleConfirmCurrentAction
      const { type, jobId, itemId } = payload; 
      setStatus((prev) => {
        const newStatus = handleActionLogic(type, prev, jobId, itemId);
        console.log("Old status after action:", prev);
        console.log("New status after action:", newStatus);
        return newStatus;
      });
    };

    const handlePerformVN = (chapter) => {
      console.log("Received performVN event with chapter:", chapter);
      VNSelector(chapter);
      // Consider pausing game here:
      // pauseGame(); // or GameState.isGamePaused = true; EventBus.emit("pausePhaserScene");
    };

   
    const handleShowCustomModal = (data) => {
      console.log("React: Received showCustomModal event with data:", data);
      setConfirmationModalData({
        title: data.title || "Konfirmasi",
        description: data.description || "Apakah kamu yakin?",
        gainsText: data.gainsText || "",
        lossesText: data.lossesText || "",
        actionType: data.actionType,
        actionParams: data.actionParams, // Store the whole actionParams
        modalId: data.modalId,
      });
      setIsConfirmationModalOpen(true);
      pauseGame();
      console.log("Game paused for confirmation modal:", data.modalId);
    };
    // ######################################################

    EventBus.on("performAction", handleExecuteAction); // Renamed for clarity
    EventBus.on("performVN", handlePerformVN);
    EventBus.on("showCustomModal", handleShowCustomModal); // ##### MODIFIED: Added listener #####

    return () => {
      EventBus.off("performAction", handleExecuteAction);
      EventBus.off("performVN", handlePerformVN);
      EventBus.off("showCustomModal", handleShowCustomModal); // ##### MODIFIED: Added cleanup #####
    };
  }, [setStatus, VNSelector]);


  //Use effect di sini buat stats nurun gradually supaya bisa ada penurunan, ntar disetting di sini aja penurunan perdetiknya berapa janlupp.
 useEffect(() => {
  const interval = setInterval(() => {
    if (!isPaused) {
      setStatus((prev) => {
        // Calculate new time values
        const newMinute = (prev.time.minute + 1) % 60;
        const hourChanged = prev.time.minute === 59; // will increment hour after 59th minute
        const newHour = hourChanged ? (prev.time.hour + 1) % 24 : prev.time.hour;
        const isNewDay = hourChanged && prev.time.hour === 23 
        const newDay = isNewDay? prev.time.day + 1 : prev.time.day;

        // Emit event if hour changed
        if (hourChanged && newHour !== prev.time.hour) {
          EventBus.emit('phaser-time-update', { hour: newHour });
        }

        // Return updated status with new time and decreased stats
        if(GameState.difficulties === "normal"){
          return {
            ...prev,
            hunger: Math.max(prev.hunger - 1, 0),
            energy: Math.max(prev.energy - 1, 0),
            happiness: Math.max(prev.happiness - 1, 0),
            time: {
              ...prev.time,
              minute: newMinute,
              hour: newHour,
              day: newDay
            },
            score: isNewDay ? prev.score + 50 : prev.score
          };
        }else if(GameState.difficulties === "hard"){
          return {
            ...prev,
            hunger: Math.max(prev.hunger - 2, 0),
            energy: Math.max(prev.energy - 3, 0),
            happiness: Math.max(prev.happiness - 2, 0),
            hygiene: Math.max(prev.hygiene - 1,0),
            time: {
              ...prev.time,
              minute: newMinute,
              hour: newHour,
              day: newDay
            },
            score: isNewDay ? prev.score + 75 : prev.score
          };
        }
      });
    }
  }, 1000);

  return () => clearInterval(interval);
}, [setStatus]);



  //Mapping buat status bars, bakalan direrender semua nya waktu contextnya ganti, mempermudah animasi cuma butuh optimalisasi performa lebih lagi
  function createStatus(text) {
    if (!status) return null;
    return <StatusBars icon={text.name} num={status[text.name]} color={text.color} />;
  }

  // ##########################################################
  const handleConfirmCurrentAction = () => {
    setIsConfirmationModalOpen(false); // Close confirmation modal first

    if (confirmationModalData.actionType) {
      console.log(
        "Action confirmed, preparing to play animation for:",
        confirmationModalData.actionType
      );
      
      // Set state to show animation
      setCurrentActionTypeForAnimation(confirmationModalData.actionType); // Pass the type for GIF selection
      setIsActionPlaying(true);
      // Game should already be paused by handleShowCustomModal, keep it paused

      // Automatically stop animation and perform action after a delay (e.g., 5 seconds for animation)
      // The original ActionFlow had 10 seconds, this one has 15 seconds in your snippet.
      // Let's make it shorter for the animation itself, actual game logic duration is separate.
      const animationDuration = 5000; // 5 seconds for GIF display, adjust as needed
      
      if (actionAnimationTimeoutId) { // Clear any existing timeout
          clearTimeout(actionAnimationTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        setIsActionPlaying(false);
        setCurrentActionTypeForAnimation(null); // Clear action type

        // Now, emit the event to actually perform the game logic action
        console.log("Animation finished, emitting performAction for:", confirmationModalData.actionType);
        EventBus.emit("performAction", {
          type: confirmationModalData.actionType,
          jobId: confirmationModalData.actionParams?.jobId,
        });
        // Game will be resumed by handleExecuteAction or if action takes time, after that
        // For now, let's assume the action itself is quick or handles resume.
        // If not, resumeGame() should be called after the action's effects are applied.
        // resumeGame(); // Resume game AFTER action logic is processed if action is instant
        resumeGame();
      }, animationDuration);

      setActionAnimationTimeoutId(timeoutId);
    } else {
      resumeGame(); // If no action type, just resume game
    }
  };

  const handleSkipActionAnimation = () => {
    if (actionAnimationTimeoutId) {
      clearTimeout(actionAnimationTimeoutId);
    }
    setIsActionPlaying(false);
    setCurrentActionTypeForAnimation(null);

    // Immediately perform the action when skipping animation
    if (confirmationModalData.actionType) {
        console.log("Animation skipped, emitting performAction for:", confirmationModalData.actionType);
        EventBus.emit("performAction", {
            type: confirmationModalData.actionType,
            jobId: confirmationModalData.actionParams?.jobId,
            itemId: confirmationModalData.actionParams?.itemId,
        });
    }
    resumeGame(); // Resume game AFTER action logic is processed if action is instant
    console.log("Action animation skipped, action performed, attempting to resume game (if action is instant)");
  };

  const handleCancelCurrentAction = () => {
    console.log("Action cancelled for modalId:", confirmationModalData.modalId);
    setIsConfirmationModalOpen(false);
    resumeGame(); // Resume game if action is cancelled
    console.log("Confirmation modal closed, action cancelled, game resumed");
  };

  // ##########################################################

  return (
    <>
        <ObjectivePanel />
        <ShopInteraction />
        <Inventory />
      <div className="absolute 
      z-30">
        <PauseMenu />
        
      </div>
      {/* ##### NEW: Render the Confirmation Modal ##### */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelCurrentAction} // 'x' button or backdrop click defaults to cancel
        title={confirmationModalData.title}
      >
        <p className="text-sm text-gray-700 mb-3">{confirmationModalData.description}</p>
        {confirmationModalData.gainsText && (
          <p className="text-sm text-green-600 font-semibold">Gains: {confirmationModalData.gainsText}</p>
        )}
        {confirmationModalData.lossesText && (
          <p className="text-sm text-red-600 font-semibold mb-4">Loses: {confirmationModalData.lossesText}</p>
        )}
        <div className="flex justify-end space-x-3 mt-5">
          <button
            onClick={handleCancelCurrentAction}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            No / Cancel
          </button>
          <button
            onClick={handleConfirmCurrentAction}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Yes / Confirm
          </button>
        </div>
      </Modal>
      {/* ############################################ */}
      <ActionFlow 
        isPlaying={isActionPlaying} 
        currentActionType={currentActionTypeForAnimation} 
        onSkip={handleSkipActionAnimation} 
      />
      <div className="flex flex-col items-center w-full">
        <div className="fixed right-4 top-1/4 transform -translate-y-1/2 z-20 bg-gray-900/75 text-center">
          <div className="w-75 hidden text-4xl text-center text-lime-400 mb-2">OBJECTIVE</div>
          <p>TEST</p>
        </div>
        <div className="relative w-full flex justify-center mt-4">
          <div className="hidden md:flex md:items-start md:fixed md:bottom-4 md:left-4 z-10 rounded-3xl p-3 gap-4">
            <div className="flex flex-col space-y-2">
              {icons.map(createStatus)}
            </div>
          </div>
           <div className="hidden md:flex md:flex-col md:items-center md:max-w-full md:px-1 z-10">
  <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-md p-3 text-2xl mt-1">
    {status.time.hour.toString().padStart(2, "0")}:
    {status.time.minute.toString().padStart(2, "0")} | Day {status.time.day}
    <div className="text-lg mt-1">Score: {status.score}</div>
  </div>
</div>

            <div className="hidden md:flex md: md:px-1 z-10 md:fixed md:bottom-7 md:right-4 bg-yellow-400/75 p-3 rounded-full text-center flex-row border-4 font-semibold">
              <div className="text-4xl">💰</div>
              <div className="text-3xl m-2 text-center">{GameState.money}</div>
            </div>
          <div id="mainGame" className="w w-full max-w-5xl aspect-[2/1] relative md:fixed md:inset-0 md:w-screen md:max-w-none md:h-screen md:aspect-auto md:z-0">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
          </div>
        </div>

      <div className="md:hidden grid grid-cols-2 gap-3 p-4 mt-4 bg-blue-400 rounded-3xl z-10">
        {icons.map(createStatus)}
        <div className="flex flex-col items-center w-full max-w-[6rem] px-1">
            <div className="text-xs mt-1">{GameState.money}</div>
        </div>
      </div>
        <ArrowControls />
      </div>
      {/* ######################################################################### */}
      {/* {isActionPlaying && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm">
          <p className="text-lg font-semibold mb-4">Doing the action...</p>
          <img src="/action.gif" alt="Action in progress" className="w-full h-auto mb-4" />
          <button
            onClick={() => {
              clearTimeout(actionTimeoutId);
              setIsActionPlaying(false);
              setCurrentActionType(null); 
              EventBus.emit("performAction", {
                type: confirmationModalData.actionType,
                jobId: confirmationModalData.actionParams?.jobId,
              });
              resumeGame();
            }}
          >
            Skip
          </button>
        </div>
      </div>
    )} */}
    {/* ######################################################################### */}
    </>
  );
}

export default MainGame;
