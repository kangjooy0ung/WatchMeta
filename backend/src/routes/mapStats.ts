import axios from 'axios';
import { Router } from 'express';
import { getHeroesMap } from '../services/heroesCache.js';
import { getCompetitiveMaps } from '../services/mapsCache.js';
import { overfastClient } from '../services/overfastClient.js';

export const mapStatsRouter = Router();

interface HeroStatsSummary {
  hero: string;
  pickrate: number;
  winrate: number;
}

const VALID_REGIONS = new Set(['asia', 'americas', 'europe']);
const VALID_DIVISIONS = new Set(['bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond', 'master', 'grandmaster']);
const DEFAULT_REGION = 'asia';

mapStatsRouter.get('/maps', async (_req, res) => {
  try {
    const maps = await getCompetitiveMaps();
    res.json(maps);
  } catch {
    res.status(502).json({ message: '맵 목록을 가져오지 못했습니다.' });
  }
});

mapStatsRouter.get('/map-stats', async (req, res) => {
  const map = typeof req.query.map === 'string' ? req.query.map : undefined;
  const regionParam = typeof req.query.region === 'string' ? req.query.region : undefined;
  const divisionParam = typeof req.query.division === 'string' ? req.query.division : undefined;
  // 프론트에서 매핑되지 않은 값(예: 한국·중국 서버, '전체' 랭크)이 그대로 넘어와도 기본값으로
  // 안전하게 대체한다 — 잘못된 값을 OverFast에 그대로 넘겨 400을 받는 대신 여기서 걸러낸다.
  const region = regionParam && VALID_REGIONS.has(regionParam) ? regionParam : DEFAULT_REGION;
  const division = divisionParam && VALID_DIVISIONS.has(divisionParam) ? divisionParam : undefined;

  try {
    const [statsRes, heroesMap] = await Promise.all([
      overfastClient.get<HeroStatsSummary[]>('/heroes/stats', {
        params: {
          platform: 'pc',
          gamemode: 'competitive',
          region,
          ...(map ? { map } : {}),
          ...(division ? { competitive_division: division } : {}),
        },
      }),
      getHeroesMap(),
    ]);

    const entries = statsRes.data
      .map((stat) => {
        const meta = heroesMap.get(stat.hero);
        if (!meta) return null;
        return {
          heroId: stat.hero,
          heroName: meta.name,
          role: meta.role,
          portraitUrl: meta.portrait,
          pickRate: stat.pickrate,
          winRate: stat.winrate,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
      .sort((a, b) => b.winRate - a.winRate);

    res.json(entries);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      res.status(400).json({ message: '선택한 맵은 경쟁전 통계를 제공하지 않습니다.' });
      return;
    }
    res.status(502).json({ message: '영웅 통계를 가져오지 못했습니다.' });
  }
});
