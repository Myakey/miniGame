export const GameState = {
  char: "Yukari",
  pos_x: 1273,
  pos_y: 239,
  happiness: 50,
  hunger: 50,
  hygiene: 50,
  energy: 50,
  inventory: [],
  money: 100,
  currentlocation: {
    currentLoc: "MainGame",
    currentPosX: 0,
    currentPosY: 0,
  },
  time: (() => {
    const now = new Date();
    return {
      hour: now.getHours(),
      minute: now.getMinutes(),
      day: 0,
    };
  })(),
  isVampire: false,
  previousAct: "Act2",
  currentAct: "Act3",
  afterVN: false,
  difficulties: "normal",
  score: 0,
};

// ✅ Use this to start/reset a new game:
export function createInitialGameState() {
  const now = new Date();
  return {
    char: "Yukari",
    pos_x: 1273,
    pos_y: 239,
    happiness: 50,
    hunger: 50,
    hygiene: 50,
    energy: 50,
    inventory: [],
    money: 100,
    currentlocation: {
      currentLoc: "MainGame",
      currentPosX: 0,
      currentPosY: 0,
    },
    time: {
      hour: now.getHours(),
      minute: now.getMinutes(),
      day: 0,
    },
    isVampire: false,
    previousAct: "Act2",
    currentAct: "Act3",
    afterVN: false,
    difficulties: "normal",
    score: 0,
  };
}
