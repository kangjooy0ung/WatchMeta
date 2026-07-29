import { useQuery } from '@tanstack/react-query';
import { fetchPlayerOverview } from '../api/overviewApi';

export function usePlayerOverview(battleTag: string | undefined) {
  return useQuery({
    queryKey: ['player-overview', battleTag],
    queryFn: () => fetchPlayerOverview(battleTag as string),
    enabled: Boolean(battleTag),
  });
}
