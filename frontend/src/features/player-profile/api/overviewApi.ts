import { apiClient } from '../../../lib/apiClient';
import type { PlayerOverviewData } from '../../../types/player';

export async function fetchPlayerOverview(battleTag: string): Promise<PlayerOverviewData> {
  const { data } = await apiClient.get<PlayerOverviewData>(`/players/${encodeURIComponent(battleTag)}/overview`);
  return data;
}
