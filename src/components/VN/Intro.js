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
    {
        speaker: "Reimu",
        text: "(frowning, momentarily at a loss for words)",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu1", position: "right" },
            { name: "Meiling", sprite: "meiling1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Now, now… let’s not be so rigid. We wouldn’t want something… unfortunate to happen, would we?",
        background: "mansionOutside",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Meiling", sprite: "meiling7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Meiling",
        text: "L-Lady Yukari?!",
        background: "mansionOutside",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Meiling", sprite: "meiling4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Why yes, it’s me.",
        background: "mansionOutside",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Meiling", sprite: "meiling4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Meiling",
        text: "O-oh! In that case, please go right in. It sounds like this is something important.",
        background: "mansionOutside",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Meiling", sprite: "meiling7", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "That’s more like it. Come now, Reimu—let’s not keep them waiting.",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "What the—ugh, fine. Let’s just get this over with.",
        background: "mansionOutside",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari3", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Inside the mansion, Sakuya is already awaiting them at the foyer, hands neatly folded in front of her.)",
        background: "mansionInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "right" },
        ],
        halt: true,
    },
    {
        speaker: "Sakuya",
        text: "What an unexpected visit. To what do we owe the pleasure, Reimu? Yukari?",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Cut the formalities. We’re here because Gensokyo is going haywire, and we have reasons to believe this place might be involved.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Déjà vu…",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Don’t play dumb. The last time we had this kind of nonsense, it started here.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "And yet, once again, we find ourselves unjustly accused. Truly nostalgic.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Such a familiar dance, isn’t it?",
        background: "mansionInterior",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Sakuya", sprite: "sakuya2", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "???",
        text: "A commotion in Gensokyo… and you came straight to me? I’m flattered.",
        background: "mansionInterior",
        characters: [
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Don’t act surprised. Is this your doing or not?",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "If it was me, I’d make it far more elegant than a random mash of Outside World buildings appearing everywhere.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia5", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Not to mention, we’re just as affected. The lake’s view is completely ruined.",
        background: "mansionInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya2", position: "right" },
            { name: "Remilia", sprite: "remilia5", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "So you’re saying you’re not behind this?",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Not at all. But it is quite fascinating. Reminds me of the time my mansion appeared here in Gensokyo… sudden, unexplained, disruptive. I wouldn’t mind investigating this myself.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu2", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "You just want something fun to do.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia5", position: "left" }
        ],
        halt: false
    },
    {
        speaker:"Remilia",
        text: "Maybe. But consider it an act of goodwill. Besides, if someone is trying to upstage me, I want to see it firsthand.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Remilia", sprite: "remilia5", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "Shall I prepare your parasol, Milady?",
        background: "mansionInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Please do. And prepare something for our guests. We’ll be heading out soon.",
        background: "mansionInterior",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "right" },
            { name: "Remilia", sprite: "remilia4", position: "left" }
        ],
        halt: false
    },
    {
        text: "(A few minutes later, Reimu, Remilia, and Sakuya are preparing to leave. Reimu turns to Yukari.)",
        background: "mansionInterior",
        characters: [
        ],
        halt: true
    },
    {
        speaker: "Reimu",
        text: "Aren’t you coming?",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Oh, I will… eventually. There’s one more matter I’d like to attend to here.",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu9", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "What kind of matter?",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Something delicate. You go on ahead. I’ll catch up?",
        background: "mansionInterior",
        characters: [
            { name: "Reimu", sprite: "reimu8", position: "right" },
            { name: "Yukari", sprite: "yukari3", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Deep within the Scarlet Devil Mansion. The air is still, but thick with quiet energy. Yukari’s gap opens into the dark, ornate room of Flandre Scarlet, who sits on her bed, idly spinning a crystal from her wings.)",
        background: "flandreRoom",
        characters: [
        ],
        halt: true
    },
   {
        speaker: "Flandre",
        text: "Huh? Yukari?",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Flandre", sprite: "flandre5", position: "left" }

        ],
        halt: false
    },
   {
        speaker: "Yukari",
        text: "Good evening, dear. You know… your sister is going out to play. Again.",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari2", position: "right" },
            { name: "Flandre", sprite: "flandre5", position: "left" }

        ],
        halt: false
    },
   {
        speaker: "Flandre",
        text: "…Without me?",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari2", position: "right" },
            { name: "Flandre", sprite: "flandre4", position: "left" }

        ],
        halt: false
    },
   {
        speaker: "Yukari",
        text: "Mhm. They’re going on quite the exciting adventure. Chaotic happenings, strange places appearing… You know, the kind of thing you’d love.",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari2", position: "right" },
            { name: "Flandre", sprite: "flandre4", position: "left" }

        ],
        halt: false
    },
   {
        speaker: "Flandre",
        text: "But I’m not allowed to…",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Flandre", sprite: "flandre2", position: "left" }

        ],
        halt: false
    },
   {
        speaker: "Yukari",
        text: "(leans in) Oh, but isn’t that boring? Sitting here, all alone, when the world outside is getting so… interesting?",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Flandre", sprite: "flandre2", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "But Remilia said… I might break something…",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari3", position: "right" },
            { name: "Flandre", sprite: "flandre2", position: "left" }

        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "And wouldn’t that be fun?",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Flandre", sprite: "flandre2", position: "left" }

        ],
        halt: false
    },
    {
        text: "(Flandre stares down at her hands, hesitant, then glances toward the window.)",
        background: "flandreRoom",
        characters: [
            { name: "Flandre", sprite: "flandre1", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "Just imagine… what they’re hiding from you. Wouldn’t you like to see it yourself?",
        background: "flandreRoom",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Flandre", sprite: "flandre1", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Flandre doesn’t answer, but her fingers clench, her wings pulsing softly. Yukari’s gap closes behind her, leaving the room silent once more.)",
        background: "flandreRoom",
        characters: [
        ],
        halt: true
    },
];