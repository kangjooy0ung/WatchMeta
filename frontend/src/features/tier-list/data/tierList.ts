import { ALL_HEROES } from '../../../constants/heroes';
import type { TierListEntry, TierRank } from '../../../types/tier';
import { HERO_RATES } from './heroRates';

// 티어 배분 비율: 상위 티어일수록 소수만 진입
const TIER_SIZE_RATIO: Record<TierRank, number> = { S: 0.15, A: 0.25, B: 0.3, C: 0.2, D: 0.1 };
const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];

function normalize(value: number, min: number, max: number): number {
  return max === min ? 0.5 : (value - min) / (max - min);
}

const allRates = Object.values(HERO_RATES);
const winRateRange = { min: Math.min(...allRates.map((r) => r.winRate)), max: Math.max(...allRates.map((r) => r.winRate)) };
const pickRateRange = {
  min: Math.min(...allRates.map((r) => r.pickRate)),
  max: Math.max(...allRates.map((r) => r.pickRate)),
};

// 픽률과 승률을 함께 반영한 메타 점수: 둘 다 높을수록 상위 티어로 배정
const heroStats = ALL_HEROES.map((hero) => {
  const rate = HERO_RATES[hero.id];
  const winRateNorm = normalize(rate.winRate, winRateRange.min, winRateRange.max);
  const pickRateNorm = normalize(rate.pickRate, pickRateRange.min, pickRateRange.max);
  const metaScore = winRateNorm * 0.5 + pickRateNorm * 0.5;

  return { hero, winRate: rate.winRate, pickRate: rate.pickRate, banRate: rate.banRate, metaScore };
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

export const TIER_LIST: TierListEntry[] = heroStats.map(({ hero, winRate, pickRate, banRate }, rank) => ({
  heroId: hero.id,
  heroName: hero.name,
  role: hero.role,
  portraitUrl: hero.portraitUrl,
  tier: tierAtRank(rank),
  winRate,
  pickRate,
  banRate,
}));
