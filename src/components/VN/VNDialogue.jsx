import React, { useEffect, useState } from "react";

export default function DialogueBox({ speaker,text, onNext, autoPlay }){
    const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
    const [autoInterval, setAutoInterval] = useState(null);

    useEffect (() => {
        if (isAutoPlaying) {
        const interval = setInterval(() => {
            onNext();
        }, 2500); // 2.5 seconds per dialogue
        setAutoInterval(interval);
        } else if (autoInterval) {
        clearInterval(autoInterval);
        }

        return () => {
        if (autoInterval) clearInterval(autoInterval);
        };
    }, [isAutoPlaying]);

    const handleAutoClick = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const handleDialogueClick = () => {
        if (!isAutoPlaying) {
            onNext();
        }
    };

    return(
        <>
            {/* <div className="dialogue-box">
                    <h2 className="text-blue-500 font-semibold text-2xl mb-2">{speaker}</h2>
                    <p className="text-t1 font-semibold">{text}</p>
            </div> */}
            <div className="dialogue-box fixed bottom-10 left-1/2 transform -translate-x-1/2 max-w-3xl w-[90%] px-6 py-4 rounded-[2rem] bg-white/90 shadow-lg backdrop-blur-md border border-gray-300 cursor-pointer"
                onClick={handleDialogueClick}>
                <div className="absolute -top-5 left-6 bg-gray-800 text-white px-4 py-1 rounded-md text-sm font-bold">
                    {speaker}
                </div>
                <p className="text-gray-900 font-medium text-lg">{text}</p>
                
                <div className="absolute top-2 right-6 flex gap-2">
                    <button onClick={(e) => {e.stopPropagation(); 
                        alert("LOG button is not implemented yet.");
                    }} className="text-xs bg-gray-300 px-3 py-1 rounded-full shadow hover:bg-gray-400">LOG
                    </button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        handleAutoClick();
                        }} className={`text-xs px-3 py-1 rounded-full shadow ${
                            isAutoPlaying ? "bg-green-400" : "bg-gray-300 hover:bg-gray-400"}`}>AUTO
                    </button>
                </div>
            </div>
        </>
    );
}