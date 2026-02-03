import { ObjectiveState, ObjectiveDecision, RecommendationType } from '../types/objectives';

export class LolObjectiveEngine {
  private readonly OBJECTIVE_VALUES = {
    DRAGON: { base: 0.06, elder: 0.15 }, // +6-15% win prob
    BARON: 0.12, // +12% avg
    HERALD: 0.04, // +4%
    TOWER: 0.03 // +3% per outer
  };

  public decideDragon(state: ObjectiveState): ObjectiveDecision {
    const pSuccess = this.calculatePSuccess(state);
    const isElder = state.matchTime > 2100;
    const baseValue = isElder ? this.OBJECTIVE_VALUES.DRAGON.elder : this.OBJECTIVE_VALUES.DRAGON.base;
    
    const evSecure = pSuccess * baseValue + (1 - pSuccess) * (-0.08); // failure cost
    const evAvoid = 0.02; // small EV from playing safe
    
    // Heuristic: Take if EV > avoid AND confidence >= 60%
    const recommendation: RecommendationType = evSecure > evAvoid && pSuccess >= 0.6 ? 'SECURE' : 'AVOID';

    return {
      recommendation,
      confidence: Math.min(0.95, pSuccess),
      expectedValue: evSecure,
      pSuccess,
      winProbDelta: pSuccess * baseValue * 100,
      rationale: this.buildRationale(state, recommendation),
      coachCall: recommendation === 'SECURE' ? (isElder ? 'Elder now' : 'Drake now') : 'Skip drake'
    };
  }

  public decideBaron(state: ObjectiveState): ObjectiveDecision {
    if (state.matchTime < 1200) {
      return {
        recommendation: 'AVOID',
        confidence: 1.0,
        expectedValue: 0,
        pSuccess: 0,
        winProbDelta: 0,
        rationale: ['Too early for Baron (<20min)'],
        coachCall: 'Wait Baron'
      };
    }

    const pSuccess = this.calculateBaronPSuccess(state);
    const baseValue = this.OBJECTIVE_VALUES.BARON;
    
    const evSecure = pSuccess * baseValue + (1 - pSuccess) * (-0.15); // Higher failure cost for Baron
    const evAvoid = 0.01;
    
    // Baron triggers: numbers advantage (4v3) OR vision secure (3-1) AND pSuccess >= 65%
    const numbersAdv = state.allyCountNear >= 4 && state.enemyCountNear <= 3;
    const visionSecure = state.visionInPit >= 3 && state.enemyVisionInPit <= 1;

    let recommendation: RecommendationType = 'AVOID';
    if ((numbersAdv || visionSecure) && pSuccess >= 0.65) {
      recommendation = 'SECURE';
    } else if (state.allyCountNear >= state.enemyCountNear) {
      recommendation = 'CONTEST';
    }

    return {
      recommendation,
      confidence: Math.min(0.95, pSuccess),
      expectedValue: evSecure,
      pSuccess,
      winProbDelta: pSuccess * baseValue * 100,
      rationale: this.buildRationale(state, recommendation),
      coachCall: recommendation === 'SECURE' ? 'Baron start' : (recommendation === 'CONTEST' ? 'Baron contest' : 'Baron risky')
    };
  }

  public decideHerald(state: ObjectiveState): ObjectiveDecision {
    const pSuccess = this.calculatePSuccess(state);
    const baseValue = this.OBJECTIVE_VALUES.HERALD;
    
    const evSecure = pSuccess * baseValue + (1 - pSuccess) * (-0.04);
    const evAvoid = 0.01;
    
    const recommendation: RecommendationType = evSecure > evAvoid && pSuccess >= 0.55 ? 'SECURE' : 'AVOID';

    return {
      recommendation,
      confidence: pSuccess,
      expectedValue: evSecure,
      pSuccess,
      winProbDelta: pSuccess * baseValue * 100,
      rationale: this.buildRationale(state, recommendation),
      coachCall: recommendation === 'SECURE' ? 'Herald now' : 'Skip Herald'
    };
  }

  public decideTower(state: ObjectiveState): ObjectiveDecision {
    const pSuccess = this.calculatePSuccess(state);
    const baseValue = this.OBJECTIVE_VALUES.TOWER;
    
    const evSecure = pSuccess * baseValue + (1 - pSuccess) * (-0.03);
    
    // Tower push heuristic: wave in front AND no enemy TP ready AND healthy players
    const waveStateOk = state.sidelanePressure;
    const healthy = state.playerHpPercent > 70;
    
    const recommendation: RecommendationType = (waveStateOk && healthy && pSuccess > 0.6) ? 'SECURE' : 'AVOID';

    return {
      recommendation,
      confidence: pSuccess,
      expectedValue: evSecure,
      pSuccess,
      winProbDelta: pSuccess * baseValue * 100,
      rationale: this.buildRationale(state, recommendation),
      coachCall: recommendation === 'SECURE' ? 'Push Tower' : 'Back off'
    };
  }

  private calculatePSuccess(state: ObjectiveState): number {
    let score = 0;

    const isFlex = state.queueType === 'FLEX';

    // Tunable weights with queue-specific adjustments
    const numbersWeight = isFlex ? 0.275 : 0.25; // Flex favors grouped fights
    const visionMax = isFlex ? 0.25 : 0.18; // Vision matters more in Flex
    const visionPerWardDelta = isFlex ? 0.125 : 0.09;
    const ultMax = isFlex ? 0.22 : 0.2; // Slightly more weight in Flex
    const smiteWeight = 0.1; // unchanged
    const hpWeight = isFlex ? 0.08 : 0.12; // Solo relies more on individual HP checks
    const goldMax = 0.15; // unchanged

    // Numbers advantage (~25-27.5%)
    score += Math.max(0, (state.allyCountNear - state.enemyCountNear) * (numbersWeight / 2));
    
    // Vision control (~18-25%)
    score += Math.min(visionMax, (state.visionInPit - state.enemyVisionInPit) * (visionPerWardDelta / 1.25));
    
    // Gold advantage (15%) - scaled to 10k diff
    score += Math.max(-goldMax, Math.min(goldMax, (state.teamGoldDiff / 10000) * goldMax));
    
    // Ultimates (20-22%)
    score += Math.min(ultMax, (state.ultimatesUp - state.enemyUltimatesUp) * (ultMax / 2));
    
    // Smite edge (10%)
    if (state.smiteReady && !state.enemySmiteReady) score += smiteWeight;
    if (!state.smiteReady && state.enemySmiteReady) score -= smiteWeight;
    
    // Health/state (8-12%)
    score += (state.playerHpPercent / 100) * hpWeight;
    
    return Math.min(0.98, Math.max(0.02, 0.5 + score));
  }

  private calculateBaronPSuccess(state: ObjectiveState): number {
    // Baron is harder and more risky than dragon
    const basePSuccess = this.calculatePSuccess(state);
    return Math.max(0.02, basePSuccess - 0.1); 
  }

  private buildRationale(state: ObjectiveState, rec: RecommendationType): string[] {
    const rationale: string[] = [];
    
    if (state.allyCountNear > state.enemyCountNear) {
      rationale.push(`${state.allyCountNear}v${state.enemyCountNear} numerical advantage`);
    } else if (state.enemyCountNear > state.allyCountNear) {
      rationale.push('Outnumbered near objective');
    }

    if (state.visionInPit > state.enemyVisionInPit) {
      rationale.push(`Vision control (${state.visionInPit} friendly vs ${state.enemyVisionInPit} enemy)`);
    } else if (state.enemyVisionInPit > state.visionInPit) {
      rationale.push('Poor vision control');
    }

    if (state.smiteReady && !state.enemySmiteReady) {
      rationale.push('Smite advantage (Enemy down)');
    } else if (!state.smiteReady && state.enemySmiteReady) {
      rationale.push('Enemy smite advantage');
    }

    if (state.ultimatesUp > state.enemyUltimatesUp) {
      rationale.push(`Ultimate advantage (+${state.ultimatesUp - state.enemyUltimatesUp})`);
    }

    if (state.sidelanePressure) {
      rationale.push('Sidelanes are pressured');
    }

    if (state.teamGoldDiff > 2000) {
      rationale.push('Gold lead');
    } else if (state.teamGoldDiff < -2500) {
      rationale.push('Significant gold deficit');
    }

    return rationale;
  }
}
