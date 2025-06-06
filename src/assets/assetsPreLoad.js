import ReimuRight from "../assets/image/CharaSelect/ReimuRight.png";
import RemiliaRight from "../assets/image/CharaSelect/RemiliaRight.png";
import SakuyaRight from "../assets/image/CharaSelect/SakuyaRight.png";
import YukariRight from "../assets/image/CharaSelect/YukariRight.png";
import FlandreRight from "../assets/image/CharaSelect/FlandreRight.png";
import FlandreButton from "../assets/image/CharaSelect/FlandreButton.png";
import ReimuButton from "../assets/image/CharaSelect/ReimuButton.png";
import RemiliaButton from "../assets/image/CharaSelect/ScarletButton.png";
import SakuyaButton from "../assets/image/CharaSelect/SakuyaButton.png";
import YukariButton from "../assets/image/CharaSelect/YukariButton.png";

import NitoriShop from "../assets/image/InGame/ShopItems/nitori.png"

import CharaSelectSound from "../assets/sound/CharSel/CharaSelectChoose.mp3";
import FlandreSelect from "../assets/sound/CharSel/FlandreCharSel.mp3";
import ReimuSelect from "../assets/sound/CharSel/ReimuCharSel.mp3";
import RemiliaSelect from "../assets/sound/CharSel/RemiliaCharSel.mp3";
import SakuyaSelect from "../assets/sound/CharSel/SakuyaCharSel.mp3";
import YukariSelect from "../assets/sound/CharSel/YukariCharSel.mp3";
import Selected from "../assets/sound/CharSel/Selected.mp3";

import NitoriShopSound from "../assets/sound/inGame/nitoriShopLine.mp3";

import EsotericistPiano from "../assets/sound/VN/Esotericist.mp3"
import Alice from "../assets/sound/VN/Alice.mp3"
import EmptyTown from "../assets/sound/VN/EmptyTown.mp3"
import OtherWorldlyEmotions from "../assets/sound/VN/OtherWorldlyEmotions.mp3"
import SeptetteForTheDeadPrincess from "../assets/sound/VN/SeptetteJazz.mp3"
import DichromaticLotus from "../assets/sound/VN/DichromaticLotus.mp3"
import EsotericistNonPiano from "../assets/sound/VN/EsotericistNonPiano.mp3"

import mainAmbience from "../assets/sound/inGame/mainAmbience.mp3";

import { useEffect } from "react";

import bath from "../assets/gif/AnimasiAction/AnimasiAction/Bath.gif";
import eat from "../assets/gif/AnimasiAction/AnimasiAction/Eat.gif";
// import sleep from "../assets/gif/AnimasiAction/sleep.gif";
import work from "../assets/gif/AnimasiAction/AnimasiAction/Work.gif";
import sleep from "../assets/gif/AnimasiAction/AnimasiAction/Sleep.gif";

import jalan from "../assets/gif/AnimasiAction/AnimasiAction/JalanDieng.gif";

//Sprite Reimu
import reimuSmile from "../assets/image/Characters/spriteReimu/0.png";
import reimuNervous from "../assets/image/Characters/spriteReimu/1.png";
import reimuShock from "../assets/image/Characters/spriteReimu/2.png";
import reimuChill from "../assets/image/Characters/spriteReimu/3.png";
import reimuOrb from "../assets/image/Characters/spriteReimu/4.png";
import reimuOrbSad from "../assets/image/Characters/spriteReimu/5.png";
import reimuAngry from "../assets/image/Characters/spriteReimu/6.png";
import reimuHappy from "../assets/image/Characters/spriteReimu/7.png";
import reimuSad from "../assets/image/Characters/spriteReimu/8.png";
import reimuNeutral from "../assets/image/Characters/spriteReimu/9.png";
import reimuOrbNervous from "../assets/image/Characters/spriteReimu/10.png";

//Sprite Sakuya
import sakuyaSmile from "../assets/image/Characters/spriteSakuya/0.png";
import sakuyaAngry from "../assets/image/Characters/spriteSakuya/1.png";
import sakuyaBored from "../assets/image/Characters/spriteSakuya/2.png";
import sakuyaDis from "../assets/image/Characters/spriteSakuya/3.png";
import sakuyaShock from "../assets/image/Characters/spriteSakuya/4.png";
import sakuyaHappy from "../assets/image/Characters/spriteSakuya/5.png";

//Sprite Flandre
import flandre from "../assets/image/Characters/spriteFlandre/0.png";
import flandre1 from "../assets/image/Characters/spriteFlandre/1.png";
import flandre2 from "../assets/image/Characters/spriteFlandre/2.png";
import flandreHappy from "../assets/image/Characters/spriteFlandre/3.png";
import flandre4 from "../assets/image/Characters/spriteFlandre/4.png";
import flandre5 from "../assets/image/Characters/spriteFlandre/5.png";
import flandre6 from "../assets/image/Characters/spriteFlandre/6.png";
import flandre7 from "../assets/image/Characters/spriteFlandre/7.png";

//Sprite Nitori
import nitori from "../assets/image/Characters/spriteNitori/0.png";
import nitori1 from "../assets/image/Characters/spriteNitori/1.png";
import nitori2 from "../assets/image/Characters/spriteNitori/2.png";
import nitori3 from "../assets/image/Characters/spriteNitori/3.png";
import nitori4 from "../assets/image/Characters/spriteNitori/4.png";

//Sprite Remilia
import remilia from "../assets/image/Characters/spriteRemilia/0.png";
import remilia1 from "../assets/image/Characters/spriteRemilia/1.png";
import remilia2 from "../assets/image/Characters/spriteRemilia/2.png";
import remilia3 from "../assets/image/Characters/spriteRemilia/3.png";
import remilia4 from "../assets/image/Characters/spriteRemilia/4.png";
import remilia5 from "../assets/image/Characters/spriteRemilia/5.png";

//Sprite Yukari
import yukari from "../assets/image/Characters/spriteYukari/0.png";
import yukari1 from "../assets/image/Characters/spriteYukari/1.png";
import yukari2 from "../assets/image/Characters/spriteYukari/2.png";
import yukari3 from "../assets/image/Characters/spriteYukari/3.png";

//Sprite Yuuka
import yuuka from "../assets/image/Characters/spriteYuuka/0.png";
import yuuka1 from "../assets/image/Characters/spriteYuuka/1.png";
import yuuka2 from "../assets/image/Characters/spriteYuuka/2.png";
import yuuka3 from "../assets/image/Characters/spriteYuuka/3.png";
import yuuka4 from "../assets/image/Characters/spriteYuuka/4.png";
import yuuka5 from "../assets/image/Characters/spriteYuuka/5.png";

//Sprite Sumireko
import sumireko5 from "../assets/image/Characters/spriteSumireko/5.png";
import sumireko6 from "../assets/image/Characters/spriteSumireko/6.png";
import sumireko7 from "../assets/image/Characters/spriteSumireko/7.png";
import sumireko8 from "../assets/image/Characters/spriteSumireko/8.png";
import sumireko9 from "../assets/image/Characters/spriteSumireko/9.png";

//Sprite Kosuzu
import kosuzu from "../assets/image/Characters/spriteKosuzu/0.png";
import kosuzu1 from "../assets/image/Characters/spriteKosuzu/1.png";
import kosuzu2 from "../assets/image/Characters/spriteKosuzu/2.png";
import kosuzu3 from "../assets/image/Characters/spriteKosuzu/3.png";
import kosuzu4 from "../assets/image/Characters/spriteKosuzu/4.png";
import kosuzu5 from "../assets/image/Characters/spriteKosuzu/5.png";

//Sprite Sanae
import sanae from "../assets/image/Characters/spriteSanae/0.png";
import sanae1 from "../assets/image/Characters/spriteSanae/1.png";
import sanae2 from "../assets/image/Characters/spriteSanae/2.png";
import sanae3 from "../assets/image/Characters/spriteSanae/3.png";
import sanae4 from "../assets/image/Characters/spriteSanae/4.png";
import sanae5 from "../assets/image/Characters/spriteSanae/5.png";
import sanae6 from "../assets/image/Characters/spriteSanae/6.png";
import sanae7 from "../assets/image/Characters/spriteSanae/7.png";
import sanae8 from "../assets/image/Characters/spriteSanae/8.png";

//Sprite Marisa
import marisa from "../assets/image/Characters/spriteMarisa/0.png";
import marisa1 from "../assets/image/Characters/spriteMarisa/1.png";
import marisa2 from "../assets/image/Characters/spriteMarisa/2.png";
import marisa3 from "../assets/image/Characters/spriteMarisa/3.png";
import marisa4 from "../assets/image/Characters/spriteMarisa/4.png";
import marisa5 from "../assets/image/Characters/spriteMarisa/5.png";
import marisa6 from "../assets/image/Characters/spriteMarisa/6.png";
import marisa7 from "../assets/image/Characters/spriteMarisa/7.png";
import marisa8 from "../assets/image/Characters/spriteMarisa/8.png";

//Sprite Hong Meiling
import meiling from "../assets/image/Characters/spriteHongMeiLing/0.png";
import meiling1 from "../assets/image/Characters/spriteHongMeiLing/1.png";
import meiling2 from "../assets/image/Characters/spriteHongMeiLing/2.png";
import meiling3 from "../assets/image/Characters/spriteHongMeiLing/3.png";
import meiling4 from "../assets/image/Characters/spriteHongMeiLing/4.png";
import meiling5 from "../assets/image/Characters/spriteHongMeiLing/5.png";
import meiling6 from "../assets/image/Characters/spriteHongMeiLing/6.png";
import meiling7 from "../assets/image/Characters/spriteHongMeiLing/7.png";

//Sprite Hieda no Akyuu
import hieda from "../assets/image/Characters/spriteHieda/0.png";
import hieda1 from "../assets/image/Characters/spriteHieda/1.png";
import hieda2 from "../assets/image/Characters/spriteHieda/2.png";
import hieda3 from "../assets/image/Characters/spriteHieda/3.png";
import hieda4 from "../assets/image/Characters/spriteHieda/4.png";
import hieda5 from "../assets/image/Characters/spriteHieda/5.png";
import hieda6 from "../assets/image/Characters/spriteHieda/6.png";
import hieda7 from "../assets/image/Characters/spriteHieda/7.png";
import hieda8 from "../assets/image/Characters/spriteHieda/8.png";
import hieda9 from "../assets/image/Characters/spriteHieda/9.png";

//Background
import blokM from "../assets/image/vn/blokM.png";
import shrineBG from "../assets/image/vn/shrine.jpg";
import houseNoon from "../assets/image/vn/HouseNoon.png";
import tangerang from "../assets/image/vn/tangerang.png";
import tangNoon from "../assets/image/vn/tangerangNoon.png";
import shrineInterior from "../assets/image/vn/Hakurei_Shrine_Interior.png";
import Suzunaan from "../assets/image/vn/Suzunaan.png";
import beach from "../assets/image/vn/Beach.png";
import dieng from "../assets/image/vn/Diengs_Summit.png";
import flandreRoom from "../assets/image/vn/Flandre_Room.png";
import moriyaShrine from "../assets/image/vn/Moriya_Shrine.png";
import mansionInterior from "../assets/image/vn/Scarlet_Devil_Mansion_Interior.png";
import mansionOutside from "../assets/image/vn/Scarlet_Devil_Mansion_Outside.png";
import blokM1_TS from "../assets/image/vn/Blok_M_1_TS.png";
import blokM2_TS from "../assets/image/vn/Blok_M_2_TS.png";
import blokM3_TS from "../assets/image/vn/Blok_M_3_TS.png";
import Suzunaan_TS from "../assets/image/vn/Suzunaan_TS.png";
import classRoom from "../assets/image/CG/sumirekoClass.jpg";
import shrineNight from "../assets/image/vn/ShrineNight.png";

//Title Background
import actBackground from "../assets/image/vn/actBG.jpg";



export const assetsLoadImg = [
  ReimuRight,
  RemiliaRight,
  SakuyaRight,
  YukariRight,
  FlandreRight,
  FlandreButton,
  ReimuButton,
  RemiliaButton,
  SakuyaButton,
  YukariButton,
  NitoriShop,
  bath,
  eat,
  work,
  sleep,
  jalan,

  // Reimu
  reimuSmile, reimuNervous, reimuShock, reimuChill, reimuOrb, reimuOrbSad, reimuAngry, reimuHappy, reimuSad, reimuNeutral, reimuOrbNervous,

  // Sakuya
  sakuyaSmile, sakuyaAngry, sakuyaBored, sakuyaDis, sakuyaShock, sakuyaHappy,

  // Flandre
  flandre, flandre1, flandre2, flandreHappy, flandre4, flandre5, flandre6, flandre7,

  // Nitori
  nitori, nitori1, nitori2, nitori3, nitori4,

  // Remilia
  remilia, remilia1, remilia2, remilia3, remilia4, remilia5,

  // Yukari
  yukari, yukari1, yukari2, yukari3,

  // Yuuka
  yuuka, yuuka1, yuuka2, yuuka3, yuuka4, yuuka5,

  // Sumireko
  sumireko5, sumireko6, sumireko7, sumireko8, sumireko9,

  // Kosuzu
  kosuzu, kosuzu1, kosuzu2, kosuzu3, kosuzu4, kosuzu5,

  // Sanae
  sanae, sanae1, sanae2, sanae3, sanae4, sanae5, sanae6, sanae7, sanae8,

  // Marisa
  marisa, marisa1, marisa2, marisa3, marisa4, marisa5, marisa6, marisa7, marisa8,

  // Hong Meiling
  meiling, meiling1, meiling2, meiling3, meiling4, meiling5, meiling6, meiling7,

  // Hieda no Akyuu
  hieda, hieda1, hieda2, hieda3, hieda4, hieda5, hieda6, hieda7, hieda8, hieda9,

  // Backgrounds
  blokM, shrineBG, houseNoon, tangerang, tangNoon, shrineInterior, Suzunaan, beach, dieng,
  flandreRoom, moriyaShrine, mansionInterior, mansionOutside, blokM1_TS, blokM2_TS, blokM3_TS,
  Suzunaan_TS, classRoom, shrineNight, actBackground,
];


export const soundAssets = [CharaSelectSound, NitoriShopSound, EsotericistPiano, Alice, FlandreSelect, ReimuSelect, RemiliaSelect, SakuyaSelect, YukariSelect, Selected, EsotericistNonPiano, EmptyTown, OtherWorldlyEmotions, SeptetteForTheDeadPrincess, DichromaticLotus, mainAmbience];

export { NitoriShopSound, EsotericistPiano, Alice, FlandreSelect, ReimuSelect, RemiliaSelect, SakuyaSelect, YukariSelect, Selected, EsotericistNonPiano, EmptyTown, OtherWorldlyEmotions, SeptetteForTheDeadPrincess, DichromaticLotus, bath, eat,  work, sleep, jalan, mainAmbience };

export { RemiliaButton, SakuyaButton, YukariButton, FlandreButton, ReimuButton, ReimuRight, RemiliaRight, SakuyaRight, YukariRight, FlandreRight, NitoriShop };



export {
  reimuSmile, reimuNervous, reimuShock, reimuChill, reimuOrb, reimuOrbSad,
  reimuAngry, reimuHappy, reimuSad, reimuNeutral, reimuOrbNervous
};

// Sakuya
export {
  sakuyaSmile, sakuyaAngry, sakuyaBored, sakuyaDis, sakuyaShock, sakuyaHappy
};

// Flandre
export {
  flandre, flandre1, flandre2, flandreHappy, flandre4, flandre5, flandre6, flandre7
};

// Nitori
export { nitori, nitori1, nitori2, nitori3, nitori4 };

// Remilia
export { remilia, remilia1, remilia2, remilia3, remilia4, remilia5 };

// Yukari
export { yukari, yukari1, yukari2, yukari3 };

// Yuuka
export { yuuka, yuuka1, yuuka2, yuuka3, yuuka4, yuuka5 };

// Sumireko
export { sumireko5, sumireko6, sumireko7, sumireko8, sumireko9 };

// Kosuzu
export { kosuzu, kosuzu1, kosuzu2, kosuzu3, kosuzu4, kosuzu5 };

// Sanae
export {
  sanae, sanae1, sanae2, sanae3, sanae4,
  sanae5, sanae6, sanae7, sanae8
};

// Marisa
export {
  marisa, marisa1, marisa2, marisa3,
  marisa4, marisa5, marisa6, marisa7, marisa8
};

// Hong Meiling
export {
  meiling, meiling1, meiling2, meiling3,
  meiling4, meiling5, meiling6, meiling7
};

// Hieda no Akyuu
export {
  hieda, hieda1, hieda2, hieda3, hieda4,
  hieda5, hieda6, hieda7, hieda8, hieda9
};

// Backgrounds
export {
  blokM, shrineBG, houseNoon, tangerang, tangNoon,
  shrineInterior, Suzunaan, beach, dieng,
  flandreRoom, moriyaShrine, mansionInterior, mansionOutside,
  blokM1_TS, blokM2_TS, blokM3_TS, Suzunaan_TS, classRoom,
  shrineNight, actBackground
};