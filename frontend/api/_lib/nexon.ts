// 전장 승률·전장 목록의 출처. 넥슨 공식 영웅 통계 페이지를 서버에서 긁어 JSON으로 바꿔준다.
// (브라우저에서 직접 못 부르는 이유: 넥슨이 CORS 헤더를 주지 않는다.)
//
// 넥슨 페이지는 Nuxt SSR이라 <script type="application/json"> 안에 flat pool이 들어있다.
// pool 안 객체는 필드 값을 "pool 인덱스"로 들고 있고, 그 자리에 실제 리터럴이 있다.
// 인덱스를 재귀로 따라가면 엉뚱한 객체가 잡히므로 반드시 한 단계만 해석할 것.
// (scripts/update-hero-perks.py 와 같은 규칙이다.)

const NEXON_BASE_URL = process.env.NEXON_BASE_URL ?? 'https://overwatch.nexon.com';
const RATE_PATH = '/hero/rate';
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;

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

// 넥슨 전장 드롭다운은 모드를 parentValue로 들고 있다. 경쟁전(역할 고정)에서 도는 다섯 모드만 쓴다.
// 나머지 parentValue(역할·서브역할·등급 등)도 같은 모양의 옵션 객체라 이 집합으로 걸러낸다.
const COMPETITIVE_GAMEMODES = new Set(['control', 'escort', 'hybrid', 'push', 'flashpoint']);

// 넥슨은 전장 스크린샷을 주지 않는다. 주소 규칙이 고정이라 OverFast 정적 파일을 직접 가리킨다
// (목록 API를 호출하지는 않는다).
const OVERFAST_SCREENSHOT = 'https://overfast-api.tekrop.fr/static/maps/{key}.jpg';

// OverFast는 screenshot 주소를 주면서 정작 파일이 404인 맵이 있다(배포에 정적 파일이 안 따라붙음).
// 그런 맵은 우리가 직접 받아둔 이미지를 public/maps 에서 서빙한다. 신규 맵이 목록에 뜨면 주소를
// 한 번 열어볼 것 — 실패해도 화면에서는 이니셜 타일로 대체돼 깨진 티가 안 난다.
const SCREENSHOT_OVERRIDES: Record<string, string> = {
  grimsvotn: '/maps/grimsvotn.jpg',
  'neon-junction': '/maps/neon-junction.jpg',
};

// 영웅 초상화는 넥슨 CDN과 블리자드 CDN이 같은 해시를 쓴다(54명 전수 확인). 프론트의
// constants/heroes.ts가 블리자드 CDN 주소를 쓰므로 여기서도 맞춰준다 — 주소가 같아야
// 티어리스트에서 이미 받아둔 이미지를 브라우저 캐시로 재사용한다.
const NEXON_CDN = 'https://sht-vod.dn.nexoncdn.co.kr/shpd-game/Hero/OW/';
const BLIZZARD_CDN = 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/';

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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url: string): Promise<string> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    if (attempt > 0) await delay(400 * attempt);
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      // 4xx는 다시 불러도 같은 결과라 바로 포기한다. 5xx·타임아웃만 재시도한다.
      if (!response.ok) {
        if (response.status < 500) throw new Error(`넥슨 응답 ${response.status}`);
        lastError = new Error(`넥슨 응답 ${response.status}`);
        continue;
      }
      return await response.text();
    } catch (error) {
      lastError = error;
      if (error instanceof Error && error.message.startsWith('넥슨 응답 4')) throw error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('넥슨 요청 실패');
}

function parsePayload(html: string): unknown[] {
  const match = /<script type="application\/json"[^>]*>(.*?)<\/script>/s.exec(html);
  if (!match) throw new Error('넥슨 SSR 페이로드를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.');
  const parsed: unknown = JSON.parse(match[1]);
  if (!Array.isArray(parsed)) throw new Error('넥슨 SSR 페이로드가 배열이 아닙니다.');
  return parsed;
}

/** pool 인덱스를 실제 값으로 한 단계만 바꿔주는 해석기. */
function literalResolver(pool: unknown[]) {
  return (index: unknown): unknown =>
    typeof index === 'number' && index >= 0 && index < pool.length ? pool[index] : undefined;
}

async function fetchRatePayload(params?: Record<string, string>): Promise<unknown[]> {
  const url = new URL(RATE_PATH, NEXON_BASE_URL);
  for (const [key, value] of Object.entries(params ?? {})) url.searchParams.set(key, value);
  return parsePayload(await fetchText(url.toString()));
}

export async function getCompetitiveMaps(): Promise<MapMeta[]> {
  const pool = await fetchRatePayload();
  const lit = literalResolver(pool);
  const maps: MapMeta[] = [];
  for (const item of pool) {
    if (typeof item !== 'object' || item === null) continue;
    const record = item as Record<string, unknown>;
    if (!('value' in record && 'name' in record && 'parentValue' in record && 'hexValue' in record)) continue;
    const value = lit(record.value);
    const name = lit(record.name);
    const parentValue = lit(record.parentValue);
    if (typeof value !== 'string' || typeof name !== 'string' || typeof parentValue !== 'string') continue;
    if (!COMPETITIVE_GAMEMODES.has(parentValue)) continue;
    maps.push({
      key: value,
      name,
      gamemodes: [parentValue],
      screenshot: SCREENSHOT_OVERRIDES[value] ?? OVERFAST_SCREENSHOT.replace('{key}', value),
    });
  }
  if (maps.length === 0) {
    throw new Error('넥슨 전장 목록이 비어 있습니다. 페이지 구조가 바뀌었을 수 있습니다.');
  }
  return maps;
}

export interface MapHeroStatsQuery {
  map?: string;
  region: string;
  division?: string;
}

export async function getMapHeroStats(query: MapHeroStatsQuery): Promise<MapHeroStat[]> {
  const pool = await fetchRatePayload({
    role: 'all',
    rq: '2', // 경쟁전 - 역할 고정
    rank: query.division ?? 'all',
    map: query.map ?? 'all',
    input: 'pc',
    region: query.region,
  });
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
  if (rows.length === 0) {
    // 시즌 교체 직후처럼 집계가 비어 있을 수 있다. 빈 값을 캐시에 굳히지 않도록 오류로 올린다.
    throw new Error('넥슨 통계가 비어 있습니다.');
  }
  return rows;
}
