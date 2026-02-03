import { MapLineups } from '../types/utility';

export const PRO_LINEUPS: MapLineups[] = [
  {
    mapName: "ASCENT",
    tagline: "Most Popular Map",
    attack: [
      {
        name: "A MAIN → A HEAVEN",
        type: "Sova Recon",
        usage: "87%",
        coords: "(18.5, 10.2) → Angle: Heaven stairs",
        description: "Standard recon for clearing heaven",
        agents: ["Sova", "Fade", "Skye"]
      },
      {
        name: "A MAIN → A DEFAULT",
        type: "Breach Flash",
        usage: "76%",
        coords: "(16.2, 8.9) → Hits default + link",
        description: "Flashes default planter and link entrance",
        agents: ["Breach", "KAY/O"]
      },
      {
        name: "B MAIN → B DEFAULT",
        type: "Raze Satchel + Satchel",
        usage: "82%",
        coords: "(13.8, 14.1) → B main box → Default planter",
        description: "Quick entry to clear default planter",
        agents: ["Raze"]
      }
    ],
    defense: [
      {
        name: "A LINK → A HEAVEN",
        type: "Cypher Tripwire",
        usage: "91%",
        coords: "Link stairs → Heaven door (one-way)",
        description: "Powerful one-way tripwire for heaven door",
        agents: ["Cypher", "Killjoy"]
      },
      {
        name: "MIDDLE → A MAIN",
        type: "Chamber TP",
        usage: "68%",
        coords: "Mid vent → A main tree (flank watch)",
        description: "Fast flank watch from mid vent",
        agents: ["Chamber", "Yoru"]
      }
    ]
  },
  {
    mapName: "BIND",
    tagline: "IGL Favorite",
    attack: [
      {
        name: "A SHORT → A DEFAULT",
        type: "Sova Recon",
        usage: "89%",
        coords: "(5.2, 12.8) → A default + site box",
        description: "Clears A default and back site box",
        agents: ["Sova", "Fade"]
      },
      {
        name: "B SHORT → B LINK",
        type: "Raze Boom Bot",
        usage: "79%",
        coords: "(22.1, 3.4) → B link planter path",
        description: "Clears B link path for planter",
        agents: ["Raze", "Sova"]
      },
      {
        name: "A TELEPORT → A SITE",
        type: "Breach Aftershock",
        usage: "73%",
        coords: "Teleporter exit → A default planter",
        description: "Punishes A default plant from teleporter",
        agents: ["Breach"]
      }
    ],
    defense: [
      {
        name: "B HOOKAH → B MAIN",
        type: "Killjoy Nanoswarm",
        usage: "88%",
        coords: "Hookah stairs → B main planter",
        description: "Denies B main plant from Hookah",
        agents: ["Killjoy", "Cypher"]
      },
      {
        name: "A BATH → A LINK",
        type: "Cypher Cage",
        usage: "85%",
        coords: "Bath window → A link one-way",
        description: "One-way cage from bath to link",
        agents: ["Cypher", "Killjoy"]
      }
    ]
  },
  {
    mapName: "HAVEN",
    tagline: "Utility Heavy",
    attack: [
      {
        name: "A LONG → A HEAVEN FLASH",
        type: "KAY/O Flash",
        usage: "84%",
        coords: "(8.7, 18.2) → A heaven box",
        description: "Flashes anyone holding from heaven box",
        agents: ["KAY/O", "Phoenix"]
      },
      {
        name: "C LONG → C SITE",
        type: "Raze Grenade",
        usage: "77%",
        coords: "(4.1, 22.3) → C long box clear",
        description: "Clears C long corner box",
        agents: ["Raze", "Breach"]
      },
      {
        name: "B → GARAGE → A SHORT",
        type: "Sova Recon",
        usage: "81%",
        coords: "B garage → A short cross",
        description: "Clears A short cross from garage",
        agents: ["Sova", "Skye"]
      }
    ],
    defense: [
      {
        name: "C LONG → C HEAVEN",
        type: "Killjoy Turret",
        usage: "90%",
        coords: "C long corner → Heaven watch",
        description: "Turret setup to watch C heaven from long",
        agents: ["Killjoy", "Cypher"]
      },
      {
        name: "GARAGE → A MAIN",
        type: "Cypher Tripwire",
        usage: "86%",
        coords: "Garage stairs → A main planter path",
        description: "Tripwire for A main planter path",
        agents: ["Cypher", "Killjoy"]
      }
    ]
  },
  {
    mapName: "BREEZE",
    tagline: "Open Map",
    attack: [
      {
        name: "A MAIN → A HALL",
        type: "Sova Recon",
        usage: "83%",
        coords: "(15.4, 9.8) → A hall + pythons",
        description: "Clears A hall and pythons",
        agents: ["Sova", "Fade"]
      },
      {
        name: "B → A ROCKS",
        type: "Raze Satchel",
        usage: "78%",
        coords: "B tunnel → A rocks crossfire",
        description: "Quick rotate or satchel entry to A rocks",
        agents: ["Raze"]
      },
      {
        name: "C → B ELBOW",
        type: "Breach Stun",
        usage: "74%",
        coords: "C tunnel → B elbow planter",
        description: "Stuns B elbow planter from C tunnel",
        agents: ["Breach", "Skye"]
      }
    ],
    defense: [
      {
        name: "A MAIN → A HALL",
        type: "Killjoy Nanoswarm",
        usage: "89%",
        coords: "A main stairs → Hall box",
        description: "Denies A hall entry from main stairs",
        agents: ["Killjoy", "Cypher"]
      },
      {
        name: "B TUNNEL → B ELBOW",
        type: "Cypher Cage",
        usage: "87%",
        coords: "B tunnel → Elbow one-way",
        description: "One-way cage for B elbow",
        agents: ["Cypher", "Killjoy"]
      }
    ]
  },
  {
    mapName: "ICEBOX",
    tagline: "Vertical Utility",
    attack: [
      {
        name: "A RAMP → A RAFTERS",
        type: "Sova Recon",
        usage: "86%",
        coords: "(12.3, 16.7) → A rafters + pipe",
        description: "Clears A rafters and pipe area",
        agents: ["Sova", "Skye"]
      },
      {
        name: "B GREEN → B PURPLE",
        type: "Raze Satchel",
        usage: "80%",
        coords: "(8.9, 20.1) → B purple planter",
        description: "Aggressive entry to B purple",
        agents: ["Raze"]
      },
      {
        name: "MID → A HALL",
        type: "Breach Flash",
        usage: "75%",
        coords: "Mid top → A hall box",
        description: "Flashes A hall box from mid top",
        agents: ["Breach", "KAY/O"]
      }
    ],
    defense: [
      {
        name: "A PIPE → A RAFTERS",
        type: "Killjoy Turret",
        usage: "92%",
        coords: "A pipe stairs → Rafters watch",
        description: "Turret to watch rafters from pipe stairs",
        agents: ["Killjoy"]
      },
      {
        name: "B ORANGE → B GREEN",
        type: "Cypher Tripwire",
        usage: "88%",
        coords: "Orange stairs → Green cross",
        description: "Tripwire for green cross from orange",
        agents: ["Cypher", "Killjoy"]
      }
    ]
  },
  {
    mapName: "LOTUS",
    tagline: "3-Site Complexity",
    attack: [
      {
        name: "A MAIN → A LINK",
        type: "Sova Recon",
        usage: "85%",
        coords: "(14.2, 11.8) → A link + bend",
        description: "Clears A link and bend",
        agents: ["Sova", "Fade"]
      },
      {
        name: "B → C LINK",
        type: "Raze Boom Bot",
        usage: "79%",
        coords: "B stairs → C link planter",
        description: "Clears C link path from B stairs",
        agents: ["Raze", "Sova"]
      },
      {
        name: "C MAIN → C TREE",
        type: "Breach Stun",
        usage: "76%",
        coords: "(6.8, 18.4) → C tree + site",
        description: "Stuns C tree and site area",
        agents: ["Breach"]
      }
    ],
    defense: [
      {
        name: "A LINK → A MAIN",
        type: "Killjoy Nanoswarm",
        usage: "91%",
        coords: "A link stairs → Main planter",
        description: "Denies A main plant from link stairs",
        agents: ["Killjoy"]
      },
      {
        name: "C LINK → C TREE",
        type: "Cypher Cage",
        usage: "87%",
        coords: "C link → Tree one-way",
        description: "One-way cage for C tree",
        agents: ["Cypher", "Killjoy"]
      }
    ]
  },
  {
    mapName: "SUNSET",
    tagline: "New Map",
    attack: [
      {
        name: "A MAIN → A CORNER",
        type: "Sova Recon",
        usage: "82%",
        coords: "(17.1, 10.5) → A corner box",
        description: "Clears A corner box",
        agents: ["Sova", "Skye"]
      },
      {
        name: "B MAIN → B ELBOW",
        type: "Raze Satchel",
        usage: "77%",
        coords: "(13.4, 15.2) → B elbow planter",
        description: "Quick entry to B elbow",
        agents: ["Raze"]
      },
      {
        name: "MID → A ATTACKER SPAWN",
        type: "Breach Flash",
        usage: "74%",
        coords: "Mid vent → A spawn flank",
        description: "Flashes A spawn flank from mid vent",
        agents: ["Breach", "KAY/O"]
      }
    ],
    defense: [
      {
        name: "A ELBOW → A CORNER",
        type: "Killjoy Turret",
        usage: "89%",
        coords: "A elbow → Corner watch",
        description: "Turret watches A corner from elbow",
        agents: ["Killjoy"]
      },
      {
        name: "B MAIN → B ELBOW",
        type: "Cypher Tripwire",
        usage: "86%",
        coords: "B main stairs → Elbow cross",
        description: "Tripwire for elbow cross from B main",
        agents: ["Cypher"]
      }
    ]
  }
];
