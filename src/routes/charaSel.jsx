import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CharaSelect.css";
import {
  ReimuRight,
  ReimuButton,
  RemiliaRight,
  RemiliaButton,
  SakuyaRight,
  SakuyaButton,
  YukariRight,
  YukariButton,
  FlandreRight,
  FlandreButton,
  soundAssets,
} from "../assets/assetsPreLoad";
import { GameState } from "../hooks/gamestate";
import {
  FlandreSelect,
  YukariSelect,
  ReimuSelect,
  RemiliaSelect,
  SakuyaSelect,
} from "../assets/assetsPreLoad";
import { Selected } from "../assets/assetsPreLoad";

import { useVNSelector } from "../components/VN/VNSELECTOR";
import { Game } from "phaser";
import DifficultyModal from "../components/UI/Difficulty";

export default function CharSel() {
  const [showModal, setShowModal] = useState(true);
  console.log(GameState)
  let VNSelector = useVNSelector();

  const audioTest = new Audio(soundAssets[0]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chara, setChara] = useState(ReimuRight);
  const [inputReady, setInputReady] = useState(false);

  const navigate = useNavigate();
  const isKeyPressed = useRef(false);
  const animationFrameRef = useRef(null);
  const prevAxesRef = useRef([0, 0]);
  const prevButtonsPressedRef = useRef(new Set());
  const nextAllowedInputTimeRef = useRef(0);
  const mountTime = useRef(performance.now());

  const [fadeOut, setFadeOut] = useState(false);
  const [transitioning, setTransitioning] = useState(false);


  //Declaration constants for all button
  const characters = [
  {
    name: "Reimu Hakurei",
    sprite: ReimuRight,
    button: ReimuButton,
    sound: ReimuSelect,
    borderColor: "border-red-500",
    bg: "bg-red-100",
  },
  {
    name: "Remilia Scarlet",
    sprite: RemiliaRight,
    button: RemiliaButton,
    sound: RemiliaSelect,
    borderColor: "border-blue-400",
    bg: "bg-blue-200",
  },
  {
    name: "Sakuya Izayoi",
    sprite: SakuyaRight,
    button: SakuyaButton,
    sound: SakuyaSelect,
    borderColor: "border-gray-500",
    bg: "bg-gray-300",
  },
  {
    name: "Yukari Yakumo",
    sprite: YukariRight,
    button: YukariButton,
    sound: YukariSelect,
    borderColor: "border-yellow-500",
    bg: "bg-yellow-100",
  },
  {
    name: "Flandre Scarlet",
    sprite: FlandreRight,
    button: FlandreButton,
    sound: FlandreSelect,
    borderColor: "border-pink-400",
    bg: "bg-pink-100",
  },
];

const [pulseIndex, setPulseIndex] = useState(null);

useEffect(() => {
  if (inputReady) {
    setPulseIndex(currentIndex);
    setTimeout(() => setPulseIndex(null), 300); // reset after animation
  }
}, [currentIndex]);


  const CharacterRow = ({ charactersToRender }) => (
    <div className="flex flex-row gap-4 lg:gap-8">
      {charactersToRender.map((charData, index) => {
        const actualIndex = characters.indexOf(charData);
        const isSelected = (currentIndex + characters.length) % characters.length === actualIndex;

        return (
          <div
  key={charData.name}
  className={` rounded-tl-2xl rounded-br-2xl border-4 
    ${charData.borderColor} ${charData.bg} 
    overflow-hidden shadow-lg transform -skew-x-6
    transition-transform duration-300 ease-out
    w-28 h-36 lg:w-36 lg:h-48
    ${isSelected ? "scale-110 z-10" : "scale-100"}
    ${pulseIndex === actualIndex ? "animate-pulse scale-125" : ""
  }`}
  onClick={() => {
    if (isSelected) {
      handleCharacterSelect(currentIndex);
    } else {
      changeCharacter(actualIndex);
    }
  }}
>
  <img
    src={charData.button}
    alt={charData.name}
    className="object-cover w-full h-full"
  />
</div>
        );
      })}
    </div>
);

  

  function handleCharacterSelect(index) {
    GameState.char = characters[index].name.split(" ")[0];
    if (characters[index].name.split(" ")[0] === "Remilia" || characters[index].name.split(" ")[0] === "Flandre") {
      GameState.isVampire = true;
    } else {
      GameState.isVampire = false;
    }
    const audio = new Audio(characters[index].sound);
    const selected = new Audio(Selected);
    selected.play();
    audio.play();
    setTransitioning(true);

    setFadeOut(true);

    audio.onloadedmetadata = () => {
      const duration = audio.duration * 1000;
      setTimeout(() => {
        GameState.currentAct = "prologue";
        GameState.afterVN = true;
        VNSelector("prologueData")
        // navigate("/inGame");
      }, duration);
  };
  }

  function changeCharacter(i) {
    const clampedIndex = (i + characters.length) % characters.length;
    audioTest.play();
    setCurrentIndex(clampedIndex);
    setChara(characters[clampedIndex].sprite);
    console.log(characters[clampedIndex].name.split(" ")[0])
  }

  useEffect(() => {
  let isMounted = true;

  const inputDelay = setTimeout(() => {
    if (isMounted) setInputReady(true);
  }, 500);

  const handleKeyDown = (e) => {
    if (!inputReady || isKeyPressed.current) return;

    const now = performance.now();
    const elapsed = now - mountTime.current;
    if (elapsed < 300) return;

    isKeyPressed.current = true;

    const currentCharName = characters[currentIndex]?.name;

    if (e.key === "ArrowUp") {
      changeCharacter(currentIndex + 2);
    } else if (e.key === "ArrowDown") {
      changeCharacter(currentCharName === "Sakuya Izayoi" ? currentIndex - 3 : currentIndex - 2);
    } else if (e.key === "ArrowLeft") {
      changeCharacter(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      changeCharacter(currentIndex + 1);
    } else if (e.key === "Enter") {
      GameState.char = currentCharName?.split(" ")[0];
      handleCharacterSelect(currentIndex);
    }

    setTimeout(() => {
      isKeyPressed.current = false;
    }, 200);
  };

  const handleGamepadInput = () => {
    const gp = navigator.getGamepads()[0];
    const now = performance.now();

    if (!gp) {
      if (isMounted) animationFrameRef.current = requestAnimationFrame(handleGamepadInput);
      return;
    }

    const [axisX, axisY] = gp.axes;
    const dpadLeft = gp.buttons[14]?.pressed;
    const dpadRight = gp.buttons[15]?.pressed;
    const dpadUp = gp.buttons[12]?.pressed;
    const dpadDown = gp.buttons[13]?.pressed;
    const axisThreshold = 0.6;
    const prevAxes = prevAxesRef.current;

    const horizontalEdge =
      (axisX > axisThreshold && prevAxes[0] <= axisThreshold) ||
      (axisX < -axisThreshold && prevAxes[0] >= -axisThreshold);

    const verticalEdge =
      (axisY > axisThreshold && prevAxes[1] <= axisThreshold) ||
      (axisY < -axisThreshold && prevAxes[1] >= -axisThreshold);

    const currentCharName = characters[currentIndex]?.name;

    if (now > nextAllowedInputTimeRef.current) {
      if (dpadRight || (axisX > axisThreshold && horizontalEdge)) {
        changeCharacter(currentIndex + 1);
        nextAllowedInputTimeRef.current = now + 300;
      } else if (dpadLeft || (axisX < -axisThreshold && horizontalEdge)) {
        changeCharacter(currentIndex - 1);
        nextAllowedInputTimeRef.current = now + 300;
      } else if (dpadDown || (axisY > axisThreshold && verticalEdge)) {
        changeCharacter(currentIndex + 2);
        nextAllowedInputTimeRef.current = now + 300;
      } else if (dpadUp || (axisY < -axisThreshold && verticalEdge)) {
        changeCharacter(currentCharName === "Sakuya Izayoi" ? currentIndex - 3 : currentIndex - 2);
        nextAllowedInputTimeRef.current = now + 300;
      }
    }

    if (
      gp.buttons[0].pressed &&
      !prevButtonsPressedRef.current.has(0) &&
      now > nextAllowedInputTimeRef.current
    ) {
      handleCharacterSelect(currentIndex);

      gp.vibrationActuator?.playEffect?.("dual-rumble", {
        duration: 1000,
        strongMagnitude: 1.0,
        weakMagnitude: 1.0,
      });
    }

    prevAxesRef.current = [axisX, axisY];
    gp.buttons.forEach((btn, i) => {
      if (btn.pressed) prevButtonsPressedRef.current.add(i);
      else prevButtonsPressedRef.current.delete(i);
    });

    if (isMounted)
      animationFrameRef.current = requestAnimationFrame(handleGamepadInput);
  };

  if (inputReady) {
    window.addEventListener("keydown", handleKeyDown);
  }

  animationFrameRef.current = requestAnimationFrame(handleGamepadInput);

  return () => {
    isMounted = false;
    window.removeEventListener("keydown", handleKeyDown);
    cancelAnimationFrame(animationFrameRef.current);
    clearTimeout(inputDelay);
  };
}, [inputReady, currentIndex]);


  return (
    <>
      {fadeOut && (
  <div className="fixed top-0 left-0 w-full h-full bg-black z-50 animate-fadeOut"></div>
)}
      <DifficultyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div className="charaSelect">
        <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
          {/*Character Selection Grid*/}
          <div className="flex order-2 lg:order-1 flex-col h-[60vh] lg:h-screen w-full justify-center">
            {/*1st Row CharButton*/}
            <div className="flex items-center justify-center pb-4 lg:pb-10">
               <CharacterRow charactersToRender={characters.slice(0, 3)} />
            </div>

            {/*2nd Row CharButton*/}
            <div className="flex items-center justify-center">
              <CharacterRow charactersToRender={characters.slice(3)} />
            </div>

          </div>

          {/*The Large Image of Characters*/}
          <div className="flex order-1 lg:order-2 lg:justify-end lg:items-end justify-center items-end h-[40vh] lg:h-full w-full">
            <div className="relative w-max h-full">
              <img
                key={chara}
                src={chara}
                alt="Selected Character"
                className="h-full w-max mask-image-left animate-slide-in object-contain translate-y-10 lg:translate-y-0"
              />
              {/*Name Bar*/}
              <div
                key={currentIndex}
                className="absolute flex z-40 h-15 w-60 bg-black/70 justify-center items-center text-center bottom-5 lg:w-70 lg:bottom-55 lg:right-12  rounded-tl-2xl rounded-br-2xl mask-image-left animate-slide-in"
              >
                <h1 className="text-white text-3xl">
                  {characters[currentIndex].name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/*Bottom Text*/}
        <div className="flex bottom-2 lg:bottom-10 absolute z-10 justify-center items-center text-center w-full animate-pulse">
          <h1 className="text-white italic text-xl lg:text-2xl drop-shadow-[2px_2px_rgba(0,0,0,0.9)]">
            Double click or press A to choose...
          </h1>
        </div>

        {/*Title*/}
        <div className="flex top-2 lg:top-5 absolute z-10 justify-center items-center text-center w-full">
          <h1 className="text-orange-300 text-4xl lg:text-6xl drop-shadow-[3px_2px_rgba(0,0,0,0.9)]">
            Character Select
          </h1>
        </div>
      </div>
    </>
  );
}
