import { apiClient } from '../../../lib/apiClient';
import type { MapHeroStatsResponse, MapMeta } from '../../../types/mapStats';

export async function fetchCompetitiveMaps(): Promise<MapMeta[]> {
  const { data } = await apiClient.get<MapMeta[]>('/maps');
  return data;
}

export interface MapHeroStatsParams {
  map?: string;
  region?: string;
  division?: string;
}

export async function fetchMapHeroStats(params: MapHeroStatsParams): Promise<MapHeroStatsResponse> {
  const { data } = await apiClient.get<MapHeroStatsResponse>('/map-stats', { params });
  return data;
}
