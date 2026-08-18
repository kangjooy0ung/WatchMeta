import { Link } from 'react-router-dom';
import { HeroImage } from '../../../components/hero/HeroImage';
import { ROUTES } from '../../../constants/routes';
import type { HeroRole } from '../../../types/hero';
import type { HeroStat } from '../../../types/player';
import { ROLE_ICON, ROLE_LABEL, ROLE_TEXT_COLOR } from '../constants/roleTheme';

interface HeroRosterSelectorProps {
  battleTag: string;
  heroStats: HeroStat[];
  activeHeroId: string;
}

const ROLE_ORDER: HeroRole[] = ['tank', 'damage', 'support'];

export function HeroRosterSelector({ battleTag, heroStats, activeHeroId }: HeroRosterSelectorProps) {
  return (
    <section className="glass-panel rounded-xl p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-headline-lg text-headline-md italic uppercase text-on-surface">Heroes</h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">영웅 선택</span>
      </div>

      <div className="flex flex-col gap-3">
        {ROLE_ORDER.map((role) => {
          const heroes = heroStats.filter((hero) => hero.role === role);
          if (heroes.length === 0) return null;
          const Icon = ROLE_ICON[role];

          return (
            <div key={role}>
              <div className="mb-1.5 flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${ROLE_TEXT_COLOR[role]}`} />
                <span className={`font-label-sm text-[10px] uppercase tracking-wider ${ROLE_TEXT_COLOR[role]}`}>
                  {ROLE_LABEL[role]}
                </span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {heroes.map((hero) => {
                  const isActive = hero.heroId === activeHeroId;
                  const isPlayed = hero.gamesPlayed > 0;
                  return (
                    <Link
                      key={hero.heroId}
                      to={ROUTES.profileHero(battleTag, hero.heroId)}
                      title={hero.heroName}
                      className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        isActive
                          ? 'border-primary'
                          : 'border-transparent hover:border-outline-variant'
                      }`}
                    >
                      <HeroImage
                        src={hero.portraitUrl}
                        alt={hero.heroName}
                        className={`h-full w-full object-cover ${isPlayed ? '' : 'opacity-30 grayscale'}`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
