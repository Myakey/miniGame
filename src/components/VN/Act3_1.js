import { characterSprites, backgroundImages } from "./imageMap";

export const act3_1Data = [
    {
        isTitleScreen: true,
        title: "ACT 3.1 - The Summit’s Secret",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        text: "(Reimu, Flandre, and Remilia arrive once again at the Moriya Shrine. As they approach the entrance, Sanae walks out to greet them.)",
        background: "moriyaShrine",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Flandre",
        text: "Yayyy~~ We’re here again!!",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Flandre", sprite: "flandre7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "I will never get used to doing this... My dress is completely ruined.",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Flandre", sprite: "flandre", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Then maybe you should go outside more often, 'Lady' Remilia.",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Reimu", sprite: "reimu4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "You really shouldn’t talk when you look like you rolled straight out of a mud puddle.",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu6", position: "left" }
        ],
        halt: false
    },
    {
        text: "(The two continue bickering like usual, until a familiar voice cuts in.)",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu6", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Heeyy, you guys! What brings you all the way here again?",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Whoa, you’re drenched! You can come inside and rest if you need to cool down.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae2", position: "right" },
            { name: "Reimu", sprite: "reimu9", position: "left" },

        ],
        halt: false
    },
   {
        speaker: "Reimu",
        text: "Thanks, but no need. We're here for something specific. Tell me, have you sensed any strange aura around here lately—something that doesn’t feel like it’s from Gensokyo?",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae2", position: "right" },
            { name: "Reimu", sprite: "reimu9", position: "left" },

        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Now that you mention it... yeah, actually.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae5", position: "right" },
            { name: "Reimu", sprite: "reimu9", position: "left" },

        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Right after the shrine got teleported here, I started sensing something weird near the summit. Definitely not a Gensokyo-like aura.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae5", position: "right" },
            { name: "Reimu", sprite: "reimu9", position: "left" },

        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "I’ve been too busy to investigate, but the feeling hasn’t gone away.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae5", position: "right" },
            { name: "Reimu", sprite: "reimu9", position: "left" },

        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "That’s helpful. We’ll go check it out then.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae5", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" },

        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(calling out) Flandre! We’re leaving—hurry up unless you want to be left behind!",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: " Okay! I’m coming!",
        background: "moriyaShrine",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "left" },
            { name: "Flandre", sprite: "flandre3", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Anything else you want to ask?",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae3", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" },
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "No, that’s more than enough. Thanks for the help, Sanae. See you later.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae3", position: "right" },
            { name: "Reimu", sprite: "reimu7", position: "left" },
        ],
        halt: false
    },
    {
        speaker: "Sanae",
        text: "Anytime, Reimu. Take care.",
        background: "moriyaShrine",
        characters: [
            { name: "Sanae", sprite: "sanae6", position: "right" },
            { name: "Reimu", sprite: "reimu7", position: "left" },
        ],
        halt: false
    },
    {
        text: "(A few minutes later, the three of them arrive at the mountain summit. Reimu stops to catch her breath, while Remilia looks visibly irritated.)",
        background: "dieng",
        characters: [
        ],
        halt: true,
        haltDuration: 500
    },
   {
        speaker: "Reimu",
        text: "Finally... Let’s catch our breath for a moment.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "I still don’t get why we had to walk. We can fly, remember?",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "You can’t exactly spot small things from the sky, genius. Now zip it and—",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu6", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "...Remilia.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "What?",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Where’s your little sister?",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "She was just beside m—",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(sigh) Of course. I guess she wandered off again.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "DON’T SIGH” ME! Do you have any idea how dangerous your sister is when left alone—",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Reimu", sprite: "reimu6", position: "left" }
        ],
        halt: false
    },
    {
        text: "(A voice calls out from further ahead, interrupting her.)",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia2", position: "right" },
            { name: "Reimu", sprite: "reimu2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Remiliaa~ Look what I found!!",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Reimu", sprite: "reimu2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "There she is. Well? Let’s go, unless you plan on shouting all day.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia5", position: "right" },
            { name: "Reimu", sprite: "reimu2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: " This is exactly why we don’t get along...",
        background: "dieng",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "left" }
        ],
        halt: false
    },
    {
        text: "(After a short walk, they finally reach Flandre, who’s crouched on the ground holding something.)",
        background: "dieng",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Remilia, look! I found this weird glowy thing buried in the dirt!",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Flandre", sprite: "flandre7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Wait... this aura... Could this be the orb we’re looking for?",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia1", position: "right" },
            { name: "Flandre", sprite: "flandre7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Are you serious?! Let me see it.",
        background: "dieng",
        characters: [
            { name: "Flandre", sprite: "flandre7", position: "right" },
            { name: "Reimu", sprite: "reimu2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "There’s no doubt. This is the orb. We’ve finally found it.",
        background: "dieng",
        characters: [
            { name: "Flandre", sprite: "flandre7", position: "right" },
            { name: "Reimu", sprite: "reimu3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Yayyy~! Did I do a good job, Remilia?",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Flandre", sprite: "flandre3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: " I suppose I can give credit where it’s due. Well done, Flandre.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia3", position: "right" },
            { name: "Flandre", sprite: "flandre3", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "Yaaaaay~!",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia3", position: "right" },
            { name: "Flandre", sprite: "flandre7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "That was... anticlimactic.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia3", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Doesn’t matter. If it means we can leave this place any sooner, I’ll take it. Let’s go back.",
        background: "dieng",
        characters: [
            { name: "Remilia", sprite: "remilia5", position: "right" },
            { name: "Reimu", sprite: "reimu1", position: "left" }
        ],
        halt: true
    },
];
