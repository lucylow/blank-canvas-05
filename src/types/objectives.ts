export type ObjectiveType = 'DRAGON' | 'BARON' | 'HERALD' | 'TOWER';
export type RecommendationType = 'SECURE' | 'CONTEST' | 'AVOID' | 'TRADE';
export type QueueType = 'SOLO' | 'FLEX';

export interface ObjectiveState {
  objective: ObjectiveType;
  queueType?: QueueType;
  timeToSpawn: number; // seconds
  matchTime: number; // total game time
  teamGoldDiff: number;
  allyCountNear: number;
  enemyCountNear: number;
  visionInPit: number; // friendly wards
  enemyVisionInPit: number;
  ultimatesUp: number; // team ultimates ready
  enemyUltimatesUp: number;
  smiteReady: boolean;
  enemySmiteReady: boolean;
  sidelanePressure: boolean; // can we threaten sidelanes?
  playerHpPercent: number; // avg team HP%
}

export interface WinProbFeatures {
  // Live game state (20+ features from pro models)
  gold_diff: number;
  exp_diff: number;
  ally_count_near: number;
  enemy_count_near: number;
  vision_score_diff: number;
  tower_count_diff: number;
  drake_count_diff: number;
  baron_owned: 0 | 1;
  match_time_minutes: number;
  player_hp_pct: number[];
  ultimates_up: number;
  tp_available: number;
  smite_ready: 0 | 1;
  last_teamfight_gold_delta: number;
  lane_priority_index: number;
}

export interface WinProbPrediction {
  p_win_team: number;           // 0-1 win probability
  feature_importance: Record<string, number>;
  confidence: number;           // Model certainty
}

export interface ObjectiveDecision {
  recommendation: RecommendationType;
  confidence: number;
  expectedValue: number;
  rationale: string[];
  pSuccess: number;
  winProbDelta: number; // % winrate increase
  coachCall: string; // 1-3 word call
  winProbContext?: number;
  modelConfidence?: number;
  featureImpact?: Record<string, number>;
  winProbAdjusted?: boolean;
}
