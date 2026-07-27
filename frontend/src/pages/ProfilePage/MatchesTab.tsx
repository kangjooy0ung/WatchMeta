import { ErrorState } from '../../components/feedback/ErrorState';
import {
  MatchHistoryItem,
  MatchHistoryItemSkeleton,
} from '../../features/player-profile/components/MatchHistoryItem';
import { usePlayerMatches } from '../../features/player-profile/hooks/usePlayerMatches';

interface MatchesTabProps {
  battleTag: string;
}

export function MatchesTab({ battleTag }: MatchesTabProps) {
  const { data, isLoading, isError } = usePlayerMatches(battleTag);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3].map((i) => (
          <MatchHistoryItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError || !data) return <ErrorState />;

  return (
    <div className="flex flex-col gap-2">
      {data.map((match) => (
        <MatchHistoryItem key={match.matchId} match={match} />
      ))}
    </div>
  );
}
