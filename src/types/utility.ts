export type GameType = 'VALORANT' | 'LOL';

export interface UtilityUsageRecommendation {
  type: string;
  purpose: string;
  timing: string;
  agents?: string[];
  winRateImpact: string;
  priority: number; // 1-3, 1 is highest
}

export interface TacticalUtilityState {
  game: GameType;
  matchTime: number; // seconds for Valorant, minutes for LoL (or seconds for both, let's stick to seconds)
  phase: string;
  role: string;
  agent?: string; // Champion for LoL
  economy?: number;
  inventory?: string[];
}

export interface ValorantUtilityGuide {
  category: string;
  purpose: string;
  timing: string;
  agents: string[];
  winRateImpact: string;
}

export interface LolSummonerSpellGuide {
  spell: string;
  phase: string;
  trigger: string;
  successRate: string;
}

export interface UtilityDecision {
  recommendations: UtilityUsageRecommendation[];
  decisionTreePath: string[];
  counterplay: string[];
  economyAdvice?: string;
  proBenchmarks: string[];
}

export interface UtilityMetric {
  name: string;
  immortalPlus?: string | number;
  radiant?: string | number;
  pro?: string | number;
  soloQueue?: string | number;
  diamondPlus?: string | number;
  challenger?: string | number;
  lckPro?: string | number;
}

export interface UtilityMistake {
  id: number;
  title: string;
  frequency: string;
  wrong: string;
  right: string;
  impact: string;
  fix?: string;
  rule?: string;
  pattern?: string;
  priority?: string;
  category: 'CRITICAL' | 'MID-ROUND' | 'POSITIONAL' | 'ECONOMY';
}

export interface RoleTrap {
  role: string;
  trap: string;
}

export interface UtilityMistakesData {
  topMistakes: UtilityMistake[];
  roleTraps: RoleTrap[];
  checklist: string[];
  drills: {
    time: string;
    task: string;
  }[];
  stats: {
    platWR: string;
    immortalWR: string;
    gapCauses: { label: string; value: string }[];
  };
}

export interface RoleBenchmark {
  role: string;
  metrics: {
    label: string;
    value: string | number;
    subtext?: string;
  }[];
}

export interface MapUtility {
  mapName: string;
  metrics: {
    label: string;
    value: string | number;
  }[];
}

export interface UtilityDashboardData {
  valorant: {
    coreKpis: UtilityMetric[];
    roleBenchmarks: RoleBenchmark[];
    mapDashboards: MapUtility[];
    mistakes?: UtilityMistakesData;
  };
  lol: {
    summonerSpellEfficiency: UtilityMetric[];
    objectiveSuccess: {
      name: string;
      soloQueue: string;
      lckPro: string;
    }[];
    roleBenchmarks: RoleBenchmark[];
    timingComparison?: {
      utility: string;
      soloQueue: string;
      teamPlay: string;
      reason: string;
    }[];
  };
  economy: {
    valorant: {
      label: string;
      value: string;
    }[];
    lol: {
      label: string;
      value: string;
    }[];
  };
  gapAnalysis: {
    metric: string;
    soloQueue: string;
    pro: string;
    gap: string;
  }[];
  trainingTargets: {
    metric: string;
    current: string;
    target: string;
    weeklyGains: string[];
  }[];
}

export interface Lineup {
  name: string;
  type: string;
  usage: string;
  coords: string;
  description: string;
  agents: string[];
}

export interface MapLineups {
  mapName: string;
  tagline: string;
  attack: Lineup[];
  defense: Lineup[];
}
