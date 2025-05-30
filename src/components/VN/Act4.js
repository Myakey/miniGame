import {characterSprites, backgroundImages } from "./imageMap";

export const act4Data = [
    {
        isTitleScreen: true,
        title: "ACT 4 - Pantai",
        background: "titleBG",
        halt: true,
        haltDuration: 500,
    },
    {
        text: "(After a not-so-long journey, the clue seekers finally finished their own searches and retrieved each of the orbs. But the mystery remains unsolved.)",
        background: "suzunaan",
        characters: [
        ],
        halt: true,
        haltDuration: 1500
    },
    {
        speaker: "Reimu",
        text: "(slightly confused, glancing at the others) ...What now?",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sakuya", sprite: "sakuya", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "We’ve definitely gathered all the orbs. But… nothing is happening.",
        background: "suzunaan",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "right" },
            { name: "Flandre", sprite: "flandre", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "(arms folded, sighing) This is boring...",
        background: "suzunaan",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "(smiling faintly, resting her chin on her fan) My, my. It seems like we’re still missing something...",
        background: "suzunaan",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(deadpan) What exactly is missing, Yukari?",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "(grinning slightly, eyes half-lidded) Hmm... I don't really know~.",
        background: "suzunaan",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(grits her teeth) Like hell you don’t.",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(sighs, turning to Akyuu) Akyuu. Do you sense anything unusual? Maybe outside?",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "hieda", sprite: "hieda", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Akyuu",
        text: "(eyes closed, brows furrowing) Mmm... Oh!",
        background: "suzunaan",
        characters: [
            { name: "hieda", sprite: "hieda", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(immediately alert) What is it?",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "hieda", sprite: "hieda", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Akyuu",
        text: "There’s a strong presence... bigger than the ones before. It’s coming from the beach area. But be careful—this kind of aura can be unpredictable.",
        background: "suzunaan",
        characters: [
            { name: "hieda", sprite: "hieda", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(smirking slightly) It’s not my first rodeo.",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(grinning, smug) Could be the first one you fail to solve, though.",
        background: "suzunaan",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(turns sharply) HUH?! What did you just say?!",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        text: "(They start arguing loudly.)",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: true,
        haltDuration: 1000
    },
    {
        speaker: "Yukari",
        text: "(still smiling, interrupts softly) Now, now, that’s enough, children.",
        background: "suzunaan",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "hieda", sprite: "hieda", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Akyuu",
        text: "She’s right. You’re wasting time. If you want to end this quickly, go now—before it gets worse.",
        background: "suzunaan",
        characters: [
            { name: "hieda", sprite: "hieda", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Remilia and Reimu glance at each other and sigh.)",
        background: "suzunaan",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: true,
        haltDuration: 800
    },
    {
        speaker: "Reimu",
        text: "(resigned) Yeah... You’re right. Let’s get this over with.",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(flicking her parasol open) For once, I agree with you.",
        background: "suzunaan",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        text: "(The five of them head to the beach, their pace brisk, their resolve stronger than before.)",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: true,
        haltDuration: 1200
    },
    {
        text: "(The five of them head to the beach, their pace brisk, their resolve stronger than before.)",
        background: "suzunaan",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: true,
        haltDuration: 1200
    },
    {
        speaker: "Remilia",
        text: "(scowling under her parasol) Ugh. How are we supposed to find an orb on this massive stretch of sand? And in this heat?!",
        background: "beach",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "(calmly) Don’t worry, milady. I brought your parasol as always.",
        background: "beach",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(gratefully) You’re a lifesaver, Sakuya. Always reliable.",
        background: "beach",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "(bows lightly) I’m merely fulfilling my duty, milady.",
        background: "beach",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "(frowning, shielding her head) Remiliaaa~ share your parasol with me, pleaseee... It’s so hot I could melt...",
        background: "beach",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(looking away) This parasol barely fits me. Go rest under that tree if you don’t want to be roasted.",
        background: "beach",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Flandre", sprite: "flandre", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Flandre",
        text: "(pouts) Mmm... okay...",
        background: "beach",
        characters: [
            { name: "Flandre", sprite: "flandre", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        text: "(As Flandre trudges to the shade, Reimu is already searching a distance away, her expression tense.)",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Flandre", sprite: "flandre", position: "right" }
        ],
        halt: true,
        haltDuration: 1000
    },
    {
        speaker: "Reimu",
        text: "(muttering, annoyed) This place is too damn bright... Why am I always the one stuck doing the heavy lifting?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "(appearing beside her) Don’t be discouraged, Reimu. Just one more orb and this will all be over.",
        background: "beach",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "THEN HELP ME LOOK INSTEAD OF FLOATING AROUND!!",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "(smiling teasingly) Oh, don’t worry. I’m sure someone will come along and help~",
        background: "beach",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Who the hell would—?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: false
    },
    {
        text: "(Suddenly, they all hear a familiar voice from the distance.)",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Yukari", sprite: "yukari", position: "right" }
        ],
        halt: true,
        haltDuration: 800
    },
    {
        speaker: "??",
        text: "REIMU!!",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Reimu", sprite: "reimu", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(squints and frowns) Ugh... that voice...",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "(running up, slightly out of breath) What are you doing here?!",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Reimu", sprite: "reimu", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(dryly) Just playing in the sand.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "(raises an eyebrow) Uh-huh... Playing, huh?",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Reimu", sprite: "reimu", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "Like I’d believe that! What kind of shrine maiden lies so badly?",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Reimu", sprite: "reimu", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(sighs, annoyed) Fine. We’re investigating something—trying to fix this whole mess.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Remilia, Sakuya, and Flandre approach the scene, sensing the commotion.)",
        background: "beach",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: true,
        haltDuration: 800
    },
    {
        speaker: "Marisa",
        text: "(blinks in surprise) Oh? That’s... a rare lineup.",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "Don’t get the wrong idea. We’re only working together for now—just to clean this up.",
        background: "beach",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "(crossing her arms, skeptical) Yeah, suuure you are.",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(ignores her) So? Why are you here?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "(shrugs sarcastically) Oh, you know... just doing the usual—fixing the mess that you and that tanuki started.",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Reimu", sprite: "reimu", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(defensive) I said I’m sorry, okay?! Now, can we focus?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Reimu’s expression suddenly shifts—she senses something.)",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: true,
        haltDuration: 700
    },
    {
        speaker: "Reimu",
        text: "Wait—who’s that behind you?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "(quickly) Whoa, calm down! I found her near the beach while tracking the strange aura. But I, uh... kinda forgot to ask her name...",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(gripping her gohei) You! Speak up! Your aura clearly doesn’t belong to this world—explain yourself before things get ugly!",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        text: "(Tension spikes. The others tense up, bracing for a fight—until the stranger finally speaks.)",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: true,
        haltDuration: 900
    },
    {
        speaker: "??",
        text: "(chuckles) Now, now... That’s not a very welcoming way to greet a traveler from afar, is it?",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(grinning slightly) Good afternoon, everyone. My name is Sumireko Usami. It’s a pleasure to meet you all.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Silence. The air is heavy. Reimu’s eyes narrow.)",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: true,
        haltDuration: 700
    },
    {
        speaker: "Reimu",
        text: "So… Sumireko Usami. You're the one behind all of this, aren’t you?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(nodding) Yep. From the Outside World. High school student, psychic extraordinaire, and occasional dream traveler.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(unamused) And a massive pain in the ass, apparently.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Remilia",
        text: "(smirking) I like her already.",
        background: "beach",
        characters: [
            { name: "Remilia", sprite: "remilia", position: "right" },
            { name: "Sumireko", sprite: "sumireko", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "Don’t encourage her.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Marisa",
        text: "(incredulous) Psychic? Seriously?",
        background: "beach",
        characters: [
            { name: "Marisa", sprite: "marisa", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(matter-of-factly) Ever since I knew about the existence of Gensokyo,  I’ve been fascinated by it. The boundaries between worlds are… thin, sometimes. So it’s not that big of a surprise if one or two things go wrong when someone tries to access it.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Marisa", sprite: "marisa", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Yukari",
        text: "(expression darkening slightly) So you’re the source of the rift.",
        background: "beach",
        characters: [
            { name: "Yukari", sprite: "yukari", position: "right" },
            { name: "Sumireko", sprite: "sumireko", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(defensive) Not on purpose! I was genuinely fascinated by this world and tried to go here like how I usually do in my free time. I didn’t know taking them would mess things up this badly.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Yukari", sprite: "yukari", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Sakuya",
        text: "(coldly) Intentions don’t erase consequences, Miss Usami.",
        background: "beach",
        characters: [
            { name: "Sakuya", sprite: "sakuya", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(sighs, her shoulders sagging) I know. I really messed things up. I give you my genuine apology for all of it.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Sakuya", sprite: "sakuya", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(arms crossed, eyeing her warily) Fine. But answer me this—why were you at the beach when Marisa found you?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(rubbing her temples tiredly) I passed out. I’d been wandering nonstop trying to track down my orbs... Without them, I can’t open a stable rift back home—let alone fix any of this.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(squinting) Wait a second... Did you just say “orb”?",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(blinks, then tilts her head) Uh, yeah? Why?",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        text: "(Reimu, Remilia, and the others each reach into their belongings and pull out the glowing orbs they had collected earlier. Sumireko’s eyes widened in shock.)",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Remilia", sprite: "remilia", position: "right" }
        ],
        halt: true,
        haltDuration: 900
    },
    {
        speaker: "Reimu",
        text: "(holding one up, flatly) You mean these things? If you’re saying these can reverse whatever’s going on, then you'd better get started.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(staggering back slightly) Whoa—how did you get those?! I’ve been chasing them for days! No wonder the aura kept changing directions... they weren’t stationary, you were carrying them around!",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(looking away briefly, a bit sheepish) Yeah, well... Not like we knew they belonged to someone. Don't worry about it now. Just fix this mess, and we’ll let you return to your world in one piece.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    },
    {
        speaker: "Sumireko",
        text: "(relieved, placing a hand over her heart) Phew... That’s all I want, really. But I need a place to perform the ritual—somewhere quiet. I’ll need to concentrate without any distractions or interruptions.",
        background: "beach",
        characters: [
            { name: "Sumireko", sprite: "sumireko", position: "right" },
            { name: "Reimu", sprite: "reimu", position: "left" }
        ],
        halt: false
    },
    {
        speaker: "Reimu",
        text: "(grinning slightly, tapping her gohei against her shoulder) Oh, I know just the place.",
        background: "beach",
        characters: [
            { name: "Reimu", sprite: "reimu", position: "left" },
            { name: "Sumireko", sprite: "sumireko", position: "right" }
        ],
        halt: false
    }
];