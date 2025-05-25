import React from "react";
import DialogueBox from "../components/VN/VNDialogue";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import "../styles/VN.css";

import backButton from "../assets/image/button/skipButton.png";
import skipButton from "../assets/image/button/pauseButton.png";

import { actData } from "../components/VN/dialogueData.js";
import { characterSprites, backgroundImages, titleBackground } from "../components/VN/imageMap.js";
import { usedialogueIterator } from "../utils/iterateDialogue";

const Button = ({ text, onClick }) => (
  <button className="text-xs bg-gray-300 px-3 py-1 rounded-full shadow hover:bg-gray-400 m-1" onClick={onClick}>{text}</button>
);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <=768);
  useEffect (() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

const FADE_DURATION = 500;

function VN() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const actName = location.state?.act || "act1";
  const { current, displayedText, handleNext, autoPlay, setAutoPlay, logHistory, isHalted } = usedialogueIterator(actName); //routes

  const [showModal, setShowModal] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const [titleScreenOpacity, setTitleScreenOpacity] = useState(0);
  const [isTitleActive, setIsTitleActive] = useState(false);
  const prevActNameRef = useRef(actName);

  useEffect(() => {
    if (current && current.isTitleScreen) {
      setIsTitleActive(true); 
      if (prevActNameRef.current !== actName) {
        setTitleScreenOpacity(0);
        prevActNameRef.current = actName; 
        requestAnimationFrame(() => { 
          setTitleScreenOpacity(1);
        });
      } else {
        setTitleScreenOpacity(1);
      }
    } else {
      setTitleScreenOpacity(0);
      setIsTitleActive(false);
    }
  }, [current?.isTitleScreen, actName, current?.title]);

  const handleTitleClickAndFade = () => {
    if (!isTitleActive || titleScreenOpacity === 0) return; 

    setTitleScreenOpacity(0);
    setTimeout(() => {
      handleNext();
    }, FADE_DURATION);
  };

  if (!current){
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white text-xl">
        Loading Scene...
      </div>
    );
  }

  //title screen
  if(current.isTitleScreen || (isTitleActive && titleScreenOpacity > 0)){
    return(
      <div className={`h-screen bg-cover bg-center relative flex flex-col items-center justify-center ${isMobile ? "is-mobile" : ""}`}
        onClick={!autoPlay && !isHalted && isTitleActive ? handleTitleClickAndFade : undefined}
        style={{
          backgroundImage: `url(${titleBackground[current.background]})`, 
          cursor: !autoPlay && !isHalted && isTitleActive ? 'pointer' : 'default',
          opacity: titleScreenOpacity,
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
        }}
      >
        <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-white/80 backdrop-blur-sm p-4 md:p-6 shadow-xl rounded">
          <h1 className="text-3xl md:text-5xl font-mono text-center text-yellow-700" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.1)'}}>
            {/* {current.title ? current.title.toUpperCase().replace(/^ACT (\w+):/, (match, p1) => `ACT ${p1} :`) : "ACT TITLE"} */}
            {current.title || "Act Title"}
          </h1>
        </div>
        
        <div className="ui-buttons absolute top-5 right-5 flex flex-row space-x-3 z-30">
          <div className="ui-button relative">
            <img
              src={backButton}
              className="button-image w-10 h-10 md:w-12 md:h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity filter invert" // Added filter invert for visibility on black
              alt="Menu"
              onClick={e => { e.stopPropagation(); }}
            />
          </div>
          <div className="ui-button relative">
            <img
              src={skipButton}
              className="button-image w-10 h-10 md:w-12 md:h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity filter invert" // Added filter invert for visibility on black
              alt="Menu"
              onClick={e => { e.stopPropagation(); setShowModal(prev => !prev); }}
            />
            {showModal && (
              <div className="modal absolute top-full right-1/2 translate-x-1/2 mt-2 bg-white border border-gray-300 rounded-xl shadow-xl p-4 z-50 w-fit" onClick={e => e.stopPropagation()}>
                <p className="text-sm font-semibold mb-3 text-gray-700 text-center">Select Act</p>
                <div className="flex flex-row justify-center items-center space-x-4">
                  {["act1", "act2", "act3", "act4"].map(actKey => (
                     <Button
                        key={actKey}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-3 rounded-full w-16 h-16 flex items-center justify-center transition-all"
                        text={`Act ${actKey.replace('act', '')}`}
                        onClick={() => { setShowModal(false); navigate('/vn', { state: { act: actKey } }); }}
                      />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`vnBackground ${isMobile ? "is-mobile" : ""}`} onClick={!autoPlay && !isHalted ? handleNext : undefined} style={{ backgroundImage: `url(${backgroundImages[current.background]})`, }}>

      {current.characters && current.characters
        .filter(char => !isMobile || char.name === current.speaker)
        .map((char, i) => (
          <div key={i} className={`character-wrapper absolute bottom-0 z-10 ${char.position === "right" ? "right-10" : "left-10"}`}>
            <img
              src={characterSprites[char.sprite]}
              alt={char.name}
              className={`character-sprite ${char.name !== current.speaker ? "dimmed" : ""}`}
              style={{
                transform: char.scale ? `scale(${char.scale})` : "scale(1)",
              }}
            />
          </div>
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
          text={displayedText}
          onNext={handleNext}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          onShowLog={() => setShowLog(true)}
          isHalted={isHalted}
        />
      </div>

      {showLog && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
          onClick={() => setShowLog(false)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="w-full h-full max-w-5xl p-6 relative flex flex-col items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-white tracking-wide">BACKLOG</h2>

            <div className="w-full max-w-4xl h-[70vh] relative">
              <div className="overflow-y-scroll pr-4 custom-scroll rounded-md h-full space-y-5 text-white font-medium">
                {logHistory && logHistory.length > 0 ? (
                  logHistory.map((line, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 p-4 rounded-lg shadow text-sm text-left whitespace-pre-line border border-white/20"
                    >
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-white/70 text-lg">No dialogue yet.</div>
                )}
              </div>
            </div>

            <button
              className="mt-10 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full shadow"
              onClick={() => setShowLog(false)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VN;