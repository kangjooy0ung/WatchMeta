import { useQuery } from '@tanstack/react-query';
import { fetchPlayerMatches } from '../api/profileApi';

export function usePlayerMatches(battleTag: string) {
  return useQuery({
    queryKey: ['player-matches', battleTag],
    queryFn: () => fetchPlayerMatches(battleTag),
  });
}
