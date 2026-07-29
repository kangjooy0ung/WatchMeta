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

export interface MatchHistoryItem {
  matchId: string;
  map: string;
  result: 'win' | 'loss' | 'draw';
  heroId: string;
  heroName: string;
  role: HeroRole;
  playedAt: string;
}

export interface TopPlayedHero {
  heroId: string;
  heroName: string;
  role: HeroRole;
  portraitUrl: string;
  playTimeHours: number;
  levelLabel: string;
}

export interface PlayerOverviewData {
  battleTag: string;
  avatarUrl: string;
  level: number;
  tier: string;
  platform: string;
  totalPlaytimeHours: number;
  roleHours: Record<'tank' | 'damage' | 'support', number>;
  modeHours: { competitive: number; quickplay: number; arcade: number };
  performance: {
    winRate: number;
    eliminationDeathRatio: number;
    eliminationsPer10Min: number;
    finalBlows: number;
  };
  topHeroes: TopPlayedHero[];
  recentMatches: MatchHistoryItem[];
}
