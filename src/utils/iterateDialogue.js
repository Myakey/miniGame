import { useState, useEffect } from "react";
import { actData } from "../components/VN/dialogueData.js";

export const dialogueIterator = (actName = "act1", onComplete = () => {}) => {
  const scenes = actData[actName] || [];
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setIndex(0);
    setAutoPlay(false);
  }, [actName]);

  const current = scenes[index] || {};

  const handleNext = () => {
    if (index < scenes.length - 1) {
      setIndex(index + 1);
    } else {
      setAutoPlay(false);
    }
  };

  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setTimeout(() => {
        handleNext();
      }, 2500);
    }
    return () => clearTimeout(interval);
  }, [autoPlay, index]);

  return {
    current,
    handleNext,
    autoPlay,
    setAutoPlay,
  };
};
