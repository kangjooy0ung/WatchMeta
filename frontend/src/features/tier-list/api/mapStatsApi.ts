import { apiClient } from '../../../lib/apiClient';
import type { MapHeroStat, MapMeta } from '../../../types/mapStats';

export async function fetchCompetitiveMaps(): Promise<MapMeta[]> {
  const { data } = await apiClient.get<MapMeta[]>('/maps');
  return data;
}

export interface MapHeroStatsParams {
  map?: string;
  region?: string;
  division?: string;
}

export async function fetchMapHeroStats(params: MapHeroStatsParams): Promise<MapHeroStat[]> {
  const { data } = await apiClient.get<MapHeroStat[]>('/map-stats', { params });
  return data;
}
