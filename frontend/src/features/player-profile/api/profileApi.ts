import type { MatchHistoryItem, PlayerStatsSummary } from '../../../types/player';

const MOCK_SUMMARY: PlayerStatsSummary = {
  winRate: 58,
  gamesPlayed: 342,
  kda: 3.4,
  topHeroes: [
    { heroId: 'genji', heroName: '겐지', role: 'damage', playTimeMinutes: 5820, winRate: 61, accuracy: 42 },
    { heroId: 'ana', heroName: '아나', role: 'support', playTimeMinutes: 3120, winRate: 55, accuracy: 58 },
    { heroId: 'reinhardt', heroName: '라인하르트', role: 'tank', playTimeMinutes: 2460, winRate: 52, accuracy: 71 },
  ],
};

const HOUR = 1000 * 60 * 60;

const MOCK_MATCHES: MatchHistoryItem[] = [
  {
    matchId: 'm1',
    map: '하나무라',
    result: 'win',
    heroId: 'genji',
    heroName: '겐지',
    role: 'damage',
    playedAt: new Date(Date.now() - HOUR * 0.5).toISOString(),
  },
  {
    matchId: 'm2',
    map: '리알토',
    result: 'win',
    heroId: 'ana',
    heroName: '아나',
    role: 'support',
    playedAt: new Date(Date.now() - HOUR * 3).toISOString(),
  },
  {
    matchId: 'm3',
    map: '왕의 길',
    result: 'loss',
    heroId: 'reinhardt',
    heroName: '라인하르트',
    role: 'tank',
    playedAt: new Date(Date.now() - HOUR * 20).toISOString(),
  },
  {
    matchId: 'm4',
    map: '아이헨발데',
    result: 'win',
    heroId: 'tracer',
    heroName: '트레이서',
    role: 'damage',
    playedAt: new Date(Date.now() - HOUR * 27).toISOString(),
  },
  {
    matchId: 'm5',
    map: '오아시스',
    result: 'draw',
    heroId: 'mercy',
    heroName: '메르시',
    role: 'support',
    playedAt: new Date(Date.now() - HOUR * 50).toISOString(),
  },
];

function delay<T>(value: T): Promise<T> {
  const ms = 1000 + Math.random() * 500; // 1~1.5초
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// TODO: 백엔드 연동 시 apiClient.get(...) 호출로 교체 예정 - 현재는 지연 응답 Mock
export async function fetchPlayerStats(_battleTag: string): Promise<PlayerStatsSummary> {
  return delay(MOCK_SUMMARY);
}

export async function fetchPlayerMatches(_battleTag: string): Promise<MatchHistoryItem[]> {
  return delay(MOCK_MATCHES);
}
