export type GameTag = 'VALORANT' | 'LEAGUE';

export type ValorantPlaystyle = 'rush_wq' | 'aggressive_push' | 'lurker' | 'utility_entry' | 'anchor' | 'space_taker';
export type LeaguePlaystyle = 'early_snowball' | 'scaler' | 'split_pusher' | 'teamfight' | 'poke' | 'pick_comp';

export type PlaystyleType = ValorantPlaystyle | LeaguePlaystyle;

export interface PlaystyleProfile {
  id?: string; // player id when available
  game: GameTag;
  primary: PlaystyleType;
  secondary?: PlaystyleType;
  confidence: number; // 0-1
  keyMetrics: number[]; // backing metrics in analyzer order
  counterPlay: string[]; // suggested counters
}

// Minimal telemetry contracts (extend as needed)
export interface ValorantPlayerTelemetry {
  rounds: number;
  firstDeaths: number;
  firstKills: number;
  assists: number;
  clutches: number;
  pressureRounds: number; // rounds tagged high pressure (e.g., 1vX, post-plant)
  utilKills: number;
  totalKills: number;
}

export interface LolPlayerTelemetry {
  duration: number; // seconds
  cs: Record<string, number>; // e.g., { '0-10': 95, '25+': 220 }
  deaths: Record<string, number>; // e.g., { '0-10': 1, '10-20': 3 }
  soloKills: number;
  totalKills: number;
  tpCasts: number;
  vision: number; // total vision score
}

export interface TeamPlaystyle {
  primaryThreat: PlaystyleType;
  counterStrategy: string[];
  executePriority: string[]; // 1-3 word coach calls
}
