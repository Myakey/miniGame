import { useState, useEffect } from "react";
import { NitoriShop } from "../../assets/assetsPreLoad";
import { NitoriShopSound } from "../../assets/assetsPreLoad";
import Button from "../UI/Buttons";
import { EventBus } from "../../inGame/EventBus";

import ShopOne from "../../assets/image/InGame/shopOne.jpeg";

import { itemsListDebug } from "../../inGame/mechanics/itemsListDebug";

import { GameState } from "../../hooks/gamestate";

export default function Inventory() {
  const [show, setShow] = useState(false);
  const currentItems = GameState.inventory;
  //Ntar lu map sesuai id aja di sini

  //TOGGLE INVENTORY G YAA
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Buat mapping tiap inventory yg dipunyain / udh dibeli TODO: Lu edit lagi divnya dh isinya dirapiin*/}
              {itemsListDebug.map((item, index) => (
                <div key={index} className="p-4 border rounded bg-gray-100">
                  <h3 className="font-semibold">{item.Name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
  );
}