import { useQuery } from '@tanstack/react-query';
import { searchPlayer } from '../api/searchApi';

export function usePlayerSearch(battleTag: string | undefined) {
  return useQuery({
    queryKey: ['player-search', battleTag],
    queryFn: () => searchPlayer(battleTag as string),
    enabled: Boolean(battleTag),
  });
}
