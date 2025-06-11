import { useState, useEffect, memo } from "react";
import { NitoriShop } from "../../assets/assetsPreLoad";
import { EventBus } from "../../inGame/EventBus";
import Shop from "./Shop";

function ShopInteraction() {
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState("intro");

  useEffect(() => {
    const handleAction = () => {
      setShow(true);
      setStage("intro");
    };
    EventBus.on("showShop", handleAction);
    return () => EventBus.off("showShop", handleAction);
  }, []);

  const handleChoice = (choice) => setStage(choice);
  const closeInteraction = () => {
    setShow(false);
    setStage("intro");
  };

 const renderVNOverlay = () => (
    <>
      {/* Separate background with fixed position and opacity */}
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

      {/* Content above the background */}
      <div className="fixed inset-0 z-50 flex flex-col justify-end items-center px-4 pb-10 text-white pointer-events-auto">
        {/* Nitori image */}
        <div className="absolute bottom-0 sm:top-25 left-1/3 transform -translate-x-1/2 pointer-events-none z-10">
          <img
            src={NitoriShop}
            alt="Nitori Kawashiro"
            className="max-h-[600px] w-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Choices box */}
        <div className="mb-3 space-y-2 w-full max-w-2xl z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleChoice("shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition w-full"
            >
              🛒 Go to Shop
            </button>
            <button
              onClick={() => handleChoice("work")}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition w-full"
            >
              💼 Do a Job
            </button>
            {/* <button
              onClick={() => handleChoice("event")}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition w-full"
            >
              🎲 Start Event
            </button> */}
            <button
              onClick={closeInteraction}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition w-full"
            >
              ❌ Leave
            </button>
          </div>
        </div>

        {/* Dialogue box */}
        <div className="w-full max-w-2xl bg-white/90 text-gray-800 p-5 rounded-xl shadow-2xl relative z-20">
          <div className="absolute -top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Nitori Kawashiro
          </div>
          <p className="text-sm leading-relaxed mt-4">
            Welcome! I can sell you something, give you a job, or maybe... something unexpected! What would you like to do?
          </p>
        </div>
      </div>
    </>
  );
  return (
    <>
      {show && stage === "intro" && renderVNOverlay()}

      {show && stage === "shop" && <Shop onClose={closeInteraction} />}

      {show && stage === "work" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={closeInteraction}>
          <div className="bg-white p-6 rounded-xl shadow-lg z-10 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-3">💼 You chose to work!</h2>
            <p className="mb-4 text-sm text-gray-700">This is where job options or logic will go — like opening a work menu or triggering a job event.</p>
            <button onClick={() => setStage("intro")} className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition">
              🔙 Back
            </button>
          </div>
        </div>
      )}

      {show && stage === "event" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={closeInteraction}>
          <div className="bg-white p-6 rounded-xl shadow-lg z-10 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-3">🎲 You triggered a random event!</h2>
            <p className="mb-4 text-sm text-gray-700">This can start a mini-game, a random quest, or a unique cutscene.</p>
            <button onClick={() => setStage("intro")} className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition">
              🔙 Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ShopInteraction);
