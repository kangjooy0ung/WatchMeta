import { ALL_HEROES } from '../../../constants/heroes';
import type { TierListEntry, TierRank } from '../../../types/tier';

// heroId 문자열 기반 결정론적 해시: 실제 API 연동 전까지 전체 영웅에 대해
// 매번 동일한 픽률/승률 Mock 값을 생성하기 위한 용도.
function hashScore(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash % 100;
}

const WIN_RATE_RANGE = { min: 44, max: 58 };
const PICK_RATE_RANGE = { min: 2, max: 24 };

// 티어 배분 비율: 상위 티어일수록 소수만 진입
const TIER_SIZE_RATIO: Record<TierRank, number> = { S: 0.15, A: 0.25, B: 0.3, C: 0.2, D: 0.1 };
const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];

const heroStats = ALL_HEROES.map((hero) => {
  const winRate =
    Math.round((WIN_RATE_RANGE.min + (hashScore(hero.id) / 100) * (WIN_RATE_RANGE.max - WIN_RATE_RANGE.min)) * 10) /
    10;
  const pickRate =
    Math.round(
      (PICK_RATE_RANGE.min + (hashScore(`${hero.id}-pick`) / 100) * (PICK_RATE_RANGE.max - PICK_RATE_RANGE.min)) * 10,
    ) / 10;

  // 픽률과 승률을 함께 반영한 메타 점수: 둘 다 높을수록 상위 티어로 배정
  const winRateNorm = (winRate - WIN_RATE_RANGE.min) / (WIN_RATE_RANGE.max - WIN_RATE_RANGE.min);
  const pickRateNorm = (pickRate - PICK_RATE_RANGE.min) / (PICK_RATE_RANGE.max - PICK_RATE_RANGE.min);
  const metaScore = winRateNorm * 0.5 + pickRateNorm * 0.5;

  return { hero, winRate, pickRate, metaScore };
}).sort((a, b) => b.metaScore - a.metaScore);

// 메타 점수 순위를 티어 비율에 맞춰 잘라서 각 등수 구간의 상한 인덱스를 계산
const tierCutoffs = TIER_ORDER.reduce<Partial<Record<TierRank, number>>>((acc, tier, index) => {
  const prev = index === 0 ? 0 : (acc[TIER_ORDER[index - 1]] as number);
  const isLast = index === TIER_ORDER.length - 1;
  acc[tier] = isLast ? heroStats.length : prev + Math.round(heroStats.length * TIER_SIZE_RATIO[tier]);
  return acc;
}, {}) as Record<TierRank, number>;

function tierAtRank(rank: number): TierRank {
  return TIER_ORDER.find((tier) => rank < tierCutoffs[tier]) ?? 'D';
}

export const MOCK_TIER_LIST: TierListEntry[] = heroStats.map(({ hero, winRate, pickRate }, rank) => ({
  heroId: hero.id,
  heroName: hero.name,
  role: hero.role,
  portraitUrl: hero.portraitUrl,
  tier: tierAtRank(rank),
  winRate,
  pickRate,
}));
