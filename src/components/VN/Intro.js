import {characterSprites, backgroundImages } from "./imageMap";

export const introData = [
    {
        isTitleScreen: true,
        title: "Intro - Calamity in Gensokyo",
        background: "titleBG",
        halt: true,
        haltDuration: 500
    },
    {
        text: "(The sun casts a gentle light over the Scarlet Devil Mansion’s ornate gates. Reimu and Yukari land just before the entrance, where Hong Meiling stands at attention, arms crossed, maintaining a disciplined stance.)",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Move. I’ve got business with Remilia.",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Meiling", sprite: "meiling1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Meiling",
        text: "Lady Remilia doesn’t have anything on her schedule today. I’ll have to ask you to leave.",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Meiling", sprite: "meiling1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Grr… this is serious business! Haven’t you seen all those strange buildings popping up around Gensokyo?",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu6", position: "right" },
            { name: "Meiling", sprite: "meiling1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Meiling",
        text: "Probably just a new franchise opened by the Tanuki.",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu6", position: "right" },
            { name: "Meiling", sprite: "meiling7", position: "left" }
        ],
        halt: false
    },
];