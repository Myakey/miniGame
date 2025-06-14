import { useState } from "react";
import React, { useEffect } from "react";
import { NitoriShop } from "../../assets/assetsPreLoad";
import { NitoriShopSound } from "../../assets/assetsPreLoad";
import Button from "../UI/Buttons";
import { EventBus } from "../../inGame/EventBus";
import { GameState } from "../../hooks/gamestate";

import ShopOne from "../../assets/image/InGame/shopOne.jpeg"

import { itemsList } from "../../inGame/mechanics/itemsList";

import { useGameContext } from "../../context/GameStatusContext";

export default function Shop( { onClose }) {
  const place = GameState.currentlocation.currentLoc;
  const { status, setStatus } = useGameContext();
  // const [show, setShow] = useState(false);
  const NitoriSound = new Audio(NitoriShopSound);
  const [displayedText, setDisplayedText] = useState("");
  // const shopLine = "Oh, you came by again today? Come over here -- I've got something to show you! Let me know what you think."

  // const ItemsShop = itemsListDebug.filter()

  // useEffect(() => {
  //   const handleAction = () => {
  //     setShow(true);
  //     //SFX nyalain nanti aja kalo udh production
  //     // NitoriSound.play();
  //   };

  //   EventBus.on("showShop", handleAction);
  //   return () => {
  //     EventBus.off("showShop", handleAction);
  //   };
  // }, []);


  const handleBuy = (item) => {
  setStatus(prev => {
    // 1) Guard: can the player afford it?
    if (prev.money < item.money) {
      alert("You don't have enough money!");
      return prev;                       // no change
    }
    
    // 2) Compute the new values once
    const newMoney     = prev.money - item.money;

    // 3) Sync the global GameState (optional—until you move to Zustand)
    GameState.money     = newMoney;
    EventBus.emit('show-alert', `You've bought ${item.name}`)

    // 4) Return the updated status for React
    return {
      ...prev,
      money: newMoney,
    };
  });

   GameState.inventory.push(item.id);
  };

  return (
    <>
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center animate-fade-in z-50"
          onClick={() => setShow(false)}>
          <div className="absolute top-4 left-4 z-30">
           <Button text="Back" onClick={onClose} />
          </div>
          {/* Inner content container */}
          <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${ShopOne})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                filter: "blur",
              }}
            />
          <div
            className="flex flex-col md:flex-row gap-4 w-[100vw] max-w-[100vw] h-[100vh] p-6 backdrop-blur-lg" 
            onClick={(e) => e.stopPropagation()}
          >
            

            {/* Left: Character + dialogue */}
            {/* Character + overlayed dialogue + name tag */}
            <div className="relative flex items-center justify-center w-full md:w-1/2">
              {/* Character image */}
              <img
                src={NitoriShop}
                className="w-full h-auto max-h-[100%] object-contain"
                alt="Nitori"
              />

              {/* Dialogue box overlay */}
              <div id="ShopBox" className="absolute bottom-1/4 z-10 px-4 pt-10 pb-4 bg-blue-100 rounded shadow-md text-center max-w-sm w-fit min-h-[80px] pop-zoom">
                {/* Name tag (anchored to the top of the dialogue box) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-blue-300 px-3 py-1 rounded-full text-sm shadow-md">
                  Nitori Kawashiro
                </div>

                {/* Dialogue text */}
                <div className="-translate-y-1/4">
                  <p>Oh, you came by again today? Come over here -- I've got something to show you! Let me know what you think. </p>
                </div>
              </div>
            </div>

            {/* Right: Shop box */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2">
              <div className="p-4 bg-gray-100 rounded w-full h-full text-center overflow-auto">
                <h2 className="text-xl font-bold mb-2">SHOP BOX!</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* responsive grid */}
                  {itemsList
                    .filter(item => item.places === place)
                    .map(item => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 bg-white shadow-md flex flex-col items-center justify-between w-full h-64"
                      >
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <img src={item.image} className="w-24 h-24 object-contain mb-4" />
                        <button
                          onClick={() => handleBuy(item)}
                          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          💵 {item.money}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}






