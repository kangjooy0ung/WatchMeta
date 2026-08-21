import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { HeroPortrait } from '../../components/hero/HeroPortrait';
import { PageContainer } from '../../components/layout/PageContainer';
import { ALL_HEROES } from '../../constants/heroes';
import { ROLE_ACCENT_COLOR, ROLE_ICON, ROLES } from '../../constants/roles';
import { ROUTES } from '../../constants/routes';
import { SERVERS_WITHOUT_DATA } from '../../features/tier-list/components/ServerFilter';
import { RateBar } from '../../features/tier-list/components/RateBar';
import { SampleConfidenceBadge } from '../../features/tier-list/components/SampleConfidenceBadge';
import { buildTierList, RANK_TO_RATE_TIER, SERVER_TO_RATE_REGION } from '../../features/tier-list/data/tierList';
import { useCompetitiveMaps, useMapHeroStats } from '../../features/tier-list/hooks/useMapStats';
import { getSampleConfidence } from '../../features/tier-list/lib/sampleConfidence';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { TierRank } from '../../types/tier';

const TIER_BADGE_CLASS: Record<TierRank, string> = {
  S: 'bg-tier-s',
  A: 'bg-tier-a',
  B: 'bg-tier-b',
  C: 'bg-outline',
  D: 'bg-surface-variant',
};

const DEFAULT_RANK = '전체';
const DEFAULT_SERVER = '아시아';

export function HeroDetailPage() {
  const { heroId } = useParams<{ heroId: string }>();
  const [searchParams] = useSearchParams();
  const hero = ALL_HEROES.find((h) => h.id === heroId);

  const rank = searchParams.get('rank') ?? DEFAULT_RANK;
  const server = searchParams.get('server') ?? DEFAULT_SERVER;
  const role = searchParams.get('role');
  const mapKey = searchParams.get('map');

  const contextQuery = new URLSearchParams();
  if (rank !== DEFAULT_RANK) contextQuery.set('rank', rank);
  if (server !== DEFAULT_SERVER) contextQuery.set('server', server);
  if (role) contextQuery.set('role', role);
  const contextQueryString = contextQuery.toString();

  const [activeTab, setActiveTab] = useState<'overall' | 'map'>(mapKey ? 'map' : 'overall');

  useDocumentMeta({
    title: hero ? `${hero.name} 메타 분석 (픽률·승률·밴률) | WatchMeta` : '영웅 메타 분석 | WatchMeta',
    description: hero ? `오버워치 ${hero.name}의 아시아 서버 픽률·승률·밴률과 메타 티어를 확인하세요.` : undefined,
    path: heroId ? ROUTES.heroDetail(heroId) : undefined,
  });

  const { data: maps } = useCompetitiveMaps();
  const selectedMap = mapKey ? maps?.find((m) => m.key === mapKey) : undefined;
  const hasServerData = !SERVERS_WITHOUT_DATA.includes(server);
  const region = SERVER_TO_RATE_REGION[hasServerData ? server : DEFAULT_SERVER];
  const division = RANK_TO_RATE_TIER[rank];
  const {
    data: mapData,
    isLoading: isMapLoading,
    isError: isMapError,
  } = useMapHeroStats({ map: mapKey ?? undefined, region, division });
  const mapEntry = mapKey ? mapData?.heroes.find((h) => h.heroId === heroId) : undefined;

  if (!hero) {
    return (
      <PageContainer>
        <div className="pt-6 text-center text-on-surface-variant">
          <p className="mb-4">존재하지 않는 영웅이에요.</p>
          <Link to={ROUTES.tierList} className="text-sm font-semibold text-primary underline">
            메타로 돌아가기
          </Link>
        </div>
      </PageContainer>
    );
  }

  const entry = buildTierList(rank, hasServerData ? server : DEFAULT_SERVER).find((e) => e.heroId === hero.id);
  const RoleIcon = ROLE_ICON[hero.role];
  const roleLabel = ROLES.find((r) => r.id === hero.role)?.label ?? hero.role;

  const backHref = mapKey
    ? `${ROUTES.mapDetail(mapKey)}${contextQueryString ? `?${contextQueryString}` : ''}`
    : `${ROUTES.tierList}${contextQueryString ? `?${contextQueryString}` : ''}`;
  const backLabel = mapKey ? `${selectedMap?.name ?? '전장'}으로 돌아가기` : '메타로 돌아가기';

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] text-on-background">
      <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pt-6 lg:px-8">
        <Link
          to={backHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <section className="glass-panel flex items-center gap-5 rounded-xl p-6">
          <div className="relative shrink-0">
            <HeroPortrait name={hero.name} role={hero.role} portraitUrl={hero.portraitUrl} className="h-20 w-20" />
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center rounded border border-outline-variant bg-surface-container p-0.5">
              <RoleIcon className={`h-3.5 w-3.5 ${ROLE_ACCENT_COLOR[hero.role]}`} />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-headline-xl text-headline-lg italic text-on-surface">{hero.name}</p>
              {hero.isNew && (
                <span
                  title="출시된 지 얼마 안 돼 메타가 아직 안정되지 않은 신규 영웅이에요"
                  className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-semibold text-surface-container-lowest"
                >
                  신규
                </span>
              )}
            </div>
            <p className={`font-label-sm text-label-sm ${ROLE_ACCENT_COLOR[hero.role]}`}>{roleLabel}</p>
          </div>
          {entry && (
            <div
              className={`ml-auto flex h-12 w-12 shrink-0 -skew-x-[10deg] items-center justify-center ${TIER_BADGE_CLASS[entry.tier]}`}
            >
              <span className="block skew-x-[10deg] font-headline-lg italic text-white">{entry.tier}</span>
            </div>
          )}
        </section>

        {mapKey && (
          <div role="group" aria-label="지표 기준" className="flex rounded-xl border border-outline-variant bg-surface-container-high p-1">
            <button
              type="button"
              aria-pressed={activeTab === 'map'}
              onClick={() => setActiveTab('map')}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all active:scale-95 ${
                activeTab === 'map' ? 'bg-primary text-surface-container-lowest' : 'text-on-surface-variant hover:bg-surface-variant/40'
              }`}
            >
              {selectedMap?.name ?? '전장'} 기준
            </button>
            <button
              type="button"
              aria-pressed={activeTab === 'overall'}
              onClick={() => setActiveTab('overall')}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition-all active:scale-95 ${
                activeTab === 'overall' ? 'bg-primary text-surface-container-lowest' : 'text-on-surface-variant hover:bg-surface-variant/40'
              }`}
            >
              전체 메타
            </button>
          </div>
        )}

        {(!mapKey || activeTab === 'overall') &&
          (entry ? (
            <section className="glass-panel space-y-4 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-on-surface">현재 메타 지표</h2>
                <SampleConfidenceBadge pickRate={entry.pickRate} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <RateBar label="픽률" percentage={entry.pickRate} colorClass="bg-primary" />
                <RateBar label="승률" percentage={entry.winRate} colorClass="bg-secondary" />
                {typeof entry.banRate === 'number' && (
                  <RateBar label="밴률" percentage={entry.banRate} colorClass="bg-tier-s" />
                )}
              </div>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                {server} · {rank} 랭크 · 경쟁전 기준이에요. 다른 서버·랭크 기준으로 보려면{' '}
                <Link to={ROUTES.tierList} className="underline decoration-dotted underline-offset-2 hover:text-primary">
                  메타 화면
                </Link>
                에서 필터를 바꿔 확인하세요.
                {getSampleConfidence(entry.pickRate) !== 'sufficient' && ' 픽률이 낮은 영웅이라 승률 변동폭이 클 수 있어요.'}
              </p>
            </section>
          ) : (
            <section className="glass-panel rounded-xl p-6 text-sm text-on-surface-variant">
              이 영웅은 아직 메타 데이터가 수집되지 않았어요.
            </section>
          ))}

        {mapKey && activeTab === 'map' && (
          <section className="glass-panel space-y-4 rounded-xl p-6">
            {isMapLoading ? (
              <div className="h-24 animate-pulse rounded-lg bg-surface-container-high/40" />
            ) : isMapError || !mapEntry ? (
              <p className="text-sm text-on-surface-variant">
                {isMapError ? '전장 통계를 가져오지 못했어요.' : '이 전장에서는 아직 데이터가 없어요.'}
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-headline-md text-on-surface">{selectedMap?.name ?? '전장'} 기준 지표</h2>
                  <SampleConfidenceBadge pickRate={mapEntry.pickRate} />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <RateBar label="픽률" percentage={mapEntry.pickRate} colorClass="bg-primary" />
                  <RateBar label="승률" percentage={mapEntry.winRate} colorClass="bg-secondary" />
                </div>
                {entry && Math.abs(mapEntry.winRate - entry.winRate) >= 0.1 && (
                  <p className="text-xs leading-relaxed text-on-surface-variant">
                    전체 메타 평균({entry.winRate}%) 대비 이 전장에서는{' '}
                    <span className={mapEntry.winRate > entry.winRate ? 'font-semibold text-tier-a' : 'font-semibold text-on-surface'}>
                      승률이 {mapEntry.winRate > entry.winRate ? '+' : ''}
                      {(mapEntry.winRate - entry.winRate).toFixed(1)}%p{mapEntry.winRate > entry.winRate ? ' 높아요' : ' 낮아요'}
                    </span>
                    .
                  </p>
                )}
              </>
            )}
          </section>
        )}

        <section className="glass-panel rounded-xl p-6 text-sm text-on-surface-variant">
          조합·카운터·랭크별 성능 비교 같은 심화 분석은 아직 준비 중이에요.
        </section>
      </div>
    </div>
  );
}
