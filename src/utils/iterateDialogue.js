import { useState, useEffect, useCallback } from "react";
import { dialogueData } from "../components/VN/dialogueData.js";

export function dialogueIterator(onEnd) {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const current = dialogueData[index];

  const handleNext = useCallback(() => {
    if (index < dialogueData.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setAutoPlay(false); 
      if (onEnd) onEnd(); 
    }
  }, [index, onEnd]);

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        handleNext();
      }, 2500); 
    }

    return () => clearInterval(interval);
  }, [autoPlay, handleNext]);

  return {
    current,
    handleNext,
    autoPlay,
    setAutoPlay,
  };
}
