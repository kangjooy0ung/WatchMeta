import { ChevronLeft, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ErrorState } from '../../components/feedback/ErrorState';
import { HeroPortrait } from '../../components/hero/HeroPortrait';
import { ROUTES } from '../../constants/routes';
import { ALL_MAPS_KEY, GAMEMODE_LABEL } from '../../features/tier-list/constants/mapModes';
import { KoreaServerNotice } from '../../features/tier-list/components/KoreaServerNotice';
import { MapDataDisclosure } from '../../features/tier-list/components/MapDataDisclosure';
import { MapSortControl, type MapSortOption } from '../../features/tier-list/components/MapSortControl';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RateBar } from '../../features/tier-list/components/RateBar';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { SampleConfidenceBadge } from '../../features/tier-list/components/SampleConfidenceBadge';
import { ServerFilter, SERVERS_WITHOUT_DATA } from '../../features/tier-list/components/ServerFilter';
import { RANK_TO_RATE_TIER, SERVER_TO_RATE_REGION } from '../../features/tier-list/data/tierList';
import { useCompetitiveMaps, useMapHeroStats } from '../../features/tier-list/hooks/useMapStats';
import { sortByMapScore } from '../../features/tier-list/lib/mapScore';
import { getErrorMessage } from '../../lib/getErrorMessage';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useMapHistoryStore } from '../../store/useMapHistoryStore';
import type { HeroRole } from '../../types/hero';

const VALID_ROLES: Array<HeroRole | 'all'> = ['all', 'tank', 'damage', 'support'];
const DEFAULT_RANK = '전체';
const DEFAULT_SERVER = '아시아';
const DEFAULT_SORT: MapSortOption = 'recommended';
const VALID_SORTS: MapSortOption[] = ['recommended', 'winRate', 'pickRate'];

function MapDetailSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="glass-panel h-16 animate-pulse rounded-xl bg-surface-container-high/40" />
      ))}
    </div>
  );
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta === null || Math.abs(delta) < 0.1) return null;
  const isUp = delta > 0;
  return (
    <span className={`shrink-0 text-[10px] font-bold ${isUp ? 'text-tier-a' : 'text-on-surface-variant'}`}>
      {isUp ? '+' : ''}
      {delta.toFixed(1)}%
    </span>
  );
}

export function MapDetailPage() {
  const { mapKey = ALL_MAPS_KEY } = useParams<{ mapKey: string }>();
  const isAllMaps = mapKey === ALL_MAPS_KEY;
  const [searchParams, setSearchParams] = useSearchParams();
  const [heroQuery, setHeroQuery] = useState('');

  const roleParam = searchParams.get('role');
  const role: HeroRole | 'all' = VALID_ROLES.includes(roleParam as HeroRole | 'all')
    ? (roleParam as HeroRole | 'all')
    : 'all';
  const rank = searchParams.get('rank') ?? DEFAULT_RANK;
  const server = searchParams.get('server') ?? DEFAULT_SERVER;
  const sortParam = searchParams.get('sort');
  const sort: MapSortOption = VALID_SORTS.includes(sortParam as MapSortOption) ? (sortParam as MapSortOption) : DEFAULT_SORT;

  const { data: maps } = useCompetitiveMaps();
  const hasServerData = !SERVERS_WITHOUT_DATA.includes(server);
  const region = SERVER_TO_RATE_REGION[hasServerData ? server : DEFAULT_SERVER];
  const division = RANK_TO_RATE_TIER[rank]; // '전체'는 매핑에 없어 undefined → division 필터 없이 조회
  const {
    data: mapData,
    isLoading,
    isError,
    error,
    refetch,
  } = useMapHeroStats({ map: isAllMaps ? undefined : mapKey, region, division });
  // 전체 전장 대비 변화량 비교용 베이스라인. isAllMaps일 땐 위 조회와 쿼리 키가 같아 react-query가
  // 자동으로 중복 요청 없이 캐시를 공유한다.
  const { data: baselineData } = useMapHeroStats({ region, division });

  const selectedMap = isAllMaps ? undefined : maps?.find((m) => m.key === mapKey);
  const modeLabel = selectedMap ? GAMEMODE_LABEL[selectedMap.gamemodes[0]] ?? selectedMap.gamemodes[0] : null;
  const mapTitle = isAllMaps ? '전체 전장 승률' : selectedMap?.name ?? '전장';

  useEffect(() => {
    if (!isAllMaps && selectedMap) {
      useMapHistoryStore.getState().addMap({ mapKey: selectedMap.key, mapName: selectedMap.name });
    }
  }, [isAllMaps, selectedMap]);

  useDocumentMeta({
    title: isAllMaps ? '오버워치 전장별 영웅 승률 | WatchMeta' : `${mapTitle} 전장 영웅 승률 | WatchMeta`,
    description: isAllMaps
      ? '오버워치 전장(맵)별 영웅 픽률·승률을 확인하세요.'
      : `오버워치 ${mapTitle} 전장에서의 영웅별 픽률·승률을 확인하세요.`,
    path: isAllMaps ? ROUTES.mapDetail(ALL_MAPS_KEY) : ROUTES.mapDetail(mapKey),
  });

  function updateParam(key: string, value: string, defaultValue: string) {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (value === defaultValue) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
      return nextParams;
    });
  }

  const setRole = (next: HeroRole | 'all') => updateParam('role', next, 'all');
  const setRank = (next: string) => updateParam('rank', next, DEFAULT_RANK);
  const setServer = (next: string) => updateParam('server', next, DEFAULT_SERVER);
  const setSort = (next: MapSortOption) => updateParam('sort', next, DEFAULT_SORT);

  const baselineByHeroId = new Map((baselineData?.heroes ?? []).map((h) => [h.heroId, h]));
  const normalizedHeroQuery = heroQuery.trim();

  const roleFiltered = (mapData?.heroes ?? []).filter((hero) => role === 'all' || hero.role === role);
  const searched = normalizedHeroQuery
    ? roleFiltered.filter((hero) => hero.heroName.includes(normalizedHeroQuery))
    : roleFiltered;
  const sorted =
    sort === 'recommended'
      ? sortByMapScore(searched)
      : [...searched].sort((a, b) => (sort === 'winRate' ? b.winRate - a.winRate : b.pickRate - a.pickRate));

  // 쿼리에 맵·랭크·서버·역할 컨텍스트를 실어, 영웅 상세로 넘어가도 "어디서 왔는지"가 유지되게 한다.
  function heroDetailHref(heroId: string): string {
    const params = new URLSearchParams();
    if (!isAllMaps) params.set('map', mapKey);
    if (rank !== DEFAULT_RANK) params.set('rank', rank);
    if (server !== DEFAULT_SERVER) params.set('server', server);
    if (role !== 'all') params.set('role', role);
    const query = params.toString();
    return query ? `${ROUTES.heroDetail(heroId)}?${query}` : ROUTES.heroDetail(heroId);
  }

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-[1200px] space-y-6 px-4 pt-6 lg:px-8">
        <Link
          to={ROUTES.mapStats}
          className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          전장 목록으로 돌아가기
        </Link>

        <section className="border-l-4 border-primary pl-4">
          <h1 className="font-headline-xl text-headline-xl italic uppercase text-primary">
            {mapTitle}
            {modeLabel ? ` (${modeLabel})` : ''}
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            {server} · {rank} 랭크 · 영웅 승률 · 경쟁전 기준
          </p>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_repeat(3,minmax(160px,220px))]">
          <RoleTabs role={role} onChange={setRole} />
          <ServerFilter server={server} onChange={setServer} />
          <RankFilter rank={rank} onChange={setRank} />
          <MapSortControl sort={sort} onChange={setSort} />
        </section>

        <label className="flex w-full max-w-xs items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-3 py-1.5 transition-colors focus-within:border-primary">
          <Search className="h-3.5 w-3.5 shrink-0 text-on-surface-variant" />
          <input
            type="text"
            value={heroQuery}
            onChange={(e) => setHeroQuery(e.target.value)}
            placeholder="영웅 이름으로 찾기"
            className="w-full bg-transparent text-xs text-on-surface outline-none placeholder:text-on-surface-variant/60"
          />
        </label>

        {!hasServerData && <KoreaServerNotice server={server} />}

        <MapDataDisclosure updatedSecondsAgo={mapData?.meta.updatedSecondsAgo ?? null} />

        {isLoading && <MapDetailSkeleton />}
        {isError && (
          <ErrorState message={getErrorMessage(error, '영웅 통계를 가져오지 못했습니다.')} onRetry={() => refetch()} />
        )}

        {!isLoading && !isError && normalizedHeroQuery && sorted.length === 0 && (
          <p className="py-6 text-center text-sm text-on-surface-variant">
            '{normalizedHeroQuery}' 이름을 가진 영웅을 찾지 못했어요.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {sorted.map((hero, index) => (
              <Link
                key={hero.heroId}
                to={heroDetailHref(hero.heroId)}
                className="flex items-center gap-3 rounded-xl border border-outline-variant bg-surface-container px-3 py-2.5 transition-colors hover:border-primary sm:gap-4 sm:px-4"
              >
                <span className="w-5 shrink-0 text-center font-stat-value text-sm text-on-surface-variant">
                  {index + 1}
                </span>
                <HeroPortrait name={hero.heroName} role={hero.role} portraitUrl={hero.portraitUrl} className="h-10 w-10 shrink-0" />
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <p className="w-24 shrink-0 truncate font-headline-md text-sm text-on-surface sm:w-32">
                    {hero.heroName}
                  </p>
                  <SampleConfidenceBadge pickRate={hero.pickRate} className="hidden sm:inline-block" />
                </div>
                <div className="flex w-full max-w-sm shrink-0 items-center gap-3">
                  <div className="grid flex-1 grid-cols-2 gap-3">
                    <RateBar label="픽률" percentage={hero.pickRate} colorClass="bg-primary" />
                    <RateBar label="승률" percentage={hero.winRate} colorClass="bg-secondary" />
                  </div>
                  {!isAllMaps && <DeltaBadge delta={baselineByHeroId.get(hero.heroId)?.winRate != null ? hero.winRate - baselineByHeroId.get(hero.heroId)!.winRate : null} />}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
