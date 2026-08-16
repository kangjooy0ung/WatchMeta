import { useParams } from 'react-router-dom';
import { ErrorState } from '../../components/feedback/ErrorState';
import { getErrorMessage } from '../../lib/getErrorMessage';
import { CareerOverviewCard } from '../../features/player-profile/components/CareerOverviewCard';
import { HeroAnalysisCTA } from '../../features/player-profile/components/HeroAnalysisCTA';
import { MostPlayedHeroesCard } from '../../features/player-profile/components/MostPlayedHeroesCard';
import { PerformanceCard } from '../../features/player-profile/components/PerformanceCard';
import { ProfileHeaderCard } from '../../features/player-profile/components/ProfileHeaderCard';
import { RecentHeroesCard } from '../../features/player-profile/components/RecentHeroesCard';
import { usePlayerOverview } from '../../features/player-profile/hooks/usePlayerOverview';
import { useMyProfileStore } from '../../store/useMyProfileStore';

function ProfilePageSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glass-panel h-32 animate-pulse rounded-xl bg-surface-container-high/40" />
      ))}
    </div>
  );
}

export function ProfilePage() {
  const { battleTag } = useParams<{ battleTag: string }>();
  const myProfile = useMyProfileStore((state) => state.myProfile);
  const setMyProfile = useMyProfileStore((state) => state.setMyProfile);
  const clearMyProfile = useMyProfileStore((state) => state.clearMyProfile);
  const { data, isLoading, isError, error } = usePlayerOverview(battleTag);

  if (!battleTag) return null;

  const isMine = myProfile?.playerId === battleTag;

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-md space-y-3 px-4 pt-4 text-on-background lg:max-w-[1600px] lg:space-y-5 lg:px-8 lg:pt-5">
        {isLoading && <ProfilePageSkeleton />}
        {isError && <ErrorState message={getErrorMessage(error, '문제가 발생했어요. 다시 시도해 주세요.')} />}
        {data && (
          <>
            <ProfileHeaderCard
              overview={data}
              isMine={isMine}
              onToggleSave={() =>
                isMine ? clearMyProfile() : setMyProfile({ playerId: battleTag, label: data.displayName })
              }
            />
            <div className="space-y-3 lg:grid lg:grid-cols-12 lg:gap-5 lg:space-y-0">
              <div className="space-y-3 lg:col-span-4">
                <CareerOverviewCard overview={data} />
                <PerformanceCard performance={data.performance} />
                <HeroAnalysisCTA battleTag={battleTag} heroId={data.heroStats[0].heroId} />
              </div>
              <div className="space-y-3 lg:col-span-8">
                <MostPlayedHeroesCard battleTag={battleTag} topHeroes={data.topHeroes} />
                <RecentHeroesCard battleTag={battleTag} heroStats={data.heroStats} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
