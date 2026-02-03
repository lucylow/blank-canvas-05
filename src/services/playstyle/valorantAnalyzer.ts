import type { PlaystyleProfile, ValorantPlayerTelemetry, ValorantPlaystyle } from '@/types/playstyle';

export class ValorantPlaystyleAnalyzer {
  classifyPlayer(telemetry: ValorantPlayerTelemetry & { id?: string }): PlaystyleProfile {
    const metrics = {
      firstDeathPercentile: (telemetry.firstDeaths || 0) / Math.max(telemetry.rounds || 1, 1), // FDPR
      assistPerRound: (telemetry.assists || 0) / Math.max(telemetry.rounds || 1, 1), // APR
      firstKillsPerRound: (telemetry.firstKills || 0) / Math.max(telemetry.rounds || 1, 1), // FKPR
      clutchFrequency: (telemetry.clutches || 0) / Math.max(telemetry.pressureRounds || 1, 1),
      utilAssists: (telemetry.utilKills || 0) / Math.max(telemetry.totalKills || 1, 1)
    };

    if (metrics.firstDeathPercentile > 0.7) {
      return this.classifySpaceTaker(metrics, telemetry);
    } else if (metrics.utilAssists > 0.6) {
      return this.classifyUtilityEntry(metrics, telemetry);
    } else if (metrics.firstKillsPerRound > 0.45) {
      return this.classifyRushWQ(metrics, telemetry);
    }

    // Fallbacks based on APR
    if (metrics.assistPerRound > 0.35) {
      return this.classifyAggressivePush(metrics, telemetry);
    }

    return this.classifyAnchor(metrics, telemetry);
  }

  private profile(
    id: string | undefined,
    primary: ValorantPlaystyle,
    secondary: ValorantPlaystyle,
    confidence: number,
    keyMetrics: number[],
    counterPlay: string[]
  ): PlaystyleProfile {
    return { id, game: 'VALORANT', primary, secondary, confidence, keyMetrics, counterPlay };
  }

  private classifyRushWQ(metrics: any, telemetry: ValorantPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'rush_wq',
      'aggressive_push',
      0.87,
      [metrics.firstDeathPercentile, metrics.firstKillsPerRound],
      [
        'Stack sites immediately (5v3)',
        'Aggressive default holds',
        'Bait over-rotations',
        'Force pistol rounds'
      ]
    );
  }

  private classifySpaceTaker(metrics: any, telemetry: ValorantPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'space_taker',
      'aggressive_push',
      0.82,
      [metrics.firstDeathPercentile, metrics.assistPerRound],
      [
        '3 players collapse space taker position',
        'Smoke wide angles immediately',
        'Clear crossfires before execute'
      ]
    );
  }

  private classifyUtilityEntry(metrics: any, telemetry: ValorantPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'utility_entry',
      'anchor',
      0.84,
      [metrics.utilAssists, metrics.assistPerRound],
      [
        'Bait utility first',
        'Retake focus',
        'Spread utility usage',
        'Play off timings'
      ]
    );
  }

  private classifyAggressivePush(metrics: any, telemetry: ValorantPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'aggressive_push',
      'rush_wq',
      0.78,
      [metrics.assistPerRound, metrics.firstKillsPerRound],
      [
        'Play deep angles',
        'Utility denial on entries',
        'Punish mid-round rotates',
        'Flank their flankers'
      ]
    );
  }

  private classifyAnchor(metrics: any, telemetry: ValorantPlayerTelemetry & { id?: string }): PlaystyleProfile {
    return this.profile(
      telemetry.id,
      'anchor',
      'lurker',
      0.72,
      [metrics.assistPerRound],
      [
        '0:35 fake push → Full rotate',
        'Smoke their deep angles early',
        '1v1 duelists vs anchors'
      ]
    );
  }
}
