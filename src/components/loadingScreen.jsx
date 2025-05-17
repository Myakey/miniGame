import React, { useState, useEffect } from "react";
import { assetsLoadImg, soundAssets } from "../assets/assetsPreLoad";

export default function LoadingScreen( {onLoaded} ){
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

            onLoaded(); // Call the onLoaded function when all assets are loaded
        };

        loadAssets();
    }, [onLoaded]);

    return (
        <div className="loading-screen flex items-center justify-center h-screen w-screen bg-black text-white">
            <h1 className="text-4xl">Loading... {Math.round((loadedAssets / totalAssets) * 100)}%</h1>
        </div>
    );
}