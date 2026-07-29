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
      portraitUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Cme6JQ5IVcb6vglGZKbTvk9QGOjn-ZYzi3NRyr2ag2uYEF_atUC8-m2QQeexVQeChJ7R-BZ4anuwfL6YdT2ABn7s2cKFyh2VMaAbXDFmDnXJY-MiyCXNDZPJqog0lS6xxJItAh0T6z72JYPIws3WrUT5Ha4DTgnyFk96TRhRYB3YQRcxL2_RDjYOLkYpgMPMHxS7uhpeAhpYR01d4MNzDW5QRz-2-ekxv4aPgw3dmoDAdiK3oGSKtRX3oGP7z5Dqa_KXzmWKVvU',
      playTimeHours: 122,
      levelLabel: 'LV. 45 · 모스트 탱커',
    },
    {
      heroId: 'zenyatta',
      heroName: 'ZENYATTA',
      role: 'support',
      portraitUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCHu-m-NcImF7CBT5tlG-18t_Ymg-CtC7eOeHdhLrB1iGHL5t2OVpzoMt21ir9r_xMwjUgdlUQ1cYNyDNNyENRCdTEloXEk-qaiitcyG7bGM9T2vtxIYZqIUCyP_PVJvlvEQadEvRN8I0rA626Pa_18B89mZBi_7NX4C25dB2eBql3fQgtXvGVwgiGm9ieeDaWaCS5QV_LJaYKILf66zcIWndIYYbWXzu40YIa2RQMV7_H20V_BRXshuMI34z9fOhxXC5-YCW30RtI',
      playTimeHours: 113,
      levelLabel: 'LV. 32 · 주력 힐러',
    },
    {
      heroId: 'hanzo',
      heroName: 'HANZO',
      role: 'damage',
      portraitUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBdheJljcUIFQQz_dfoUcbrPkfvXvpHhP00xLPnaphV0ilRV1C167_TwPuaVnB0LQSevLZ_S0TowV3ceCY7TjRlfjNGlG6XGy1vG9vSRRdCpl4S-1gAwclAMl55-rWTo_FPhcNDjl0azVPggEtR5oMr44p5TaXjF7KT8DQHx-_zyuH-HSx6yPIxy9mzfjO24lOvc5aACg2Cfk7gTTOFORkiOgOWLFYJU8I-duPRMtGRUu0Q-XuX9wOhEXmV-gh52d5OhSg-gh1Bl-Q',
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
