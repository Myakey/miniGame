import React, { useState, useEffect } from "react";
import { assetsLoadImg, soundAssets } from "../assets/assetsPreLoad";
import preload from "/assets/preload.png";

const touhouQuotes = [
  "Reimu: 'Another day, another incident to solve...'",
  "Marisa: 'It's not stealing if it's borrowing forever!'",
  "Sakuya: 'Time waits for no one... except me.'",
  "Youmu: 'I-I’ll cut that loading time in half!'",
  "Remilia: 'A lady shouldn't have to wait this long.'",
  "Patchouli: 'My knowledge predicts this load will end soon.'",
  "Cirno: 'Loading? I can freeze time better than this!'",
  "Yukari: 'Let’s gap through this delay, shall we?'",
  "Suika: 'Oi, someone bring more sake while we wait!'",
  "Nitori: 'Upgrading load efficiency... or trying to.'"
];

export default function LoadingScreen({ onLoaded }) {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * touhouQuotes.length));
  const totalAssets = assetsLoadImg.length + soundAssets.length;

  // Cycle quotes every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % touhouQuotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadAssets = async () => {
      for (const asset of assetsLoadImg) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = asset;
          img.onload = resolve;
        });
        setLoadedAssets((prev) => prev + 1);
      }

      for (const sound of soundAssets) {
        await new Promise((resolve) => {
          const audio = new Audio(sound);
          audio.oncanplaythrough = resolve;
        });
        setLoadedAssets((prev) => prev + 1);
      }

      onLoaded();
    };

    loadAssets();
  }, [onLoaded]);

  const progress = loadedAssets / totalAssets;
  console.log(`Loading progress: ${Math.round(progress * 100)}%`);

  return (
    <div className="loading-screen flex flex-col items-center justify-center h-screen w-screen bg-white text-black px-8">
      <img src={preload} alt="Loading..." className="w-1/3 mb-4" />
      <h1 className="text-4xl mb-2">Loading... {Math.round(progress * 100)}%</h1>

      {/* Progress bar container */}
      <div className="w-full max-w-md h-4 bg-gray-300 rounded-full overflow-hidden mb-4">
        {/* Progress bar fill */}
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Touhou-themed quote */}
      <p className="text-lg italic text-center text-gray-600 max-w-md">
        {touhouQuotes[quoteIndex]}
      </p>
    </div>
  );
}

