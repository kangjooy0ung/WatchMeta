import { apiClient } from '../../../lib/apiClient';
import type { PlayerProfile } from '../../../types/player';

export async function searchPlayer(battleTag: string): Promise<PlayerProfile> {
  const { data } = await apiClient.get<PlayerProfile>(`/players/${encodeURIComponent(battleTag)}`);
  return data;
}
