import { useState, useEffect, useCallback, useRef } from "react";
import { actData } from "../components/VN/dialogueData.js"; 
import { playSound, pauseSound, stopAllSounds } from "../utils/soundHandler";

export const usedialogueIterator = (actName = "act1", onComplete = () => {}, customData = null) => {
  const scenes = customData || actData[actName] || [];
  const [index, setIndex] = useState(0);//ngetrack current scene
  const [autoPlay, setAutoPlay] = useState(false);//buat autoplay
  const [displayedText, setDisplayedText] = useState("");//efek typing
  const [logHistory, setLogHistory] = useState([]);//buat log history
  const [isHalted, setIsHalted] = useState(false);//buat halt
  const  [isTyping, setIsTyping] = useState(false);//buat ngetrack kalo lagi typing
  const typingIntervalRef = useRef(null); // buat ngetrack interval typing
   const currentSoundRef = useRef(null); //Sound

  const current = scenes[index] || {};

  const handleSound = useCallback(() => {
    const soundKey = current.sound;

    if (soundKey === "none") {
      stopAllSounds(); 
      currentSoundRef.current = null;
    } else if (soundKey && soundKey !== currentSoundRef.current) {
      playSound(soundKey); // play new sound
      currentSoundRef.current = soundKey;
    } 
    // else: do nothing — keep current sound playing
  }, [current]);

  //riset semua dari 0 kalo ganti act
  useEffect(() => {
    setIndex(0);
    setAutoPlay(false);
    setLogHistory([]);
    setDisplayedText("");
    setIsHalted(false);
    currentSoundRef.current = null;
  }, [actName, customData]);

  //cek kalo scene ada halt
  useEffect(() => {
    // Cek kalo scene haltnya true
    if (current && current.halt) {
      setIsHalted(true);
      const haltDuration = typeof current.haltDuration === 'number' ? current.haltDuration : 3000;
      const timer = setTimeout(() => {
        setIsHalted(false);
      }, haltDuration);
      return () => clearTimeout(timer);
    } else {
      setIsHalted(false);
    }
  }, [current, index]); 

  useEffect(() => {
    handleSound(); // 👉 play/pause sound when current changes
  }, [handleSound]);

  // next dialogue
  const handleNext = useCallback(() => {
    // disable kalo ada halt
    if (isHalted) return;

    if (index < scenes.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last scene, turn off autoplay and call onComplete
      setAutoPlay(false);
      if (typeof onComplete === 'function') {
        onComplete(); 
      }
      
    }
  }, [index, scenes.length, isHalted, onComplete]);

  const skipTyping = useCallback(() => {
    if (isTyping && current && current.text) {
      clearInterval(typingIntervalRef.current);
      setDisplayedText(current.text); // Set the full text immediately
      setIsTyping(false); // Stop typing effect
      setLogHistory(prev => {
        const logLine = current.speaker ? `${current.speaker}: ${current.text}` : current.text;
        return prev.length === 0 || prev[prev.length - 1] !== logLine ? [...prev, logLine]: prev;
      });
    }
  }, [isTyping, current]); // Add isTyping and current as dependencies

  // efek typing
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(false);//tambahan
    if (!current || !current.text) {
        if (current && current.speaker) {
             setLogHistory(prev => {
                const logLine = `${current.speaker}: (No dialogue)`; 
                return prev.length === 0 || prev[prev.length - 1] !== logLine ? [...prev, logLine]: prev;
            });
        }
        return;
    }

    let charIndex = 0;
    const typingSpeed = current.typingSpeed || 30; 
    setIsTyping(true);
    typingIntervalRef.current = setInterval (() => {
      charIndex++;
      setDisplayedText(current.text.slice(0, charIndex));
      if (charIndex >= current.text.length) {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setLogHistory(prev => {
          const logLine = current.speaker ? `${current.speaker}: ${current.text}` : current.text;
          return prev.length === 0 || prev[prev.length - 1] !== logLine ? [...prev, logLine]: prev;
        });
      }
    }, typingSpeed);
    return () => {
      clearInterval(typingIntervalRef.current);
      setIsTyping(false);
    };
  }, [current, index]); 

  // efek delay di auto play
  useEffect(() => {
    let autoPlayTimer;
    // Check if autoplay is enabled, text is fully displayed, and not currently halted
    if (autoPlay && current && current.text && displayedText === current.text && !isHalted) {
      const autoPlayDelay = typeof current.autoPlayDelay === 'number' ? current.autoPlayDelay : 2000; 
      autoPlayTimer = setTimeout(() => {
        handleNext();
      }, autoPlayDelay);
    }
    return () => clearTimeout(autoPlayTimer);
  }, [autoPlay, displayedText, current, isHalted, handleNext]); 


  return {
    current,
    displayedText,
    handleNext,
    autoPlay,
    setAutoPlay,
    logHistory,
    isHalted,
    isTyping,
    skipTyping,
    currentIndex: index, 
    totalScenes: scenes.length
  };
};
