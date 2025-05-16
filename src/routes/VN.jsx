import React from "react";
import DialogueBox from "../components/VN/VNDialogue";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from "react";
import "../styles/VN.css";

import backButton from "../assets/image/button/skipButton.png";
import skipButton from "../assets/image/button/pauseButton.png";

import { actData } from "../components/VN/dialogueData.js";
import { characterSprites, backgroundImages } from "../components/VN/imageMap.js";
import { dialogueIterator } from "../utils/iterateDialogue";

const Button = ({ text, onClick }) => (
  <button className="text-xs bg-gray-300 px-3 py-1 rounded-full shadow hover:bg-gray-400 m-1" onClick={onClick}>{text}</button>
);
const Modal = ({ text, button }) => (
  <div className="modal">{button}{text}</div>
);

function VN() {
  const navigate = useNavigate();
  const location = useLocation();
  const actName = location.state?.act || "act1";
  const { current, handleNext, autoPlay, setAutoPlay } = dialogueIterator(actName); //routes

  const [showModal, setShowModal] = useState(false);

  if (!current) return <div>Loading...</div>

  return (
    <div className="vnBackground" onClick={!autoPlay ? handleNext : undefined} style={{ backgroundImage: `url(${backgroundImages[current.background]})`, }}>
      {current.characters && current.characters.map ((char, i) => (
        <img key={i} src={characterSprites[char.sprite]} alt={char.name} className= {`character-sprite ${char.position === "right" ? "right-10" : "left-10"} ${char.name !== current.speaker ? "dimmed" : ""}`}/>
      ))}

      <div className= "ui-buttons">
        <div className="ui-button" style={{ position: "relative" }}>
        <img src={skipButton} className="button-image" alt="Skip" onClick={e => { e.stopPropagation(); setShowModal(!showModal) }} />
        {showModal && (
            <div className="modal absolute top-12 left-0 bg-white border rounded-lg shadow-lg p-4 z-50" onClick={e => e.stopPropagation()}>
              <div className="flex flex-row justify-between">
                <Button text="Act 1" onClick={() => { setShowModal(false); navigate('/vn', { state: { act: "act1" } }) }} />
                <Button text="Act 2" onClick={() => { setShowModal(false); navigate('/vn', { state: { act: "act2" } }) }} />
                <Button text="Act 3" onClick={() => { setShowModal(false); navigate('/vn', { state: { act: "act3" } }) }} />
                <Button text="Act 4" onClick={() => { setShowModal(false); navigate('/vn', { state: { act: "act4" } }) }} />
              </div>
            </div>
          )}
        </div>
        <div onClick={() => navigate("/")} className="ui-button">
          <img src= {backButton} alt="Back" className="button-image"/>
        </div>
      </div>

      <div className="dialogue-container">
        <DialogueBox
          speaker={current.speaker}
          text={current.text}
          onNext={handleNext}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
        />
      </div>
    </div>
  );
}

export default VN;