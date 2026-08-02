import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import type { HeroStat } from '../../../types/player';
import { ROLE_ICON, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface RecentHeroesCardProps {
  battleTag: string;
  heroStats: HeroStat[];
}

const MAX_VISIBLE = 8;

export function RecentHeroesCard({ battleTag, heroStats }: RecentHeroesCardProps) {
  const playedHeroes = heroStats.filter((hero) => hero.gamesPlayed > 0).slice(0, MAX_VISIBLE);

  return (
    <section className="glass-panel rounded-xl p-4 lg:p-5">
      <div className="mb-3 flex items-baseline justify-between lg:mb-4">
        <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Hero Activity</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">영웅별 활동 · 플레이 시간 많은 순</span>
      </div>

      {playedHeroes.length === 0 ? (
        <p className="py-6 text-center font-label-sm text-label-sm text-on-surface-variant">
          아직 플레이한 영웅 기록이 없어요.
        </p>
      ) : (
        <div className="flex flex-col gap-1.5">
          <div className="hidden bg-surface-variant/40 px-4 py-2 font-label-sm text-label-sm uppercase italic tracking-wider text-on-surface-variant lg:grid lg:grid-cols-12">
            <div className="col-span-5">영웅</div>
            <div className="col-span-3 text-right">경기수</div>
            <div className="col-span-2 text-right">KDA</div>
            <div className="col-span-2 text-right">승률</div>
          </div>
          {playedHeroes.map((hero) => {
            const Icon = ROLE_ICON[hero.role];
            const isWinning = hero.winRate >= 50;
            return (
              <Link
                key={hero.heroId}
                to={ROUTES.profileHero(battleTag, hero.heroId)}
                className={`flex items-center gap-3 border-l-4 bg-surface-container px-3 py-2 transition-colors hover:bg-surface-bright lg:grid lg:grid-cols-12 lg:items-center lg:gap-0 lg:px-3.5 lg:py-2.5 ${isWinning ? 'border-tier-b' : 'border-damage-red'}`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 lg:col-span-5">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md bg-surface-dim">
                    <img src={hero.portraitUrl} alt={hero.heroName} className="h-full w-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-surface-container bg-surface-container-lowest">
                      <Icon className={`h-2.5 w-2.5 ${ROLE_TEXT_COLOR[hero.role]}`} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-body-md text-sm font-bold italic text-on-surface">{hero.heroName}</p>
                    <p className="truncate font-label-sm text-[11px] text-on-surface-variant lg:hidden">
                      {hero.gamesPlayed}경기 · KDA {hero.kda.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="hidden truncate font-label-sm text-[11px] text-on-surface-variant lg:col-span-3 lg:block lg:text-right">
                  {hero.gamesPlayed}경기
                </p>
                <p className="hidden truncate font-label-sm text-[11px] text-on-surface-variant lg:col-span-2 lg:block lg:text-right">
                  {hero.kda.toFixed(2)}
                </p>
                <span
                  className={`shrink-0 font-headline-md text-xs italic lg:col-span-2 lg:text-right ${isWinning ? 'text-tier-b' : 'text-damage-red'}`}
                >
                  {hero.winRate.toFixed(1)}%
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
