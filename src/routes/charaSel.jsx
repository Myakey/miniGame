import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CharaSelect.css"
import { ReimuRight, ReimuButton, RemiliaRight, RemiliaButton, SakuyaRight, SakuyaButton, YukariRight, YukariButton, FlandreRight, FlandreButton, soundAssets } from "../assets/assetsPreLoad";
import { GameState } from "../hooks/gamestate"

export default function charSel() {
  const audioTest = new Audio(soundAssets[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const char = [ReimuRight, RemiliaRight, SakuyaRight, YukariRight, FlandreRight];
  const charButtons = [ReimuButton, RemiliaButton, SakuyaButton, YukariButton, FlandreButton];
  let navigate = useNavigate();

  const charNames = [
    "Reimu Hakurei",
    "Remilia Scarlet",
    "Sakuya Izayoi",
    "Yukari Yakumo",
    "Flandre Scarlet",
  ];
  const [chara, setChara] = useState(char[0]);

  function changeCharacter(i) {
    const clampedIndex = (i + char.length) % char.length;
    audioTest.play();
    setCurrentIndex(clampedIndex);
    setChara(char[clampedIndex]);
  }

  const isKeyPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isKeyPressed.current) return;
      isKeyPressed.current = true;

      if (e.key === "ArrowUp") {
        changeCharacter(currentIndex + 2);
      } else if (e.key === "ArrowDown" && charNames[currentIndex] === "Sakuya Izayoi") {
        changeCharacter(currentIndex - 3);
      } else if (e.key === "ArrowDown") {
        changeCharacter(currentIndex - 2);
      } else if (e.key === "ArrowLeft") {
        changeCharacter(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        changeCharacter(currentIndex + 1);
      } else if (e.key === "Enter") {
        let selectedCharacter = charNames[currentIndex];
        GameState.char = selectedCharacter.split(" ")[0];
        navigate("/inGame");
      }

      //Reset prevent spamming
      setTimeout(() => {
        isKeyPressed.current = false;
      }, 200);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <>
      <div className="charaSelect">
        <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
          {/*Character Selection Grid*/}
          <div className="flex order-2 lg:order-1 flex-col h-[60vh] lg:h-screen w-full justify-center">
            {/*1st Row CharButton*/}
            <div className="flex items-center justify-center pb-4 lg:pb-10">
              <div className="flex flex-row gap-4 lg:gap-8">
                <div
                  className={`border-4 rounded-tl-2xl rounded-br-2xl border-red-500 bg-red-100 overflow-hidden shadow-lg transform -skew-x-6 transition-transform duration-200 hover:scale-110 active:scale-110 w-28 h-36 lg:w-36 lg:h-48 ${
                    (currentIndex + char.length) % char.length === 0 ? "scale-110" : "scale-100"
                  }`}
                  onClick={() => changeCharacter(0)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img src={charButtons[0]} alt="Character 1" className="object-cover w-full h-full" />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-blue-400 bg-blue-200 overflow-hidden shadow-lg -skew-x-6 transform duration-200 hover:scale-110 active:scale-110 w-28 h-36 lg:w-36 lg:h-48 ${
                    (currentIndex + char.length) % char.length === 1 ? "scale-110" : "scale-100"
                  }`}
                  onClick={() => changeCharacter(1)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img src={charButtons[1]} alt="Character 2" className="object-cover w-full h-full" />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-gray-500 bg-gray-300 overflow-hidden shadow-lg -skew-x-6 hover:scale-110 active:scale-110 w-28 h-36 lg:w-36 lg:h-48 ${
                    (currentIndex + char.length) % char.length === 2 ? "scale-110" : "scale-100"
                  }`}
                  onClick={() => changeCharacter(2)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img src={charButtons[2]} alt="Character 3" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>

            {/*2nd Row CharButton*/}
            <div className="flex items-center justify-center">
              <div className="flex flex-row gap-4 lg:gap-8">
                <div
                  className={`border-4 rounded-tl-2xl rounded-br-2xl border-yellow-500 bg-yellow-100 overflow-hidden shadow-lg transform -skew-x-6 hover:scale-110 active:scale-110 w-28 h-36 lg:w-36 lg:h-48 ${
                    (currentIndex + char.length) % char.length === 3 ? "scale-110" : "scale-100"
                  }`}
                  onClick={() => changeCharacter(3)}
                  onDoubleClick={() => {
                    let selectedCharacter = charNames[currentIndex];
                    GameState.char = selectedCharacter.split(" ")[0];
                    navigate("/inGame");
                  }}
                >
                  <img src={charButtons[3]} alt="Character 4" className="object-cover w-full h-full" />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-pink-400 overflow-hidden shadow-lg -skew-x-6 transform hover:scale-110 active:scale-110 w-28 h-36 lg:w-36 lg:h-48 ${
                    (currentIndex + char.length) % char.length === 4 ? "scale-110" : "scale-100"
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
                  {charNames[currentIndex]}
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