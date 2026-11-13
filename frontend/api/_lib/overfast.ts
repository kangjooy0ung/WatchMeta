// 전적 검색의 출처. 넥슨은 플레이어 조회를 제공하지 않아 이쪽만 OverFast를 쓴다.
// (전장 승률·전장 목록은 _lib/nexon.ts 를 쓴다.)

const OVERFAST_BASE_URL = process.env.OVERFAST_BASE_URL ?? 'https://overfast-api.tekrop.fr';
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 2;

export type HeroRole = 'tank' | 'damage' | 'support';

export interface HeroMeta {
  key: string;
  name: string;
  portrait: string;
  role: HeroRole;
}

/** OverFast가 상태 코드를 함께 알려주도록 던지는 오류. 404(없는 프로필)를 구분하는 데 쓴다. */
export class OverfastError extends Error {
  status: number | null;

  constructor(message: string, status: number | null) {
    super(message);
    this.name = 'OverfastError';
    this.status = status;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function overfastGet<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(path, OVERFAST_BASE_URL);
  for (const [key, value] of Object.entries(params ?? {})) url.searchParams.set(key, value);

  let lastError: unknown;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    if (attempt > 0) await delay(500 * attempt);
    try {
      const response = await fetch(url.toString(), { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
      // 네트워크 오류·타임아웃·5xx·429는 일시적일 수 있어 재시도하고, 나머지 4xx는 바로 포기한다.
      if (response.ok) return (await response.json()) as T;
      if (response.status >= 500 || response.status === 429) {
        lastError = new OverfastError(`OverFast 응답 ${response.status}`, response.status);
        continue;
      }
      throw new OverfastError(`OverFast 응답 ${response.status}`, response.status);
    } catch (error) {
      if (error instanceof OverfastError && error.status !== null && error.status < 500 && error.status !== 429) {
        throw error;
      }
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new OverfastError('OverFast 요청 실패', null);
}

// OverFast API는 배틀태그의 '#'을 '-'로 치환한 값을 player_id로 사용함 (예: Name#1234 -> Name-1234)
export function toPlayerId(battleTag: string): string {
  return battleTag.replace('#', '-');
}

// 영웅 목록은 자주 바뀌지 않는다. 서버리스에서는 인스턴스가 살아있는 동안만 유지되지만,
// 같은 인스턴스가 연속 요청을 받을 때는 그대로 아낄 수 있다.
let heroesCache: Map<string, HeroMeta> | null = null;

export async function getHeroesMap(): Promise<Map<string, HeroMeta>> {
  if (heroesCache) return heroesCache;
  // locale을 안 주면 OverFast가 영문 이름(Ana, Cassidy...)을 반환해, 한글 이름을 쓰는 메타 화면과
  // 표기가 갈린다. 프로필도 한글로 통일한다.
  const heroes = await overfastGet<HeroMeta[]>('/heroes', { locale: 'ko-kr' });
  heroesCache = new Map(heroes.map((hero) => [hero.key, hero]));
  return heroesCache;
}
