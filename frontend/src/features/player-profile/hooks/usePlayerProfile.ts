import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats } from '../api/profileApi';

export function usePlayerProfile(battleTag: string) {
  return useQuery({
    queryKey: ['player-profile', battleTag],
    queryFn: () => fetchPlayerStats(battleTag),
  });
}
