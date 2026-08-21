import { ChevronLeft } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ErrorState } from '../../components/feedback/ErrorState';
import { InfoNote } from '../../components/feedback/InfoNote';
import { HeroPortrait } from '../../components/hero/HeroPortrait';
import { ROUTES } from '../../constants/routes';
import { ALL_MAPS_KEY, GAMEMODE_LABEL } from '../../features/tier-list/constants/mapModes';
import { KoreaServerNotice } from '../../features/tier-list/components/KoreaServerNotice';
import { RankFilter } from '../../features/tier-list/components/RankFilter';
import { RateBar } from '../../features/tier-list/components/RateBar';
import { RoleTabs } from '../../features/tier-list/components/RoleTabs';
import { ServerFilter, SERVERS_WITHOUT_DATA } from '../../features/tier-list/components/ServerFilter';
import {
  LOW_SAMPLE_PICK_RATE_THRESHOLD,
  RANK_TO_RATE_TIER,
  SERVER_TO_RATE_REGION,
} from '../../features/tier-list/data/tierList';
import { useCompetitiveMaps, useMapHeroStats } from '../../features/tier-list/hooks/useMapStats';
import { getErrorMessage } from '../../lib/getErrorMessage';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { HeroRole } from '../../types/hero';

const VALID_ROLES: Array<HeroRole | 'all'> = ['all', 'tank', 'damage', 'support'];
const DEFAULT_RANK = '전체';
const DEFAULT_SERVER = '아시아';

function MapDetailSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="glass-panel h-16 animate-pulse rounded-xl bg-surface-container-high/40" />
      ))}
    </div>
  );
}

export function MapDetailPage() {
  const { mapKey = ALL_MAPS_KEY } = useParams<{ mapKey: string }>();
  const isAllMaps = mapKey === ALL_MAPS_KEY;
  const [searchParams, setSearchParams] = useSearchParams();

  const roleParam = searchParams.get('role');
  const role: HeroRole | 'all' = VALID_ROLES.includes(roleParam as HeroRole | 'all')
    ? (roleParam as HeroRole | 'all')
    : 'all';
  const rank = searchParams.get('rank') ?? DEFAULT_RANK;
  const server = searchParams.get('server') ?? DEFAULT_SERVER;

  const { data: maps } = useCompetitiveMaps();
  const hasServerData = !SERVERS_WITHOUT_DATA.includes(server);
  const region = SERVER_TO_RATE_REGION[hasServerData ? server : DEFAULT_SERVER];
  const division = RANK_TO_RATE_TIER[rank]; // '전체'는 매핑에 없어 undefined → division 필터 없이 조회
  const { data: heroStats, isLoading, isError, error, refetch } = useMapHeroStats({
    map: isAllMaps ? undefined : mapKey,
    region,
    division,
  });

  const selectedMap = isAllMaps ? undefined : maps?.find((m) => m.key === mapKey);
  const modeLabel = selectedMap ? GAMEMODE_LABEL[selectedMap.gamemodes[0]] ?? selectedMap.gamemodes[0] : null;
  const mapTitle = isAllMaps ? '전체 전장' : selectedMap?.name ?? '전장';

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

  const filteredStats = (heroStats ?? []).filter((hero) => role === 'all' || hero.role === role);

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

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_repeat(2,minmax(160px,220px))]">
          <RoleTabs role={role} onChange={setRole} />
          <ServerFilter server={server} onChange={setServer} />
          <RankFilter rank={rank} onChange={setRank} />
        </section>

        {!hasServerData && <KoreaServerNotice server={server} />}

        <InfoNote message="맵 이름은 한글 공식 명칭이 확인된 것은 한글로, 확인되지 않은 것은 영문으로 표시됩니다. PC · 경쟁전(역할 고정) 기준이며, 표본 수는 출처가 공개하지 않아 제공하지 않습니다." />

        {isLoading && <MapDetailSkeleton />}
        {isError && (
          <ErrorState message={getErrorMessage(error, '영웅 통계를 가져오지 못했습니다.')} onRetry={() => refetch()} />
        )}

        {!isLoading && !isError && (
          <div className="space-y-1.5">
            {filteredStats.map((hero, index) => (
              <Link
                key={hero.heroId}
                to={ROUTES.heroDetail(hero.heroId)}
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
                  {hero.pickRate < LOW_SAMPLE_PICK_RATE_THRESHOLD && (
                    <span
                      title="픽률이 낮아 승률이 표본 변동에 흔들리기 쉬워요"
                      className="hidden shrink-0 rounded-full border border-outline-variant px-1.5 py-0.5 text-[9px] font-semibold text-on-surface-variant sm:inline-block"
                    >
                      표본 적음
                    </span>
                  )}
                </div>
                <div className="grid w-full max-w-xs shrink-0 grid-cols-2 gap-3">
                  <RateBar label="픽률" percentage={hero.pickRate} colorClass="bg-primary" />
                  <RateBar label="승률" percentage={hero.winRate} colorClass="bg-secondary" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
