import { useQuery } from '@tanstack/react-query';
import type { TierListFilters } from '../../../types/tier';
import { fetchTierList } from '../api/tierListApi';

export function useTierList(filters: TierListFilters) {
  return useQuery({
    queryKey: ['tier-list', filters],
    queryFn: () => fetchTierList(filters),
  });
}
