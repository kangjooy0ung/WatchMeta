import { StatSummaryCard } from '../../features/player-profile/components/StatSummaryCard';
import type { PlayerStatsSummary } from '../../types/player';

interface OverviewTabProps {
  battleTag: string;
}

const MOCK_SUMMARY: PlayerStatsSummary = {
  winRate: 58,
  gamesPlayed: 342,
  kda: 3.4,
  topHeroes: [
    { heroId: 'genji', heroName: '겐지', role: 'damage', playTimeMinutes: 5820, winRate: 61, accuracy: 42 },
    { heroId: 'ana', heroName: '아나', role: 'support', playTimeMinutes: 3120, winRate: 55, accuracy: 58 },
    { heroId: 'reinhardt', heroName: '라인하르트', role: 'tank', playTimeMinutes: 2460, winRate: 52, accuracy: 71 },
  ],
};

// TODO: usePlayerProfile(battleTag)로 교체 예정 - 현재는 Mock Data
export function OverviewTab({ battleTag: _battleTag }: OverviewTabProps) {
  return <StatSummaryCard summary={MOCK_SUMMARY} />;
}
