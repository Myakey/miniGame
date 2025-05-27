import {characterSprites, backgroundImages } from "./imageMap";

export const act2Data = [
    {
        isTitleScreen: true,
        title: "ACT II - A Shrine, A Panic, and A Lead",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        text: "(The group arrives at the newly teleported Moriya Shrine, now mysteriously located somewhere unfamiliar.)",
        background: "moriyaShrine",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Remilia",
        text: "Huff, huff... We've finally arrived...",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Yay! Where are we now?",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Flandre", sprite: "flandre7", position: "left" }
        ],
        halt: false
    },
    {
        text: "(In the distance, a figure is seen running in circles, muttering frantically to herself.)",
        background: "moriyaShrine",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Oh, there's Sanae. Hey Sana—",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu7", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Reimuuu! Please help us! The shrine—it's been teleported somewhere completely different!!",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu7", position: "right" },
            { name: "Sanae", sprite: "sanae1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Uhh, yeah, I can see that. Let's calm down for a bit, okay?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu1", position: "right" },
            { name: "Sanae", sprite: "sanae1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "We're also here to figure out what's causing all this mess in Gensokyo. That’s why we came—to ask if you have any clues.?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sanae", sprite: "sanae1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Right… sorry. I was panicking and wasn’t thinking clearly. My bad, Reimu...",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sanae", sprite: "sanae4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Wait, you said we...? Oh! I just realized there are three people with you. Are they your friends?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Friends is... not quite the word. We’re simply traveling together to get to the bottom of this. I am Remilia Scarlet, mistress of the Scarlet Devil Mansion. And this is Flandre Scarlet—my little sister.",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia4", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Nice to meet you!",
        background: "moriyaShrine",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "A pleasure to meet you, Miss Sanae. I am Izayoi Sakuya, head maid of the Scarlet Devil Mansion, and personal maid to Mistress Remilia.",
        background: "moriyaShrine",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Oh, I see... Nice to meet you all.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae6", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Anyway, back to the main topic. Sanae, do you know what those strange places are—the ones that keep popping up around Gensokyo?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Hmm… I think I’ve seen those structures before. If I remember correctly, they’re from a country in the Outside World called… Indonesia.",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Sanae", sprite: "sanae7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Indonesia?!",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu6", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Oh? Do you all know that place?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Sanae", sprite: "sanae2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "That’s the same country we passed through before, isn’t it?",
        background: "moriyaShrine",
        characters: [
            { name: "Sakuya", sprite: "sakuya4", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "We didn’t exactly pass through—we were dragged into it by some unstable dimensional rift. It was a complete disaster.",
        background: "moriyaShrine",
        characters: [
            { name: "Sakuya", sprite: "sakuya4", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Grr… That’s not fair, Remilia! You didn’t invite me to come!",
        background: "moriyaShrine",
        characters: [
            { name: "Flandre", sprite: "flandre4", position: "right" },
            { name: "Remilia", sprite: "remilia2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: " Again, it wasn’t a game, Flandre. It was an incident. We had no choice in the matter.",
        background: "moriyaShrine",
        characters: [
            { name: "Flandre", sprite: "flandre4", position: "right" },
            { name: "Remilia", sprite: "remilia1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Haha… I guess since that problem was resolved, the current incident must have a different cause?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Sanae", sprite: "sanae4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Seems like it. Do you have any leads?",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu1", position: "right" },
            { name: "Sanae", sprite: "sanae4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Unfortunately, no… But maybe Hieda no Akyuu knows something. If it’s recorded in the Gensokyo Chronicles, she’d be the one to ask.",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu1", position: "right" },
            { name: "Sanae", sprite: "sanae", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Good idea, Sanae. Thanks. We’ll head over to find her. See you later.",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sanae", sprite: "sanae", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "My pleasure. Have a safe trip, everyone!",
        background: "moriyaShrine",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Sanae", sprite: "sanae6", position: "left" }
        ],
        halt: true
    },
];