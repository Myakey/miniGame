import {characterSprites, backgroundImages } from "./imageMap";

export const act4Data = [
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
];