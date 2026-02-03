import type { RecommendationType } from './objectives';

export type PriorityObjectiveType = 'TOWER' | 'DRAGON' | 'BARON' | 'HERALD' | 'INHIBITOR' | 'VOIDGRUBS' | 'NEXUS';

export interface LiveGameState {
  matchTime: number;           // seconds
  objectives: PriorityObjectiveState[];
  goldDiff: number;
  towersLeft: { team: number; enemy: number };
  deathTimers: number[];       // avg seconds
  sidelanePressure: boolean[];
  allyCountNear?: number;      // for feasibility
  enemyCountNear?: number;     // for feasibility
  visionInPit?: number;        // for feasibility
}

export interface ObjectivePriority {
  type: PriorityObjectiveType;
  location: string;            // 'top', 'mid', 'bot'
  priorityScore: number;       // 0-100
  feasibility: number;         // 0-1
  strategicValue: number;      // 0-1
  timeToEnemyResponse: number; // seconds
  coachCall: string;
  recommendedAction: RecommendationType;
}

export interface PriorityObjectiveState {
  type: PriorityObjectiveType;
  location: string;
  timeToSpawn: number; // seconds
  dragonType?: 'infernal' | 'ocean' | 'mountain' | 'cloud' | 'soul' | 'elder' | 'normal';
}
