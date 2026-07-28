import type { HeroRole } from './hero';

export interface RankInfo {
  division: string;
  tier: number;
  role: 'tank' | 'damage' | 'support';
}

export interface PlayerProfile {
  battleTag: string;
  region: string;
  avatarUrl: string;
  title?: string;
  competitiveRank: Partial<Record<'tank' | 'damage' | 'support', RankInfo>>;
}

export interface HeroPlayStat {
  heroId: string;
  heroName: string;
  role: HeroRole;
  playTimeMinutes: number;
  winRate: number;
  pickRate: number;
  accuracy: number;
}

export interface PlayerStatsSummary {
  winRate: number;
  gamesPlayed: number;
  kda: number;
  topHeroes: HeroPlayStat[];
}

export interface MatchHistoryItem {
  matchId: string;
  map: string;
  result: 'win' | 'loss' | 'draw';
  heroId: string;
  heroName: string;
  role: HeroRole;
  playedAt: string;
}
