import type { PlayerOverviewData } from '../../../types/player';
import { ROLE_ICON, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface MostPlayedHeroesCardProps {
  topHeroes: PlayerOverviewData['topHeroes'];
}

export function MostPlayedHeroesCard({ topHeroes }: MostPlayedHeroesCardProps) {
  return (
    <section className="glass-panel rounded-xl p-5 lg:p-6">
      <div className="mb-4 flex items-baseline justify-between lg:mb-8">
        <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Most Played Heroes</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">모스트 영웅</span>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:gap-6">
        {topHeroes.map((hero) => {
          const Icon = ROLE_ICON[hero.role];
          return (
            <div
              key={hero.heroId}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-outline-variant/30 transition-colors hover:border-primary"
            >
              <div className="aspect-3/4 w-full overflow-hidden">
                <img
                  src={hero.portraitUrl}
                  alt={hero.heroName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="hero-card-gradient absolute inset-0 flex flex-col justify-end p-2 lg:p-4">
                <div className="flex items-center justify-between">
                  <p className="truncate font-headline-md text-xs italic text-on-surface lg:text-headline-md">
                    {hero.heroName}
                  </p>
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${ROLE_TEXT_COLOR[hero.role]}`} />
                </div>
                <p className="mt-1 truncate font-label-sm text-[9px] text-on-surface-variant lg:border-t lg:border-outline-variant/50 lg:pt-2 lg:text-label-sm">
                  {hero.playTimeHours}시간
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
