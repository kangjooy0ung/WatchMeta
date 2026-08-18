import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ErrorState } from '../../components/feedback/ErrorState';
import { InfoNote } from '../../components/feedback/InfoNote';
import { ShareLinkButton } from '../../components/feedback/ShareLinkButton';
import { HeroImage } from '../../components/hero/HeroImage';
import { HeroRosterSelector } from '../../features/player-profile/components/HeroRosterSelector';
import { ROLE_ICON, ROLE_LABEL, ROLE_TEXT_COLOR } from '../../features/player-profile/constants/roleTheme';
import { usePlayerOverview } from '../../features/player-profile/hooks/usePlayerOverview';
import { ROUTES } from '../../constants/routes';
import { getErrorMessage } from '../../lib/getErrorMessage';

function formatThousands(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toFixed(0);
}

function PlayerHeroDetailSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1].map((i) => (
        <div key={i} className="glass-panel h-32 animate-pulse rounded-xl bg-surface-container-high/40" />
      ))}
    </div>
  );
}

export function PlayerHeroDetailPage() {
  const { battleTag, heroId } = useParams<{ battleTag: string; heroId: string }>();
  const { data, isLoading, isError, error, refetch } = usePlayerOverview(battleTag);

  if (!battleTag || !heroId) return null;

  const hero = data?.heroStats.find((h) => h.heroId === heroId);

  const statRows = hero
    ? [
        { label: '처치', total: hero.total.eliminations, average: hero.average.eliminations },
        { label: '어시스트', total: hero.total.assists, average: hero.average.assists },
        { label: '데스', total: hero.total.deaths, average: hero.average.deaths },
        { label: '피해량', total: hero.total.damage, average: hero.average.damage },
        { label: '치유량', total: hero.total.healing, average: hero.average.healing },
      ]
    : [];

  return (
    <div className="bg-background pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto w-full max-w-md space-y-3 px-4 pt-4 text-on-background lg:max-w-3xl lg:pt-5">
        <div className="flex items-center justify-between gap-2">
          <Link
            to={ROUTES.profile(battleTag)}
            className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            프로필로 돌아가기
          </Link>
          <ShareLinkButton />
        </div>

        {isLoading && <PlayerHeroDetailSkeleton />}
        {isError && (
          <ErrorState
            message={getErrorMessage(error, '문제가 발생했어요. 다시 시도해 주세요.')}
            onRetry={() => refetch()}
          />
        )}
        {data && !hero && <ErrorState message="해당 영웅의 플레이 기록을 찾을 수 없어요." />}

        {data && (
          <HeroRosterSelector battleTag={battleTag} heroStats={data.heroStats} activeHeroId={heroId} />
        )}

        {hero && (
          <>
            <section className="glass-panel relative overflow-hidden rounded-xl border-l-4 border-primary p-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 border-primary/60 bg-surface-dim">
                  <HeroImage src={hero.portraitUrl} alt={hero.heroName} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = ROLE_ICON[hero.role];
                      return <Icon className={`h-4 w-4 shrink-0 ${ROLE_TEXT_COLOR[hero.role]}`} />;
                    })()}
                    <span className={`font-label-sm text-label-sm ${ROLE_TEXT_COLOR[hero.role]}`}>
                      {ROLE_LABEL[hero.role]}
                    </span>
                  </div>
                  <h2 className="truncate font-headline-lg text-headline-lg italic text-on-surface">
                    {hero.heroName}
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {hero.gamesPlayed}경기 · {hero.playTimeHours}시간
                  </p>
                </div>
              </div>
            </section>

            {hero.gamesPlayed === 0 && <InfoNote message="아직 이 영웅으로 플레이한 기록이 없어요." />}

            <section className="glass-panel grid grid-cols-2 gap-2.5 rounded-xl p-4 lg:grid-cols-4">
              <div className="border-b-2 border-primary bg-surface-container-low p-3">
                <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">승률</p>
                <p className="font-stat-value text-lg text-primary">{hero.winRate.toFixed(1)}%</p>
              </div>
              <div className="border-b-2 border-secondary bg-surface-container-low p-3">
                <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">KDA</p>
                <p className="font-stat-value text-lg text-secondary">{hero.kda.toFixed(2)}</p>
              </div>
              <div className="border-b-2 border-tier-b bg-surface-container-low p-3">
                <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">승 / 패</p>
                <p className="font-stat-value text-lg text-tier-b">
                  {hero.gamesWon} / {hero.gamesLost}
                </p>
              </div>
              <div className="border-b-2 border-damage-red bg-surface-container-low p-3">
                <p className="font-label-sm text-[10px] uppercase text-on-surface-variant">플레이 시간</p>
                <p className="font-stat-value text-lg text-damage-red">{hero.playTimeHours}시간</p>
              </div>
            </section>

            <section className="glass-panel rounded-xl p-4">
              <h3 className="mb-3 font-headline-lg text-headline-md italic uppercase text-on-surface">
                Match Average
              </h3>
              <div className="flex flex-col divide-y divide-outline-variant/30">
                {statRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2">
                    <span className="font-label-sm text-sm text-on-surface-variant">{row.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-stat-value text-base text-on-surface">
                        {formatThousands(row.average)}
                      </span>
                      <span className="font-label-sm text-[10px] text-on-surface-variant">
                        총 {formatThousands(row.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
