import {characterSprites, backgroundImages } from "./imageMap";

export const act1Data = [
    {
        isTitleScreen: true,
        title: "ACT I",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        speaker: "narrator",
        text: "(Inside the Hakurei Shrine — Reimu, Remilia, and Sakuya are deep in discussion when a voice suddenly echoes from the entrance.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true

    },
    {
        speaker: "Reimu",
        text: "So… Do you have any clue what’s causing all this…?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Hm… maybe it—",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "???",
        text: "Heyy! What are you guys doing??",
        background: "shrineInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "That voice… is it—?",
        background: "shrineInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya4", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Are you playing without me again?! That’s not fair… I want to join too!!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Narrator",
        text: "(The three of them are shocked as Flandre suddenly appears at the gate.)",
        background: "shrineInterior",
        characters: [
           { name: "Sakuya", sprite: "sakuya4", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Flandre?! Why are you here?! I told you not to go outside!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Flandre",
        text: "But Remilia is always playing without me…It’s so boring in the mansion! I want to play too!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Remilia… care to explain why your sister is here…?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: " I didn’t bring her, I swear! Flandre… be a good little sister and go back home, okay? I’ll play with you later… after we fix this problem.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "No! I don't want to go back… I want to play now!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Please… we’re not playing! This is serious!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Flandre",
        text: "You always say that! You always promise… but never play with me!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre2", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Yeah… she’s not going home at this rate…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Reimu",
        text: "She’s too dangerous to keep around… You need to send her back—immediately.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu3", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "It’s no use… Once Miss Flandre throws a tantrum, nothing works.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Well… unless you’d like to try talking her down yourself…?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu1", position: "right" },
            { name: "Sakuya", sprite: "sakuya1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Ugh, fine… But Remilia—you’re watching her. I mean every second…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu6", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Fine… I guess I don’t have a choice…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu3", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Yayy~~!",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre7", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Reimu",
        text: "This day just keeps getting better and better...",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre7", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "So… where were we again?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Reimu",
        text: "We were trying to figure out the source of these distortions… And if the weird locations keep appearing… there has to be something—or someone—behind it…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Maybe we should ask Sanae… She’s new here but has knowledge about places outside Gensokyo… She might know something…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Good idea… If anyone can shed light on this… it’s her…",
        background: "shrineInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Can I come too, Reimu?",
        background: "shrineInterior",
        characters: [
            { name: "Flandre", sprite: "flandre7", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Fine… but Remilia, you really have to keep an eye on her…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
    {
        speaker: "Remilia",
        text: "I’m on it… No worries…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ], 
        halt: false
    },
   {
        speaker: "Sakuya",
        text: "Then it’s settled… Let’s head over to the Moriya Shrine and see what Sanae thinks…",
        background: "shrineInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya5", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" }
        ], 
        halt: true
    },
];

