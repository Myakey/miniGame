import { useState } from "react";
import React, { useEffect } from "react";
import { NitoriShop } from "../../assets/assetsPreLoad";
import { NitoriShopSound } from "../../assets/assetsPreLoad";
import Button from "../UI/Buttons";
import { EventBus } from "../../inGame/EventBus";
import { GameState } from "../../hooks/gamestate";

import ShopOne from "../../assets/image/InGame/shopOne.jpeg"

import { itemsList } from "../../inGame/mechanics/itemsList";

export default function Shop() {
  const place = GameState.currentlocation;
  const [show, setShow] = useState(false);
  const NitoriSound = new Audio(NitoriShopSound);
  const [displayedText, setDisplayedText] = useState("");
  // const shopLine = "Oh, you came by again today? Come over here -- I've got something to show you! Let me know what you think."

  // const ItemsShop = itemsListDebug.filter()

  useEffect(() => {
    const handleAction = () => {
      setShow(true);
      //SFX nyalain nanti aja kalo udh production
      // NitoriSound.play();
    };

    EventBus.on("showShop", handleAction);
    return () => {
      EventBus.off("showShop", handleAction);
    };
  }, []);


  const handleBuy = (item) => {
  if (GameState.money < item.money) {
    alert("You don't have enough money!");
    return;
  }
  // Deduct money
  GameState.money -= item.money;
  GameState.inventory.push(item.id);
  alert(`You bought ${item.name}!`);
  };


  // useEffect(() => {
    

  //   if(!show){
  //     setDisplayedText("");
  //     return;
  //   }

  //   setDisplayedText("");

  //   if(!shopLine)return;

  //   let charIndex = 0;
  //   let typingInterval = setInterval(() => {
  //     charIndex++;
  //     setDisplayedText(shopLine.slice(0, charIndex));
  //     if(charIndex >= shopLine.length){
  //       clearInterval(typingInterval);
  //     }


      
  //   }, 50);


  //   return () => clearInterval(typingInterval)
  // }, [show])

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center animate-fade-in z-50"
          onClick={() => setShow(false)}>
          <div className="absolute top-4 left-4 z-30">
            <Button text="Back" onClick={() => {setShow(false);}} />
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
                <div className="grid grid-cols-3 gap-4"> {/* grid container */}
                      {itemsList
                      .filter(item => item.places === place)
                      .map(item => (
                        <div key={item.id} className="border rounded p-3 bg-white shadow-sm">
                          <h3 className="font-semibold">{item.name}</h3>
                          <img src={item.image} />
                          <button
                            onClick={() => handleBuy(item)}
                            className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                          >BUY</button>
                          {/* You can add a buy button or image here */}
                        </div>
                      ))}

                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}






