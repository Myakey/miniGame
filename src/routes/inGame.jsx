import React from "react";
import { useRef, useState, useEffect, useCallback } from "react";

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

import { useGameContext } from "../context/GameStatusContext";
import { pauseGame, resumeGame, isPaused } from "../inGame/gameController";
import ArrowControls from "../inGame/movements/arrows";
//test modal && Action scene
import ActionFlow from "../components/Game/Actionscene";
import Modal from "../components/UI/ModalBox";
import Shop from "../components/Game/Shop";
import ObjectivePanel from "../components/Game/Objective";

import Inventory from "../components/Game/Inventory";
import PauseMenu from "../components/Game/PauseMenu";

import { useVNSelector } from "../components/VN/VNSELECTOR";

import ShopInteraction from "../components/Game/ShopInteraction";

import { stopAllSounds } from "../utils/soundHandler";

import DebugBox from "../components/UI/DebugBox";

import novemFont from "../assets/fonts/novem___.ttf";

import useActionHandlers from "../hooks/useActionHandlers";
import useTimeAndStatsUpdater from "../hooks/useTimeAndStatsUpdater";
import ModalBoxGUIs from "../components/ModalBoxGUIs";

import AnalogClock from "../components/UI/Clock";
import ShowCurrentPlace from "../components/UI/CurrentPlace";

import VampireWarning from "../components/UI/WarningVamp";

function MainGame() {
  let navigate = useNavigate();
  let VNSelector = useVNSelector();

  const icons = [
    { name: "hunger", color: "bg-green-500" },
    { name: "energy", color: "bg-yellow-500" },
    { name: "hygiene", color: "bg-blue-500" },
    { name: "happiness", color: "bg-pink-500" },
  ];
  const { status, setStatus } = useGameContext();
  const [countTest, setCountTest] = useState(0);
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const phaserRef = useRef();
  const currentScene = (scene) => {
    setCanMoveSprite(scene.scene.key !== "InGame");
  };

  const [vampireWarning, setVampireWarning] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isActionPlaying, setIsActionPlaying] = useState(false);
  const [currentActionTypeForAnimation, setCurrentActionTypeForAnimation] =
    useState(null); // To pass to ActionFlow
  const [actionAnimationTimeoutId, setActionAnimationTimeoutId] =
    useState(null);
  const [confirmationModalData, setConfirmationModalData] = useState({
    title: "",
    description: "",
    image: null,
    gainsText: "",
    lossesText: "",
    actionType: null,
    actionParams: null,
    modalId: null,
  });
  const [debugModal, setDebugModal] = useState(false);
  const toggleDebugModal = () => {
    console.log(debugModal);
    setDebugModal(!debugModal);
  };
  const toggleModalFalse = () => {
    setDebugModal(false);
  };

  //Use Effect buat ngehubungin React sama Action di Phaser. Jadi waktu ada action tertentu di Phaser, maka React akan nerima dan akan update context di sini yaa
  //Update ini supaya logic jobId bisa di pass
  useActionHandlers({
    setStatus,
    VNSelector,
    setConfirmationModalData,
    setIsConfirmationModalOpen,
    setIsActionPlaying,
    setCurrentActionTypeForAnimation,
  });

  //Use effect di sini buat stats nurun gradually supaya bisa ada penurunan, ntar disetting di sini aja penurunan perdetiknya berapa janlupp.
  useTimeAndStatsUpdater({ setStatus, setVampireWarning });

  //Mapping buat status bars, bakalan direrender semua nya waktu contextnya ganti, mempermudah animasi cuma butuh optimalisasi performa lebih lagi
  function createStatus(text) {
    if (!status) return null;
    return (
      <StatusBars icon={text.name} num={status[text.name]} color={text.color} />
    );
  }

  //Combine into one class?
  // ##########################################################

  const [isConfirmationClosing, setIsConfirmationClosing] = useState(false);
  const handleConfirmationActions = new (class {
    handleConfirmCurrentAction = () => {
      setIsConfirmationModalOpen(false); // Close confirmation modal first

      if (confirmationModalData.actionType) {
        // Trigger closing animation
        setIsConfirmationClosing(true);

        // Wait for the TV-off animation (400ms), then proceed
        setTimeout(() => {
          setIsConfirmationClosing(false);
          setIsConfirmationModalOpen(false); // Actually unmount the modal now

          if (confirmationModalData.actionType) {
            //Action confirmed
            console.log(
              "Action confirmed, preparing to play animation for:",
              confirmationModalData.actionType
            );

            // Show action animation
            setCurrentActionTypeForAnimation(confirmationModalData.actionType);
            setIsActionPlaying(true);

            EventBus.emit("performAction", {
              type: confirmationModalData.actionType,
              jobId: confirmationModalData.actionParams?.jobId,
            });
          }
        }, 400); // Match the .tv-off animation duration
      } else {
        resumeGame(); // If no action type, just resume game
      }
    };

    handleSkipActionAnimation() {
      EventBus.emit("skipAction");
      console.log(
        "Action animation skipped, action performed, attempting to resume game (if action is instant)"
      );
    }

    handleCancelCurrentAction() {
      console.log(
        "Action cancelled for modalId:",
        confirmationModalData.modalId
      );
      setIsConfirmationModalOpen(false);
      resumeGame(); // Resume game if action is cancelled
      console.log("Confirmation modal closed, action cancelled, game resumed");
    }
  })();

  const handleCloseVampireWarning = useCallback(() => {
    setVampireWarning(false);
  }, []);

  // ##########################################################

  return (
    <div className="inGameWrapper">
      <ShowCurrentPlace />
      <ObjectivePanel />
      <ShopInteraction />
      <Inventory />
      <ModalBoxGUIs
        debugModal={debugModal}
        toggleDebugModal={toggleDebugModal}
        toggleModalFalse={toggleModalFalse}
        confirmationModalData={confirmationModalData}
        isConfirmationModalOpen={isConfirmationModalOpen}
        handleConfirmationActions={handleConfirmationActions}
        navigate={navigate}
        isActionPlaying={isActionPlaying}
        currentActionTypeForAnimation={currentActionTypeForAnimation}
      />
      <VampireWarning
        visible={vampireWarning}
        onClose={handleCloseVampireWarning}
      />

      <div className="flex flex-col items-center w-full">
        <div className="relative w-full flex justify-center mt-4">
          <div className="hidden md:flex md:items-start md:fixed md:bottom-4 md:left-4 z-200 rounded-3xl p-3 gap-4">
            <div className="flex flex-col space-y-2">
              {icons.map(createStatus)}
            </div>
          </div>
          <div className="hidden md:flex md:flex-col md:items-center justify-center md:max-w-full md:px-1 z-10">
            <div className="bg-white/30 flex flex-col items-center backdrop-blur-md rounded-xl shadow-md p-3 text-2xl mt-1">
              <div className="flex flex-row">
                {status.time.hour.toString().padStart(2, "0")}:
                {status.time.minute.toString().padStart(2, "0")} | 日{" "}
                {status.time.day}
              </div>
              <div className="text-lg mt-1">得点: {status.score}</div>
            </div>
          </div>

          <div className="hidden md:flex md: md:px-1 z-10 md:fixed md:bottom-7 md:right-4 bg-yellow-400/75 p-3 rounded-full text-center flex-row border-4">
            <div className="text-4xl">💰</div>
            <div className="text-3xl m-2 text-center">{GameState.money}</div>
          </div>
          <div
            id="mainGame"
            className="w w-full max-w-5xl aspect-[2/1] relative md:fixed md:inset-0 md:w-screen md:max-w-none md:h-screen md:aspect-auto md:z-0"
          >
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
          </div>
        </div>

        <div className="md:hidden grid grid-cols-2 gap-3 p-4 mt-4 bg-blue-400 rounded-3xl z-10 w-full max-w-xs sm:max-w-sm">
          {icons.map(createStatus)}
          <div className="flex flex-col items-center w-full px-1">
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
    </div>
  );
}

export default MainGame;
