import { useQuery } from '@tanstack/react-query';
import { fetchCompetitiveMaps, fetchMapHeroStats, type MapHeroStatsParams } from '../api/mapStatsApi';

export function useCompetitiveMaps() {
  return useQuery({
    queryKey: ['competitive-maps'],
    queryFn: fetchCompetitiveMaps,
    staleTime: Infinity, // 맵 목록은 세션 중에 바뀌지 않는다고 봐도 된다.
  });
}

export function useMapHeroStats(params: MapHeroStatsParams) {
  return useQuery({
    queryKey: ['map-hero-stats', params.map ?? 'all', params.region ?? 'asia', params.division ?? 'all'],
    queryFn: () => fetchMapHeroStats(params),
  });
}
