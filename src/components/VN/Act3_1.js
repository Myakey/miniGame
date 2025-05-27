import { characterSprites, backgroundImages } from "./imageMap";

export const act3_1Data = [
  {
    text: "(Reimu, Flandre, and Remilia arrive once again at the Moriya Shrine. As they approach the entrance, Sanae walks out to greet them.)",
    background: "moriyaShrine",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: true,
    haltDuration: 2000
  },
  {
    speaker: "Flandre",
    text: "Yayyy~~ We’re here again!!",
    background: "moriyaShrine",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(sighs dramatically) I will never get used to doing this... My dress is completely ruined.",
    background: "moriyaShrine",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: 'Then maybe you should go outside more often, "Lady" Remilia.',
    background: "moriyaShrine",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "frowning, brushing off her skirt You really shouldn’t talk when you look like you rolled straight out of a mud puddle.",
    background: "moriyaShrine",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    text: "(The two continue bickering like usual, until a familiar voice cuts in.)",
    background: "moriyaShrine",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: true,
    haltDuration: 1500
  },
  {
    speaker: "Sanae",
    text: "(approaching) Heeyy, you guys! What brings you all the way here again?",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Sanae",
    text: "Whoa, you’re drenched! You can come inside and rest if you need to cool down.",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Thanks, but no need. We're here for something specific. Tell me, have you sensed any strange aura around here lately—something that doesn’t feel like it’s from Gensokyo?",
    background: "moriyaShrine",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Sanae", sprite: "sanae", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Sanae",
    text: "Now that you mention it... yeah, actually.",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Sanae",
    text: "Right after the shrine got teleported here, I started sensing something weird near the summit. Definitely not a Gensokyo-like aura.",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Remilia", sprite: "remilia", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Sanae",
    text: "I’ve been too busy to investigate, but the feeling hasn’t gone away.",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "That’s helpful. We’ll go check it out then.",
    background: "moriyaShrine",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Sanae", sprite: "sanae", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(calling out) Flandre! We’re leaving—hurry up unless you want to be left behind!",
    background: "moriyaShrine",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Flandre", sprite: "flandre", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "Okay! I’m coming!",
    background: "moriyaShrine",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Sanae",
    text: "Anything else you want to ask?",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "No, that’s more than enough. Thanks for the help, Sanae. See you later.",
    background: "moriyaShrine",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Sanae", sprite: "sanae", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Sanae",
    text: "Anytime, Reimu. Take care.",
    background: "moriyaShrine",
    characters: [
      { name: "Sanae", sprite: "sanae", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: true
  },
  {
    text: "(Fade in to a new Background, CG : Dieng’s Summit\n(A few minutes later, the three of them arrive at the mountain summit. Reimu stops to catch her breath, while Remilia looks visibly irritated.)",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: true,
    haltDuration: 2000
  },
  {
    speaker: "Reimu",
    text: "Finally... Let’s catch our breath for a moment.",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(grumbling) I still don’t get why we had to walk. We can fly, remember?",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "You can’t exactly spot small things from the sky, genius. Now zip it and—",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "...Remilia.",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(frowning) What?",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "Where’s your little sister?",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "She was just beside m—",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(sighs) Of course. I guess she wandered off again.",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "(shouting) DON’T “SIGH” ME! Do you have any idea how dangerous your sister is when left alone—",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    text: "(A voice calls out from further ahead, interrupting her.)",
    background: "dieng",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: true,
    haltDuration: 1200
  },
  {
    speaker: "Flandre",
    text: "Remiliaa~ Look what I found!!",
    background: "dieng",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(smirking) There she is. Well? Let’s go, unless you plan on shouting all day.",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Flandre", sprite: "flandre", position: "center" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "(gritting her teeth) This is exactly why we don’t get along...",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    text: "(After a short walk, they finally reach Flandre, who’s crouched on the ground holding something.)",
    background: "dieng",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: true,
    haltDuration: 1500
  },
  {
    speaker: "Flandre",
    text: "Remilia, look! I found this weird glowy thing buried in the dirt!",
    background: "dieng",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(pauses, eyes narrowing) Wait... this aura... Could this be the orb we’re looking for?",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Flandre", sprite: "flandre", position: "center" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "(rushing forward) Are you serious?! Let me see it.",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Flandre", sprite: "flandre", position: "center" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "(examining the orb closely) There’s no doubt. This is the orb. We’ve finally found it.",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Flandre", sprite: "flandre", position: "center" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "Yayyy~! Did I do a good job, Remilia?",
    background: "dieng",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "(faint smile) I suppose I can give credit where it’s due. Well done, Flandre.",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Flandre", sprite: "flandre", position: "center" }
    ],
    halt: false
  },
  {
    speaker: "Flandre",
    text: "(grinning brightly) Yaaaay~!",
    background: "dieng",
    characters: [
      { name: "Flandre", sprite: "flandre", position: "center" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Reimu",
    text: "That was... anticlimactic.",
    background: "dieng",
    characters: [
      { name: "Reimu", sprite: "reimu", position: "left" },
      { name: "Remilia", sprite: "remilia", position: "right" }
    ],
    halt: false
  },
  {
    speaker: "Remilia",
    text: "Doesn’t matter. If it means we can leave this place any sooner, I’ll take it. Let’s go back.",
    background: "dieng",
    characters: [
      { name: "Remilia", sprite: "remilia", position: "right" },
      { name: "Reimu", sprite: "reimu", position: "left" }
    ],
    halt: false
  }
];