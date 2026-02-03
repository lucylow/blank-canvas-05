export type GameType = 'VALORANT' | 'LEAGUE';

export interface PlaystyleProfile {
  game: GameType;
  primary: string;
}

export interface CounterattackScript {
  timing: string;
  action: string;
  agents?: string;
  champs?: string;
  execution: string[];
  winRate?: string;
  goldDiff?: string;
  objective?: string;
}

export interface GameCounterattackData {
  [playstyle: string]: CounterattackScript;
}

export interface CounterattackMatrix {
  VALORANT: GameCounterattackData;
  LEAGUE: GameCounterattackData;
}
