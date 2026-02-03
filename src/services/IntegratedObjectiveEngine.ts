import { 
  ObjectiveState, 
  ObjectiveDecision, 
  WinProbFeatures, 
  RecommendationType 
} from '../types/objectives';
import { LolObjectiveEngine } from './LolObjectiveEngine';
import { XgboostWinProbModel } from './XgboostWinProbModel';

export class IntegratedObjectiveEngine {
  private winProbModel: XgboostWinProbModel;
  private baseEngine: LolObjectiveEngine;

  constructor() {
    this.winProbModel = new XgboostWinProbModel();
    this.baseEngine = new LolObjectiveEngine();
  }

  async decideObjective(
    objectiveState: ObjectiveState,
    liveFeatures: WinProbFeatures
  ): Promise<ObjectiveDecision> {
    
    // 1. Get base objective decision
    let baseDecision: ObjectiveDecision;
    
    switch (objectiveState.objective) {
      case 'BARON':
        baseDecision = this.baseEngine.decideBaron(objectiveState);
        break;
      case 'DRAGON':
        baseDecision = this.baseEngine.decideDragon(objectiveState);
        break;
      case 'HERALD':
        baseDecision = this.baseEngine.decideHerald(objectiveState);
        break;
      case 'TOWER':
        baseDecision = this.baseEngine.decideTower(objectiveState);
        break;
      default:
        baseDecision = this.baseEngine.decideDragon(objectiveState);
    }
    
    // 2. Get current win probability
    const winProb = await this.winProbModel.predict(liveFeatures);
    
    // 3. Adjust thresholds dynamically based on win prob
    const adjustedDecision = this.adjustForWinProb(
      baseDecision, 
      winProb.p_win_team, 
      liveFeatures
    );

    return {
      ...adjustedDecision,
      winProbContext: winProb.p_win_team,
      modelConfidence: winProb.confidence,
      featureImpact: winProb.feature_importance,
      rationale: [
        ...adjustedDecision.rationale, 
        `WinProb: ${(winProb.p_win_team * 100).toFixed(0)}%`
      ]
    };
  }

  private adjustForWinProb(
    base: ObjectiveDecision,
    pWin: number,
    features: WinProbFeatures
  ): ObjectiveDecision {
    
    // Win probability tiers adjust risk tolerance
    const riskTier = pWin > 0.65 ? 'AGGRESSIVE' : 
                    pWin > 0.45 ? 'BALANCED' : 'CONSERVATIVE';
    
    let recommendation: RecommendationType = base.recommendation;
    let confidenceAdjust = 0;
    
    // AGGRESSIVE (winning): Take more objectives
    if (riskTier === 'AGGRESSIVE' && base.recommendation === 'CONTEST') {
      recommendation = 'SECURE';
      confidenceAdjust = +0.08;
    }
    
    // CONSERVATIVE (losing): Protect leads or farm safely
    if (riskTier === 'CONSERVATIVE' && base.recommendation === 'SECURE') {
      recommendation = features.gold_diff > 2000 ? 'SECURE' : 'CONTEST';
      confidenceAdjust = pWin < 0.4 ? -0.12 : 0;
    }
    
    // Critical win prob windows - force decisions
    if (pWin > 0.75 && base.expectedValue > 0.5) {
      recommendation = 'SECURE';
      confidenceAdjust = +0.15;
    }
    
    const newConfidence = Math.min(0.98, Math.max(0.3, base.confidence + confidenceAdjust));
    
    return {
      ...base,
      recommendation,
      confidence: newConfidence,
      winProbAdjusted: true
    };
  }
}
