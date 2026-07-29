import type { PlayerOverviewData } from '../../../types/player';

const HOUR = 1000 * 60 * 60;

const MOCK_OVERVIEW: PlayerOverviewData = {
  battleTag: '',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAUIZkf12xo52A8ANk9O4dUzpHVb5BJbyrxjsa5NNbtfw73KCdYJyjV0bavCgvkcLTqqH6C3u2OcVbnirDQ32K5JtV6MUERw5Ww4XsoZfOxU1PD5ZgO9aSbuV5VN7MilFfVlhWF5KpLLG7aZBXBNKcy1NAEfHvFnH16RZjTdVYPHSf1kXq1sbYnlJbWapbccMgwmiD1DdknJJg7-c7gcMSYi5If5a6OloVyq2GnoaHe8AnhFkQqKeT2Xz1FbwnIkKNSB_eQNYHz9AQ',
  level: 96,
  tier: 'PLATINUM',
  platform: 'PC / ASIA',
  totalPlaytimeHours: 719,
  roleHours: { tank: 197, damage: 238, support: 285 },
  modeHours: { competitive: 322, quickplay: 200, arcade: 167 },
  performance: {
    winRate: 58.4,
    eliminationDeathRatio: 3.82,
    eliminationsPer10Min: 12100,
    finalBlows: 2410,
  },
  topHeroes: [
    {
      heroId: 'dva',
      heroName: 'D.Va',
      role: 'tank',
      portraitUrl: 'https://d1u1mce87gyfbn.cloudfront.net/hero/dva/hero-select-portrait.png',
      playTimeHours: 122,
      levelLabel: 'LV. 45 · 모스트 탱커',
    },
    {
      heroId: 'zenyatta',
      heroName: 'ZENYATTA',
      role: 'support',
      portraitUrl: 'https://d1u1mce87gyfbn.cloudfront.net/hero/zenyatta/hero-select-portrait.png',
      playTimeHours: 113,
      levelLabel: 'LV. 32 · 주력 힐러',
    },
    {
      heroId: 'hanzo',
      heroName: 'HANZO',
      role: 'damage',
      portraitUrl: 'https://d1u1mce87gyfbn.cloudfront.net/hero/hanzo/hero-select-portrait.png',
      playTimeHours: 103,
      levelLabel: 'LV. 28 · 주력 딜러',
    },
  ],
  recentMatches: [
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
  ],
};

function delay<T>(value: T): Promise<T> {
  const ms = 1000 + Math.random() * 500; // 1~1.5초
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// TODO: 백엔드 연동 시 apiClient.get(...) 호출로 교체 예정 - 현재는 지연 응답 Mock
export async function fetchPlayerOverview(battleTag: string): Promise<PlayerOverviewData> {
  return delay({ ...MOCK_OVERVIEW, battleTag });
}
