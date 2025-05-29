import { prologueData } from "./Prologue.js";
import { introData } from "./Intro.js";
import { act1Data } from "./Act1.js";
import { act2Data } from "./Act2.js";
import { act3Data } from "./Act3.js";
import { act3_1Data } from "./Act3_1.js";
import { act3_3Data } from "./Act3_3.js";
import { act4Data } from "./Act4.js";
import { act5Data } from "./Act5.js";

import { useNavigate } from "react-router-dom";

import { GameState } from "../../hooks/gamestate.js";


export function useVNSelector() {
  const navigate = useNavigate();

  const selector = (data) => {
    let act;
    switch(data){
      case "prologueData": act = prologueData; break;
      case "introData": act = introData; break;
      case "act1Data": act = act1Data; break;
      case "act2Data": act = act2Data; break;
      case "act3Data": act = act3Data; break;
      case "act3_1Data": act = act3_1Data; break;
      case "act3_2Data": act = act3_2Data; break;
      case "act3_3Data": act = act3_3Data; break;
      case "act4Data": act = act4Data; break;
      case "act5Data": act = act5Data; break;
      default: act = prologueData;
    }
    GameState.afterVN = true;
    navigate("/vn", { state: { act: data, data: act } });
  };

  return selector;
}