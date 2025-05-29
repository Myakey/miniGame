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

  const currentScene = (scene) => {
    setCanMoveSprite(scene.scene.key !== "InGame");
  };

  //Use Effect buat ngehubungin React sama Action di Phaser. Jadi waktu ada action tertentu di Phaser, maka React akan nerima dan akan update context di sini yaa
  //Update ini supaya logic jobId bisa di pass
  useEffect(() => {
    const handleAction = (payload) => {
      console.log("Received performAction event:", payload);
      const { type, jobId, itemId } = payload;
      setStatus((prev) => {
        const newStatus = handleActionLogic(type, prev, jobId, itemId);
        console.log("Old status:", prev);
        console.log("New status:", newStatus);
        return newStatus;
      });
    };

    const handleVN = (chapter) =>{
      console.log("Yep");
      VNSelector(chapter);
    }

    EventBus.on("performVN", handleVN);
    EventBus.on("performAction", handleAction);
    return () => {
      EventBus.off("performAction", handleAction);
      EventBus.off("performVN", handleVN);
    };
  }, []);


  //Use effect di sini buat stats nurun gradually supaya bisa ada penurunan, ntar disetting di sini aja penurunan perdetiknya berapa janlupp.
 useEffect(() => {
  const interval = setInterval(() => {
    if (!isPaused) {
      setStatus((prev) => {
        // Calculate new time values
        const newMinute = (prev.time.minute + 1) % 60;
        const hourChanged = prev.time.minute === 59; // will increment hour after 59th minute
        const newHour = hourChanged ? (prev.time.hour + 1) % 24 : prev.time.hour;
        const newDay = hourChanged && prev.time.hour === 23 ? prev.time.day + 1 : prev.time.day;

        // Emit event if hour changed
        if (hourChanged && newHour !== prev.time.hour) {
          EventBus.emit('phaser-time-update', { hour: newHour });
        }

        // Return updated status with new time and decreased stats
        return {
          ...prev,
          hunger: Math.max(prev.hunger - 1, 0),
          energy: Math.max(prev.energy - 2, 0),
          happiness: Math.max(prev.happiness - 2, 0),
          time: {
            ...prev.time,
            minute: newMinute,
            hour: newHour,
            day: newDay
          }
        };
      });
    }
  }, 100);

  return () => clearInterval(interval);
}, [setStatus]);



  //Mapping buat status bars, bakalan direrender semua nya waktu contextnya ganti, mempermudah animasi cuma butuh optimalisasi performa lebih lagi
  function createStatus(text) {
    if (!status) return null;
    return <StatusBars icon={text.name} num={status[text.name]} color={text.color} />;
  }

  return (
    <>
        <ObjectivePanel />
        <ShopInteraction />
        <Inventory />
      <div className="absolute 
      z-30">
        <PauseMenu />
        
      </div>

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
              <div className="text-2xl mt-1"> {status.time.hour.toString().padStart(2, "0")}:
  {status.time.minute.toString().padStart(2, "0")} | Day {status.time.day}</div>
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
    </>
  );
}

export default MainGame;
