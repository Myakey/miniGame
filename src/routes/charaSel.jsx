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

export default function CharSel() {
  const audioTest = new Audio(soundAssets[0]);
  const charSelectSounds = [
    ReimuSelect,
    RemiliaSelect,
    SakuyaSelect,
    YukariSelect,
    FlandreSelect,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chara, setChara] = useState(ReimuRight);
  const [inputReady, setInputReady] = useState(false);

  const char = [
    ReimuRight,
    RemiliaRight,
    SakuyaRight,
    YukariRight,
    FlandreRight,
  ];
  const charNames = [
    "Reimu Hakurei",
    "Remilia Scarlet",
    "Sakuya Izayoi",
    "Yukari Yakumo",
    "Flandre Scarlet",
  ];
  const charButtons = [
    ReimuButton,
    RemiliaButton,
    SakuyaButton,
    YukariButton,
    FlandreButton,
  ];

  const navigate = useNavigate();
  const isKeyPressed = useRef(false);
  const animationFrameRef = useRef(null);
  const prevAxesRef = useRef([0, 0]);
  const prevButtonsPressedRef = useRef(new Set());
  const nextAllowedInputTimeRef = useRef(0);
  const mountTime = useRef(performance.now());

  const [fadeOut, setFadeOut] = useState(false);
  const [transitioning, setTransitioning] = useState(false);


  function handleCharacterSelect(index) {
    GameState.char = charNames[index].split(" ")[0];
    const audio = new Audio(charSelectSounds[index]);
    const selected = new Audio(Selected);
    selected.play();
    audio.play();
    setTransitioning(true);

    setFadeOut(true);

    audio.onloadedmetadata = () => {
      const duration = audio.duration * 1000;
      setTimeout(() => {
        navigate("/inGame");
      }, duration);
  };
  }

  function changeCharacter(i) {
    const clampedIndex = (i + char.length) % char.length;
    audioTest.play();
    setCurrentIndex(clampedIndex);
    setChara(char[clampedIndex]);
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

      if (e.key === "ArrowUp") changeCharacter(currentIndex + 2);
      else if (e.key === "ArrowDown") {
        changeCharacter(
          charNames[currentIndex] === "Sakuya Izayoi"
            ? currentIndex - 3
            : currentIndex - 2
        );
      } else if (e.key === "ArrowLeft") changeCharacter(currentIndex - 1);
      else if (e.key === "ArrowRight") changeCharacter(currentIndex + 1);
      else if (e.key === "Enter") {
        GameState.char = charNames[currentIndex].split(" ")[0];
        handleCharacterSelect(currentIndex);
      }

      setTimeout(() => (isKeyPressed.current = false), 200);
    };

    const handleGamepadInput = () => {
      const gp = navigator.getGamepads()[0];
      const now = performance.now();

      if (!gp) {
        if (isMounted)
          animationFrameRef.current = requestAnimationFrame(handleGamepadInput);
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
          changeCharacter(
            charNames[currentIndex] === "Sakuya Izayoi"
              ? currentIndex - 3
              : currentIndex - 2
          );
          nextAllowedInputTimeRef.current = now + 300;
        }
      }

      if (
        gp.buttons[0].pressed &&
        !prevButtonsPressedRef.current.has(0) &&
        now > nextAllowedInputTimeRef.current
      ) {
        GameState.char = charNames[currentIndex].split(" ")[0];
        navigate("/inGame");
        nextAllowedInputTimeRef.current = now + 500;

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
      <div className="charaSelect">
        <div className="flex flex-row h-screen w-screen overflow-hidden">
          <div className="flex flex-col h-screen w-screen overflow-hidden justify-center">
            {/*Left Column CharButton*/}
            <div className="flex items-center justify-center pb-10">
              <div className="flex flex-row gap-8 ">
                <div
                  className={`border-4 rounded-tl-2xl rounded-br-2xl border-red-500 bg-red-100 overflow-hidden shadow-lg w-35 h-45 transform -skew-x-6 transition-transform duration-200 hover:scale-110 active:scale-110  ${
                    (currentIndex + char.length) % char.length === 0
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  onClick={() => changeCharacter(0)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img
                    src={charButtons[0]}
                    alt="Character 1"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-blue-400 bg-blue-200 overflow-hidden shadow-lg w-35 h-45 -skew-x-6 transform duration-200 hover:scale-110 active:scale-110 ${
                    (currentIndex + char.length) % char.length === 1
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  onClick={() => changeCharacter(1)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img
                    src={charButtons[1]}
                    alt="Character 2"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-gray-500 bg-gray-300 overflow-hidden shadow-lg w-35 h-45 -skew-x-6 transform transition-transform duration-200 hover:scale-110 active:scale-110  ${
                    (currentIndex + char.length) % char.length === 2
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  onClick={() => changeCharacter(2)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img
                    src={charButtons[2]}
                    alt="Character 3"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/*Middle Column CharButton*/}
            <div className="flex items-center justify-center pb-10">
              <div className="flex flex-row gap-8  ">
                <div
                  className={`border-4 rounded-tl-2xl rounded-br-2xl border-yellow-500 bg-yellow-100 overflow-hidden shadow-lg w-35 h-45 transform transition-transform duration-200 -skew-x-6 hover:scale-110 active:scale-110 ${
                    (currentIndex + char.length) % char.length === 3
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  onClick={() => changeCharacter(3)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img
                    src={charButtons[3]}
                    alt="Character 1"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-pink-400 overflow-hidden shadow-lg w-35 h-45 -skew-x-6 transform transition-transform duration-200 hover:scale-110 active:scale-110 ${
                    (currentIndex + char.length) % char.length === 4
                      ? "scale-110"
                      : "scale-100"
                  }`}
                  onClick={() => changeCharacter(4)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img
                    src={charButtons[4]}
                    alt="Character 2"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*The Large Image of Characters*/}
          <div className="flex justify-end items-end h-full w-full ">
            <img
              key={chara}
              src={chara}
              alt="Selected Character"
              className="h-full w-max mask-image-left animate-slide-in"
            />
            {/*Name Bar*/}
            <div
              key={currentIndex}
              className="fixed flex z-40 h-15 w-70 bg-black/70 justify-center items-center text-center bottom-55 right-12 rounded-tl-2xl rounded-br-2xl mask-image-left animate-slide-in"
            >
              <h1 className="text-white text-3xl ">
                {charNames[currentIndex]}
              </h1>
            </div>
          </div>
        </div>
        {/*Middle Bottom Text*/}
        <div className="flex pb-10 bottom-0 absolute z-10 justify-center items-center text-center w-full animate-pulse ">
          <h1 className="text-white italic text-2xl drop-shadow-[2px_2px_rgba(0,0,0,0.9)]">
            Double click or press A to choose...
          </h1>
        </div>

        {/*Title*/}
        <div className="flex pb-10 top-8 absolute z-10 justify-center items-center text-center w-full ">
          <h1 className="text-orange-300 text-6xl drop-shadow-[3px_2px_rgba(0,0,0,0.9)]">
            Character Select
          </h1>
        </div>
      </div>
    </>
  );
}
