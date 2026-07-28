import axios from 'axios';

const OVERFAST_BASE_URL = process.env.OVERFAST_BASE_URL ?? 'https://overfast-api.tekrop.fr';

export const overfastClient = axios.create({
  baseURL: OVERFAST_BASE_URL,
  timeout: 10000,
});

// OverFast API는 배틀태그의 '#'을 '-'로 치환한 값을 player_id로 사용함 (예: Name#1234 -> Name-1234)
export function toPlayerId(battleTag: string): string {
  return battleTag.replace('#', '-');
}
