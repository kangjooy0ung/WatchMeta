import axios from 'axios';
import { Router } from 'express';
import { getHeroesMap } from '../services/heroesCache.js';
import { overfastClient, toPlayerId } from '../services/overfastClient.js';

export const playersRouter = Router();

type Role = 'tank' | 'damage' | 'support';

interface StatBlock {
  eliminations: number;
  assists: number;
  deaths: number;
  damage: number;
  healing: number;
}

interface StatsSummary {
  general: {
    time_played: number;
    winrate: number;
    total: StatBlock;
    average: StatBlock;
  };
  roles: Partial<Record<Role, { time_played: number }>>;
  heroes: Record<
    string,
    {
      games_played: number;
      games_won: number;
      games_lost: number;
      time_played: number;
      winrate: number;
      kda: number;
      total: StatBlock;
      average: StatBlock;
    }
  >;
}

interface CompetitiveRoleRank {
  division: string;
  tier: number;
  role_icon: string;
  rank_icon: string;
}

interface PlayerSummary {
  username: string;
  avatar: string | null;
  title: string | null;
  endorsement?: { level: number };
  competitive?: {
    pc?: Partial<Record<Role, CompetitiveRoleRank | null>> | null;
    console?: Partial<Record<Role, CompetitiveRoleRank | null>> | null;
  };
}

interface PlayerSearchEntry {
  player_id: string;
  name: string;
  avatar: string | null;
  title: string | null;
  is_public: boolean;
}

const ROLES: Role[] = ['tank', 'damage', 'support'];

function toHours(seconds: number | undefined): number {
  return Math.round((seconds ?? 0) / 3600);
}

function buildHeroStats(stats: StatsSummary, heroesMap: Map<string, import('../services/heroesCache.js').HeroMeta>) {
  const emptyStatBlock: StatBlock = { eliminations: 0, assists: 0, deaths: 0, damage: 0, healing: 0 };
  const playedHeroes = stats.heroes ?? {};

  return Array.from(heroesMap.values())
    .sort((a, b) => (playedHeroes[b.key]?.time_played ?? 0) - (playedHeroes[a.key]?.time_played ?? 0))
    .map((meta) => {
      const heroStat = playedHeroes[meta.key];
      return {
        heroId: meta.key,
        heroName: meta.name,
        role: meta.role,
        portraitUrl: meta.portrait,
        gamesPlayed: heroStat?.games_played ?? 0,
        gamesWon: heroStat?.games_won ?? 0,
        gamesLost: heroStat?.games_lost ?? 0,
        winRate: heroStat?.winrate ?? 0,
        kda: heroStat?.kda ?? 0,
        playTimeHours: toHours(heroStat?.time_played),
        total: heroStat?.total ?? emptyStatBlock,
        average: heroStat?.average ?? emptyStatBlock,
      };
    });
}

function buildPerformance(stats: StatsSummary) {
  const eliminations = stats.general.total?.eliminations ?? 0;
  const deaths = stats.general.total?.deaths || 1;
  return {
    winRate: stats.general.winrate,
    eliminationDeathRatio: Math.round((eliminations / deaths) * 100) / 100,
    eliminationsPer10Min: stats.general.average?.eliminations ?? 0,
    damagePer10Min: stats.general.average?.damage ?? 0,
  };
}

// 배틀태그를 직접 player_id로 변환하는 방식은 더 이상 대부분의 계정에서 통하지 않아
// (OverFast가 해시 형태의 내부 ID를 반환), 이름 검색으로 후보를 찾아 사용자가 직접 고르게 한다.
playersRouter.get('/search', async (req, res) => {
  const name = typeof req.query.name === 'string' ? req.query.name.trim() : '';
  if (!name) {
    res.status(400).json({ message: '검색어를 입력해 주세요.' });
    return;
  }

  try {
    const { data } = await overfastClient.get<{ results: PlayerSearchEntry[] }>('/players', {
      params: { name },
    });

    res.json(
      data.results
        .filter((entry) => entry.is_public)
        .slice(0, 20)
        .map((entry) => ({
          playerId: entry.player_id,
          name: entry.name,
          avatarUrl: entry.avatar,
          title: entry.title,
        })),
    );
  } catch {
    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
  }
});

playersRouter.get('/:battleTag/overview', async (req, res) => {
  const battleTag = req.params.battleTag;
  const playerId = toPlayerId(battleTag);
  const encodedId = encodeURIComponent(playerId);

  const emptyStatBlock: StatBlock = { eliminations: 0, assists: 0, deaths: 0, damage: 0, healing: 0 };
  const emptyStats: StatsSummary = {
    general: { time_played: 0, winrate: 0, total: emptyStatBlock, average: emptyStatBlock },
    roles: {},
    heroes: {},
  };

  let summary: PlayerSummary;
  try {
    const summaryRes = await overfastClient.get<PlayerSummary>(`/players/${encodedId}/summary`);
    summary = summaryRes.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).json({ message: '존재하지 않거나 비공개 프로필입니다.' });
      return;
    }
    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
    return;
  }

  try {
    // 프로필은 공개여도 전적 통계만 비공개이거나 조회에 실패할 수 있어, 통계 실패가 전체 요청을
    // 실패시키지 않도록 summary 조회와 분리해 개별적으로 폴백 처리한다.
    const [statsRes, heroesMap, competitiveRes, quickplayRes] = await Promise.all([
      overfastClient.get<StatsSummary>(`/players/${encodedId}/stats/summary`).catch(() => null),
      getHeroesMap(),
      overfastClient
        .get<StatsSummary>(`/players/${encodedId}/stats/summary`, { params: { gamemode: 'competitive' } })
        .catch(() => null),
      overfastClient
        .get<StatsSummary>(`/players/${encodedId}/stats/summary`, { params: { gamemode: 'quickplay' } })
        .catch(() => null),
    ]);

    const stats = statsRes?.data ?? emptyStats;

    const competitiveData = summary.competitive?.pc ?? summary.competitive?.console ?? null;
    const platform: 'pc' | 'console' = summary.competitive?.pc ? 'pc' : 'console';

    const competitiveRanks: Partial<
      Record<Role, { division: string; tier: number; roleIcon: string; rankIcon: string }>
    > = {};
    for (const role of ROLES) {
      const rank = competitiveData?.[role];
      if (rank) {
        competitiveRanks[role] = {
          division: rank.division,
          tier: rank.tier,
          roleIcon: rank.role_icon,
          rankIcon: rank.rank_icon,
        };
      }
    }

    const heroStats = buildHeroStats(stats, heroesMap);
    const heroStatsByMode = {
      competitive: competitiveRes ? buildHeroStats(competitiveRes.data, heroesMap) : [],
      quickplay: quickplayRes ? buildHeroStats(quickplayRes.data, heroesMap) : [],
    };

    const topHeroes = heroStats.slice(0, 6).map((hero) => ({
      heroId: hero.heroId,
      heroName: hero.heroName,
      role: hero.role,
      portraitUrl: hero.portraitUrl,
      playTimeHours: hero.playTimeHours,
      levelLabel: `${hero.gamesPlayed}경기 · 승률 ${hero.winRate.toFixed(1)}%`,
    }));

    res.json({
      battleTag,
      displayName: summary.username || battleTag,
      avatarUrl: summary.avatar,
      title: summary.title,
      endorsementLevel: summary.endorsement?.level ?? 0,
      platform,
      competitiveRanks,
      totalPlaytimeHours: toHours(stats.general.time_played),
      roleHours: {
        tank: toHours(stats.roles?.tank?.time_played),
        damage: toHours(stats.roles?.damage?.time_played),
        support: toHours(stats.roles?.support?.time_played),
      },
      modeHours: {
        competitive: toHours(competitiveRes?.data.general.time_played),
        quickplay: toHours(quickplayRes?.data.general.time_played),
      },
      performance: buildPerformance(stats),
      performanceByMode: {
        competitive: competitiveRes ? buildPerformance(competitiveRes.data) : null,
        quickplay: quickplayRes ? buildPerformance(quickplayRes.data) : null,
      },
      topHeroes,
      heroStats,
      heroStatsByMode,
    });
  } catch {
    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
  }
});
