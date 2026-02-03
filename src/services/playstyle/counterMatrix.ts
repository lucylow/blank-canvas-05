import type { ValorantPlaystyle } from '@/types/playstyle';

export const VALORANT_COUNTER_MATRIX: Record<ValorantPlaystyle, string[]> = {
  rush_wq: [
    'Stack sites immediately (5v3)',
    'Aggressive default holds',
    'Bait over-rotations',
    'Force pistol rounds'
  ],
  aggressive_push: [
    'Play deep angles',
    'Utility denial on entries',
    'Punish mid-round rotates',
    'Flank their flankers'
  ],
  lurker: [
    'Sound-only positioning',
    'Clear lurks before executes',
    'Mirror their lurk',
    'Play crossfires'
  ],
  utility_entry: [
    'Bait utility first',
    'Retake focus',
    'Spread utility usage',
    'Play off timings'
  ],
  anchor: [
    '0:35 fake push → Full rotate',
    'Smoke their deep angles early',
    '1v1 duelists vs anchors'
  ],
  space_taker: [
    '3 players collapse space taker position',
    'Smoke their wide angles immediately',
    'Clear crossfires before execute'
  ],
};
