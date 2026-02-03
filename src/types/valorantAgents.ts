import { AgentOutput } from './agents';
import type { ExploitablePattern } from './opponentPatterns';
import { CounterattackScript } from './counterattack';

export interface ValorantOpponentProfile {
  likelyOpener?: string; // e.g., Jett mid peek at start, Op angle on guns
  economy_habits?: string[]; // e.g., force buy addiction, one player forces
  anchor_info?: { site: string; player_hint?: string }[];
  postplant_tendencies?: string[];
  primary_playstyle?: string;
}

export interface ValorantOpponentAnalysisOutput extends AgentOutput {
  opponent_profile: ValorantOpponentProfile;
  exploitable_patterns: ExploitablePattern[];
  quick_rules: string[]; // short actionable mantra
  live_counterattack?: CounterattackScript;
}