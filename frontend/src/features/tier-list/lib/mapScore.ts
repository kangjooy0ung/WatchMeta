// 맵 단위 통계는 밴률을 제공하지 않아, 승률·픽률만 정규화해 합산한다. 픽률이 아주 낮은 영웅이
// 승률만으로 과대평가되는 걸 줄이기 위한 목적. tierList.ts의 META_SCORE_WEIGHTS(밴률 포함)와는
// 별개 지표라 이름을 다르게 둔다.
export const MAP_SCORE_WEIGHTS = { winRate: 0.6, pickRate: 0.4 } as const;

function normalize(value: number, min: number, max: number): number {
  return max === min ? 0.5 : (value - min) / (max - min);
}

export function sortByMapScore<T extends { winRate: number; pickRate: number }>(entries: T[]): T[] {
  if (entries.length === 0) return entries;
  const winRates = entries.map((e) => e.winRate);
  const pickRates = entries.map((e) => e.pickRate);
  const winRange = { min: Math.min(...winRates), max: Math.max(...winRates) };
  const pickRange = { min: Math.min(...pickRates), max: Math.max(...pickRates) };

  const score = (entry: T) =>
    normalize(entry.winRate, winRange.min, winRange.max) * MAP_SCORE_WEIGHTS.winRate +
    normalize(entry.pickRate, pickRange.min, pickRange.max) * MAP_SCORE_WEIGHTS.pickRate;

  return [...entries].sort((a, b) => score(b) - score(a));
}
