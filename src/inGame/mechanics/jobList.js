export const jobList = {
  "BlokM": [
    {
      Id: "blokm_mcd",
      name: "Kerja di MCD",
      duration: 4,
      effects: {
        money: 32,
        energy: -28,
        hunger: -20,
        happiness: -32,
        hygiene: -40
      }
    },
    {
      Id: "blokm_tokobuku",
      name: "Jaga Toko Buku",
      duration: 5,
      effects: {
        money: 40,
        energy: -35,
        hunger: -40,
        happiness: -20,
        hygiene: -40
      }
    },
    {
      Id: "blokm_satpam",
      name: "Satpam (malam)",
      duration: 6,
      effects: {
        money: 48,
        energy: -42,
        hunger: -30,
        happiness: -24,
        hygiene: -48
      }
    }
  ],
  "Dieng": [
    {
      Id: "dieng_guIde",
      name: "Jadi Tour GuIde",
      duration: 2,
      effects: {
        money: 16,
        energy: -20,
        hunger: -16,
        happiness: -14,
        hygiene: -16
      }
    }
  ],
  "Pantai": [
    {
      Id: "pantai_lifeguard",
      name: "LifeGuard",
      duration: 4,
      effects: {
        money: 32,
        energy: -40,
        hunger: -28,
        happiness: -28,
        hygiene: -36
      },
      chanceBonus: {
        chance: 0.25,
        reward: {
          money: 8,
          happiness: 10
        }
      }
    },
    {
      Id: "pantai_guIde",
      name: "Tour GuIde",
      duration: 2,
      effects: {
        money: 16,
        energy: -20,
        hunger: -16,
        happiness: -14,
        hygiene: -16
      },
      chanceBonus: {
        chance: 0.25
      }
    }
  ]
};
