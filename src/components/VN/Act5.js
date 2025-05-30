import {characterSprites, backgroundImages } from "./imageMap";

export const act5Data = [
    {
        isTitleScreen: true,
        title: "ACT V - Rift to Closure: A Farewell Between Worlds",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        text: "(After a long walk, the group has finally arrived at the place Reimu mentioned. Unsurprisingly, it’s the Hakurei Shrine.)",
        background: "shrine",
        characters: [

        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "So this is the acclaimed Hakurei Shrine…",
        background: "shrine",
        characters: [
        { name: "Sumireko", sprite: "sumireko9", position: "right" },
        { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Yep. There’s no safer place in all of Gensokyo besides this. You’re lucky I’m letting you do this here.",
        background: "shrine",
        characters: [
        { name: "Sumireko", sprite: "sumireko4", position: "right" },
        { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
   },
    {
        text: "(While the others begin scouting the area and preparing themselves for anything unusual, Sumireko kneels and gently places her glowing orbs in a careful formation on the ground. Her hands are steady, but her face is tense with focus.)",
        background: "shrine",
        characters: [
        ],
        halt: false
    },
    {
        text: "(And few minutes later...)",
        background: "shrine",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "Alright, everyone—put some distance between yourselves and the orbs. Don’t get too close. We don’t want another accident like last time.",
        background: "shrine",
        characters: [
        { name: "Sumireko", sprite: "sumireko1", position: "right" },
        ],
    },
    {
        speaker: "Marisa",
        text: "Just focus on your little ritual. I’ll keep an eye out for any weird stuff happening around here.",
        background: "shrine",
        characters: [
        { name: "Sumireko", sprite: "sumireko1", position: "right" },
        { name: "Marisa", sprite: "marisa8", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Same here. You just do your part properly!",
        background: "shrine",
        characters: [
        { name: "Sumireko", sprite: "sumireko1", position: "right" },
        { name: "Reimu", sprite: "reimu6", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "Okay… here I go!",
        background: "shrine",
        characters: [
        { name: "Sumireko", sprite: "sumireko1", position: "right" },
        { name: "Reimu", sprite: "reimu6", position: "left" }
        ],
        halt: true
    },
    {
        text: "(The moment she starts chanting, the orbs begin to levitate, glowing with a pulsing energy. The sky darkens unnaturally fast. A powerful aura—alien to Gensokyo—spreads over the shrine like a blanket. Then, far in the distance, enormous pillars of light burst into the sky from locations like Mount Dieng, Blok M, and other misplaced places.)",
        background: "shrineNight",
        characters: [

        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: " Guys—look! There’s strange light coming from everywhere!",
        background: "shrineNight",
        characters: [
        { name: "Marisa", sprite: "marisa1", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Could this be…",
        background: "shrineNight",
        characters: [
        { name: "Sakuya", sprite: "sakuya4", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Oh, look! Blok M disappeared… and the Human Village is back where it should be!",
        background: "shrineNight",
        characters: [
        { name: "Flandre", sprite: "flandre5", position: "right" }
        ],
        halt: false
    },  
    {
        speaker: "Remilia",
        text: "What an astonishing phenomenon… How does one even have the power to cause this?",
        background: "shrineNight",
        characters: [
        { name: "Flandre", sprite: "flandre5", position: "right" },
        { name: "Remilia", sprite: "remilia1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "Nngh…",
        background: "shrineNight",
        characters: [
        { name: "Sumireko", sprite: "sumireko1", position: "right" },
        ],
        halt: false
    },
    {
        text: "(A surge of bright light explodes around them and the chanting halts. The aura immediately begins to fade.)",
        background: "shrineNight",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Reimu",
        text: "Hey—are you okay?!",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu6", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "Phew… That really takes a toll. It almost went out of control again, but I managed to keep it together.",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu2", position: "left" },
        { name: "Sumireko", sprite: "sumireko3", position: "right" },

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "So... is it fixed? Is everything back to normal?",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu2", position: "left" },
        { name: "Sumireko", sprite: "sumireko3", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "I… I think so?",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu2", position: "left" },
        { name: "Sumireko", sprite: "sumireko2", position: "right" },
        ],
        halt: false
    },
    {
        text: "(Sumireko stands in the middle of the shrine grounds, surrounded by Reimu, Sakuya, Remilia, Flandre, Yukari, and Marisa. The air is calm now, though tension still lingers. A faint dimensional rift begins to flicker open nearby.)",
        background: "shrine",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "I guess this is it... Time to go home.",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu", position: "left" },
        { name: "Sumireko", sprite: "sumireko2", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Good. Make sure you stay there this time.",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu8", position: "left" },
        { name: "Sumireko", sprite: "sumireko2", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "Heh, I’ll try to be more careful. No promises though.",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu8", position: "left" },
        { name: "Sumireko", sprite: "sumireko3", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Just… don’t come back.",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu1", position: "left" },
        { name: "Sumireko", sprite: "sumireko3", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "We’ll see~!",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu1", position: "left" },
        { name: "Sumireko", sprite: "sumireko3", position: "right" },
        ],
        halt: false
    },
    {
        text: "(After Sumireko steps into the rift, the portal closes with a soft shimmer. Silence follows. The group watches the spot where she disappeared, unsure whether to feel relieved or concerned.)",
        background: "shrine",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Well, now that the commotion is over, I believe it’s time we returned home.",
        background: "shrine",
        characters: [
        { name: "Remilia", sprite: "remilia4", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Bye-bye, Reimu! Let’s do this again sometimes!",
        background: "shrine",
        characters: [
        { name: "Remilia", sprite: "remilia4", position: "right" },
        { name: "Flandre", sprite: "flandre7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Thank you for your cooperation, everyone. We'll be off now.",
        background: "shrine",
        characters: [
        { name: "Remilia", sprite: "remilia4", position: "right" },
        { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        text: "(The Scarlet Devil Mansion trio vanish into the sky, one by one. Marisa stretches and yawns.)",
        background: "shrine",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "Welp, that was something. Guess I’ll head back too. See ya, Reimu.",
        background: "shrine",
        characters: [
        { name: "Marisa", sprite: "marisa2", position: "right" },
        { name: "Reimu", sprite: "reimu9", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Yeah... later.",
        background: "shrine",
        characters: [
        { name: "Marisa", sprite: "marisa2", position: "right" },
        { name: "Reimu", sprite: "reimu9", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Marisa leaves. Only Yukari and Reimu remain.)",
        background: "shrine",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "You handled that surprisingly well, Reimu. I'm almost proud of you.",
        background: "shrine",
        characters: [
        { name: "Yukari", sprite: "yukari3", position: "right" },
        { name: "Reimu", sprite: "reimu9", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Don’t start.",
        background: "shrine",
        characters: [
        { name: "Yukari", sprite: "yukari", position: "right" },
        { name: "Reimu", sprite: "reimu8", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Just accept the praise for once, will you?",
        background: "shrine",
        characters: [
        { name: "Yukari", sprite: "yukari", position: "right" },
        { name: "Reimu", sprite: "reimu8", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Reimu sighs, saying nothing. When she glances to the side again, Yukari is already gone.)",
        background: "shrine",
        characters: [
            { name: "Reimu", sprite: "reimu3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Can I just get one week of peace around here?",
        background: "shrine",
        characters: [
        { name: "Reimu", sprite: "reimu3", position: "left" }
        ],
        halt: false
    },
    {
        text: "(She walks slowly back into the shrine. The sky is calm, the shrine quiet. For now, Gensokyo is at peace once more.)",
        background: "shrine",
        characters: [
        ],
        halt: true
    },
];