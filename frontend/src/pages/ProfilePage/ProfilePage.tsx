import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ErrorState } from '../../components/feedback/ErrorState';
import { Toast } from '../../components/feedback/Toast';
import { getErrorMessage } from '../../lib/getErrorMessage';
import { CareerOverviewCard } from '../../features/player-profile/components/CareerOverviewCard';
import { HeroAnalysisCTA } from '../../features/player-profile/components/HeroAnalysisCTA';
import { MostPlayedHeroesCard } from '../../features/player-profile/components/MostPlayedHeroesCard';
import { PerformanceCard } from '../../features/player-profile/components/PerformanceCard';
import { ProfileHeaderCard } from '../../features/player-profile/components/ProfileHeaderCard';
import { RecentHeroesCard } from '../../features/player-profile/components/RecentHeroesCard';
import { usePlayerOverview } from '../../features/player-profile/hooks/usePlayerOverview';
import { ROUTES } from '../../constants/routes';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import { useMyProfileStore } from '../../store/useMyProfileStore';
import type { GameMode, TopPlayedHero } from '../../types/player';

function ProfilePageSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glass-panel h-32 animate-pulse rounded-xl bg-surface-container-high/40" />
      ))}
    </div>
  );
}

type ModeFilter = GameMode | 'all';

const MODE_FILTERS: ModeFilter[] = ['all', 'competitive', 'quickplay'];
const MODE_LABEL: Record<ModeFilter, string> = { all: '전체', competitive: '경쟁전', quickplay: '빠른 대전' };

export function ProfilePage() {
  const { battleTag } = useParams<{ battleTag: string }>();
  const myProfile = useMyProfileStore((state) => state.myProfile);
  const setMyProfile = useMyProfileStore((state) => state.setMyProfile);
  const clearMyProfile = useMyProfileStore((state) => state.clearMyProfile);
  const { data, isLoading, isError, error, refetch } = usePlayerOverview(battleTag);
  useDocumentMeta({
    title: data ? `${data.displayName} 오버워치 전적 | WatchMeta` : '오버워치 전적 조회 | WatchMeta',
    description: data ? `${data.displayName}의 오버워치 경쟁전 티어, 승률, 모스트 영웅을 확인하세요.` : undefined,
    path: battleTag ? ROUTES.profile(battleTag) : undefined,
    noIndex: true,
  });
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode: ModeFilter = MODE_FILTERS.includes(modeParam as ModeFilter) ? (modeParam as ModeFilter) : 'all';
  const setMode = (next: ModeFilter) =>
    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev);
        if (next === 'all') {
          nextParams.delete('mode');
        } else {
          nextParams.set('mode', next);
        }
        return nextParams;
      },
      { replace: false },
    );

  if (!battleTag) return null;

  const isMine = myProfile?.playerId === battleTag;

  const heroStatsForMode = data ? (mode === 'all' ? data.heroStats : data.heroStatsByMode[mode]) : [];
  const performanceForMode = data ? (mode === 'all' ? data.performance : data.performanceByMode[mode] ?? data.performance) : null;
  const topHeroesForMode: TopPlayedHero[] = heroStatsForMode
    .filter((hero) => hero.gamesPlayed > 0)
    .slice(0, 6)
    .map((hero) => ({
      heroId: hero.heroId,
      heroName: hero.heroName,
      role: hero.role,
      portraitUrl: hero.portraitUrl,
      playTimeHours: hero.playTimeHours,
      levelLabel: `${hero.gamesPlayed}경기 · 승률 ${hero.winRate.toFixed(1)}%`,
    }));

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-md space-y-3 px-4 pt-4 text-on-background lg:max-w-[1600px] lg:space-y-5 lg:px-8 lg:pt-5">
        {isLoading && <ProfilePageSkeleton />}
        {isError && (
          <ErrorState
            message={getErrorMessage(error, '문제가 발생했어요. 다시 시도해 주세요.')}
            onRetry={() => refetch()}
          />
        )}
        {data && (
          <>
            <ProfileHeaderCard
              overview={data}
              isMine={isMine}
              onToggleSave={() => {
                if (isMine) {
                  clearMyProfile();
                  setSaveToast('내 계정 저장을 해제했어요.');
                } else {
                  setMyProfile({ playerId: battleTag, label: data.displayName });
                  setSaveToast('내 계정으로 저장했어요. 상단 \'계정\' 메뉴에서 바로 볼 수 있어요.');
                }
              }}
            />

            <div
              role="group"
              aria-label="게임 모드 필터"
              className="flex w-fit gap-1 rounded-lg border border-outline-variant bg-surface-container-high p-1"
            >
              {MODE_FILTERS.map((option) => {
                const isActive = mode === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setMode(option)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary text-surface-container-lowest'
                        : 'text-on-surface-variant hover:bg-surface-variant/40'
                    }`}
                  >
                    {MODE_LABEL[option]}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3 lg:grid lg:grid-cols-12 lg:gap-5 lg:space-y-0">
              <div className="space-y-3 lg:col-span-4">
                <CareerOverviewCard overview={data} />
                {performanceForMode && <PerformanceCard performance={performanceForMode} />}
                <HeroAnalysisCTA battleTag={battleTag} heroId={(heroStatsForMode[0] ?? data.heroStats[0]).heroId} />
              </div>
              <div className="space-y-3 lg:col-span-8">
                <MostPlayedHeroesCard battleTag={battleTag} topHeroes={topHeroesForMode} />
                <RecentHeroesCard battleTag={battleTag} heroStats={heroStatsForMode} />
              </div>
            </div>
          </>
        )}
      </div>
      {saveToast && <Toast message={saveToast} onDismiss={() => setSaveToast(null)} />}
    </div>
  );
}
