import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ROLES, ROLE_BADGE_COLOR } from '../../constants/roles';
import {
  getHeroStatMetricValue,
  HERO_STAT_METRIC_OPTIONS,
  HeroStatRow,
  type HeroStatMetric,
} from '../../features/player-profile/components/HeroStatRow';
import type { HeroPlayStat } from '../../types/player';

interface HeroesTabProps {
  battleTag: string;
}

const MOCK_HEROES: HeroPlayStat[] = [
  { heroId: 'genji', heroName: '겐지', role: 'damage', playTimeMinutes: 5820, winRate: 61, pickRate: 37, accuracy: 42 },
  { heroId: 'ana', heroName: '아나', role: 'support', playTimeMinutes: 3120, winRate: 55, pickRate: 20, accuracy: 58 },
  {
    heroId: 'reinhardt',
    heroName: '라인하르트',
    role: 'tank',
    playTimeMinutes: 2460,
    winRate: 52,
    pickRate: 15,
    accuracy: 71,
  },
  {
    heroId: 'tracer',
    heroName: '트레이서',
    role: 'damage',
    playTimeMinutes: 1980,
    winRate: 57,
    pickRate: 12,
    accuracy: 39,
  },
  { heroId: 'mercy', heroName: '메르시', role: 'support', playTimeMinutes: 1540, winRate: 60, pickRate: 10, accuracy: 0 },
  { heroId: 'orisa', heroName: '오리사', role: 'tank', playTimeMinutes: 960, winRate: 49, pickRate: 6, accuracy: 63 },
];

// TODO: usePlayerProfile(battleTag)로 교체 예정 - 현재는 Mock Data
export function HeroesTab({ battleTag: _battleTag }: HeroesTabProps) {
  const [metric, setMetric] = useState<HeroStatMetric>('playTime');

  const sortedHeroes = useMemo(
    () => [...MOCK_HEROES].sort((a, b) => getHeroStatMetricValue(b, metric) - getHeroStatMetricValue(a, metric)),
    [metric],
  );
  const maxValue = sortedHeroes.length > 0 ? getHeroStatMetricValue(sortedHeroes[0], metric) : 0;

  return (
    <div>
      <div className="relative mb-3">
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as HeroStatMetric)}
          className="w-full appearance-none rounded-full border border-gray-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          {HERO_STAT_METRIC_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-3 flex gap-4 border-b border-gray-100 pb-3 dark:border-gray-800">
          {ROLES.map((role) => (
            <div key={role.id} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${ROLE_BADGE_COLOR[role.id]}`} />
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{role.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {sortedHeroes.map((hero) => (
            <HeroStatRow key={hero.heroId} stat={hero} metric={metric} maxValue={maxValue} />
          ))}
        </div>
      </div>
    </div>
  );
}
