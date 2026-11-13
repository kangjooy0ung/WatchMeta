import { fetchPayload, literalResolver } from './nexonClient.js';

export interface MapMeta {
  key: string;
  name: string;
  gamemodes: string[];
  screenshot: string;
}

export interface MapHeroStat {
  heroId: string;
  heroName: string;
  role: string;
  portraitUrl: string;
  pickRate: number;
  winRate: number;
  banRate: number;
}

const RATE_PATH = '/hero/rate';

// 넥슨 전장 드롭다운은 모드를 parentValue로 들고 있다. 경쟁전(역할 고정)에서 도는 다섯 모드만 쓴다.
// 나머지 parentValue(역할·서브역할·등급 등)는 같은 모양의 옵션 객체라 이 집합으로 걸러낸다.
const COMPETITIVE_GAMEMODES = new Set(['control', 'escort', 'hybrid', 'push', 'flashpoint']);

// 넥슨은 전장 스크린샷을 주지 않는다. 주소 규칙이 고정이라 OverFast 정적 파일을 직접 가리킨다
// (목록 API를 호출하지는 않는다 — 느리기도 하고 이제 필요도 없다).
const OVERFAST_SCREENSHOT = 'https://overfast-api.tekrop.fr/static/maps/{key}.jpg';

// 영웅 초상화는 넥슨 CDN과 블리자드 CDN이 같은 해시를 쓴다(54명 전수 확인). 프론트의
// constants/heroes.ts가 블리자드 CDN 주소를 쓰므로 여기서도 맞춰준다 — 주소가 같아야
// 티어리스트에서 이미 받아둔 이미지를 브라우저 캐시로 재사용한다.
const NEXON_CDN = 'https://sht-vod.dn.nexoncdn.co.kr/shpd-game/Hero/OW/';
const BLIZZARD_CDN = 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/';

// OverFast는 screenshot 주소를 주면서 정작 파일이 404인 맵이 있다(배포에 정적 파일이 안 따라붙음).
// 그런 맵은 우리가 직접 받아둔 이미지를 프론트(frontend/public/maps)에서 서빙한다.
// 신규 맵이 목록에 뜨면 주소를 한 번 열어볼 것 — 실패해도 화면에서는 이니셜 타일로 대체돼
// 깨진 티가 안 나기 때문에 그냥 넘어가기 쉽다.
const SCREENSHOT_OVERRIDES: Record<string, string> = {
  grimsvotn: '/maps/grimsvotn.jpg',
  'neon-junction': '/maps/neon-junction.jpg',
};

export const RATE_REGIONS = new Set(['korea', 'asia', 'americas', 'europe']);
export const RATE_DIVISIONS = new Set([
  'bronze',
  'silver',
  'gold',
  'platinum',
  'emerald',
  'diamond',
  'master',
  'grandmaster',
]);

interface DropdownOption {
  value: string;
  name: string;
  parentValue: string;
}

function readOptions(pool: unknown[]): DropdownOption[] {
  const lit = literalResolver(pool);
  const options: DropdownOption[] = [];
  for (const item of pool) {
    if (typeof item !== 'object' || item === null) continue;
    const record = item as Record<string, unknown>;
    if (!('value' in record && 'name' in record && 'parentValue' in record && 'hexValue' in record)) continue;
    const value = lit(record.value);
    const name = lit(record.name);
    const parentValue = lit(record.parentValue);
    if (typeof value === 'string' && typeof name === 'string' && typeof parentValue === 'string') {
      options.push({ value, name, parentValue });
    }
  }
  return options;
}

function readHeroStats(pool: unknown[]): MapHeroStat[] {
  const lit = literalResolver(pool);
  const rows: MapHeroStat[] = [];
  for (const item of pool) {
    if (typeof item !== 'object' || item === null) continue;
    const record = item as Record<string, unknown>;
    if (!('heroId' in record && 'winRate' in record && 'pickRate' in record)) continue;
    const heroId = lit(record.heroId);
    const heroName = lit(record.name);
    const role = lit(record.role);
    const portraitUrl = lit(record.thumbnailUrl);
    const winRate = lit(record.winRate);
    const pickRate = lit(record.pickRate);
    const banRate = lit(record.banRate);
    if (typeof heroId !== 'string' || typeof winRate !== 'number' || typeof pickRate !== 'number') continue;
    rows.push({
      heroId,
      heroName: typeof heroName === 'string' ? heroName : heroId,
      role: typeof role === 'string' ? role : 'damage',
      portraitUrl: typeof portraitUrl === 'string' ? portraitUrl.replace(NEXON_CDN, BLIZZARD_CDN) : '',
      winRate,
      pickRate,
      banRate: typeof banRate === 'number' ? banRate : 0,
    });
  }
  return rows;
}

let mapsCache: MapMeta[] | null = null;
let mapsInflight: Promise<MapMeta[]> | null = null;

async function fetchMaps(): Promise<MapMeta[]> {
  const options = readOptions(await fetchPayload(RATE_PATH));
  const maps = options
    .filter((option) => COMPETITIVE_GAMEMODES.has(option.parentValue))
    .map((option) => ({
      key: option.value,
      name: option.name,
      gamemodes: [option.parentValue],
      screenshot: SCREENSHOT_OVERRIDES[option.value] ?? OVERFAST_SCREENSHOT.replace('{key}', option.value),
    }));
  if (maps.length === 0) {
    throw new Error('넥슨 전장 목록이 비어 있습니다. 페이지 구조가 바뀌었을 수 있습니다.');
  }
  return maps;
}

/**
 * 경쟁전 전장 목록. 넥슨 드롭다운이 이미 모드별로 분류돼 있어, 예전처럼 맵 하나하나를
 * 통계 엔드포인트에 찔러보며 "경쟁전에서 쓸 수 있는 맵인지" 검증할 필요가 없다.
 * 그 검증이 콜드 스타트마다 6초쯤 잡아먹고 있었다.
 */
export async function getCompetitiveMaps(): Promise<MapMeta[]> {
  if (mapsCache) return mapsCache;
  if (!mapsInflight) {
    mapsInflight = fetchMaps()
      .then((maps) => {
        mapsCache = maps;
        return maps;
      })
      .catch((error: unknown) => {
        mapsInflight = null;
        throw error;
      });
  }
  return mapsInflight;
}

export interface MapHeroStatsQuery {
  map?: string;
  region: string;
  division?: string;
}

export interface MapHeroStatsResult {
  heroes: MapHeroStat[];
  /** 이 응답을 넥슨에서 받아온 지 몇 초 됐는지. 우리 캐시 기준이라 정직하게 말할 수 있는 값이다. */
  cachedSecondsAgo: number;
}

interface CacheEntry {
  heroes: MapHeroStat[];
  fetchedAt: number;
}

// 넥슨 집계 자체가 분 단위로 바뀌지 않는다. 맵·랭크·지역을 바꿔가며 보는 동안 매번 외부 요청이
// 나가지 않게 짧게 캐시한다(예전에는 캐시가 아예 없어 필터를 건드릴 때마다 외부 호출이 나갔다).
const STATS_TTL_MS = 10 * 60 * 1000;
const statsCache = new Map<string, CacheEntry>();
const statsInflight = new Map<string, Promise<MapHeroStat[]>>();

function cacheKey(query: MapHeroStatsQuery): string {
  return [query.map ?? 'all', query.region, query.division ?? 'all'].join('|');
}

async function fetchStats(query: MapHeroStatsQuery): Promise<MapHeroStat[]> {
  const pool = await fetchPayload(RATE_PATH, {
    role: 'all',
    rq: '2', // 경쟁전 - 역할 고정
    rank: query.division ?? 'all',
    map: query.map ?? 'all',
    input: 'pc',
    region: query.region,
  });
  const heroes = readHeroStats(pool);
  if (heroes.length === 0) {
    // 시즌 교체 직후처럼 집계가 비어 있을 수 있다. 빈 값을 캐시하면 한동안 빈 화면이 굳으므로
    // 캐시하지 않고 그대로 올려보낸다.
    throw new Error('넥슨 통계가 비어 있습니다.');
  }
  return heroes;
}

export async function getMapHeroStats(query: MapHeroStatsQuery): Promise<MapHeroStatsResult> {
  const key = cacheKey(query);
  const cached = statsCache.get(key);
  const now = Date.now();
  if (cached && now - cached.fetchedAt < STATS_TTL_MS) {
    return { heroes: cached.heroes, cachedSecondsAgo: Math.floor((now - cached.fetchedAt) / 1000) };
  }

  // 같은 조합을 동시에 여러 번 요청해도 외부 호출은 한 번만 나가게 묶는다.
  let inflight = statsInflight.get(key);
  if (!inflight) {
    inflight = fetchStats(query)
      .then((heroes) => {
        statsCache.set(key, { heroes, fetchedAt: Date.now() });
        return heroes;
      })
      .finally(() => {
        statsInflight.delete(key);
      });
    statsInflight.set(key, inflight);
  }
  const heroes = await inflight;
  return { heroes, cachedSecondsAgo: 0 };
}
