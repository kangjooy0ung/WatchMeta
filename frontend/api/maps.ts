import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCompetitiveMaps } from './_lib/nexon.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const maps = await getCompetitiveMaps();
    // 전장 목록은 패치로 맵이 추가될 때나 바뀐다. Vercel CDN에 올려두면 반복 요청은 함수를
    // 깨우지도 않는다. stale-while-revalidate 덕분에 만료 직후 요청도 기다리지 않는다.
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(maps);
  } catch {
    res.status(502).json({ message: '맵 목록을 가져오지 못했습니다.' });
  }
}
