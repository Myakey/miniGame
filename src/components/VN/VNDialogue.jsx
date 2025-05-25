import React from "react";

export default function DialogueBox({ speaker, text, onNext, autoPlay, setAutoPlay, onShowLog, isHalted}) {

    const handleDialogueClick = () => {
        if (!autoPlay && !isHalted) {
            onNext();
        }
    };

    return (
        <div className="dialogue-box fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl
            px-8 pt-12 pb-4 rounded-[2rem] bg-white/90 shadow-lg backdrop-blur-md border border-gray-300 
            cursor-pointer max-h-[60vh] overflow-visible"
            onClick={handleDialogueClick}
        >
            <div className="absolute -top-5 left-8 z-30 bg-gray-800 text-white px-10 py-2 rounded-3xl text-base 
                font-bold shadow pointer-events-none select-none">
                {speaker}
            </div>

            <p className="text-gray-900 font-medium text-lg mt-0 mb-0 leading-snug whitespace-pre-line">{text}</p>

            <div className="absolute top-3 right-6 flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onShowLog) onShowLog();
                    }}
                    className="text-xs bg-gray-300 px-3 py-1 rounded-full shadow hover:bg-gray-400"
                >
                    LOG
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setAutoPlay(!autoPlay);
                    }}
                    className={`text-xs px-3 py-1 rounded-full shadow ${
                        autoPlay ? "bg-green-400" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                >
                    AUTO
                </button>
            </div>
            {isHalted && (
                <div className="absolute inset-0 bg-transparent cursor-wait z-50 pointer-events-none" />
            )}
        </div>
    );
}