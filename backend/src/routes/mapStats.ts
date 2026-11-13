import { Router } from 'express';
import {
  RATE_DIVISIONS,
  RATE_REGIONS,
  getCompetitiveMaps,
  getMapHeroStats,
} from '../services/nexonMapStats.js';

export const mapStatsRouter = Router();

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
  const mapParam = typeof req.query.map === 'string' ? req.query.map : undefined;
  const regionParam = typeof req.query.region === 'string' ? req.query.region : undefined;
  const divisionParam = typeof req.query.division === 'string' ? req.query.division : undefined;

  // 프론트에서 매핑되지 않은 값(예: '전체' 랭크, 오래된 링크에 남아있는 지난 서버 값)이 그대로
  // 넘어와도 기본값으로 안전하게 대체한다.
  const region = regionParam && RATE_REGIONS.has(regionParam) ? regionParam : DEFAULT_REGION;
  const division = divisionParam && RATE_DIVISIONS.has(divisionParam) ? divisionParam : undefined;
  // 'all'은 넥슨에서도 '모든 전장'을 뜻하는 값이라 그대로 넘긴다.
  const map = mapParam && mapParam !== 'all' ? mapParam : undefined;

  try {
    const { heroes, cachedSecondsAgo } = await getMapHeroStats({ map, region, division });

    const entries = heroes
      .map((hero) => ({
        heroId: hero.heroId,
        heroName: hero.heroName,
        role: hero.role,
        portraitUrl: hero.portraitUrl,
        pickRate: hero.pickRate,
        winRate: hero.winRate,
        banRate: hero.banRate,
      }))
      .sort((a, b) => b.winRate - a.winRate);

    res.json({ heroes: entries, meta: { updatedSecondsAgo: cachedSecondsAgo } });
  } catch {
    res.status(502).json({ message: '영웅 통계를 가져오지 못했습니다.' });
  }
});
