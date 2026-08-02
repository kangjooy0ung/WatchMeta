import { overfastClient } from './overfastClient.js';

export type HeroRole = 'tank' | 'damage' | 'support';

export interface HeroMeta {
  key: string;
  name: string;
  portrait: string;
  role: HeroRole;
}

let heroesCache: Map<string, HeroMeta> | null = null;
let inflight: Promise<Map<string, HeroMeta>> | null = null;

async function fetchHeroes(): Promise<Map<string, HeroMeta>> {
  const { data } = await overfastClient.get<HeroMeta[]>('/heroes');
  return new Map(data.map((hero) => [hero.key, hero]));
}

// 히어로 목록은 자주 바뀌지 않으므로 프로세스 생명주기 동안 메모리에 캐시한다.
export async function getHeroesMap(): Promise<Map<string, HeroMeta>> {
  if (heroesCache) return heroesCache;
  if (!inflight) {
    inflight = fetchHeroes()
      .then((map) => {
        heroesCache = map;
        return map;
      })
      .catch((error) => {
        inflight = null;
        throw error;
      });
  }
  return inflight;
}
