import {characterSprites, backgroundImages } from "./imageMap";

export const actData = {

act1: [
    {
        isTitleScreen: true,
        title: "ACT I: Coba Act 1",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        speaker: "Meiling",
        text: "hi! nice to meet you",
        background: "shrine",
        characters: [
            { name: "Meiling", sprite: "meiling", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false

    },
    {
        speaker: "Sakuya",
        text: "hi, nice to meet you too",
        background: "shrine",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "let's go to my house",
        background: "shrine",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "alright then",
        background: "shrine",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: true
    },
    {
        speaker: "Reimu",
        text: "welcome to my house",
        background: "house",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ], 
        halt: true
    },
    {
        speaker: "Sakuya",
        text: "it's a good house",
        background: "house",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
],

act2: [
    {
        isTitleScreen: true,
        title: "ACT II: Coba Act 2",
        background: "titleBG",
        halt: true,
        haltDuration: 3000,
    },
    {
        speaker: "Flandre",
        text: "Nitori~! giggles It’s been forever! Did you miss me?",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: " F-Flandre?! W-when did you get here?! Uh, y-yeah, it has been a while… You’re looking… energetic, as usual",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Ehehe~! I’ve been so bored lately! Nothing fun to break—I mean, play with! How about you? Still glued to your weird machines?",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "sigh Yes, yes… My weird machines keep me busy. Just finished a new engine design. adjusts goggles nervously",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Ooooh, does it go BOOM?",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "W-what?! No! It’s not supposed to explode!",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Pfft, boring~! twirls around Soooo, what else is new? Seen any fun people lately?",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "Well, Marisa stopped by last week to borrow tools again… mutters Not like she ever returns them…",
        background: "blokM",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: true
    },
    {
        speaker: "Flandre",
        text: "gasps Marisa’s the best! She always makes things exciting! Unlike some people~ grins mischievously",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "sweating L-look, if you’re here to cause trouble, I’ve got work to—",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Aw, don’t be like that! pouts I just wanna hang out! Hey, hey, let’s go find Cirno! I bet she’d love to test your new engine!",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "ABSOLUTELY NOT! I’m not letting you blow",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "dramatic sigh Fine, fine~! Oh! What if we visit Sakuya? I heard she baked extra sweets today!",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "perks up …Do you promise no property damage?",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: false
    },
],

act3: [
    {
        isTitleScreen: true,
        title: "ACT III: Coba Act 3",
        background: "titleBG",
        halt: true,
        haltDuration: 3000,
    },
    {
        speaker: "Reimu",
        text: "hi! nice to meet you",
        background: "houseNoon",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "hi, nice to meet you too",
        background: "houseNoon",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "let's go to my house",
        background: "houseNoon",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "alright then",
        background: "houseNoon",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: true
    },
    {
        speaker: "Reimu",
        text: "welcome to my house",
        background: "tangNoon",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "it's a good house",
        background: "tangNoon",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
],

act4: [
    {
        isTitleScreen: true,
        title: "ACT IV: Coba Act 4",
        background: "titleBG",
        halt: true,
        haltDuration: 3000,
    },
    {
        speaker: "Flandre",
        text: "hi! nice to meet you",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "hi! nice to meet you too",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "It's a nice day today",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "Yes pretty nice",
        background: "tangerang",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: true
    },
    {
        speaker: "Flandre",
        text: "Here too",
        background: "shrine",
        characters: [
            { name: "Flandre", sprite: "flandre3", position: "right" },
            { name: "Nitori", sprite: "nitori4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Nitori",
        text: "Yes",
        background: "shrine",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Nitori", sprite: "nitori2", position: "left" }
        ],
        halt: false
    },
],

};