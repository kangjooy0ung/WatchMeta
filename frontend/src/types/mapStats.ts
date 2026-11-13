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
  banRate: number;
}

export interface MapHeroStatsMeta {
  // 출처(넥슨)가 실제 집계 시각·기간을 공개하지 않아, 백엔드가 이 응답을 받아온 지
  // 몇 초 됐는지만 정직하게 보여준다.
  updatedSecondsAgo: number | null;
}

export interface MapHeroStatsResponse {
  heroes: MapHeroStat[];
  meta: MapHeroStatsMeta;
}
