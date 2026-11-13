import type { VercelRequest, VercelResponse } from '@vercel/node';
import { OverfastError, getHeroesMap, overfastGet, toPlayerId, type HeroMeta } from '../../_lib/overfast.js';

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

const ROLES: Role[] = ['tank', 'damage', 'support'];
const EMPTY_STAT_BLOCK: StatBlock = { eliminations: 0, assists: 0, deaths: 0, damage: 0, healing: 0 };
const EMPTY_STATS: StatsSummary = {
  general: { time_played: 0, winrate: 0, total: EMPTY_STAT_BLOCK, average: EMPTY_STAT_BLOCK },
  roles: {},
  heroes: {},
};

function toHours(seconds: number | undefined): number {
  return Math.round((seconds ?? 0) / 3600);
}

function buildHeroStats(stats: StatsSummary, heroesMap: Map<string, HeroMeta>) {
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
        total: heroStat?.total ?? EMPTY_STAT_BLOCK,
        average: heroStat?.average ?? EMPTY_STAT_BLOCK,
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const raw = req.query.battleTag;
  const battleTag = Array.isArray(raw) ? raw[0] : raw;
  if (!battleTag) {
    res.status(400).json({ message: '배틀태그가 필요합니다.' });
    return;
  }
  const encodedId = encodeURIComponent(toPlayerId(battleTag));

  let summary: PlayerSummary;
  try {
    summary = await overfastGet<PlayerSummary>(`/players/${encodedId}/summary`);
  } catch (error) {
    if (error instanceof OverfastError && error.status === 404) {
      res.status(404).json({ message: '존재하지 않거나 비공개 프로필입니다.' });
      return;
    }
    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
    return;
  }

  try {
    // 프로필은 공개여도 전적 통계만 비공개이거나 조회에 실패할 수 있어, 통계 실패가 전체 요청을
    // 실패시키지 않도록 summary 조회와 분리해 개별적으로 폴백 처리한다.
    const [allStats, heroesMap, competitive, quickplay] = await Promise.all([
      overfastGet<StatsSummary>(`/players/${encodedId}/stats/summary`).catch(() => null),
      getHeroesMap(),
      overfastGet<StatsSummary>(`/players/${encodedId}/stats/summary`, { gamemode: 'competitive' }).catch(() => null),
      overfastGet<StatsSummary>(`/players/${encodedId}/stats/summary`, { gamemode: 'quickplay' }).catch(() => null),
    ]);

    const stats = allStats ?? EMPTY_STATS;
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
    const topHeroes = heroStats.slice(0, 6).map((hero) => ({
      heroId: hero.heroId,
      heroName: hero.heroName,
      role: hero.role,
      portraitUrl: hero.portraitUrl,
      playTimeHours: hero.playTimeHours,
      levelLabel: `${hero.gamesPlayed}경기 · 승률 ${hero.winRate.toFixed(1)}%`,
    }));

    res.status(200).json({
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
        competitive: toHours(competitive?.general.time_played),
        quickplay: toHours(quickplay?.general.time_played),
      },
      performance: buildPerformance(stats),
      performanceByMode: {
        competitive: competitive ? buildPerformance(competitive) : null,
        quickplay: quickplay ? buildPerformance(quickplay) : null,
      },
      topHeroes,
      heroStats,
      heroStatsByMode: {
        competitive: competitive ? buildHeroStats(competitive, heroesMap) : [],
        quickplay: quickplay ? buildHeroStats(quickplay, heroesMap) : [],
      },
    });
  } catch {
    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
  }
}
