import type { VercelRequest, VercelResponse } from '@vercel/node';
import { overfastGet } from '../_lib/overfast.js';

interface PlayerSearchEntry {
  player_id: string;
  name: string;
  avatar: string | null;
  title: string | null;
  is_public: boolean;
  // OverFast가 이 계정 데이터를 마지막으로 갱신한 시각(unix seconds). 배틀태그 번호·플랫폼·지역처럼
  // 동명이인을 구분할 만한 정보를 OverFast 검색 응답이 제공하지 않아, 최소한의 구분 신호로 사용한다.
  last_updated_at?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.name;
  const name = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? '';
  if (!name) {
    res.status(400).json({ message: '검색어를 입력해 주세요.' });
    return;
  }

  try {
    const data = await overfastGet<{ results: PlayerSearchEntry[] }>('/players', { name });
    res.status(200).json(
      data.results
        .filter((entry) => entry.is_public)
        .slice(0, 20)
        .map((entry) => ({
          playerId: entry.player_id,
          name: entry.name,
          avatarUrl: entry.avatar,
          title: entry.title,
          lastUpdatedAt: entry.last_updated_at ?? null,
        })),
    );
  } catch {
    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
  }
}
