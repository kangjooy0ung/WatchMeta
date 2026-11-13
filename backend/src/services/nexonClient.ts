import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const NEXON_BASE_URL = process.env.NEXON_BASE_URL ?? 'https://overwatch.nexon.com';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 400;

export const nexonClient = axios.create({
  baseURL: NEXON_BASE_URL,
  timeout: 10000,
  // 기본 UA로는 응답이 달라질 수 있어 브라우저 UA를 쓴다. 수집 스크립트(scripts/*.py)도 동일하다.
  headers: { 'User-Agent': 'Mozilla/5.0' },
  // SSR HTML을 그대로 받는다.
  responseType: 'text',
  transformResponse: [(data: string) => data],
});

type RetryableConfig = InternalAxiosRequestConfig & { __retryCount?: number };

function isRetryable(error: AxiosError): boolean {
  if (!error.response) return true;
  return error.response.status >= 500 || error.response.status === 429;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

nexonClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as RetryableConfig | undefined;
  if (!config || !isRetryable(error)) throw error;
  config.__retryCount = (config.__retryCount ?? 0) + 1;
  if (config.__retryCount > MAX_RETRIES) throw error;
  await delay(RETRY_DELAY_MS * config.__retryCount);
  return nexonClient(config);
});

/**
 * 넥슨 페이지는 Nuxt SSR이라 <script type="application/json"> 안에 flat pool이 들어있다.
 * pool 안 객체는 필드 값을 "pool 인덱스"로 들고 있고, 그 자리에 실제 리터럴이 있다.
 *
 * 인덱스를 재귀로 따라가면 엉뚱한 객체가 잡히므로 반드시 한 단계만 해석할 것.
 * (scripts/update-hero-perks.py 와 같은 규칙이다.)
 */
export function parsePayload(html: string): unknown[] {
  const match = /<script type="application\/json"[^>]*>(.*?)<\/script>/s.exec(html);
  if (!match) {
    throw new Error('넥슨 SSR 페이로드를 찾지 못했습니다. 페이지 구조가 바뀌었을 수 있습니다.');
  }
  const parsed: unknown = JSON.parse(match[1]);
  if (!Array.isArray(parsed)) {
    throw new Error('넥슨 SSR 페이로드가 배열이 아닙니다.');
  }
  return parsed;
}

/** pool 인덱스를 실제 값으로 한 단계만 바꿔주는 해석기. */
export function literalResolver(pool: unknown[]) {
  return (index: unknown): unknown =>
    typeof index === 'number' && index >= 0 && index < pool.length ? pool[index] : undefined;
}

export async function fetchPayload(path: string, params?: Record<string, string>): Promise<unknown[]> {
  const { data } = await nexonClient.get<string>(path, { params });
  return parsePayload(data);
}
