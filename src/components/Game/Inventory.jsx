import { useState, useEffect } from "react";
import { NitoriShop } from "../../assets/assetsPreLoad";
import { NitoriShopSound } from "../../assets/assetsPreLoad";
import Button from "../UI/Buttons";
import { EventBus } from "../../inGame/EventBus";

import ShopOne from "../../assets/image/InGame/shopOne.jpeg";

import { itemsList } from "../../inGame/mechanics/itemsList";
import { GameState } from "../../hooks/gamestate";

import Phaser from 'phaser';

export default function Inventory() {
  const [show, setShow] = useState(false);

  const currentItems = GameState.inventory;
  console.log("MAKE");
  // Toggle inventory with "G"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "g" || e.key === "G") {
        setShow((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ease-out 
        ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
    >
      <div className="bg-yellow-100 p-6 rounded-lg shadow-lg transition-transform duration-500 ease-out transform origin-top">
        <h2 className="text-2xl font-bold mb-4">Inventory</h2>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          {currentItems.map((itemId, index) => {
            const item = itemsList.find(i => i.id === itemId);
            if (!item) return null;
            return (             
              <div className="p-4 border rounded bg-gray-100 text-center">
                {/* Item */}
                <h3 className="font-semibold">{item.name}</h3>
                  <img src={item.image} className="mt-2 max-h-24 object-contain mx-auto"/>
                {/* Button */}
                  <button className="mt-2 px-2 py-1  bg-green-500 text-white text-sm rounded hover:bg-green-600 justify-center"
                    onClick={() => {
                      EventBus.emit("performAction", { type: "eat", itemId: item.id });
                      const find = GameState.inventory.indexOf(itemId);
                      GameState.inventory.splice(find, 1);
                      setShow(false);
                      setTimeout(() => setShow(true), 0);
                    }}
                  >
                    Use
                  </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
