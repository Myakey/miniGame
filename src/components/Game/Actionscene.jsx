// src/components/Game/Actionscene.jsx (or your path to ActionFlow.jsx)
import React from 'react'; // Removed useState, useEffect, animationTimeout if managed by parent

import { GUITry } from '../../assets/assetsPreLoad';

import { bath, sleep, work, eat, jalan,jalanBlokM, jalanSunFlower, jalanBeach, hunt } from '../../assets/assetsPreLoad';

import AnalogClock from '../UI/Clock';
import { GameState } from '../../hooks/gamestate';


// This component now primarily displays the animation when told to.
// The logic for *when* to play, for *how long*, and *what action* is determined by the parent (MainGame.jsx).
function ActionFlow({ isPlaying, currentActionType, onSkip }) {
    // This map should ideally have keys that exactly match the 'actionType' strings
    // emitted from MainGame.jsx (e.g., "eat", "bath", "walk", "hunt", "work", "sunflower")
    // Note: Your MainGame.jsx uses 'jalan' for walk, 'kerja' (or 'work') for work.
    // Ensure these keys match what confirmationModalData.actionType will be.
    const actionGifs = {
        eat: "https://tenor.com/view/reimu-touhou-watermelon-gif-20351061", // Key changed to 'eat'
        bath: bath, // Key changed to 'bath'
        jalan: jalan, // Key changed to 'jalan'
        hunt: hunt, // Key changed to 'hunt'
        work: work, // Key changed to 'work'
        sunflower: jalanSunFlower, // Key for 'sunflower'
        // Add other action types and their corresponding GIFs here
        sleep: sleep,
        jalan2blokm: jalanBlokM,
        jalanbeach: jalanBeach,
    };

    if (!isPlaying || !currentActionType) {
        return null; // Don't render if not playing or no action type
    }

    let gifs;

    if(currentActionType == "jalan"){
        switch(GameState.currentlocation.currentLoc){
            case "BlokM" : gifs = "jalan2blokm";break;
            case "FlowerField" : gifs = "sunflower"; break;
            case "Dieng" : gifs = "jalan"; break;
            case "Pantai" : gifs = "jalanbeach"; break;
            default: gifs = "jalan";
        }
    }else{
        gifs = currentActionType;
    }

    const currentGif = actionGifs[gifs.toLowerCase()]; // Make lookup case-insensitive if needed

    if (!currentGif) {
        console.warn("ActionFlow: No GIF found for action type:", currentActionType);
        // Optionally, return a default "action in progress" or placeholder
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/100 z-[0]"> {/* Ensure z-index is high enough */}
                <AnalogClock />
                <div className="relative bg-white rounded-xl p-6 shadow-xl text-center">
                    <p className="text-lg font-semibold mb-2">Performing: {currentActionType}...</p>
                    <p className="text-sm text-gray-600">Animation not available.</p>
                    <button
                        onClick={onSkip}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Done / Skip
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[60]"> {/* Ensure z-index is appropriately high */}
        
           <div
               className="relative flex flex-col rounded-xl shadow-xl p-6 w-full max-w-md tv-on item-center justify-center text-center"
               style={{
                 backgroundImage: `url(${GUITry})`,
                 backgroundRepeat: 'no-repeat',
                 backgroundSize: '100% 100%',
                 backgroundPosition: 'center',
                 imageRendering: 'pixelated',
               }}
             >
                <AnalogClock />
                {/* Dynamically set the GIF source */}
                <img src={currentGif} alt={`${currentActionType} in progress...`} className="w-full h-auto object-contain max-h-64 mb-4 rounded-md" />
                <p className="text-lg font-semibold mb-2">Performing: {currentActionType}...</p>
                <button
                    onClick={onSkip}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                >
                    Skip
                </button>
            </div>
        </div>
    );
}

export default ActionFlow;