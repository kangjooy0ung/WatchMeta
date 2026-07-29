import { ALL_HEROES } from '../../../constants/heroes';
import type { TierListEntry, TierRank } from '../../../types/tier';

// heroId 문자열 기반 결정론적 해시: 실제 API 연동 전까지 전체 영웅에 대해
// 매번 동일한 티어/픽률/승률 Mock 값을 생성하기 위한 용도.
function hashScore(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash % 100;
}

function scoreToTier(score: number): TierRank {
  if (score >= 82) return 'S';
  if (score >= 64) return 'A';
  if (score >= 44) return 'B';
  if (score >= 24) return 'C';
  return 'D';
}

export const MOCK_TIER_LIST: TierListEntry[] = ALL_HEROES.map((hero) => {
  const tierScore = hashScore(hero.id);
  const pickScore = hashScore(`${hero.id}-pick`);

  return {
    heroId: hero.id,
    heroName: hero.name,
    role: hero.role,
    portraitUrl: hero.portraitUrl,
    tier: scoreToTier(tierScore),
    winRate: Math.round((44 + (tierScore / 100) * 14) * 10) / 10,
    pickRate: Math.round((2 + (pickScore / 100) * 22) * 10) / 10,
  };
});
