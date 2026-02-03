// Shared exploitable pattern types for Valorant and League of Legends

export type PatternSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ExploitablePattern {
  id: string;
  category: string; // e.g., Opening-Duel Habits, Utility Misuse, Laning Patterns
  pattern: string;  // short name e.g., "Same Peek, Same Time"
  what_you_see?: string[]; // bullet list of observable cues
  exploit: string[]; // actionable bullets
  severity: PatternSeverity;
  frequency_hint?: string; // optional e.g., "every pistol", "most gun rounds"
}

export interface PatternChecklist {
  questions: string[]; // quick mid-match questions
}

export const sharedChecklist: PatternChecklist = {
  questions: [
    'Who repeats the same mistake?',
    'Who overextends after success?',
    'Who never adapts?',
    'Who panics under pressure?',
  ],
};
