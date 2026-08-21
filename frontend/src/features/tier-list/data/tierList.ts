import { ALL_HEROES } from '../../../constants/heroes';
import type { TierListEntry, TierRank } from '../../../types/tier';
import { HERO_RATES, type HeroRate, type RateRegion, type RateTier } from './heroRates';

// 티어 배분 비율: 상위 티어일수록 소수만 진입
export const TIER_SIZE_RATIO: Record<TierRank, number> = { S: 0.15, A: 0.25, B: 0.3, C: 0.2, D: 0.1 };
const TIER_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D'];

export const RANK_TO_RATE_TIER: Record<string, RateTier> = {
  브론즈: 'bronze',
  실버: 'silver',
  골드: 'gold',
  플래티넘: 'platinum',
  에메랄드: 'emerald',
  다이아몬드: 'diamond',
  마스터: 'master',
  '그랜드마스터 및 챔피언': 'grandmaster',
};

// '한국'·'중국'은 데이터가 없어 이 표에 없고, 호출부(TierListPage)에서 '아시아'로 대체해 넘긴다.
export const SERVER_TO_RATE_REGION: Record<string, RateRegion> = {
  아시아: 'asia',
  북미: 'americas',
  유럽: 'europe',
};

function normalize(value: number, min: number, max: number): number {
  return max === min ? 0.5 : (value - min) / (max - min);
}

// 승률·픽률만으로는 "너무 위협적이라 상대가 미리 밴해버려 픽률·승률이 억눌린" 영웅을 못 잡아낸다
// (밴당한 판은애초에 승률 표본에 들어가지 않는 생존 편향). 밴률을 20% 비중으로 더해 체감 메타에
// 가깝게 보정한다. MetaDataDisclosure에 공개하는 가중치와 반드시 함께 맞춰야 한다.
export const META_SCORE_WEIGHTS = { winRate: 0.45, pickRate: 0.35, banRate: 0.2 } as const;

// 출처가 실제 표본 수(경기 수)를 공개하지 않아, 픽률을 대리 지표로 삼아 "표본이 적어 승률이
// 흔들리기 쉬운" 영웅에 안내 배지를 붙인다. 실제 경기 수가 아니라 어림값이라는 점에 유의.
export const LOW_SAMPLE_PICK_RATE_THRESHOLD = 3;

function buildFromRates(rates: Record<string, HeroRate>): TierListEntry[] {
  const allRates = Object.values(rates);
  const winRateRange = { min: Math.min(...allRates.map((r) => r.winRate)), max: Math.max(...allRates.map((r) => r.winRate)) };
  const pickRateRange = { min: Math.min(...allRates.map((r) => r.pickRate)), max: Math.max(...allRates.map((r) => r.pickRate)) };
  const banRateRange = { min: Math.min(...allRates.map((r) => r.banRate)), max: Math.max(...allRates.map((r) => r.banRate)) };

  // 승률·픽률·밴률을 함께 반영한 메타 점수: 셋 다 높을수록 상위 티어로 배정
  // rates에 없는 영웅(실데이터 수집 전 신캐 등)은 티어표 계산에서 제외
  const heroStats = ALL_HEROES.filter((hero) => rates[hero.id]).map((hero) => {
    const rate = rates[hero.id];
    const winRateNorm = normalize(rate.winRate, winRateRange.min, winRateRange.max);
    const pickRateNorm = normalize(rate.pickRate, pickRateRange.min, pickRateRange.max);
    const banRateNorm = normalize(rate.banRate, banRateRange.min, banRateRange.max);
    const metaScore =
      winRateNorm * META_SCORE_WEIGHTS.winRate +
      pickRateNorm * META_SCORE_WEIGHTS.pickRate +
      banRateNorm * META_SCORE_WEIGHTS.banRate;
    const lowSample = rate.pickRate < LOW_SAMPLE_PICK_RATE_THRESHOLD;

    return { hero, winRate: rate.winRate, pickRate: rate.pickRate, banRate: rate.banRate, metaScore, lowSample };
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

  return heroStats.map(({ hero, winRate, pickRate, banRate, lowSample }, rank) => ({
    heroId: hero.id,
    heroName: hero.name,
    role: hero.role,
    portraitUrl: hero.portraitUrl,
    tier: tierAtRank(rank),
    winRate,
    pickRate,
    banRate,
    lowSample,
    isNew: hero.isNew,
  }));
}

export function buildTierList(rank: string, server: string): TierListEntry[] {
  const rateTier = RANK_TO_RATE_TIER[rank] ?? 'all';
  const rateRegion = SERVER_TO_RATE_REGION[server] ?? 'asia';
  return buildFromRates(HERO_RATES[rateRegion][rateTier]);
}

// OverFast가 돌려주는 영문 division 문자열(bronze, diamond, champion...) → 이 사이트가 쓰는 RateTier.
// champion은 heroRates.ts에서 grandmaster와 합쳐서 수집돼(그랜드마스터 및 챔피언) 별도 구간이 없다.
const DIVISION_TO_RATE_TIER: Record<string, RateTier> = {
  bronze: 'bronze',
  silver: 'silver',
  gold: 'gold',
  platinum: 'platinum',
  emerald: 'emerald',
  diamond: 'diamond',
  master: 'master',
  grandmaster: 'grandmaster',
  champion: 'grandmaster',
};

// 영웅 상세 화면에서 "내 성적 vs 같은 랭크 메타 평균"을 비교하기 위한 조회 함수.
// 랭크 정보가 없거나 매핑에 없으면 전체 랭크 평균으로 대체한다. 한국 서버 데이터가 없어 아시아
// 서버 고정으로만 비교를 제공한다(KoreaServerNotice와 같은 이유).
export function getHeroMetaRate(heroId: string, division?: string | null): HeroRate | null {
  const tier = (division && DIVISION_TO_RATE_TIER[division.toLowerCase()]) || 'all';
  return HERO_RATES.asia[tier][heroId] ?? null;
}
