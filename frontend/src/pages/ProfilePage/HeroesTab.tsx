import { HeroStatRow } from '../../features/player-profile/components/HeroStatRow';
import type { HeroPlayStat } from '../../types/player';

interface HeroesTabProps {
  battleTag: string;
}

const MOCK_HEROES: HeroPlayStat[] = [
  { heroId: 'genji', heroName: '겐지', role: 'damage', playTimeMinutes: 5820, winRate: 61, accuracy: 42 },
  { heroId: 'ana', heroName: '아나', role: 'support', playTimeMinutes: 3120, winRate: 55, accuracy: 58 },
  { heroId: 'reinhardt', heroName: '라인하르트', role: 'tank', playTimeMinutes: 2460, winRate: 52, accuracy: 71 },
  { heroId: 'tracer', heroName: '트레이서', role: 'damage', playTimeMinutes: 1980, winRate: 57, accuracy: 39 },
  { heroId: 'mercy', heroName: '메르시', role: 'support', playTimeMinutes: 1540, winRate: 60, accuracy: 0 },
  { heroId: 'orisa', heroName: '오리사', role: 'tank', playTimeMinutes: 960, winRate: 49, accuracy: 63 },
];

// TODO: usePlayerProfile(battleTag)로 교체 예정 - 현재는 Mock Data
export function HeroesTab({ battleTag: _battleTag }: HeroesTabProps) {
  return (
    <div className="flex flex-col gap-2">
      {MOCK_HEROES.map((hero) => (
        <HeroStatRow key={hero.heroId} stat={hero} />
      ))}
    </div>
  );
}
