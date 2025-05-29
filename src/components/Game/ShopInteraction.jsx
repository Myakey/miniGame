import { useState, useEffect } from "react";
import { NitoriShop } from "../../assets/assetsPreLoad";
import Button from "../UI/Buttons";
import { EventBus } from "../../inGame/EventBus";
import Shop from "./Shop";
import { introductionList } from "../../inGame/mechanics/introductionList";

export default function ShopInteraction() {
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

  const DialogueBox = ({ children }) => (
    <div className="relative bg-white/90 p-6 rounded-xl shadow-2xl w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={NitoriShop} alt="Nitori Kawashiro" className="rounded-xl max-w-xs w-full shadow-lg" />
      </div>

      <div className="md:w-1/2 flex flex-col justify-between gap-6">
        <div className="relative bg-blue-50 p-5 rounded-lg border border-blue-200 shadow">
          <div className="absolute -top-4 left-4 bg-blue-300 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Nitori Kawashiro
          </div>
          <p className="text-sm leading-relaxed text-gray-700">
            
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => handleChoice("shop")} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
            🛍️ Go to Shop
          </button>
          <button onClick={() => handleChoice("work")} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
            💼 Do a Job
          </button>
          <button onClick={() => handleChoice("event")} className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition">
            🎲 Start Event
          </button>
          <button onClick={closeInteraction} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg transition">
            ❌ Leave
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {show && stage === "intro" && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={closeInteraction}>
          <div onClick={(e) => e.stopPropagation()}>
            <DialogueBox />
          </div>
        </div>
      )}

      {show && stage === "shop" && <Shop onClose={closeInteraction} />}

      {show && stage === "work" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeInteraction}>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeInteraction}>
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
