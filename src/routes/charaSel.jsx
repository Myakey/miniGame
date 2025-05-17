import React, { useState, useEffect, useRef } from "react";
import "../styles/CharaSelect.css"


export default function charSel() {
  const audioTest = new Audio("/src/assets/sound/CharaSelectChoose.mp3");
  const [currentIndex, setCurrentIndex] = useState(0);
  // const char = [Reimu, Remilia, Sakuya, Yukari, Flandre]

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
        <div className="flex flex-row h-screen w-screen overflow-hidden">
          <div className="flex flex-col h-screen w-screen overflow-hidden justify-center">
            {/*Left Column CharButton*/}
            <div className="flex items-center justify-center pb-10">
              <div className="flex flex-row gap-8 ">
                <div
                  className={`border-4 rounded-tl-2xl rounded-br-2xl border-red-500 bg-red-100 overflow-hidden shadow-lg w-35 h-45 transform -skew-x-6 transition-transform duration-200 hover:scale-110 active:scale-110  ${(currentIndex + char.length) % char.length === 0
                    ? "scale-110"
                    : "scale-100"
                    }`}
                  onClick={() => changeCharacter(0)}
                >
                  <img
                    src="/src/assets/image/CharaSelect/ReimuButton.png"
                    alt="Character 1"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-blue-400 bg-blue-200 overflow-hidden shadow-lg w-35 h-45 -skew-x-6 transform duration-200 hover:scale-110 active:scale-110 ${(currentIndex + char.length) % char.length === 1
                    ? "scale-110"
                    : "scale-100"
                    }`}
                  onClick={() => changeCharacter(1)}
                >
                  <img
                    src="/src/assets/image/CharaSelect/ScarletButton.png"
                    alt="Character 2"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-gray-500 bg-gray-300 overflow-hidden shadow-lg w-35 h-45 -skew-x-6 hover:scale-110 active:scale-110  ${(currentIndex + char.length) % char.length === 2
                    ? "scale-110"
                    : "scale-100"
                    }`}
                  onClick={() => changeCharacter(2)}
                >
                  <img
                    src="/src/assets/image/CharaSelect/SakuyaButton.png"
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
                  className={`border-4 rounded-tl-2xl rounded-br-2xl border-yellow-500 bg-yellow-100 overflow-hidden shadow-lg w-35 h-45 transform -skew-x-6 hover:scale-110 active:scale-110 ${(currentIndex + char.length) % char.length === 3
                    ? "scale-110"
                    : "scale-100"
                    }`}
                  onClick={() => changeCharacter(3)}
                >
                  <img
                    src="/src/assets/image/CharaSelect/YukariButton.png"
                    alt="Character 1"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className={`rounded-tl-2xl rounded-br-2xl border-4 border-pink-400 overflow-hidden shadow-lg w-35 h-45 -skew-x-6 transform hover:scale-110 active:scale-110 ${(currentIndex + char.length) % char.length === 4
                    ? "scale-110"
                    : "scale-100"
                    }`}
                  onClick={() => changeCharacter(4)}
                >
                  <img
                    src="/src/assets/image/CharaSelect/FlandreButton.png"
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
          <h1 className="text-white italic text-2xl drop-shadow-[2px_2px_rgba(0,0,0,0.9)]">Double click or press A to choose...</h1>
        </div>

        {/*Title*/}
        <div className="flex pb-10 top-8 absolute z-10 justify-center items-center text-center w-full ">
          <h1 className="text-orange-300 text-6xl drop-shadow-[3px_2px_rgba(0,0,0,0.9)]">Character Select</h1>
        </div>
      </div>
    </>
  );
}
