import { ErrorState } from '../../components/feedback/ErrorState';
import { StatSummaryCard, StatSummaryCardSkeleton } from '../../features/player-profile/components/StatSummaryCard';
import { usePlayerProfile } from '../../features/player-profile/hooks/usePlayerProfile';

interface OverviewTabProps {
  battleTag: string;
}

export function OverviewTab({ battleTag }: OverviewTabProps) {
  const { data, isLoading, isError } = usePlayerProfile(battleTag);

  if (isLoading) return <StatSummaryCardSkeleton />;
  if (isError || !data) return <ErrorState />;

  return <StatSummaryCard summary={data} />;
}
