import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const OVERFAST_BASE_URL = process.env.OVERFAST_BASE_URL ?? 'https://overfast-api.tekrop.fr';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;

export const overfastClient = axios.create({
  baseURL: OVERFAST_BASE_URL,
  timeout: 10000,
});

type RetryableConfig = InternalAxiosRequestConfig & { __retryCount?: number };

function isRetryable(error: AxiosError): boolean {
  // 네트워크 오류·타임아웃(응답 없음), 5xx, rate limit(429)은 일시적 문제일 가능성이 높아 재시도한다.
  if (!error.response) return true;
  return error.response.status >= 500 || error.response.status === 429;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

overfastClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as RetryableConfig | undefined;
  if (!config || !isRetryable(error)) {
    throw error;
  }
  config.__retryCount = (config.__retryCount ?? 0) + 1;
  if (config.__retryCount > MAX_RETRIES) {
    throw error;
  }
  await delay(RETRY_DELAY_MS * config.__retryCount);
  return overfastClient(config);
});

// OverFast API는 배틀태그의 '#'을 '-'로 치환한 값을 player_id로 사용함 (예: Name#1234 -> Name-1234)
export function toPlayerId(battleTag: string): string {
  return battleTag.replace('#', '-');
}
