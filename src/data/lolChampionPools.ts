import { LoLRole } from '../types/esports';

export interface ChampionPoolEntry {
  champion: string;
  winRate: string;
  roleDescription: string[];
  items: string[];
  runes: {
    primary: string;
    secondary: string;
  };
  archetype: 'PRIMARY CARRY' | 'FLEX PICK' | 'COUNTERPICK';
}

export interface RolePool {
  role: LoLRole;
  priority: string;
  champions: ChampionPoolEntry[];
}

export const LOL_2026_SOLO_QUEUE_META: RolePool[] = [
  {
    role: 'TOP',
    priority: 'Split Carry Priority',
    champions: [
      {
        archetype: 'PRIMARY CARRY',
        champion: 'Aatrox',
        winRate: '57.2%',
        roleDescription: ['1v9 split threat', 'Scaling bruiser'],
        items: ['Divine Sunderer', 'Steraks'],
        runes: { primary: 'Conqueror', secondary: 'Resolve' }
      },
      {
        archetype: 'FLEX PICK',
        champion: 'KSante',
        winRate: '56.1%',
        roleDescription: ['Tanky split threat', 'Counters divers/engage'],
        items: ['Heartsteel', 'Deadmans'],
        runes: { primary: 'Grasp', secondary: 'Resolve' }
      },
      {
        archetype: 'COUNTERPICK',
        champion: 'Malphite',
        winRate: '55.8%',
        roleDescription: ['AP teamfight monster', 'Anti-AD carry'],
        items: ['Riftmaker', 'Demonic'],
        runes: { primary: 'Aftershock', secondary: 'Sorcery' }
      }
    ]
  },
  {
    role: 'JUNGLE',
    priority: 'Map Impact Priority',
    champions: [
      {
        archetype: 'PRIMARY CARRY',
        champion: 'Viego',
        winRate: '58.4%',
        roleDescription: ['Invade → snowball', '1v2 potential'],
        items: ['Divine Sunderer', 'Black Cleaver'],
        runes: { primary: 'Conqueror', secondary: 'Domination' }
      },
      {
        archetype: 'FLEX PICK',
        champion: 'Lee Sin',
        winRate: '56.7%',
        roleDescription: ['Early gank machine', 'Objective control'],
        items: ['Eclipse', 'Steraks'],
        runes: { primary: 'Electrocute', secondary: 'Precision' }
      },
      {
        archetype: 'COUNTERPICK',
        champion: 'Ekko',
        winRate: '55.9%',
        roleDescription: ['Anti-scaling junglers', 'Phase Rush mobility'],
        items: ['Lich Bane', 'Rocketbelt'],
        runes: { primary: 'Phase Rush', secondary: 'Sorcery' }
      }
    ]
  },
  {
    role: 'MID',
    priority: 'Roam + Pick Priority',
    champions: [
      {
        archetype: 'PRIMARY CARRY',
        champion: 'Sylas',
        winRate: '57.8%',
        roleDescription: ['Steal enemy ults', 'Scaling AP carry'],
        items: ['Lich Bane', 'Rocketbelt'],
        runes: { primary: 'Conqueror', secondary: 'Domination' }
      },
      {
        archetype: 'FLEX PICK',
        champion: 'Akali',
        winRate: '56.3%',
        roleDescription: ['1v2 outplay potential', 'Split or teamfight'],
        items: ['Profane Hydra', 'Hextech Rocketbelt'],
        runes: { primary: 'Conqueror', secondary: 'Resolve' }
      },
      {
        archetype: 'COUNTERPICK',
        champion: 'Veigar',
        winRate: '55.6%',
        roleDescription: ['Stacks = uncatchable', 'Anti-burst mages'],
        items: ["Liandry's", 'Rabadon'],
        runes: { primary: 'Phase Rush', secondary: 'Sorcery' }
      }
    ]
  },
  {
    role: 'ADC',
    priority: 'Scaling + Carry Priority',
    champions: [
      {
        archetype: 'PRIMARY CARRY',
        champion: 'Jinx',
        winRate: '57.1%',
        roleDescription: ['Hyper scaling', 'Teamfight monster'],
        items: ['Infinity Edge', 'Runaans'],
        runes: { primary: 'Lethal Tempo', secondary: 'Precision' }
      },
      {
        archetype: 'FLEX PICK',
        champion: 'Kai\'Sa',
        winRate: '56.2%',
        roleDescription: ['Early-mid spike', 'Hybrid damage'],
        items: ['Kraken Slayer', 'Guinsoo\'s'],
        runes: { primary: 'Hail of Blades', secondary: 'Domination' }
      },
      {
        archetype: 'COUNTERPICK',
        champion: 'Nilah',
        winRate: '55.7%',
        roleDescription: ['Anti-poke/shield break', 'Sustain fighter ADC'],
        items: ['Divine Sunderer', 'Steraks'],
        runes: { primary: 'Conqueror', secondary: 'Resolve' }
      }
    ]
  },
  {
    role: 'SUPPORT',
    priority: 'Pick + Vision Priority',
    champions: [
      {
        archetype: 'PRIMARY CARRY',
        champion: 'Pyke',
        winRate: '58.2%',
        roleDescription: ['Gold snowball', 'Pick potential'],
        items: ['Duskblade', 'Youmuus'],
        runes: { primary: 'Electrocute', secondary: 'Domination' }
      },
      {
        archetype: 'FLEX PICK',
        champion: 'Nautilus',
        winRate: '56.8%',
        roleDescription: ['Engage + peel', 'Objective setup'],
        items: ['Evenshroud', 'Zeke\'s'],
        runes: { primary: 'Aftershock', secondary: 'Resolve' }
      },
      {
        archetype: 'COUNTERPICK',
        champion: 'Rell',
        winRate: '55.9%',
        roleDescription: ['Anti-AD/diver comps', 'Disengage master'],
        items: ['Evenshroud', 'Thornmail'],
        runes: { primary: 'Aftershock', secondary: 'Resolve' }
      }
    ]
  }
];

export const JUNGLE_12_CHAMP_MASTER_POOL = {
  core: [
    { champion: 'Viego', type: 'Primary', winRate: '57%' },
    { champion: 'Lee Sin', type: 'Flex', winRate: '55%' },
    { champion: 'Ekko', type: 'Flex', winRate: '56%' },
    { champion: 'Xin Zhao', type: 'Flex', winRate: '54%' },
    { champion: 'Kha\'Zix', type: 'Assassin', winRate: '55%' },
    { champion: 'Graves', type: 'Early', winRate: '54%' }
  ],
  meta: [
    { champion: 'Sejuani', type: 'S-tier tank' },
    { champion: 'Lillia', type: 'S-tier AP' },
    { champion: 'Bel\'Veth', type: 'Meta scaler' },
    { champion: 'Nocturne', type: 'Meta diver' }
  ],
  counter: [
    { champion: 'Skarner', type: 'Anti-engage' },
    { champion: 'Nidalee', type: 'Anti-tank' }
  ]
};

export const ROLE_PRIORITY_WIN_RATE_IMPACT = [
  '1st Choice: Jungle ↔ Mid (highest flex)',
  '2nd Choice: Top ↔ Jungle (macro similar)',
  '3rd Choice: Mid ↔ Support (vision overlap)',
  'AVOID: ADC (team dependency hell)'
];

export const EXPANSION_STRATEGY = {
  phase1: {
    goal: 'Add 3 Flex Champs (50% WR minimum)',
    steps: [
      'Analyze Ban/Matchup Gaps',
      '80/15/5 Rule (80% core, 15% new flex, 5% experiment)',
      'Proficiency Gate (30 games min, 51% WR threshold)'
    ]
  },
  phase2: {
    goal: 'Main role mastery + 1 off-role',
    primaryPool: '6 champs (3 mains, 3 flex)',
    offRolePool: '3 champs (1 carry, 1 flex, 1 counter)'
  },
  phase3: {
    goal: 'Dynamic 12-champ rotation',
    corePool: '6 champs (3 mains, 3 flex)',
    metaPool: '4 champs (2 S-tier, 2 counter meta)',
    counterPool: '3 champs (Anti-engage, Anti-poke, Anti-split)'
  }
};

export const CHAMPION_ADDITION_CHECKLIST = [
  '54%+ WR in hands of mains',
  '<30min mastery curve',
  'Multiple win conditions',
  'Covers current pool gap (>20% new matchups)',
  'Patch stable'
];

export const ONE_TRICK_STRATEGY = {
  distribution: {
    primary: '60% games',
    flex: '30% games',
    counter: '10% games'
  },
  rules: [
    'MAX 3 CHAMPS/ROLE (95% coverage)',
    '100+ GAMES minimum per champ',
    'WR <54% → BENCH (swap counterpick)',
    'Patch >1.0 nerf → FLEX to primary',
    'Enemy bans primary → FLEX auto-win'
  ],
  practice: {
    primary: '4 games (80% focus)',
    flex: '1 game (20% maintenance)',
    new: '0 games'
  },
  matchupCoverage: {
    primary: 'Handles 65% meta',
    flex: 'Covers 25% counters',
    counter: 'Owns 10% hard matchups'
  },
  maintenanceProtocols: {
    poolHealthCheck: 'Every 50 games',
    actions: [
      'WR <52% → IMMEDIATE BENCH',
      '<30 games → MINIMUM PLAY requirement',
      '3 losses streak → SWAP champ',
      'Patch nerf >0.8% WR → FLEX to bench'
    ],
    emergencyRotation: 'Champ WR drops → Replace with identical archetype (EX: Viego nerfed → Add Belveth)'
  }
};

export const META_2026_NOTES = {
  patch: '16.2',
  buffed: ['Viego', 'Jinx', 'Sylas'],
  nerfed: ['Over-scaling ADCs'],
  rise: ['Split push bruisers'],
  fall: ['Engage supports'],
  expectedWRProgression: {
    'IRON-BRONZE': '53% (mechanics)',
    'SILVER-GOLD': '54% (lane kingdom)',
    'PLAT-DIAMOND': '55% (map impact)',
    'MASTER+': '56% (3-champ mastery)'
  }
};
