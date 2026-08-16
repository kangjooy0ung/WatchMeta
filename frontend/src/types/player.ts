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

export interface TopPlayedHero {
  heroId: string;
  heroName: string;
  role: HeroRole;
  portraitUrl: string;
  playTimeHours: number;
  levelLabel: string;
}

export interface HeroStatBlock {
  eliminations: number;
  assists: number;
  deaths: number;
  damage: number;
  healing: number;
}

export interface HeroStat {
  heroId: string;
  heroName: string;
  role: HeroRole;
  portraitUrl: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number;
  kda: number;
  playTimeHours: number;
  total: HeroStatBlock;
  average: HeroStatBlock;
}

export interface CompetitiveRoleRank {
  division: string;
  tier: number;
  roleIcon: string;
  rankIcon: string;
}

export interface PlayerSearchResult {
  playerId: string;
  name: string;
  avatarUrl: string | null;
  title: string | null;
}

export interface PlayerOverviewData {
  battleTag: string;
  displayName: string;
  avatarUrl: string;
  title: string | null;
  endorsementLevel: number;
  platform: 'pc' | 'console';
  competitiveRanks: Partial<Record<'tank' | 'damage' | 'support', CompetitiveRoleRank>>;
  totalPlaytimeHours: number;
  roleHours: Record<'tank' | 'damage' | 'support', number>;
  modeHours: { competitive: number; quickplay: number };
  performance: {
    winRate: number;
    eliminationDeathRatio: number;
    eliminationsPer10Min: number;
    damagePer10Min: number;
  };
  topHeroes: TopPlayedHero[];
  heroStats: HeroStat[];
}
