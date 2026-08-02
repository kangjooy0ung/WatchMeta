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
  avatar: string | null;
  title: string | null;
  endorsement?: { level: number };
  competitive?: {
    pc?: Partial<Record<Role, CompetitiveRoleRank | null>> | null;
    console?: Partial<Record<Role, CompetitiveRoleRank | null>> | null;
  };
}

const ROLES: Role[] = ['tank', 'damage', 'support'];

function toHours(seconds: number | undefined): number {
  return Math.round((seconds ?? 0) / 3600);
}

playersRouter.get('/:battleTag/overview', async (req, res) => {
  const battleTag = req.params.battleTag;
  const playerId = toPlayerId(battleTag);
  const encodedId = encodeURIComponent(playerId);

  try {
    const [summaryRes, statsRes, heroesMap, competitiveRes, quickplayRes] = await Promise.all([
      overfastClient.get<PlayerSummary>(`/players/${encodedId}/summary`),
      overfastClient.get<StatsSummary>(`/players/${encodedId}/stats/summary`),
      getHeroesMap(),
      overfastClient
        .get<StatsSummary>(`/players/${encodedId}/stats/summary`, { params: { gamemode: 'competitive' } })
        .catch(() => null),
      overfastClient
        .get<StatsSummary>(`/players/${encodedId}/stats/summary`, { params: { gamemode: 'quickplay' } })
        .catch(() => null),
    ]);

    const summary = summaryRes.data;
    const stats = statsRes.data;

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

    const emptyStatBlock: StatBlock = { eliminations: 0, assists: 0, deaths: 0, damage: 0, healing: 0 };
    const playedHeroes = stats.heroes ?? {};

    const heroStats = Array.from(heroesMap.values())
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

    const topHeroes = heroStats.slice(0, 3).map((hero) => ({
      heroId: hero.heroId,
      heroName: hero.heroName,
      role: hero.role,
      portraitUrl: hero.portraitUrl,
      playTimeHours: hero.playTimeHours,
      levelLabel: `${hero.gamesPlayed}경기 · 승률 ${hero.winRate.toFixed(1)}%`,
    }));

    const eliminations = stats.general.total?.eliminations ?? 0;
    const deaths = stats.general.total?.deaths || 1;

    res.json({
      battleTag,
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
      performance: {
        winRate: stats.general.winrate,
        eliminationDeathRatio: Math.round((eliminations / deaths) * 100) / 100,
        eliminationsPer10Min: stats.general.average?.eliminations ?? 0,
        damagePer10Min: stats.general.average?.damage ?? 0,
      },
      topHeroes,
      heroStats,
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).json({ message: '존재하지 않거나 비공개 프로필입니다.' });
      return;
    }

    res.status(502).json({ message: 'Overwatch 데이터를 가져오지 못했습니다.' });
  }
});
