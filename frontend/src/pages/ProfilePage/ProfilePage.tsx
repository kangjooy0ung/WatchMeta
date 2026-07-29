import { useParams } from 'react-router-dom';
import { ErrorState } from '../../components/feedback/ErrorState';
import { CareerOverviewCard } from '../../features/player-profile/components/CareerOverviewCard';
import { MostPlayedHeroesCard } from '../../features/player-profile/components/MostPlayedHeroesCard';
import { PerformanceCard } from '../../features/player-profile/components/PerformanceCard';
import { ProfileHeaderCard } from '../../features/player-profile/components/ProfileHeaderCard';
import { RecentMatchesCard } from '../../features/player-profile/components/RecentMatchesCard';
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
  const myBattleTag = useMyProfileStore((state) => state.myBattleTag);
  const setMyBattleTag = useMyProfileStore((state) => state.setMyBattleTag);
  const clearMyBattleTag = useMyProfileStore((state) => state.clearMyBattleTag);
  const { data, isLoading, isError } = usePlayerOverview(battleTag);

  if (!battleTag) return null;

  const isMine = myBattleTag === battleTag;

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-md space-y-4 px-4 pt-4 text-on-background">
        {isLoading && <ProfilePageSkeleton />}
        {isError && <ErrorState />}
        {data && (
          <>
            <ProfileHeaderCard
              overview={data}
              isMine={isMine}
              onToggleSave={() => (isMine ? clearMyBattleTag() : setMyBattleTag(battleTag))}
            />
            <CareerOverviewCard overview={data} />
            <PerformanceCard performance={data.performance} />
            <MostPlayedHeroesCard topHeroes={data.topHeroes} />
            <RecentMatchesCard matches={data.recentMatches} />
          </>
        )}
      </div>
    </div>
  );
}
