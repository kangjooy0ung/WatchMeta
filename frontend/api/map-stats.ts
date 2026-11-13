import type { VercelRequest, VercelResponse } from '@vercel/node';
import { RATE_DIVISIONS, RATE_REGIONS, getMapHeroStats } from './_lib/nexon.js';

const DEFAULT_REGION = 'korea';

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const mapParam = firstParam(req.query.map);
  const regionParam = firstParam(req.query.region);
  const divisionParam = firstParam(req.query.division);

  // 프론트에서 매핑되지 않은 값(예: '전체' 랭크, 오래된 링크에 남아있는 지난 서버 값)이 그대로
  // 넘어와도 기본값으로 안전하게 대체한다.
  const region = regionParam && RATE_REGIONS.has(regionParam) ? regionParam : DEFAULT_REGION;
  const division = divisionParam && RATE_DIVISIONS.has(divisionParam) ? divisionParam : undefined;
  // 'all'은 넥슨에서도 '모든 전장'을 뜻하는 값이라 그대로 넘긴다.
  const map = mapParam && mapParam !== 'all' ? mapParam : undefined;

  try {
    const heroes = await getMapHeroStats({ map, region, division });
    const sorted = [...heroes].sort((a, b) => b.winRate - a.winRate);

    // 넥슨 집계는 분 단위로 바뀌지 않는다. 맵·랭크·지역을 바꿔가며 보는 동안 같은 조합은
    // CDN이 그대로 내준다 — 함수가 깨지도 않으니 사실상 즉시 응답한다.
    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
    // "몇 초 전"을 여기서 계산해 넣으면 CDN이 캐시한 순간의 값이 그대로 굳는다. 받아온 시각을
    // 내려주고 경과 시간은 화면에서 계산한다 — 캐시된 응답을 받아도 숫자가 정확하다.
    res.status(200).json({ heroes: sorted, meta: { fetchedAt: Date.now() } });
  } catch {
    res.status(502).json({ message: '영웅 통계를 가져오지 못했습니다.' });
  }
}
