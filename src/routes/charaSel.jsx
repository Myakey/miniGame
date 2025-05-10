import React, { useState, useEffect, useRef } from "react";
import "../styles/CharaSelect.css"

export default function charSel() {
  const audioTest = new Audio("/src/assets/sound/CharaSelectChoose.mp3");
  const [currentIndex, setCurrentIndex] = useState(0);
  const char = [
    "/src/assets/image/CharaSelect/FlandreRight.png",
    "/src/assets/image/CharaSelect/RemiliaRight.png",
    "/src/assets/image/CharaSelect/SakuyaRight.png",
    "src/assets/image/CharaSelect/YukariRight.png",
    "src/assets/image/CharaSelect/ReimuRight.png",
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
        changeCharacter(currentIndex - 2);
      } else if (e.key === "ArrowDown") {
        changeCharacter(currentIndex + 2);
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
        {/*Left Column CharButton*/}
        <div className="flex items-center pb-10">
          <div className="flex flex-col gap-4 ml-10 mr-20">
            <div
              className={`border-4 rounded-tr-2xl rounded-bl-2xl border-red-500 overflow-hidden shadow-lg w-40 h-28 transform -skew-x-6 transition-transform duration-200 ${
                (currentIndex + char.length) % char.length === 0
                  ? "scale-110"
                  : "scale-100"
              }`}
              onClick={() => changeCharacter(0)}
            >
              <img
                src="/src/assets/image/CharaSelect/FlandreButton.png"
                alt="Character 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              className={`rounded-tr-2xl rounded-bl-2xl border-4 border-blue-400 overflow-hidden shadow-lg w-40 h-28 -skew-x-6 transform hover:scale-110 active:scale-110 ${
                (currentIndex + char.length) % char.length === 2
                  ? "scale-110"
                  : "scale-100"
              }`}
              onClick={() => changeCharacter(2)}
            >
              <img
                src="/src/assets/image/CharaSelect/SakuyaButton.png"
                alt="Character 2"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              className={`rounded-tr-2xl rounded-bl-2xl border-4 border-purple-400 overflow-hidden shadow-lg w-40 h-28 -skew-x-6 ${
                (currentIndex + char.length) % char.length === 4
                  ? "scale-110"
                  : "scale-100"
              }`}
              onClick={() => changeCharacter(4)}
            >
              <img
                src="/src/assets/image/CharaSelect/ReimuButton.png"
                alt="Character 3"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/*Middle Column CharButton*/}
        <div className="flex items-center pb-10">
          <div className="flex flex-col gap-4">
            <div
              className={`border-4 rounded-tr-2xl rounded-bl-2xl border-red-500 overflow-hidden shadow-lg w-40 h-28 transform -skew-x-6 ${
                (currentIndex + char.length) % char.length === 1
                  ? "scale-110"
                  : "scale-100"
              }`}
              onClick={() => changeCharacter(1)}
            >
              <img
                src="/src/assets/image/CharaSelect/ScarletButton.png"
                alt="Character 1"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              className={`rounded-tr-2xl rounded-bl-2xl border-4 border-blue-400 overflow-hidden shadow-lg w-40 h-28 -skew-x-6 transform hover:scale-110 active:scale-110 ${
                (currentIndex + char.length) % char.length === 3
                  ? "scale-110"
                  : "scale-100"
              }`}
              onClick={() => changeCharacter(3)}
            >
              <img
                src="/src/assets/image/CharaSelect/YukariButton.png"
                alt="Character 2"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/*The Large Image of Characters*/}
        <div className="flex justify-end items-end h-full w-full mr-20">
          <img
            key={chara}
            src={chara}
            alt="Selected Character"
            className="h-full w-max mask-image-left animate-slide-in"
          />
        </div>
      </div>
    </div>
    </>
  );
}
