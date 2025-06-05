import { GameState } from "../hooks/gamestate";
import { EventBus } from "../inGame/EventBus";

export function handleDebugInGame(part){
    const currentPlace = part;
    sessionStorage.setItem("debugMode", "true");
    sessionStorage.setItem("currentPlace", currentPlace);
}

export function clearSessionStorage(){
    sessionStorage.clear();
}

export function SetTime(currentStatus, id){
    console.log("Enters the setTime!");
    let newHour;
 if(id == "day"){
    newHour = 12;
 }else{
    newHour = 19;
 }
 EventBus.emit("phaser-time-update", {hour : newHour});
 return {
        ...currentStatus,
        time: {
            minute: currentStatus.time.minute, // Keep the minute unchanged
            hour: newHour,
            day:currentStatus.time.day,
        }
    };
}