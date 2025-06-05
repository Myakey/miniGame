import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import titleScreen from "../assets/image/titleScreen/title.png";
import Button from "../components/UI/Buttons";
import Modal from "../components/UI/ModalBox";
import DebugBox from "../components/UI/DebugBox";
import { handleDebugInGame, clearSessionStorage } from "../utils/debugHandler";

const menuOptions = ["Play!", "Debug Mode"];

function MainMenu() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const scenes = ["MainGame", "BlokM", "FlowerField", "Pantai", "Dieng", "HakureiShrine", "Reset"];

  const [debugModal, setDebugModal] = useState(false);
  const toggleDebugModal = () => setDebugModal(!debugModal);

  const [isActive, setIsActive] = useState(true);

  const inputCooldown = useRef(0);
  const animationFrame = useRef(null);

  const handleSelect = (option) => {
    setIsActive(false);
    if (option === "Play!") {
      navigate("/charaSel");
    } else if (option === "Debug Mode") {
      toggleDebugModal();
    }
    navigator.vibrate?.(50);
  };

  const handleKeyDown = (e) => {
    if (!isActive) return;
    const now = performance.now();
    if (now < inputCooldown.current) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % menuOptions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
    } else if (e.key === "Enter") {
      handleSelect(menuOptions[selectedIndex]);
    }

    inputCooldown.current = now + 200;
  };

  useEffect(() => {
    let isMounted = true;

    const handleGamepadInput = () => {
      if (!isActive) return;
      const gp = navigator.getGamepads()[0];
      const now = performance.now();

      if (gp && now >= inputCooldown.current) {
        const axisY = gp.axes[1];
        const dpadUp = gp.buttons[12]?.pressed;
        const dpadDown = gp.buttons[13]?.pressed;
        const confirm = gp.buttons[0]?.pressed;

        if (axisY > 0.5 || dpadDown) {
          setSelectedIndex((prev) => (prev + 1) % menuOptions.length);
          inputCooldown.current = now + 250;
        } else if (axisY < -0.5 || dpadUp) {
          setSelectedIndex((prev) => (prev - 1 + menuOptions.length) % menuOptions.length);
          inputCooldown.current = now + 250;
        } else if (confirm) {
          handleSelect(menuOptions[selectedIndex]);
          inputCooldown.current = now + 500;
        }
      }

      if (isMounted) animationFrame.current = requestAnimationFrame(handleGamepadInput);
    };

    window.addEventListener("keydown", handleKeyDown);
    animationFrame.current = requestAnimationFrame(handleGamepadInput);

    return () => {
      isMounted = false;
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [selectedIndex]);

  function mapDebug(){
    return(
    scenes.map((text) => {
      return(
        <Button text={text} onClick={() => {
          if(text != "Reset"){
            handleDebugInGame(text);
            navigate("/inGame");
          }else{
            clearSessionStorage();
          }
          
        }}/>
      )
    })
    )
  }

  return (
    <div className="mainMenu h-screen w-screen flex justify-center items-center bg-black">
      <div className="flex flex-col items-center">
        <img src={titleScreen} className="h-40 mt-10" />

        <div className="flex flex-col gap-6 mt-20 w-64">
          {menuOptions.map((label, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={label}
                onClick={() => handleSelect(label)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-center py-3 text-2xl rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-black/60 backdrop-blur-md border border-white/20 text-white text-outline"
                    : "bg-transparent text-white/70 hover:text-white"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* {showModal && (
          <Modal
            text={
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex gap-2 justify-center">
                  <Button text="Char Select" onClick={() => navigate("/")} />
                  <Button text="InGame" onClick={() => navigate("/inGame")} />
                  <Button text="VN" onClick={() => navigate("/vn")} />
                  <Button text="charaSel" onClick={() => navigate("/charaSel")} />
                </div>
              </div>
            }
            button="Close Debug"
            onClose={() => setShowModal(false)}
          />
        )} */}

        <DebugBox modal={debugModal} toggleModal={toggleDebugModal} innerText={mapDebug()}/>
      </div>
    </div>
  );
}

export default MainMenu;
