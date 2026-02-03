import { PlaystyleProfile, CounterattackScript, CounterattackMatrix } from '../types/counterattack';

export class CounterattackEngine {
  private static readonly gameCounters: CounterattackMatrix = {
    VALORANT: {
      rush_wq: {
        timing: '0:32',
        action: '5v3 A → B plant',
        agents: 'Cypher+Jett',
        execution: [
          'Stack A 5v3 (2 pixel + 3 ready)',
          'Enemy entry → IMMEDIATE B rotate',
          '2 flashes + 1 molly B default',
          'Plant B link (0:52) → Force retake'
        ],
        winRate: '68%'
      },
      aggressive_push: {
        timing: '0:47',
        action: 'Mid flank collapse',
        agents: 'Reyna+Raze',
        execution: [
          '2v2 A default hold (bait)',
          'Enemy deep → Sova recon mid',
          '2x Duelist mid flank (0:55)',
          'Cut A ramp → Trap enemy'
        ],
        winRate: '62%'
      },
      lurk: {
        timing: '1:05',
        action: 'Fake A → Heaven collapse',
        agents: 'Killjoy+Fade',
        execution: [
          'Fake A util (0:40) → Full B stack',
          'Sova recon heaven → Cypher cage',
          '3v1 heaven collapse (1:05)',
          'Entry B while lurker dead'
        ],
        winRate: '71%'
      },
      utility_entry: {
        timing: '1:25',
        action: 'Post-plant 4v3 retake',
        agents: 'Chamber+Skye',
        execution: [
          '1 bait per site (no trades)',
          'Wait 3s post-util → Reposition',
          'Plant anyway → Force retake fight',
          '4v3 post-plant → Utility advantage'
        ],
        winRate: '65%'
      },
      anchor: {
        timing: '0:35',
        action: 'Fake B → A speed plant',
        agents: 'Omen+Viper',
        execution: [
          '0:35 B fake util → Full A rotate',
          'Entry util A (0:48)',
          'Plant default (0:58) → Collapse',
          'Force anchor retake 3v2'
        ],
        winRate: '59%'
      },
      space_taker: {
        timing: 'Immediate',
        action: '3-man collapse → Execute',
        agents: 'Sova+Brim',
        execution: [
          'Identify space position (minimap)',
          '3 players collapse (molotovs)',
          'Entry 2v4 → Plant fast',
          'Space taker dead → Numbers even'
        ],
        winRate: '63%'
      }
    },
    LEAGUE: {
      early_snowball: {
        timing: '3:45',
        action: 'Freeze T1 → Farm 1v2',
        champs: 'Aatrox+KSante',
        execution: [
          'Ward tri-bush → /mute all',
          'Freeze wave T1 (7 CS ahead)',
          'Farm sidelane → Call jungler top',
          'Steraks spike → Duel 1v1'
        ],
        goldDiff: '+800g by 12min'
      },
      scaler: {
        timing: '8:00',
        action: 'Herald → T1 bot crash',
        champs: 'Sylas+Qiyana',
        execution: [
          'Ping jungler Herald path',
          '8:00 Herald → Bot T1 crash',
          'Kassadin level 11 → Still weaker',
          'Force T2 before scaling spike'
        ],
        objective: 'Enemy T1 down'
      },
      split_pusher: {
        timing: 'Late Game',
        action: 'TP mid → Bot 4v3',
        champs: 'Shen+Ornn',
        execution: [
          'Ward enemy jungle → Track split',
          'Fiora T2 → TP mid 4v4',
          'Bot T1 crash → 4v3 drake',
          'Fiora 1v1 vs turret → Lose race'
        ],
        objective: 'Drake soul point'
      },
      teamfight: {
        timing: '14:30',
        action: 'Vision trap → Baron steal',
        champs: 'Pyke+Lee Sin',
        execution: [
          'Deep wards enemy jungle',
          'Flank pick → 4v4 Baron setup',
          'Enemy commits teamfight → Baron buff',
          'Split 4v4 → Enemy base race lost'
        ],
        goldDiff: '+4k Baron'
      },
      poke: {
        timing: 'Immediate',
        action: 'Flash engage → Ace',
        champs: 'Malph+Nautilus',
        execution: [
          'Bait poke range → Flash all-in',
          '3-man engage combo → Ace',
          'Clean drake/baron uncontested',
          'Poke comp no engage → Snowball'
        ],
        winRate: '78%'
      },
      pick_comp: {
        timing: 'Immediate',
        action: 'Vision choke → Group 5v5',
        champs: 'Bard+Yuumi',
        execution: [
          'Oracle + sweep river',
          'Group mid → Vision advantage',
          'Pick comp no vision → 5v5 fights',
          'Force even fights → Win macro'
        ],
        objective: 'Vision Score +12'
      }
    }
  };

  generateCounter(enemyProfile: PlaystyleProfile): CounterattackScript {
    return CounterattackEngine.gameCounters[enemyProfile.game]?.[enemyProfile.primary] || {
      timing: 'Immediate',
      action: 'Default counter',
      agents: 'Flex picks',
      execution: ['Identify enemy commitment', 'Coordinate with team', 'Execute standard counter']
    };
  }
}
