import type { HeroRole } from './hero';

export type TierRank = 'S' | 'A' | 'B' | 'C' | 'D';

export interface TierListEntry {
  heroId: string;
  heroName: string;
  role: HeroRole;
  tier: TierRank;
  winRate: number;
  pickRate: number;
  banRate?: number;
}

export interface TierListFilters {
  role: HeroRole;
  rank: string;
  patchVersion: string;
}
