import { BaseAgentImpl } from './baseAgent';
import type { AgentInput, AgentTool, AgentInsight } from '@/types/agents';
import type { ValorantOpponentAnalysisOutput } from '@/types/valorantAgents';
import type { ExploitablePattern } from '@/types/opponentPatterns';
import { CounterattackEngine } from '@/services/CounterattackEngine';
import type { PlaystyleProfile } from '@/types/counterattack';

export class ValorantOpponentAnalysisAgent extends BaseAgentImpl {
  name = 'Valorant Opponent Analysis Agent';
  role = 'valorant_opponent_analysis' as any;
  description = 'Player-level opponent analysis with exploitable patterns for Valorant.';

  async execute(input: AgentInput): Promise<ValorantOpponentAnalysisOutput> {
    const patterns = this.buildValorantPatterns();

    // Minimal, deterministic playstyle inference (can be replaced with telemetry-driven logic)
    const inferredPlaystyle: string = this.inferValorantPlaystyle(patterns);
    const engine = new CounterattackEngine();
    const liveCounter = engine.generateCounter({ game: 'VALORANT', primary: inferredPlaystyle } as PlaystyleProfile);

    const insights: AgentInsight[] = [
      {
        id: 'val-opening-duel-same-peek',
        type: 'pattern',
        title: 'Opening-Duel: Same Peek, Same Time',
        description: 'Enemy Jett peeks mid at round start / same Op angle each gun round. Hold pre-aim or delay timing.',
        severity: 0.8,
        actionable: true,
      },
      {
        id: 'val-eco-force',
        type: 'strategy',
        title: 'Economy: Force Buy Addiction',
        description: 'Play range, don\'t give free weapons, break the economy fully on loss streaks.',
        severity: 0.7,
        actionable: true,
      },
    ];

    const recommendations = [
      'Most rounds are lost by impatience, not aim. Slow your opening and punish repeaters.',
      'Fake pressure to draw util, then re-hit after cooldowns.',
      'Identify weak static anchor and hit that site repeatedly.',
    ];

    return {
      ...this.createBaseOutput(insights, recommendations, 0.86),
      opponent_profile: {
        likelyOpener: 'Repeated early mid peek / consistent Op angle on gun rounds',
        economy_habits: ['Force Buy Addiction', 'One Player Always Forces'],
        anchor_info: [{ site: 'A', player_hint: 'Static anchor identified from rotations' }],
        postplant_tendencies: ['Peek after plant', 'Same post-plant positions'],
        primary_playstyle: inferredPlaystyle,
      },
      exploitable_patterns: patterns,
      quick_rules: [
        'Hold pre-aim or delay: punish Same Peek, Same Time',
        'Fake → pull utility → re-hit after cooldowns',
        'Punish over-rotations with walk-back hits late',
      ],
      live_counterattack: liveCounter,
    };
  }

  private inferValorantPlaystyle(patterns: ExploitablePattern[]): string {
    // Heuristic mapping from detected patterns to one of the six playstyles
    const ids = new Set(patterns.map(p => p.id));
    if (ids.has('val-open-same-peek')) return 'rush_wq';
    if (ids.has('val-rot-over-rotate')) return 'anchor';
    if (ids.has('val-util-dump-on-timer')) return 'utility_entry';
    if (ids.has('val-open-aggressive-after-win')) return 'aggressive_push';
    if (ids.has('val-rot-static-anchors')) return 'anchor';
    if (ids.has('val-post-peek-after-plant')) return 'utility_entry';
    return 'rush_wq';
  }

  private buildValorantPatterns(): ExploitablePattern[] {
    const p = (id: string, category: string, pattern: string, exploit: string[], what?: string[], severity: ExploitablePattern['severity'] = 'medium'): ExploitablePattern => ({ id, category, pattern, exploit, what_you_see: what, severity });

    return [
      // A. Opening-Duel Habits
      p('val-open-same-peek', 'Opening-Duel Habits', 'Same Peek, Same Time', ['Hold pre-aim', 'Delay peek timing', 'Flash late, not early', 'Double swing once they expect solo duel'], ['Jett peeks mid at start', 'Same operator angle every gun round'], 'high'),
      p('val-open-aggressive-after-win', 'Opening-Duel Habits', 'Always Aggressive After Win', ['Hold passive angles', 'Let them overextend', 'Trade instead of chasing'], ['Pushes after winning pistol/round'], 'medium'),

      // B. Utility Misuse
      p('val-util-dump-on-timer', 'Utility Misuse', 'Utility Dump on Timer', ['Wait out utility', 'Re-hit after cooldowns', 'Fake pressure to draw util'], ['Smokes at 1:30', 'Flashes on contact'], 'high'),
      p('val-util-one-and-done', 'Utility Misuse', 'One-and-Done Utility', ['Force that site', 'Rotate late', 'Play post-plant'], ['Sentinel uses all on one site', 'No retake setup'], 'high'),

      // C. Economy & Buy
      p('val-eco-force-addict', 'Economy & Buy', 'Force Buy Addiction', ['Play range', "Don't give free weapons", 'Break economy fully'], undefined, 'high'),
      p('val-eco-one-player-forces', 'Economy & Buy', 'One Player Always Forces', ['Isolate that player', 'Farm ult orbs', 'Build ult advantage'], undefined, 'medium'),

      // D. Rotation & Map Control
      p('val-rot-over-rotate', 'Rotation & Map Control', 'Over-Rotating', ['Fake noise', 'Walk back', 'Hit opposite site late'], ['Rotates on first sound cue'], 'high'),
      p('val-rot-static-anchors', 'Rotation & Map Control', 'Static Anchors', ['Identify weak anchor', 'Hit that site repeatedly', 'Trade them out'], ['Same player anchors same site'], 'medium'),

      // E. Post-Plant Behavior
      p('val-post-peek-after-plant', 'Post-Plant', 'Peek After Plant', ['Hold spike', 'Punish repeeks', "Don't chase kills"], undefined, 'medium'),
      p('val-post-same-positions', 'Post-Plant', 'Same Post-Plant Positions', ['Pre-aim', 'Use utility exactly there', 'Isolate 1v1s'], undefined, 'medium'),

      // F. Mental & Emotional
      p('val-mental-tilt-after-death', 'Mental & Emotional', 'Tilt After Death', ['Slow down', 'Play trades', 'Let them throw'], ['Faster peeks', 'Solo pushes'], 'medium'),
    ];
  }

  getTools(): AgentTool[] { return []; }
}
