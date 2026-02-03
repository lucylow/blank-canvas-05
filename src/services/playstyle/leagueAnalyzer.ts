import type { PlaystyleProfile, LolPlayerTelemetry, LeaguePlaystyle } from '@/types/playstyle';

export class LeaguePlaystyleAnalyzer {
  classifyPlayer(telemetry: LolPlayerTelemetry & { id?: string }): PlaystyleProfile {
    const earlyCs = telemetry.cs['0-10'] ?? 0;
    const lateCs = telemetry.cs['25+'] ?? telemetry.cs['20-30'] ?? 0;

    const metrics = {
      csPerMinEarly: earlyCs / 10,
      csPerMinLate: lateCs / 10,
      deathsBefore10: telemetry.deaths['0-10'] ?? 0,
      soloKills: telemetry.totalKills ? (telemetry.soloKills / telemetry.totalKills) : 0,
      tpUsage: telemetry.deaths['0-10'] ? (telemetry.tpCasts / Math.max(telemetry.deaths['0-10'], 1)) : 0,
      visionScorePerMin: telemetry.duration ? (telemetry.vision / (telemetry.duration / 60)) : 0
    };

    if (metrics.csPerMinEarly > 9.5 && metrics.deathsBefore10 < 1.5) {
      return this.classifyEarlySnowball(metrics, telemetry);
    } else if (metrics.csPerMinLate > 11.0 && metrics.csPerMinEarly < 7.5) {
      return this.classifyScaling(metrics, telemetry);
    }

    return this.classifySplitPusher(metrics, telemetry);
  }

  private profile(
    id: string | undefined,
    primary: LeaguePlaystyle,
    secondary: LeaguePlaystyle,
    confidence: number,
    keyMetrics: number[],
    counterPlay: string[]
  ): PlaystyleProfile {
    return { id, game: 'LEAGUE', primary, secondary, confidence, keyMetrics, counterPlay };
  }

  private classifyEarlySnowball(metrics: any, telemetry: LolPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'early_snowball',
      'teamfight',
      0.92,
      [metrics.csPerMinEarly, metrics.deathsBefore10, metrics.soloKills],
      [
        'Ward tri-bush at 4:30',
        'Farm under tower only',
        'Freeze T1 → Call jungler',
        'Respect level 2 all-ins'
      ]
    );
  }

  private classifyScaling(metrics: any, telemetry: LolPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'scaler',
      'teamfight',
      0.88,
      [metrics.csPerMinLate, metrics.csPerMinEarly],
      [
        'Trade HP for CS safely',
        'Track jungle pathing to avoid dives',
        'Stack wave to crash and reset',
        'Ping jungler for anti-dive wards'
      ]
    );
  }

  private classifySplitPusher(metrics: any, telemetry: LolPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'split_pusher',
      'pick_comp',
      0.81,
      [metrics.tpUsage, metrics.visionScorePerMin],
      [
        'Deep ward flank TPs',
        'Keep wave near tower',
        'Call jungler to break freeze',
        'Don’t chase — cross-map punish'
      ]
    );
  }
}
