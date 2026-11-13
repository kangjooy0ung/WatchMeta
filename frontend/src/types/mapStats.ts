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
  // 출처(넥슨)가 실제 집계 시각·기간을 공개하지 않아, 서버가 이 응답을 받아온 시각(epoch ms)만
  // 정직하게 내려준다. 경과 시간은 화면에서 계산한다 — 응답이 CDN에 캐시돼도 숫자가 맞으려면
  // 서버가 "몇 초 전"을 박아 보내면 안 된다.
  fetchedAt: number | null;
}

export interface MapHeroStatsResponse {
  heroes: MapHeroStat[];
  meta: MapHeroStatsMeta;
}
