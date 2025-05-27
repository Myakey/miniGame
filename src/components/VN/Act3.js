import {characterSprites, backgroundImages } from "./imageMap";

export const act3Data = [
  {
    isTitleScreen: true,
    title: "ACT III: Blok M & Suzunaan",
    background: "titleBG",
    halt: true,
    haltDuration: 3000,
  },
  {
    speaker: "Reimu",
    text: "Blok M… It’s not the first time we've stepped foot here.",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "Flandre", sprite: "flandre", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "Really? It’s my first time here though.",
    background: "blokM",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "Anyway, why are we here again?",
    background: "blokM",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Sakuya", sprite: "sakuya", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Sakuya",
    text: "Are you sure that you sensed Hieda no hieda’s presence here, Reimu?",
    background: "blokM",
    characters: [
      { name: "Sakuya", sprite: "sakuya", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Yeah, trust me. Let’s go in to confirm it.",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "Sakuya", sprite: "sakuya", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "Whoa, everyone look! The books are neatly placed!",
    background: "blokM",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(Slightly surprised) Yeah, you're right... but let’s move on. We don’t have much free time here.",
    background: "blokM",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Flandre", sprite: "flandre", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "(Frowns) Okay…",
    background: "blokM",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Sakuya",
    text: "We’ll leave you behind if you don’t move, Reimu.",
    background: "blokM",
    characters: [
      { name: "Sakuya", sprite: "sakuya", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Wait… I feel like I’ve seen this place before...",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "???",
    text: "Oh, Reimu? What are you doing here?",
    background: "blokM",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Hm? That voice...",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Kosuzu",
    text: "Welcome to blokM! Are you looking for any books?",
    background: "blokM",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Kosuzu?! Wait, this is blokM? When did you—",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "Kosuzu", sprite: "kosuzu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Ahh, no, never mind. It’s because of the teleporting shenanigans again, isn’t it?",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "hieda",
    text: "You’re right. Is that why you’re here, Reimu?",
    background: "blokM",
    characters: [
      { name: "hieda", sprite: "hieda", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Oh, hieda, you’re here too. Yeah—we came to ask if you have any idea what’s causing all of this.",
    background: "blokM",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "hieda", sprite: "hieda", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "hieda",
    text: "It’s difficult to say for sure. Why don’t we talk inside first?",
    background: "blokM",
    characters: [
      { name: "hieda", sprite: "hieda", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "So this is Suzunaan... It's quite tidy.",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Kosuzu", sprite: "kosuzu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Kosuzu",
    text: "Hehe, thank you! So, what brings all of you here?",
    background: "suzunaan",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Sakuya",
    text: "We’re investigating the cause of what’s currently affecting Gensokyo.",
    background: "suzunaan",
    characters: [
      { name: "Sakuya", sprite: "sakuya", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Right. hieda, do you have any leads?",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "hieda", sprite: "hieda", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "hieda",
    text: "To some extent, yes. It seems someone tried to force their way into Gensokyo. But something went wrong, and it disrupted the balance of the Great Barrier.",
    background: "suzunaan",
    characters: [
      { name: "hieda", sprite: "hieda", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "Do you know who the culprit is?",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "hieda",
    text: "Sadly, no. I only know that the disturbance originates from someone—or something—from the outside world.",
    background: "suzunaan",
    characters: [
      { name: "hieda", sprite: "hieda", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "That makes this trickier… If they’re not even here yet, how do we confront them?",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    // Narasi
    text: "(There’s a brief silence.)",
    background: "suzunaan",
    characters: [],
    halt: false
  },
  {
    speaker: "hieda",
    text: "Actually, I’ve been sensing a few objects scattered across Gensokyo—ones that carry an aura foreign to this land. If you can track them all down, it might bring you a step closer to solving this.",
    background: "suzunaan",
    characters: [
      { name: "hieda", sprite: "hieda", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "That’s something at least! So, where can we find them?",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "hieda",
    text: "I can sense three of them. One’s located somewhere in Mount Dieng, another in a flower field, and one right here in Blok M. That’s all I can detect for now.",
    background: "suzunaan",
    characters: [
      { name: "hieda", sprite: "hieda", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Thanks, hieda. That helps a lot. Splitting up should save time… but how should we divide the work?",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Sakuya",
    text: "I can cover the Blok M area on my own. I’ve already scouted it before.",
    background: "suzunaan",
    characters: [
      { name: "Sakuya", sprite: "sakuya", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "Then I’ll go to Mount Dieng. No objections, I assume?",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "I’ll go with Remilia too!",
    background: "suzunaan",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Hold on! There’s no telling what the two of you might do if left unchecked.",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" },
      { name: "Flandre", sprite: "flandre", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(Sighs) You still don’t trust me, do you?",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "Come on, I just want to spend time with Remilia too!",
    background: "suzunaan",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Nope, not happening. You two have caused enough chaos already. I’m coming with you to make sure nothing goes wrong.",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" },
      { name: "Flandre", sprite: "flandre", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "That’s the opposite of efficient, you realize? And if you’re with us, who’s going to check the flower fields?",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Ugh...",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    // Narasi
    text: "(A calm voice suddenly cuts in from behind.)",
    background: "suzunaan",
    characters: [],
    halt: false
  },
  {
    speaker: "Yukari",
    text: "Don’t worry—I’ll handle that.",
    background: "suzunaan",
    characters: [
      { name: "Yukari", sprite: "yukari", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "All",
    text: "Yukari?!",
    background: "suzunaan",
    characters: [
      { name: "Yukari", sprite: "yukari", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Yukari",
    text: "Yes, yes, it’s me.",
    background: "suzunaan",
    characters: [
      { name: "Yukari", sprite: "yukari", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Yukari",
    text: "You can go with Remilia and Flandre, Reimu. I also have a few matters to attend to in the flower fields—so it works out nicely.",
    background: "suzunaan",
    characters: [
      { name: "Yukari", sprite: "yukari", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Yukari",
    text: "You don’t have any objections, do you, Remilia?",
    background: "suzunaan",
    characters: [
      { name: "Yukari", sprite: "yukari", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "Urgh... I guess it’s fine if you’re going.",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Yukari",
    text: "Wonderful. That settles it.",
    background: "suzunaan",
    characters: [
      { name: "Yukari", sprite: "yukari", position: "right" }
    ],
    halt: false
  },
  {
    // Narasi
    text: "(A few minutes later...)",
    background: "suzunaan",
    characters: [],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Well then, we should get moving. See you later, Kosuzu, hieda.",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" },
      { name: "Kosuzu", sprite: "kosuzu", position: "left" },
      { name: "hieda", sprite: "hieda", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Sakuya",
    text: "Have a safe journey, Lady Remilia.",
    background: "suzunaan",
    characters: [
      { name: "Sakuya", sprite: "sakuya", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "Don’t worry. We’ll be fine.",
    background: "suzunaan",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    // Narasi
    text: "(As Reimu begins to walk away, Kosuzu suddenly hurries up to her.)",
    background: "suzunaan",
    characters: [],
    halt: false
  },
  {
    speaker: "Kosuzu",
    text: "Reimu, wait!",
    background: "suzunaan",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Hm? Do you still have something to say?",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Kosuzu",
    text: "Yeah… actually. Can I ask you a favor?",
    background: "suzunaan",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "What kind of favor?",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Kosuzu",
    text: "Well, if you ever have free time, could you help me look after the shop? With all this weirdness going on, I’m worried something might happen here… Please?",
    background: "suzunaan",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "(Smiles gently) Sure, I don’t see any problem with that.",
    background: "suzunaan",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Kosuzu",
    text: "Really? Thank you so much! Oh—I shouldn’t keep you any longer. Safe travels, everyone!",
    background: "suzunaan",
    characters: [
      { name: "Kosuzu", sprite: "kosuzu", position: "right" }
    ],
    halt: false
  }
]