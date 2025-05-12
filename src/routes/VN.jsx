import React from "react";
import DialogueBox from "../components/VN/VNDialogue";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../styles/VN.css";

import { dialogueData } from "../components/VN/dialogueData.js";
import { characterSprites, backgroundImages } from "../components/VN/imageMap.js";
import { dialogueIterator } from "../utils/iterateDialogue";



const handleNext = () => {
  if (index < dialogueData.length - 1) {
    setIndex(index + 1);
  } else {
    setAutoPlay(false); 
    navigate("/"); 
  }
};

function VN() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0); 
  const { 
    current,
    handleNext,
    autoPlay,
    setAutoPlay,
  } = dialogueIterator (() => navigate("/"));

  return (
    <div className="vnBackground" onClick={handleNext} style={{ backgroundImage: `url(${backgroundImages[current.background]})`, }}>
      {current.position === "left" && (
        <img src={characterSprites[current.sprite]} alt={current.speaker} className="character-sprite left-10" />
      )}
      {current.position === "right" && (
        <img src={characterSprites[current.sprite]} alt={current.speaker} className="character-sprites right-10" />
      )}

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