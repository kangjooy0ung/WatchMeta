import type { HeroRole } from './hero';

export interface MapMeta {
  key: string;
  name: string;
  gamemodes: string[];
  screenshot: string;
}

export interface MapHeroStat {
  heroId: string;
  heroName: string;
  role: HeroRole;
  portraitUrl: string;
  pickRate: number;
  winRate: number;
}
