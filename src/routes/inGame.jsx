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

import Inventory from "../components/Game/Inventory";

function MainGame() {
  let navigate = useNavigate();

  const icons = [
    { name: "hunger" },
    { name: "energy" },
    { name: "hygiene" },
    { name: "happiness" },
  ];
  const { status, setStatus } = useGameContext();

  const [countTest, setCountTest] = useState(0);

  const [canMoveSprite, setCanMoveSprite] = useState(true);

  const phaserRef = useRef();
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  const [Time, setTime] = useState(GameState.time);

  // const changeScene = () => {
  //     const scene = phaserRef.current.scene;

  //     if(scene){
  //         scene.changeScene();
  //     }
  // }

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

    EventBus.on("performAction", handleAction);
    return () => {
      EventBus.off("performAction", handleAction);
    };
  }, []);

  // //Use effect buat time ini
  // useEffect(()=>{
  //   startGameClock();
  //   const handleTime = (data) => {
  //     setTime(data.time);
  //   };
  //   EventBus.on("timeTick", handleTime);  
  //   return () => {
  //   EventBus.off("timeTick", handleTime);
  // };
  // }, []);

  //Use effect di sini buat stats nurun gradually supaya bisa ada penurunan, ntar disetting di sini aja penurunan perdetiknya berapa janlupp.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setStatus((prev) => ({
          ...prev,
          hunger: Math.max(prev.hunger - 1, 0),
          energy: Math.max(prev.energy - 2, 0),
          happiness: Math.max(prev.happiness - 2, 0),
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [setStatus]);


  //Mapping buat status bars, bakalan direrender semua nya waktu contextnya ganti, mempermudah animasi cuma butuh optimalisasi performa lebih lagi
  function createStatus(text) {
    if (!status) return null;
    return <StatusBars icon={text.name} num={status[text.name]} />;
  }

  return (
    <>
  
        <Shop />
        <Inventory />
      <div className="absolute top-4 left-4 z-30">
        <Button text="Back" onClick={() => navigate("/")} />
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="fixed right-4 top-1/4 transform -translate-y-1/2 z-20 bg-gray-900/75 text-center">
          <div className="w-75 text-4xl text-center text-lime-400 mb-2">OBJECTIVE</div>
          <p>TEST</p>
        </div>
        <div className="relative w-full flex justify-center mt-4">
          <div className="hidden md:flex md:items-start md:fixed md:bottom-4 md:left-4 z-10 rounded-3xl p-3 gap-4">
            <div className="flex flex-col space-y-2">
              {icons.map(createStatus)}
            </div>
          </div>
            <div className="hidden md:flex md:flex-col md:items-center md:max-w-full md:px-1 z-10">
              <div className="text-2xl mt-1">{GameState.time.hour}:00 | Day {GameState.time.day}</div>
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
