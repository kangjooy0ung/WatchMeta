import { apiClient } from '../../../lib/apiClient';
import type { TierListEntry, TierListFilters } from '../../../types/tier';

export async function fetchTierList(filters: TierListFilters): Promise<TierListEntry[]> {
  const { data } = await apiClient.get<TierListEntry[]>('/tier-list', { params: filters });
  return data;
}
