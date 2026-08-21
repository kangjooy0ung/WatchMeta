import type { HeroRole } from './hero';

export type TierRank = 'S' | 'A' | 'B' | 'C' | 'D';

export interface TierListEntry {
  heroId: string;
  heroName: string;
  role: HeroRole;
  portraitUrl?: string;
  tier: TierRank;
  winRate: number;
  pickRate: number;
  banRate?: number;
  lowSample?: boolean;
  isNew?: boolean;
}

export interface TierListFilters {
  role: HeroRole;
  rank: string;
  patchVersion: string;
}
