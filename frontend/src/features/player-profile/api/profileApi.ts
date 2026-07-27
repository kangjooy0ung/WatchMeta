import { apiClient } from '../../../lib/apiClient';
import type { MatchHistoryItem, PlayerStatsSummary } from '../../../types/player';

export async function fetchPlayerStats(battleTag: string): Promise<PlayerStatsSummary> {
  const { data } = await apiClient.get<PlayerStatsSummary>(`/players/${encodeURIComponent(battleTag)}/stats`);
  return data;
}

export async function fetchPlayerMatches(battleTag: string): Promise<MatchHistoryItem[]> {
  const { data } = await apiClient.get<MatchHistoryItem[]>(`/players/${encodeURIComponent(battleTag)}/matches`);
  return data;
}
