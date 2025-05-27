import {characterSprites, backgroundImages } from "./imageMap";

export const prologueData = [
    {
        isTitleScreen: true,
        title: "Prologue - The Bored Outside Girl",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        speaker: "narrator",
        text: "(In a quiet and empty classroom , a figure of a girl sitting can be seen. A curious high school student with psychic powers, lounges at her desk, spinning one of her pens idly.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "???",
        text: "Ugh… school is so boring lately. No weird dreams, no paranormal spikes, not even a decent urban legend to chase. ",
        background: "shrineInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(She pulls out her phone, then opens some social media and scrolls aimlessly, but after a few minutes of scrolling, a sigh can be heard.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "???",
        text: "Seriously? Not a single ghost sighting today? What kind of occult club president would I be if I didn’t do something mysterious?",
        background: "shrineInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(She suddenly sits upright, her eyes lighting up.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "???",
        text: "Wait… What if I tried opening a portal to Gensokyo myself? Not like I haven’t done weirder things before.",
        background: "shrineInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(She quickly rummages through her bag, pulling out strange charms, printed papers with runes, and a few glowing orbs. She begins arranging them on the floor.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "???",
        text: "Alright, if this works… I might actually get out of this mundane world for a bit. Just a peek into Gensokyo… nothing too big.",
        background: "shrineInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(She chants under her breath, energy swirling as the orbs begin to glow brighter. Suddenly, the glow intensifies. A violent tremor shakes the classroom.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "???",
        text: "Uh-oh… That’s not supposed to—",
        background: "shrineInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(With a flash of light and a surge of energy, the classroom distorts. The ritual backfires. The air shimmers—and then, Sumireko vanishes.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "narrator",
        text: "(Meanwhile in another place..)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Reimu",
        text: "Finally, a peaceful day. No youkai nonsense, no loud Marisa, no—",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu7", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(Suddenly, a loud whoosh breaks the silence. Marisa Kirisame flies in on her broom, looking frantic.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Marisa",
        text: " Reimu! Big problem!",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu7", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Oh, great. What is it this time?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "I was flying around like usual and—get this—there’s  so many weird buildings appearing throughout Gensokyo now!",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Maybe the tanuki opened a new franchise.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "Would you believe me for a second?! There’s a whole chunk of the Outside World just… planted in the middle of Gensokyo. A weird building with a giant sign of “BLOK M”, a mountain that we have never seen before, and—it’s all just there!",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Probably just another weird youkai illusion. It'll fade..",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "Reimu! This is way bigger than that. The barrier might be breaking or shifting or something!",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Marisa", sprite: "marisa6", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "If it’s not attacking anyone, I’m not getting involved.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Marisa", sprite: "marisa1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "Fine. I’ll check it out myself, then.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Marisa", sprite: "marisa6", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(Marisa groans and speeds off into the sky. Reimu continues sweeping, but her brow furrows slightly. A moment later, a familiar rip in space opens in the air. Yukari Yakumo steps through elegantly, holding her parasol.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "???",
        text: "Hello, Reimu. Enjoying the sunshine?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Not if people keep showing up with drama.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "I assume Marisa told you about the… anomalies?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "I told her it's probably a dumb youkai prank.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu3", position: "right" },
            { name: "Yukari", sprite: "yukari1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "And what if I told you that someone—most likely a human from the Outside World—just interfered with the Great Hakurei Barrier?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "…You’re serious?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Yukari", sprite: "yukari1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "As always. These disruptions aren’t random. Someone pierced the barrier—likely by accident—and now our worlds are bleeding into each other.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Then go fix it. Isn’t this your job?",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Oh my. And let Marisa run amok unsupervised? She might accidentally make things worse. Wouldn’t want her getting all the credit either…",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari1", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Grr, fine. You’re clearly taunting me to fix this too aren’t you.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu6", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Just encouraging you.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(Reimu sets her broom aside reluctantly and grabs her gohei.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Reimu",
        text: "Fine. But if I find out Remilia is behind this, I’m dragging her out into the sunlight myself.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Good girl. Do be careful. Reality is a bit… loose today.",
        background: "shrineInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "narrator",
        text: "(With a flick of her fan, Yukari steps through a gap beside Reimu. The two of them rise into the sky, leaving the shrine behind as they set off toward the Scarlet Devil Mansion, where the source of the disturbance might be waiting.)",
        background: "shrineInterior",
        characters: [
        ],
        halt: true
    },
];