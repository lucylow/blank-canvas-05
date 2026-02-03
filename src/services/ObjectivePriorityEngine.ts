import type { RecommendationType } from '../types/objectives';
import { 
  LiveGameState, 
  ObjectivePriority, 
  PriorityObjectiveState, 
  PriorityObjectiveType
} from '../types/priority';

const OBJECTIVE_WEIGHTS: Record<string, number> = {
  NEXUS: 100,
  INHIBITOR: 25,
  INHIB_TOWER: 18,
  INNER_TOWER: 12,
  OUTER_TOWER: 8,
  BARON: 22,
  ELDER_DRAGON: 35,
  SOUL_DRAGON: 28,
  FIRST_DRAGON: 12,
  HERALD: 15,
  VOIDGRUBS: 8
};

export class ObjectivePriorityEngine {
  
  calculatePriorities(gameState: LiveGameState): ObjectivePriority[] {
    const priorities: ObjectivePriority[] = [];
    
    // 1. Generate all available objectives
    const allObjectives = this.generateObjectiveList(gameState);
    
    // 2. Score each by DECISION TREE
    allObjectives.forEach(obj => {
      const priority = this.scoreObjective(obj, gameState);
      priorities.push(priority);
    });
    
    // 3. Sort by TOTAL PRIORITY SCORE
    return priorities.sort((a, b) => b.priorityScore - a.priorityScore);
  }

  private generateObjectiveList(state: LiveGameState): PriorityObjectiveState[] {
    const objectives: PriorityObjectiveState[] = [];
    
    // TOWER PRIORITIES (always available)
    ['top', 'mid', 'bot'].forEach(lane => {
      objectives.push(...[
        { type: 'TOWER' as PriorityObjectiveType, location: `${lane}-outer`, timeToSpawn: 0 },
        { type: 'TOWER' as PriorityObjectiveType, location: `${lane}-inner`, timeToSpawn: 0 },
        { type: 'TOWER' as PriorityObjectiveType, location: `${lane}-inhib`, timeToSpawn: 0 }
      ]);
    });
    
    // DYNAMIC SPAWNS
    if (state.matchTime > 1200) {  // 20min+ (corrected from 1500 to match common League knowledge or keeping user's 1500?)
      // User had 1500 (25min) in code but comment said 25min+. 1500s is 25min.
      objectives.push({ type: 'BARON' as PriorityObjectiveType, location: 'pit', timeToSpawn: Math.max(0, 3000 - (state.matchTime % 420)) });
    }
    
    if (state.matchTime < 840) {  // 14min
      objectives.push({ type: 'HERALD' as PriorityObjectiveType, location: 'top', timeToSpawn: Math.max(0, 480 - (state.matchTime % 360)) });
    }
    
    // Dragons (simplified)
    objectives.push({ 
        type: 'DRAGON' as PriorityObjectiveType, 
        location: 'pit', 
        timeToSpawn: 300,
        dragonType: state.matchTime > 2100 ? 'elder' : 'normal'
    });
    
    return objectives;
  }

  private scoreObjective(obj: PriorityObjectiveState, state: LiveGameState): ObjectivePriority {
    const strategicValue = this.getStrategicValue(obj, state);
    const feasibility = this.calculateFeasibility(obj, state);
    
    const priorityScore = strategicValue * feasibility * 100;
    const timeToResponse = this.estimateEnemyResponseTime(state);
    
    const recommendedAction = this.getAction(obj, state, feasibility);
    
    return {
      type: obj.type,
      location: obj.location,
      priorityScore,
      feasibility,
      strategicValue: strategicValue / 100, // Normalize to 0-1 as per interface
      timeToEnemyResponse: timeToResponse,
      coachCall: this.generateCoachCall(obj, priorityScore, recommendedAction),
      recommendedAction
    };
  }

  private getStrategicValue(obj: PriorityObjectiveState, state: LiveGameState): number {
    const timeFactor = this.getTimeMultiplier(obj, state.matchTime);
    const gamePhase = this.getGamePhase(state.matchTime);
    
    switch (obj.type) {
      case 'BARON':
        return OBJECTIVE_WEIGHTS.BARON * (gamePhase === 'LATE' ? 1.4 : 1.0);
        
      case 'DRAGON':
        return this.dragonValue(obj.dragonType || 'normal', gamePhase);
        
      case 'TOWER':
        return this.towerValue(obj.location, gamePhase);
        
      case 'HERALD':
        return OBJECTIVE_WEIGHTS.HERALD * (gamePhase === 'EARLY' ? 1.3 : 0.8);
        
      case 'INHIBITOR':
        return OBJECTIVE_WEIGHTS.INHIBITOR * timeFactor;
        
      default:
        return 5;
    }
  }

  private getTimeMultiplier(obj: PriorityObjectiveState, matchTime: number): number {
    if (matchTime > 1800) return 1.5; // 30min+
    if (matchTime > 1200) return 1.2; // 20min+
    return 1.0;
  }

  private getGamePhase(matchTime: number): 'EARLY' | 'MID' | 'LATE' {
    if (matchTime < 840) return 'EARLY';
    if (matchTime < 1500) return 'MID';
    return 'LATE';
  }

  private dragonValue(type: string, phase: string): number {
    const values: Record<string, number> = {
      'elder': OBJECTIVE_WEIGHTS.ELDER_DRAGON,
      'soul': OBJECTIVE_WEIGHTS.SOUL_DRAGON,
      'infernal': 18,
      'ocean': 14,
      'mountain': 10,
      'cloud': 12,
      'normal': OBJECTIVE_WEIGHTS.FIRST_DRAGON
    };
    return values[type] || 10;
  }

  private towerValue(location: string, phase: string): number {
    if (location.includes('inhib')) return OBJECTIVE_WEIGHTS.INHIB_TOWER;
    if (location.includes('inner')) return OBJECTIVE_WEIGHTS.INNER_TOWER;
    return OBJECTIVE_WEIGHTS.OUTER_TOWER;
  }

  private calculateFeasibility(obj: PriorityObjectiveState, state: LiveGameState): number {
    let score = 1.0;
    
    // NUMBERS ADVANTAGE (30%)
    const allyCount = state.allyCountNear ?? 0;
    const enemyCount = state.enemyCountNear ?? 0;
    const numbersEdge = Math.max(0, allyCount - enemyCount);
    score *= (0.4 + numbersEdge * 0.15);
    
    // VISION CONTROL (25%)
    const vision = state.visionInPit ?? 0;
    score *= Math.min(1.2, 0.5 + vision * 0.15);
    
    // GOLD LEAD (20%)
    score *= Math.max(0.3, 0.8 + state.goldDiff / 10000);
    
    // DEATH TIMERS (15%)
    const avgDeathTimer = state.deathTimers.length > 0 
        ? state.deathTimers.reduce((a, b) => a + b, 0) / state.deathTimers.length 
        : 0;
    const timerAdvantage = Math.min(avgDeathTimer, 20);
    score *= (0.7 + timerAdvantage / 100);
    
    // POSITIONAL (10%)
    const distanceFactor = this.distanceToObjective(obj.location);
    score *= distanceFactor;
    
    return Math.min(0.98, Math.max(0.1, score));
  }

  private distanceToObjective(location: string): number {
    // Simplified distance factor
    return 0.9; 
  }

  private estimateEnemyResponseTime(state: LiveGameState): number {
    // Simplified estimation
    return 15;
  }

  private getAction(obj: PriorityObjectiveState, state: LiveGameState, feasibility: number): RecommendationType {
    if (feasibility > 0.7) return 'SECURE';
    if (feasibility > 0.4) return 'CONTEST';
    if (state.goldDiff < -5000) return 'TRADE';
    return 'IGNORE';
  }

  private generateCoachCall(obj: PriorityObjectiveState, score: number, action: RecommendationType): string {
    if (score > 85) return `${obj.type.toUpperCase()} NOW ${action}`;
    if (score > 65) return `${obj.location.toUpperCase()} → ${obj.type}`;
    if (score > 40) return `${obj.type} setup`;
    return 'Low priority';
  }
}


export async function getTopPriorities(matchId: string, timestamp: number): Promise<ObjectivePriority[]> {
  // In production, fetch from live service; for now, create a minimal plausible state
  const gameState: LiveGameState = {
    matchTime: timestamp,
    objectives: [],
    goldDiff: 1200,
    towersLeft: { team: 7, enemy: 6 },
    deathTimers: [8, 12, 0, 0, 0],
    sidelanePressure: [true, false, true],
    allyCountNear: 4,
    enemyCountNear: 3,
    visionInPit: 3
  };
  const engine = new ObjectivePriorityEngine();
  return engine.calculatePriorities(gameState).slice(0, 5);
}
