import React, { useState, useEffect } from "react";
import { assetsLoadImg, soundAssets } from "../assets/assetsPreLoad";
import preload from "/assets/preload.png";

export default function LoadingScreen({ onLoaded }) {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const totalAssets = assetsLoadImg.length + soundAssets.length;

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
      <div className="w-full max-w-md h-4 bg-gray-300 rounded-full overflow-hidden">
        {/* Progress bar fill */}
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
