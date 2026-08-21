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
  // 마지막 데이터 갱신 시각(unix seconds). 배틀태그 번호·플랫폼 같은 식별 정보를 API가 주지 않아,
  // 동명이인 중 최근에 플레이한 계정을 가늠하는 용도로 쓴다.
  lastUpdatedAt: number | null;
}

export interface PlayerPerformance {
  winRate: number;
  eliminationDeathRatio: number;
  eliminationsPer10Min: number;
  damagePer10Min: number;
}

export type GameMode = 'competitive' | 'quickplay';

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
  performance: PlayerPerformance;
  performanceByMode: Record<GameMode, PlayerPerformance | null>;
  topHeroes: TopPlayedHero[];
  heroStats: HeroStat[];
  heroStatsByMode: Record<GameMode, HeroStat[]>;
}
