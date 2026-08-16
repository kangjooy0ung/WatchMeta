import { apiClient } from '../../../lib/apiClient';
import type { PlayerProfile, PlayerSearchResult } from '../../../types/player';

export async function searchPlayer(battleTag: string): Promise<PlayerProfile> {
  const { data } = await apiClient.get<PlayerProfile>(`/players/${encodeURIComponent(battleTag)}`);
  return data;
}

export async function searchPlayersByName(name: string): Promise<PlayerSearchResult[]> {
  const { data } = await apiClient.get<PlayerSearchResult[]>('/players/search', { params: { name } });
  return data;
}
