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
  useEffect(() => {
    const handleAction = (type) => {
      setStatus((prev) => handleActionLogic(type, prev));
    };

    EventBus.on("performAction", handleAction);
    return () => {
      EventBus.off("performAction", handleAction);
    };
  }, []);

  //Use effect di sini buat stats nurun gradually supaya bisa ada penurunan, ntar disetting di sini aja penurunan perdetiknya berapa janlupp.
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setStatus((prev) => ({
          ...prev,
          hunger: Math.max(prev.hunger - 1, 0),
          energy: Math.max(prev.energy - 2, 0),
          happiness: Math.max(prev.happiness - 3, 0),
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
        <div className="text-4xl mt-4 z-20">Objective</div>

        {/* Game area (with overlap) */}
        <div className="relative w-full flex justify-center mt-4">
          {/* Status Bars - only show on desktop up top */}
          <div className="hidden md:flex absolute -top-12 z-20 bg-blue-400 rounded-3xl p-3 gap-4">
            {icons.map(createStatus)}
            <div className="flex flex-col items-center w-full max-w-[6rem] px-1">
              <div className="text-xs md:text-sm mt-1">zmoney</div>
            </div>
          </div>
          <div id="mainGame" className="w-full max-w-5xl aspect-[2/1] relative">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
          </div>
        </div>

         <div className="md:hidden grid grid-cols-2 gap-3 p-4 mt-4 bg-blue-400 rounded-3xl z-10">
        {icons.map(createStatus)}
        <div className="flex flex-col items-center w-full max-w-[6rem] px-1">
          <div className="text-xs mt-1">zmoney</div>
        </div>
      </div>
        <ArrowControls />
      </div>
    </>
  );
}

export default MainGame;
