import { EsotericistPiano, Alice, EsotericistNonPiano, EmptyTown, OtherWorldlyEmotions, SeptetteForTheDeadPrincess, DichromaticLotus, mainAmbience } from "../assets/assetsPreLoad";


const sounds = {
  background1: new Audio(EsotericistPiano),
  Alice: new Audio(Alice),
  EsotericistNonPiano: new Audio(EsotericistNonPiano),
  EmptyTown: new Audio(EmptyTown),
  OtherWorldlyEmotions: new Audio(OtherWorldlyEmotions),
  SeptetteForTheDeadPrincess: new Audio(SeptetteForTheDeadPrincess),
  DichromaticLotus: new Audio(DichromaticLotus),
  mainAmbience: new Audio(mainAmbience),
};

const fadeIntervals = {};

const FADE_INTERVAL_MS = 50;
const FADE_STEP = 0.05;

const fadeIn = (key, audio) => {
  clearInterval(fadeIntervals[key]);
  audio.volume = 0;
  audio.play();
  fadeIntervals[key] = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(audio.volume + FADE_STEP, 1);
    } else {
      clearInterval(fadeIntervals[key]);
    }
  }, FADE_INTERVAL_MS);
};

const fadeOut = (key, audio) => {
  clearInterval(fadeIntervals[key]);
  fadeIntervals[key] = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - FADE_STEP, 0);
    } else {
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fadeIntervals[key]);
    }
  }, FADE_INTERVAL_MS);
};

export const playSound = (key) => {
  Object.entries(sounds).forEach(([otherKey, sound]) => {
    if (otherKey !== key) {
      fadeOut(otherKey, sound);
    }
  });

  const sound = sounds[key];
  if (sound) {
    sound.loop = true;
    fadeIn(key, sound);
  }
};

export const stopAllSounds = () => {
  Object.entries(sounds).forEach(([key, sound]) => {
    fadeOut(key, sound);
  });
};

export const pauseSound = (key) => {
  const sound = sounds[key];
  if (sound) {
    fadeOut(key, sound);
  }
};
