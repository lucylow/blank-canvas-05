import type { PlaystyleProfile, TeamPlaystyle } from '@/types/playstyle';
import { ValorantPlaystyleAnalyzer } from './valorantAnalyzer';
import { LeaguePlaystyleAnalyzer } from './leagueAnalyzer';
import { VALORANT_COUNTER_MATRIX } from './counterMatrix';

export class LivePlaystyleTracker {
  private playerProfiles: Map<string, PlaystyleProfile> = new Map();

  updateProfile(game: 'VALORANT' | 'LEAGUE', playerId: string, telemetry: any): PlaystyleProfile {
    const analyzer = game === 'VALORANT' ? new ValorantPlaystyleAnalyzer() : new LeaguePlaystyleAnalyzer();
    const profile = analyzer.classifyPlayer({ ...telemetry, id: playerId } as any);
    this.playerProfiles.set(playerId, profile);
    return profile;
  }

  getEnemyTeamPlaystyle(teamIds: string[]): TeamPlaystyle {
    const profiles = teamIds.map((id) => this.playerProfiles.get(id)).filter(Boolean) as PlaystyleProfile[];
    const dominantStyle = this.findDominantStyle(profiles);

    return {
      primaryThreat: dominantStyle as any,
      counterStrategy: this.generateTeamCounter(profiles),
      executePriority: this.getPriorityTargets(profiles),
    };
  }

  private findDominantStyle(profiles: PlaystyleProfile[]): string {
    const counts: Record<string, number> = {};
    for (const p of profiles) {
      counts[p.primary] = (counts[p.primary] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'unknown';
  }

  private generateTeamCounter(profiles: PlaystyleProfile[]): string[] {
    // Start with Valorant matrix strategies if majority are Valorant profiles
    const valorantProfiles = profiles.filter(p => p.game === 'VALORANT');
    if (valorantProfiles.length >= Math.ceil(profiles.length / 2)) {
      const top = this.findDominantStyle(valorantProfiles);
      return VALORANT_COUNTER_MATRIX[top as keyof typeof VALORANT_COUNTER_MATRIX] || [
        'Default safe setups',
        'Trade-heavy fights',
        'Late round executes'
      ];
    }

    // Basic LoL fallback
    return [
      'Ward deep objectives',
      'Play for numbers advantage',
      'Avoid coin-flip fights'
    ];
  }

  private getPriorityTargets(profiles: PlaystyleProfile[]): string[] {
    // Simple calls prioritized by confidence and style
    return profiles
      .sort((a, b) => (b.confidence - a.confidence))
      .slice(0, 3)
      .map((p) => {
        if (p.game === 'VALORANT') {
          if (p.primary === 'rush_wq') return 'STACK NOW';
          if (p.primary === 'utility_entry') return 'BAIT FLASH';
          if (p.primary === 'lurker') return 'CLEAR LURK';
        } else {
          if (p.primary === 'early_snowball') return 'GANK TOP';
          if (p.primary === 'split_pusher') return 'BREAK FREEZE';
        }
        return 'SAFE PLAN';
      });
  }
}
