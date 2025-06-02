const theTimeIs = new Date();
export const GameState = {
    char: "Yukari",
    pos_x : 1273,
    pos_y : 239,
    happiness: 50,
    hunger: 50,
    hygiene: 50,
    energy: 50,
    inventory: [],
    money: 100000,
    currentlocation: {
        currentLoc: "MainGame",
        currentPosX: 0,
        currentPosY: 0,
    },
    time: {
        hour : theTimeIs.getHours() || 17,
        day: 0,
        minute: 0,
    },
    isVampire : false,
    previousAct: "prologue",
    currentAct: "",
    afterVN: false,
    difficulties: "normal",
    score: 0,
}