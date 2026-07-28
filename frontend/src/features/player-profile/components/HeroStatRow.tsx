import { ROLE_BADGE_COLOR } from '../../../constants/roles';
import type { HeroPlayStat } from '../../../types/player';

export type HeroStatMetric = 'playTime' | 'winRate' | 'pickRate' | 'accuracy';

export const HERO_STAT_METRIC_OPTIONS: { value: HeroStatMetric; label: string }[] = [
  { value: 'playTime', label: '플레이타임' },
  { value: 'winRate', label: '승률' },
  { value: 'pickRate', label: '픽률' },
  { value: 'accuracy', label: '명중률' },
];

export function getHeroStatMetricValue(stat: HeroPlayStat, metric: HeroStatMetric): number {
  switch (metric) {
    case 'playTime':
      return stat.playTimeMinutes;
    case 'winRate':
      return stat.winRate;
    case 'pickRate':
      return stat.pickRate;
    case 'accuracy':
      return stat.accuracy;
  }
}

function formatHeroStatMetricValue(stat: HeroPlayStat, metric: HeroStatMetric): string {
  if (metric === 'playTime') {
    const hours = Math.floor(stat.playTimeMinutes / 60);
    const rest = stat.playTimeMinutes % 60;
    return rest > 0 ? `${hours}시간 ${rest}분` : `${hours}시간`;
  }
  return `${getHeroStatMetricValue(stat, metric)}%`;
}

interface HeroStatRowProps {
  stat: HeroPlayStat;
  metric: HeroStatMetric;
  /** 이 지표 기준 목록 내 최댓값 (막대 길이를 상대적으로 스케일링하기 위함) */
  maxValue: number;
}

export function HeroStatRow({ stat, metric, maxValue }: HeroStatRowProps) {
  const value = getHeroStatMetricValue(stat, metric);
  const widthPercent = maxValue > 0 ? Math.max((value / maxValue) * 100, 4) : 0;

  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${ROLE_BADGE_COLOR[stat.role]}`}
      >
        {stat.heroName.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <span className="truncate text-sm font-medium text-gray-900 dark:text-white">{stat.heroName}</span>
          <span className="shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {formatHeroStatMetricValue(stat, metric)}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full rounded-full ${ROLE_BADGE_COLOR[stat.role]}`}
            style={{ width: `${widthPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
